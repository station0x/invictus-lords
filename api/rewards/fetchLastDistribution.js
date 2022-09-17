"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client')
const CONSTANTS = require('../../constants')

module.exports = async (req, res) => {
        const client = await clientPromise;
        const db = client.db()
        // get latest reward distribution info
        const cronRewardsColleciton = db.collection("cronRewards")
        const lastReleaseDoc = ((await cronRewardsColleciton.find().limit(1).toArray())[0])
        const lastRelease = lastReleaseDoc.lastRelease/1000
        res.status(200).json({ lastDistribution: lastRelease })
}