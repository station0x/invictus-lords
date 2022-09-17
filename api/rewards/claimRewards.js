"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');
const getAddress = require('../../api-utils/getAddress');
const { ObjectId } = require('mongodb');
const CONSTANTS = require('../../constants')
import { ethers } from 'ethers'

module.exports = async (req, res) => {
    const address = getAddress(req.query.signature)
    // if(!req.query.ores) throw new Error("Ores not provided");
    // let ores;
    // try {
    //     ores = JSON.parse(req.query.ores)
    // } catch(e) {
    //     throw new Error("Failed to parse ores")
    // }
    // if(!Array.isArray(ores)) throw new Error("Ores not an array");
    // ores = ores.filter(v => CONSTANTS.economicPolicy.assets[v] && CONSTANTS.economicPolicy.assets[v].type === "ore")
    
    // sanity checks passed, let's check player rewards balance
    const client = await clientPromise;
    const db = client.db()
    const players = db.collection("players")
    const playerDoc = (await players.find({address}).limit(1).toArray())[0]
    if(!playerDoc.rewards && !(playerDoc.rewards > 0)) throw new Error("Player has no rewards")
    ores = ores.filter(v => playerDoc.rewards[v] && playerDoc.rewards[v] > 0);
    let hash = ethers.utils.solidityKeccak256(
        ['address[]','uint256[]', 'address', 'address', 'uint'],
        [
            ores.map(v => CONSTANTS.economicPolicy.assets[v].address),
            ores.map(v => ethers.utils.parseEther(playerDoc.rewards[v].toString())),
            address,
            CONSTANTS.economicPolicy.oreMinter,
            CONSTANTS.chainId
        ]
    )
    let wallet = new ethers.utils.SigningKey(process.env.SIGNER)
    let signature = await wallet.signDigest(hash);
    res.json({signature})
    return
}