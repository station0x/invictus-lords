"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');
const { ObjectId } = require('mongodb');

module.exports = async (req, res) => {
    const address = req.query.address
    const game = req.query.game
    const client = await clientPromise;
    const db = client.db()
    const gameCollection = db.collection(`${game}`)
    const query = {address}
    const playerGameDoc = (await gameCollection.find({address}).limit(1).toArray())[0]
    if(!playerDoc) {
        res.status(404).json({ success: false })
    } else res.status(200).json({ success: true, playerDoc: playerDoc })
    
}