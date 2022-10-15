"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client')
const CONSTANTS = require('../../constants')
const { getTodayUnix, getLatestStats } = require('../../api-utils/game/fetchGameProfile')

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

        // update rewards distribution time
        const newLastRelease = {...lastReleaseDoc}
        newLastRelease.lastRelease = Date.now()
        await cronRewardsCollection.updateOne({_id: newLastRelease._id}, {
            $set:newLastRelease
        })
        
        // calculate csgo players rewards
        const csgoCollection = db.collection(`csgo`)
        const projection = { _id: 0, rating: 1, address: 1, daySinceEpoch: 1, personaId: 1}
        // Deacrease time by 30% (benchmarked locally) (Iterate using cursor- instead of await/ increasing batch size from 101 to 1000)
        let playerDocs = []
        let playerTotalRatings = 0
        await csgoCollection.find({ rating: { "$gt": 0 } }).project(projection).batchSize(1000).forEach(async v => {
            let player = {}
            player.rating = v.rating
            player.address = v.address
            player.daySinceEpoch = v.daySinceEpoch
            player.personId = v.personaId
            playerDocs.push(player)
            playerTotalRatings += v.rating
        })
        playerDocs.forEach(player => {
            player.playerWeight = player.rating/playerTotalRatings
            player.playerReward = (player.playerWeight * CONSTANTS.economicPolicy.dailyRewards).toFixed()
        })

        // bulk update player docs
        var ops = []
        var logsData = []
        let csgoGameOps = []
        // console.log(playerDocs)
        await Promise.all(playerDocs.map(async doc => {
            logsData.push({
                address: doc.address,
                rewards: Number.parseInt(doc.playerReward),
                rating: doc.rating,
                weight: doc.playerWeight,
                unixInDays: doc.daySinceEpoch
            })
            // reset rewarded players daily progress
            let personId = doc.personId
            let dailyGameInfoSnapshot = await getLatestStats(personId)
            let dailyGameInfo = {}
            for(const property in dailyGameInfoSnapshot) {
                if(dailyGameInfoSnapshot.hasOwnProperty(property)) {
                    dailyGameInfo[property] = {
                        value: 0                    
                    }
                }
            }
            // Calculate percentages-based stats
            dailyGameInfo['kd'].value = 0
            dailyGameInfo['shotsAccuracy'].value = 0
            dailyGameInfo['wlPercentage'].value = 0
            dailyGameInfo['headshotPct'].value = 0

            csgoGameOps.push({
                "updateOne": {
                    "filter": { "address": doc.address },
                    "update": {
                        "$set": { 
                            daySinceEpoch: getTodayUnix(),
                            dailyGameInfoSnapshot,
                            dailyGameInfo
                        }
                    }
                }
            })

            ops.push({
                "updateOne": {
                    "filter": { "address": doc.address },
                    "update": {
                        "$inc": { rewards: Number.parseInt(doc.playerReward) }
                    }
                }
            })

            if (ops.length === 500) {
                Promise.all([
                    await csgoCollection.bulkWrite(csgoGameOps),
                    await db.collection('players').bulkWrite(ops)
                ])
                ops = []
                csgoGameOps = []
            }
        }))
        if (ops.length > 0) {
            Promise.all([
                await csgoCollection.bulkWrite(csgoGameOps),
                await db.collection('players').bulkWrite(ops)
            ])
        }
        console.log(ops, csgoGameOps)

        // logging functionality
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