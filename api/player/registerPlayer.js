"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');
const getAddress = require('../../api-utils/getAddress');
const { ObjectId } = require('mongodb');
const codec = require('json-url')('lzw');

function validate(address) {
    if(!address) throw new Error('Player address not provided')
    return true
}

module.exports = async (req, res) => {
    const address = getAddress(req.query.signature)
    if(!validate(address)) {
        res.json({success:false, error:"invalid"})
        return true
    }

    const providerType = req.query.providerType.toLowerCase()
    const providerId = req.query.providerId
    const client = await clientPromise;
    const db = client.db()
    const players = db.collection("players")
    const playerDoc = (await players.find({address}).limit(1).toArray())[0]
    
    let userObj = await codec.decompress(req.query.providersData)
    if(!playerDoc) { // player document doesn't exist, let's create one
        await players.insertOne({
            address,
            providersId: [
                `${providerType}_${providerId}`
            ],
            playerAlias: userObj.username,
            avatar: req.query.avatar,
            personas: { 
                [`${providerType}`]: userObj
            },
            gamesList: ['csgo'],
            lastSeenTimestamp: Date.now(),
            createdAt: Date.now(),
        })
    } else throw new Error('Address already registered')
    res.status(200).json({ success: true });
}