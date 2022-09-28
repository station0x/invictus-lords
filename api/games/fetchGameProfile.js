"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');
const CONSTANTS = require('../../constants')
const axios = require('axios')

module.exports = async (req, res) => {
    const address = req.query.address
    const game = req.query.game
    if(!CONSTANTS.games[game]) throw new Error('{game} is not found or formatted wrongly')
    const client = await clientPromise;
    const db = client.db()
    // fetch player profile
    const players = db.collection("players")
    const playerDoc = (await players.find({address}).limit(1).toArray())[0]
    if(!playerDoc) res.status(404).json({sucess: false}) //throw new Error('Player does not exist')
    
    // Fetch player game profile
    const gameCollection = db.collection(`${game}`)
    const persona = CONSTANTS.games[game].persona
    const personaIdKey = CONSTANTS.games[game].personaIdKey
    const personaId = playerDoc.personas[persona][personaIdKey]
    const playerGameDoc = (await gameCollection.find({personaId}).limit(1).toArray())[0]
    if(!playerGameDoc) {
        try {
            const data = (await axios.get(`https://public-api.tracker.gg/v2/csgo/standard/profile/${persona}/${personaId}`, {
                headers: {
                    'TRN-Api-Key': process.env.TRACKER_API
                }
            }))
            let gameProfile = {
                personaId,
                address,
                playerAlias: playerDoc.playerAlias,
                persona,
                rating: 0,
                lastFetched: Date.now(),
                userInfo: data.data.data.userInfo, // data data data slooow hahaha
                gameInfoSnapshot: data.data.data.segments[0].stats,
                gameInfoLifetime: data.data.data.segments[0].stats,
                gameInfo: {}
            }
            for(const property in gameProfile.gameInfoSnapshot) {
                const value = 0
                if(gameProfile.gameInfoSnapshot.hasOwnProperty(property)) {
                    gameProfile.gameInfo[property] = {
                        value: value
                    }
                }
            }
            await gameCollection.insertOne(gameProfile)
            const createdProfile = (await gameCollection.find({personaId}).limit(1).toArray())[0]
            // reduce rating digits for showing purposes only
            createdProfile.rating = createdProfile.rating/100
            res.status(200).json({ succes: true, playerGameDoc: createdProfile, playerDoc })
            }
            catch(err) {
                if(err.response.status === 451) res.status(451).json({ succes: false, msg: "The player either hasn't played CSGO or their profile is private." })
                else throw new Error('Unknown error occured')
            }
    } else {
        if(Date.now() > playerGameDoc.lastFetched + (CONSTANTS.api.refetchTimout * 1000)) {
            // calculate seasons data
            const newPlayerGameDoc = {...playerGameDoc}
            try {
            const data = (await axios.get(`https://public-api.tracker.gg/v2/csgo/standard/profile/${persona}/${personaId}`, {
                headers: {
                    'TRN-Api-Key': process.env.TRACKER_API
                }
            }))
        
            const latestData = data.data.data.segments[0].stats
            newPlayerGameDoc.gameInfoLifetime = latestData

            for(const property in newPlayerGameDoc.gameInfoSnapshot) {
                if(newPlayerGameDoc.gameInfo.hasOwnProperty(property)) {
                    const value = latestData[property].value - newPlayerGameDoc.gameInfoSnapshot[property].value
                    newPlayerGameDoc.gameInfo[property] = {
                        value: value                    
                    }
                }
            }
            // Calculate percentages-based stats
            newPlayerGameDoc.gameInfo['kd'].value = newPlayerGameDoc.gameInfo.kills.value / newPlayerGameDoc.gameInfo.deaths.value || 0
            newPlayerGameDoc.gameInfo['shotsAccuracy'].value = (newPlayerGameDoc.gameInfo.shotsHit.value / newPlayerGameDoc.gameInfo.shotsFired.value) * 100 || 0 
            newPlayerGameDoc.gameInfo['wlPercentage'].value = (newPlayerGameDoc.gameInfo.wins.value / newPlayerGameDoc.gameInfo.matchesPlayed.value) * 100 || 0
            newPlayerGameDoc.gameInfo['headshotPct'].value = (newPlayerGameDoc.gameInfo.headshots.value / newPlayerGameDoc.gameInfo.kills.value) * 100 || 0

            // Calculate rating
            newPlayerGameDoc.rating = 
            Number.parseInt((newPlayerGameDoc.gameInfo['score'].value 
            * (newPlayerGameDoc.gameInfo['wlPercentage'].value * newPlayerGameDoc.gameInfo['matchesPlayed'].value)
            * newPlayerGameDoc.gameInfo['headshotPct'].value).toFixed(0))

            // fallback add address if not present
            newPlayerGameDoc.address = address
            // Update last fetched time
            newPlayerGameDoc.lastFetched = Date.now()

            await gameCollection.updateOne({personaId}, {
                $set:newPlayerGameDoc
            })

            // reduce rating digits for showing purposes only
            playerGameDoc.rating = playerGameDoc.rating/100
            res.status(200).json({ succes: true, playerGameDoc, playerDoc, data: data.data.data })
            } catch(err) {
                if(err.response.status === 451) res.status(451).json({ succes: false, playerDoc, msg: "The player profile is private. Make sure your profile is public to join invictus lords rewarding system." })
                else throw new Error('Unknown error occured')
            }
        } else {
            // reduce rating digits for showing purposes only
            playerGameDoc.rating = playerGameDoc.rating/100
            res.status(200).json({ succes: true, playerGameDoc, playerDoc })
        }
    }
}