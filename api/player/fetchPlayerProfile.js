"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');
const { ObjectId } = require('mongodb');

module.exports = async (req, res) => {
    const address = req.query.address
    const client = await clientPromise;
    const db = client.db()
    const players = db.collection("players")
    const query = {address}
    const playerDoc = (await players.find({address}).limit(1).toArray())[0]
    if(!playerDoc) throw new Error('No player registered with given address')
    res.status(200).json({ success: true, playerDoc: playerDoc });
}