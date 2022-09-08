"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');
const CONSTANTS = require('../../constants')

module.exports = async (req, res) => {
    // const address = req.query.address
    const game = req.query.game
    if(!CONSTANTS.games[game]) throw new Error('{game} is not found or formatted wrongly')
    const client = await clientPromise;
    const db = client.db()
    // fetch player profile
    // const players = db.collection("players")
    const gameCollection = db.collection(`${game}`)
    // const playerDoc = (await players.find({address}).limit(1).toArray())[0]
    // if(!playerDoc) res.status(404).json({sucess: false}) //throw new Error('Player does not exist')

    const projection = { _id: 0, rating: 1, playerAlias: 1, address: 1, gameInfo: 1}
    // Sort then limit (MongoServer exec default behavior)
    // Old Implementation (Slower)
    // let playerDocs = await players.find({ elo: { "$gt": 1200 } }).sort({elo: -1}).toArray() 

    // Deacrease time by 30% (benchmarked locally) (Iterate using cursor- instead of await/ increasing batch size from 101 to 1000)
    let playerDocs = []
    await gameCollection.find().project(projection).batchSize(1000).sort({rating: -1}).forEach(v => {
        let player = {}
        player.rating = v.rating
        player.player = v.playerAlias && v.playerAlias.length > 0 ? v.playerAlias: v.address
        player.address = v.address
        player.gameInfo = v.gameInfo
        playerDocs.push(player)
    })

    // Use aggregation pipeline instead of cursor-iterator to speed up querying (far massive docs only)
    // let playerDocs = []
    // await players.aggregate([ { $match: {elo: { "$gt": 1200}} }, { $sort: {elo: -1} } ]).forEach(v => {
    //     const player = {}
    //     player.elo = v.elo
    //     player.player = v.playerAlias && v.playerAlias.length > 0 ? v.playerAlias: v.address
    //     player.address = v.address
    //     player.gm = v.gm
    //     playerDocs.push(player)
    // })
    res.status(200).json({ success: true, leaderboard: playerDocs});
}