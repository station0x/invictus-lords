"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');
const getAddress = require('../../api-utils/getAddress');
const CONSTANTS = require('../../constants')
import { ethers } from 'ethers'

module.exports = async (req, res) => {
    const address = getAddress(req.query.signature)
    const amount = req.query.amount
    if(!amount) throw new Error('Amount missing')
    // sanity checks passed, let's check player rewards balance
    const client = await clientPromise;
    const db = client.db()
    const players = db.collection("players")
    const playerDoc = (await players.find({address}).limit(1).toArray())[0]
    if(!playerDoc.rewards && !(playerDoc.rewards > 0)) throw new Error("Player has no rewards")
    const rewards = playerDoc.rewards
    const provider = new ethers.providers.JsonRpcProvider(CONSTANTS.chainInfo.rpcUrl)
    const Contract = new ethers.Contract(CONSTANTS.economicPolicy.minter, [
        "function UserNonce(address) view returns (uint)",
        "function UserClaimed(address) view returns (uint)"
    ], provider);
    const Nonce = Number(await Contract.UserNonce(address)) + 1
    const userClaimed = Number(ethers.utils.formatEther(await Contract.UserClaimed(address)))
    let claimableRewards = rewards - userClaimed
    if(amount > claimableRewards) throw new Error('Invalid amount')
    let hash = ethers.utils.solidityKeccak256(
        ['uint', 'uint', 'address', 'address', 'uint'],
        [

            ethers.utils.parseEther(amount.toString()), // amount
            Nonce, // nonce
            address, // caller 
            CONSTANTS.economicPolicy.minter, // calee
            // CONSTANTS.economicPolicy.assets['VON'].address,
            CONSTANTS.chainInfo.chainId // chainID
        ]
    )
    let wallet = new ethers.utils.SigningKey(process.env.SIGNER)
    let signature = await wallet.signDigest(hash)
    console.log(signature)
    res.json({signature, nonce: Nonce})
    return
}