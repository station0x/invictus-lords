"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client')
const CONSTANTS = require('../../constants')

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const client = await clientPromise;
        const db = client.db()
        // get latest reward distribution info
        const cronRewardsColleciton = db.collection("cronRewards")
        const lastReleaseDoc = ((await cronRewardsColleciton.find().limit(1).toArray())[0])

        const now = Date.now()/1000
        const lastRelease = lastReleaseDoc.lastRelease/1000
        // sanity check
        if((now - lastRelease) <= CONSTANTS.economicPolicy.releaseInterval) throw new Error('Failed, Need more time.')
        
        // calculate csgo players rewards
        const csgoCollection = db.collection(`csgo`)
        const projection = { _id: 0, rating: 1, address: 1}
        // Deacrease time by 30% (benchmarked locally) (Iterate using cursor- instead of await/ increasing batch size from 101 to 1000)
        let playerDocs = []
        let playerTotalRatings = 0
        await csgoCollection.find({ rating: { "$gt": 0 } }).project(projection).batchSize(1000).forEach(v => {
            let player = {}
            player.rating = v.rating
            player.address = v.address
            playerDocs.push(player)
            playerTotalRatings += v.rating  
        })
        playerDocs.forEach(player => {
            player.playerWeight = player.rating/playerTotalRatings
            player.playerReward = player.playerWeight * CONSTANTS.economicPolicy.dailyRewards
            console.log(player.playerReward)
        })

        // bulk update player docs
        var ops = [];
        playerDocs.forEach(async function(doc) {
            ops.push({
                "updateOne": {
                    "filter": { "address": doc.address },
                    "update": {
                        "$set": { rewards: doc.playerReward }
                    }
                }
            });

            if (ops.length === 500 ) {
                await db.collection('players').bulkWrite(ops);
                ops = [];
            }
        })
        console.log(await db.collection('players'))
        if (ops.length > 0)  await db.collection('players').bulkWrite(ops);

        // update rewards distribution time
        const newLastRelease = {...lastReleaseDoc}
        newLastRelease.lastRelease = Date.now()
        await cronRewardsColleciton.updateOne({_id: newLastRelease._id}, {
            $set:newLastRelease
        })
        res.status(200).json({ success: true })
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}