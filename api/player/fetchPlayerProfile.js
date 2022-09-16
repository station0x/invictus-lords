"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');

module.exports = async (req, res) => {
    const address = req.query.address
    const client = await clientPromise;
    const db = client.db()
    const players = db.collection("players")
    const playerDoc = (await players.find({address}).limit(1).toArray())[0]
    if(!playerDoc) {
        res.status(404).json({ success: false })
    } else res.status(200).json({ success: true, playerDoc: playerDoc })
}