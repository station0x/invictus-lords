"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');
const { ethers } = require('ethers')
const CONSTANTS = require('../../constants')
module.exports = async (req, res) => {
    const address = req.query.address
    const client = await clientPromise;
    const db = client.db()
    const players = db.collection("players")
    const playerDoc = (await players.find({address}).limit(1).toArray())[0]
    if(!playerDoc) {
        res.status(404).json({ success: false })
    } else {
        const newPlayerDoc = {...playerDoc}
        // calculate redeeamble rewards
        const provider = new ethers.providers.JsonRpcProvider(CONSTANTS.chainInfo.rpcUrl)
        const Contract = new ethers.Contract(CONSTANTS.economicPolicy.minter, [
            "function UserClaimed(address) view returns (uint)"
        ], provider);
        const userClaimed = Number(ethers.utils.formatEther(await Contract.UserClaimed(address)))
        const claimableRewards = playerDoc.rewards - userClaimed
        newPlayerDoc.rewards = claimableRewards < 0 ? 0 : claimableRewards
        // console.log(newPlayerDoc.personas.steam.steamid)
        // delete newPlayerDoc.personas.steam.steamid
        // delete newPlayerDoc.personas.steam.profile
        // delete newPlayerDoc.steam
        // console.log(newPlayerDoc.personas.steam.steamid)
        res.status(200).json({ success: true, playerDoc: newPlayerDoc })
    }
}