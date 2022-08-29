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
    const playerDoc = (await players.find(query).limit(1).toArray()).map(player => {
        if(player.elo === undefined) player.elo = 1200
        player.joinedDate = player._id.getTimestamp().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
        return player
    })[0]

    res.status(200).json({ success: true, playerDoc });
}