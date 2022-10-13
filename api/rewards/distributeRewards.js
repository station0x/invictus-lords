"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client')
const CONSTANTS = require('../../constants')

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const client = await clientPromise;
        const db = client.db()
        // get latest reward distribution info
        const cronRewardsCollection = db.collection("cronRewards")
        const rewardsLogs = db.collection("rewardsLogs")
        const lastReleaseDoc = ((await cronRewardsCollection.find().limit(1).toArray())[0])

        const now = Date.now()/1000
        const lastRelease = lastReleaseDoc.lastRelease/1000
        // sanity check
        if(CONSTANTS.economicPolicy.releaseInterval > (now - lastRelease)) {
            console.log((now - lastRelease), CONSTANTS.economicPolicy.releaseInterval, CONSTANTS.economicPolicy.releaseInterval > (now - lastRelease))
            throw new Error('Failed, Need more time.')
        }
        
        // calculate csgo players rewards
        const csgoCollection = db.collection(`csgo`)
        const projection = { _id: 0, rating: 1, address: 1, daySinceEpoch: 1}
        // Deacrease time by 30% (benchmarked locally) (Iterate using cursor- instead of await/ increasing batch size from 101 to 1000)
        let playerDocs = []
        let playerTotalRatings = 0
        await csgoCollection.find({ rating: { "$gt": 0 } }).project(projection).batchSize(1000).forEach(v => {
            let player = {}
            player.rating = v.rating
            player.address = v.address
            player.daySinceEpoch = v.daySinceEpoch
            playerDocs.push(player)
            playerTotalRatings += v.rating  
        })
        playerDocs.forEach(player => {
            player.playerWeight = player.rating/playerTotalRatings
            player.playerReward = (player.playerWeight * CONSTANTS.economicPolicy.dailyRewards).toFixed()
        })

        // bulk update player docs
        var ops = [];
        var logsData = []
        playerDocs.forEach(async function(doc) {
            console.log(Number.parseInt(doc.playerReward))
            logsData.push({
                address: doc.address,
                rewards: Number.parseInt(doc.playerReward),
                rating: doc.rating,
                weight: doc.playerWeight,
                unixInDays: doc.daySinceEpoch
            })
            ops.push({
                "updateOne": {
                    "filter": { "address": doc.address },
                    "update": {
                        "$inc": { rewards: Number.parseInt(doc.playerReward) }
                    }
                }
            });

            if (ops.length === 500 ) {
                await db.collection('players').bulkWrite(ops);
                ops = [];
            }
        })
        if (ops.length > 0)  await db.collection('players').bulkWrite(ops);

        // update rewards distribution time
        const newLastRelease = {...lastReleaseDoc}
        newLastRelease.lastRelease = Date.now()
        await cronRewardsCollection.updateOne({_id: newLastRelease._id}, {
            $set:newLastRelease
        })

        let logs = {
            timestamp: Date.now(),
            date: Date(),
            rewards: logsData
        }
        await rewardsLogs.insertOne(logs)

        res.status(200).json({ success: true })
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}