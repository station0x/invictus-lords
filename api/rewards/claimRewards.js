"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');
const getAddress = require('../../api-utils/getAddress');
const CONSTANTS = require('../../constants')
import { ethers } from 'ethers'

module.exports = async (req, res) => {
    const address = getAddress(req.query.signature)
    // sanity checks passed, let's check player rewards balance
    const client = await clientPromise;
    const db = client.db()
    const players = db.collection("players")
    const playerDoc = (await players.find({address}).limit(1).toArray())[0]
    if(!playerDoc.rewards && !(playerDoc.rewards > 0)) throw new Error("Player has no rewards")
    const rewards = playerDoc.rewards
    let hash = ethers.utils.solidityKeccak256(
        ['uint', 'address', 'address', 'uint'],
        [
            ethers.utils.parseEther(rewards.toString()), // amount
            address, // caller 
            CONSTANTS.economicPolicy.minter, // calee
            // CONSTANTS.economicPolicy.assets['VON'].address,
            CONSTANTS.chainInfo.chainId // chainID
        ]
    )
    let wallet = new ethers.utils.SigningKey(process.env.SIGNER)
    let signature = await wallet.signDigest(hash)
    res.json({signature})
    return
}