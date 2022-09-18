"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');
const getAddress = require('../../api-utils/getAddress');

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
    const client = await clientPromise;
    const db = client.db()
    const players = db.collection("players")
    const playerDoc = (await players.find({address}).limit(1).toArray())[0]
    const success = playerDoc === undefined ? false : true
    res.status(200).json({ success });
}