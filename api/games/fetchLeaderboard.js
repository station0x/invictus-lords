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
    const players = db.collection("players")
    const gameCollection = db.collection(`${game}`)
    // if(!playerDoc) res.status(404).json({success: false}) //throw new Error('Player does not exist')

    const projection = { _id: 0, rating: 1, playerAlias: 1, address: 1, gameInfo: 1}
    const playerProjection = { _id: 0, avatar: 1, address: 1 }
    // Sort then limit (MongoServer exec default behavior)
    // Old Implementation (Slower)
    // let playerDocs = await players.find({ elo: { "$gt": 1200 } }).sort({elo: -1}).toArray() 

    // Deacrease time by 30% (benchmarked locally) (Iterate using cursor- instead of await/ increasing batch size from 101 to 1000)
    let playerDocs = []
    let playerAvatars = []
    console.log('workin')
    Promise.all([
        await gameCollection.find().project(projection).batchSize(1000).sort({rating: -1}).forEach(v => {
            // playerDoc = (players.find({address: player.address}).limit(1).toArray())[0]
            console.log(v)
            let player = {}
            player.rating = v.rating / 100
            player.player = v.playerAlias && v.playerAlias.length > 0 ? v.playerAlias: v.address
            player.address = v.address
            player.gameInfo = v.gameInfo
            playerDocs.push(player)
        }),
        await players.find().project(playerProjection).batchSize(1000).forEach(v => {
            // playerDoc = (players.find({address: player.address}).limit(1).toArray())[0]
            let player = {}
            player.address = v.address
            player.avatar = v.avatar
            playerAvatars.push(player)
        })
    ])

    playerDocs.forEach(player => {
        playerAvatars.forEach( playerAv => {
            if(playerAv.address == player.address) {
                player.avatar = playerAv.avatar
            }
        })
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