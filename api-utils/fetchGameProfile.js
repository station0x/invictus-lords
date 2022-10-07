"use strict";
// Import the dependency.
const clientPromise = require('./mongodb-client')
const CONSTANTS = require('../constants')
const axios = require('axios')

function getTodayUnix() {
    return Math.floor((Date.now()/CONSTANTS.economicPolicy.releaseInterval)/1000)
}

async function fetchGameProfile(address, game) {
    console.log('pong')
    if(!CONSTANTS.games[game]) return [0, new Error('{game} is not found or formatted wrongly')]
    const client = await clientPromise;
    const db = client.db()
    // fetch player profile
    const players = db.collection("players")
    const playerDocRaw = (await players.find({address}).limit(1).toArray())[0]
    if(!playerDocRaw) return [404, {success: false}] // res.status(404).json({sucess: false}) //throw new Error('Player does not exist')
    let playerDoc = {...playerDocRaw}
    // Fetch player game profile
    const gameCollection = db.collection(`${game}`)
    const persona = CONSTANTS.games[game].persona
    const personaIdKey = CONSTANTS.games[game].personaIdKey
    const personaId = playerDoc.personas[persona][personaIdKey]
    const playerGameDocRaw = (await gameCollection.find({personaId}).limit(1).toArray())[0]

    // remove sensitive-data
    delete playerDoc.personas
    delete playerDoc.steam
    if(!playerGameDocRaw) {
        let playerGameDoc = {...playerGameDocRaw}
        delete playerGameDoc.personaId
        try {
            const resp = (await axios.get(`http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=${process.env.STEAM_API_KEY}&steamid=${personaId}`, {}))
            let latestData  = Object.assign({}, ...(resp.data.playerstats.stats.map(item => ({ [item.name]: item.value }))))
            const formattedLatestData = {
                timePlayed: { value: latestData.total_time_played || 0 },
                score: { value: latestData.total_contribution_score || 0 },
                kills: { value: latestData.total_kills || 0 },
                deaths: { value: latestData.total_deaths || 0 },
                // kd: { value: formattedLatestData.kills/formattedLatestData.deaths || 0 },
                damage: { value: latestData.total_damage_done || 0 },
                headshots: { value: latestData.total_kills_headshot || 0 },
                dominations: { value: latestData.total_dominations || 0 },
                shotsFired: { value: latestData.total_shots_fired || 0 },
                shotsHit: { value: latestData.total_shots_hit || 0 },
                // shotsAccuracy: { value: (formattedLatestData.shotsHit/formattedLatestData.shotsFired) * 100 || 0 },
                snipersKilled: { value: latestData.total_kills_against_zoomed_sniper || 0 },
                dominationOverkills: { value: latestData.total_domination_overkills || 0 },
                dominationRevenges: { value: latestData.total_revenges || 0},
                bombsPlanted: { value: latestData.total_planted_bombs || 0 },
                bombsDefused: { value: latestData.total_defused_bombs || 0 },
                moneyEarned: { value: latestData.total_money_earned || 0 },
                hostagesRescued: { value: latestData.total_rescued_hostages || 0 },
                mvp: { value: latestData.total_mvps || 0 },
                matchesPlayed: { value: latestData.total_matches_played || 0 },
                wins: { value: latestData.total_matches_won || 0 },
                ties: { value: latestData.total_matches_drawn || 0 },
                // losses: { value: formattedLatestData.matchesPlayed - (formattedLatestData.wins + formattedLatestData.ties) || 0},
                roundsPlayed: { value: latestData.total_rounds_played || 0 },
                roundsWon: { value: latestData.total_wins || 0 },
                // wlPercentage: { value: (formattedLatestData.wins/formattedLatestData.matchesPlayed) * 100 || 0 },
                // headshotPct: { value: (formattedLatestData.headshots/formattedLatestData.kills) * 100 || 0 }
            }
            formattedLatestData['kd'] =              { value: formattedLatestData.kills.value/formattedLatestData.deaths.value || 0 }
            formattedLatestData['shotsAccuracy'] =   { value: (formattedLatestData.shotsHit.value/formattedLatestData.shotsFired.value) * 100 || 0 }
            formattedLatestData['losses'] =          { value: formattedLatestData.matchesPlayed.value - formattedLatestData.wins.value || 0 }
            formattedLatestData['wlPercentage'] =    { value: (formattedLatestData.wins.value/formattedLatestData.matchesPlayed.value) * 100 || 0 }
            formattedLatestData['headshotPct'] =     { value: (formattedLatestData.headshots.value/formattedLatestData.kills.value) * 100 || 0 }
            
            let gameProfile = {
                personaId,
                address,
                playerAlias: playerDoc.playerAlias,
                persona,
                rating: 0,
                lastFetched: Date.now(),
                // userInfo: data.data.data.userInfo, // data data data slooow hahaha
                gameInfoSnapshot: formattedLatestData,
                gameInfoLifetime: formattedLatestData,
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
            // daily progress
            gameProfile.dailyGameInfo = gameProfile.gameInfo

            await gameCollection.insertOne(gameProfile)
            const createdProfile = (await gameCollection.find({personaId}).limit(1).toArray())[0]
            // reduce rating digits for showing purposes only
            createdProfile.rating = createdProfile.rating/100
            // res.status(200).json({ succes: true, playerGameDoc: createdProfile, playerDoc })
            return [200, { succes: true, playerGameDoc: createdProfile, playerDoc }]
            }
            catch(err) {
                const playerInfo = (await axios.get(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${personaId}`))
                if(playerInfo.data.response.players[0].communityvisibilitystate === 1) return [451, { succes: false, playerDoc, msg: "The player profile is private. Make sure your profile is public to join invictus lords rewarding system." }]
                else if(playerInfo.data.response.players[0].communityvisibilitystate === 3) return [451, { succes: false, playerDoc, msg: "Player hasn't played CSGO." }]
                else return [0, new Error('Unknown error occured')] // new Error('Unknown error occured')
            }
    } else {
        let playerGameDoc = {...playerGameDocRaw}
        // delete playerGameDoc.personaId
        if(Date.now() > playerGameDoc.lastFetched + (CONSTANTS.api.refetchTimout * 1000)) {
        // if(Date.now() > Date.now() - 100) {
            // calculate seasons data
            let newPlayerGameDoc = {...playerGameDoc}
            try {
                const resp = (await axios.get(`http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=${process.env.STEAM_API_KEY}&steamid=${personaId}`, {}))
                let latestData  = Object.assign({}, ...(resp.data.playerstats.stats.map(item => ({ [item.name]: item.value }))))
                const formattedLatestData = {
                    timePlayed: { value: latestData.total_time_played || 0 },
                    score: { value: latestData.total_contribution_score || 0 },
                    kills: { value: latestData.total_kills || 0 },
                    deaths: { value: latestData.total_deaths || 0 },
                    // kd: { value: formattedLatestData.kills/formattedLatestData.deaths || 0 },
                    damage: { value: latestData.total_damage_done || 0 },
                    headshots: { value: latestData.total_kills_headshot || 0 },
                    dominations: { value: latestData.total_dominations || 0 },
                    shotsFired: { value: latestData.total_shots_fired || 0 },
                    shotsHit: { value: latestData.total_shots_hit || 0 },
                    // shotsAccuracy: { value: (formattedLatestData.shotsHit/formattedLatestData.shotsFired) * 100 || 0 },
                    snipersKilled: { value: latestData.total_kills_against_zoomed_sniper || 0 },
                    dominationOverkills: { value: latestData.total_domination_overkills || 0 },
                    dominationRevenges: { value: latestData.total_revenges || 0},
                    bombsPlanted: { value: latestData.total_planted_bombs || 0 },
                    bombsDefused: { value: latestData.total_defused_bombs || 0 },
                    moneyEarned: { value: latestData.total_money_earned || 0 },
                    hostagesRescued: { value: latestData.total_rescued_hostages || 0 },
                    mvp: { value: latestData.total_mvps || 0 },
                    matchesPlayed: { value: latestData.total_matches_played || 0 },
                    wins: { value: latestData.total_matches_won || 0 },
                    ties: { value: latestData.total_matches_drawn || 0 },
                    // losses: { value: formattedLatestData.matchesPlayed - (formattedLatestData.wins + formattedLatestData.ties) || 0},
                    roundsPlayed: { value: latestData.total_rounds_played || 0 },
                    roundsWon: { value: latestData.total_wins || 0 },
                    // wlPercentage: { value: (formattedLatestData.wins/formattedLatestData.matchesPlayed) * 100 || 0 },
                    // headshotPct: { value: (formattedLatestData.headshots/formattedLatestData.kills) * 100 || 0 }
                }
                formattedLatestData['kd'] =              { value: formattedLatestData.kills.value/formattedLatestData.deaths.value || 0 }
                formattedLatestData['shotsAccuracy'] =   { value: (formattedLatestData.shotsHit.value/formattedLatestData.shotsFired.value) * 100 || 0 }
                formattedLatestData['losses'] =          { value: formattedLatestData.matchesPlayed.value - formattedLatestData.wins.value || 0 }
                formattedLatestData['wlPercentage'] =    { value: (formattedLatestData.wins.value/formattedLatestData.matchesPlayed.value) * 100 || 0 }
                formattedLatestData['headshotPct'] =     { value: (formattedLatestData.headshots.value/formattedLatestData.kills.value) * 100 || 0 }

                newPlayerGameDoc.gameInfoLifetime = formattedLatestData
                for(const property in newPlayerGameDoc.gameInfoSnapshot) {
                    if(newPlayerGameDoc.gameInfo.hasOwnProperty(property)) {
                        const value = formattedLatestData[property].value - newPlayerGameDoc.gameInfoSnapshot[property].value
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

                // newPlayerGameDoc.dailyGameInfo = []

                // daily progress
                const today = getTodayUnix()
                let deep =  undefined
                if(newPlayerGameDoc.dailyGameInfo && newPlayerGameDoc.dailyGameInfo.length > 0) {
                    const lastDay = newPlayerGameDoc.dailyGameInfo.length - 1
                    const snapshotDate = newPlayerGameDoc.dailyGameInfo[lastDay]
                    if(Number.parseInt(Object.keys(snapshotDate)[0]) === Math.floor(Date.now()/60)) { // change time to today
                        const snapshot = newPlayerGameDoc.dailyGameInfo[lastDay][today].snapshot
                        for(const property in snapshot) {
                            if(snapshot.hasOwnProperty(property)) {
                                const value = newPlayerGameDoc.gameInfo[property].value - snapshot[property].value
                                newPlayerGameDoc.dailyGameInfo[lastDay][today].stats[property] = {
                                    value: value                    
                                }
                            }
                        }
                        // Calculate percentages-based stats
                        newPlayerGameDoc.dailyGameInfo[lastDay][today].stats['kd'].value = newPlayerGameDoc.dailyGameInfo[lastDay][today].stats.kills.value / newPlayerGameDoc.dailyGameInfo[lastDay][today].stats.deaths.value || 0
                        newPlayerGameDoc.dailyGameInfo[lastDay][today].stats['shotsAccuracy'].value = (newPlayerGameDoc.dailyGameInfo[lastDay][today].stats.shotsHit.value / newPlayerGameDoc.dailyGameInfo[lastDay][today].stats.shotsFired.value) * 100 || 0 
                        newPlayerGameDoc.dailyGameInfo[lastDay][today].stats['wlPercentage'].value = (newPlayerGameDoc.dailyGameInfo[lastDay][today].stats.wins.value / newPlayerGameDoc.dailyGameInfo[lastDay][today].stats.matchesPlayed.value) * 100 || 0
                        newPlayerGameDoc.dailyGameInfo[lastDay][today].stats['headshotPct'].value = (newPlayerGameDoc.dailyGameInfo[lastDay][today].stats.headshots.value / newPlayerGameDoc.dailyGameInfo[lastDay][today].stats.kills.value) * 100 || 0
                    } else {
                        // const newDay = (newPlayerGameDoc.dailyGameInfo.length)
                        newPlayerGameDoc.dailyGameInfo.push({
                            [today]: {
                                snapshot: newPlayerGameDoc.gameInfo,
                                stats: {}
                            }
                        })
                        const lastDay = (newPlayerGameDoc.dailyGameInfo.length) - 1
                        const snapshot = newPlayerGameDoc.dailyGameInfo[lastDay][today].snapshot // last day stats is todays snapshot
                        for(const property in snapshot) {
                            if(snapshot.hasOwnProperty(property)) {
                                const value = newPlayerGameDoc.gameInfo[property].value - snapshot[property].value
                                newPlayerGameDoc.dailyGameInfo[lastDay][today].stats[property] = {
                                    value: value                    
                                }
                            }
                        }
                        // Calculate percentages-based stats
                        newPlayerGameDoc.dailyGameInfo[lastDay][today].stats['kd'].value = newPlayerGameDoc.dailyGameInfo[lastDay][today].stats.kills.value / newPlayerGameDoc.dailyGameInfo[lastDay][today].stats.deaths.value || 0
                        newPlayerGameDoc.dailyGameInfo[lastDay][today].stats['shotsAccuracy'].value = (newPlayerGameDoc.dailyGameInfo[lastDay][today].stats.shotsHit.value / newPlayerGameDoc.dailyGameInfo[lastDay][today].stats.shotsFired.value) * 100 || 0 
                        newPlayerGameDoc.dailyGameInfo[lastDay][today].stats['wlPercentage'].value = (newPlayerGameDoc.dailyGameInfo[lastDay][today].stats.wins.value / newPlayerGameDoc.dailyGameInfo[lastDay][today].stats.matchesPlayed.value) * 100 || 0
                        newPlayerGameDoc.dailyGameInfo[lastDay][today].stats['headshotPct'].value = (newPlayerGameDoc.dailyGameInfo[lastDay][today].stats.headshots.value / newPlayerGameDoc.dailyGameInfo[lastDay][today].stats.kills.value) * 100 || 0
                    }
                    // deep = newPlayerGameDoc.dailyGameInfo[lastDay][today].stats
                } else {
                    // seasonal to daily conversion for first time
                    newPlayerGameDoc.dailyGameInfo = [{
                        [today]: {
                            snapshot: newPlayerGameDoc.gameInfo,
                            stats: {}
                        }
                    }]
                    const snapshot = newPlayerGameDoc.dailyGameInfo[0][today].snapshot
                    for(const property in snapshot) {
                        if(snapshot.hasOwnProperty(property)) {
                            const value = newPlayerGameDoc.gameInfo[property].value - snapshot[property].value
                            newPlayerGameDoc.dailyGameInfo[0][today].stats[property] = {
                                value: value                    
                            }
                        }
                    }
                    // Calculate percentages-based stats
                    newPlayerGameDoc.dailyGameInfo[0][today].stats['kd'].value = newPlayerGameDoc.dailyGameInfo[0][today].stats.kills.value / newPlayerGameDoc.dailyGameInfo[0][today].stats.deaths.value || 0
                    newPlayerGameDoc.dailyGameInfo[0][today].stats['shotsAccuracy'].value = (newPlayerGameDoc.dailyGameInfo[0][today].stats.shotsHit.value / newPlayerGameDoc.dailyGameInfo[0][today].stats.shotsFired.value) * 100 || 0 
                    newPlayerGameDoc.dailyGameInfo[0][today].stats['wlPercentage'].value = (newPlayerGameDoc.dailyGameInfo[0][today].stats.wins.value / newPlayerGameDoc.dailyGameInfo[0][today].stats.matchesPlayed.value) * 100 || 0
                    newPlayerGameDoc.dailyGameInfo[0][today].stats['headshotPct'].value = (newPlayerGameDoc.dailyGameInfo[0][today].stats.headshots.value / newPlayerGameDoc.dailyGameInfo[0][today].stats.kills.value) * 100 || 0
                }
                // console.log(deep, newPlayerGameDoc.dailyGameInfo[newPlayerGameDoc.dailyGameInfo.length - 1][today].stats)
                if(deep) {
                    newPlayerGameDoc.dailyGameInfo[newPlayerGameDoc.dailyGameInfo.length - 1][today].stats = deep
                }
                // console.log('latest',newPlayerGameDoc.dailyGameInfo[newPlayerGameDoc.dailyGameInfo.length - 1][today].stats)

                // Calculate ratings (seasonal and daily)
                const todaysProgress = newPlayerGameDoc.dailyGameInfo[newPlayerGameDoc.dailyGameInfo.length - 1][today].stats
                newPlayerGameDoc.rating = 
                Number.parseInt((todaysProgress['score'].value 
                * (todaysProgress['wlPercentage'].value * todaysProgress['matchesPlayed'].value)
                * todaysProgress['headshotPct'].value).toFixed(0))
                newPlayerGameDoc.seasonalRating = 
                Number.parseInt((newPlayerGameDoc.gameInfo['score'].value 
                * (newPlayerGameDoc.gameInfo['wlPercentage'].value * newPlayerGameDoc.gameInfo['matchesPlayed'].value)
                * newPlayerGameDoc.gameInfo['headshotPct'].value).toFixed(0))
                newPlayerGameDoc.rating = ((newPlayerGameDoc.seasonalRating * .25) + newPlayerGameDoc.rating / (newPlayerGameDoc.seasonalRating + newPlayerGameDoc.rating)).toFixed(0)

                // fallback add address if not present
                newPlayerGameDoc.address = address
                // Update last fetched time
                newPlayerGameDoc.lastFetched = Date.now()

                await gameCollection.updateOne({personaId}, {
                    $set:newPlayerGameDoc
                })

                // console.log(playerGameDoc, newPlayerGameDoc)

                // reduce rating digits for showing purposes only
                newPlayerGameDoc.rating > 0 ? playerGameDoc.rating/100 : 0
                // res.status(200).json({ succes: true, playerGameDoc: newPlayerGameDoc, playerDoc })
                return [200, { sucess: true, playerGameDoc: newPlayerGameDoc, playerDoc }]
            } catch(err) {
                console.log(err)
                const playerInfo = (await axios.get(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${personaId}`))
                if(playerInfo.data.response.players[0].communityvisibilitystate === 1) return [451, {succes: false, playerDoc, msg: "The player profile is private. Make sure your profile is public to join invictus lords rewarding system."}]
                else if(playerInfo.data.response.players[0].communityvisibilitystate === 3) return [453, { succes: false, playerDoc, msg: "Player hasn't played CSGO." }]
                else return [0, new Error('Unknown error occured')]
            }
        } else {
            // reduce rating digits for showing purposes only
            playerGameDoc.rating > 0 ? playerGameDoc.rating/100 : 0
            // res.status(200).json({ succes: true, playerGameDoc, playerDoc })
            return [200, { sucess: true, playerGameDoc, playerDoc }]
        }
    }
}

module.exports = {
    fetchGameProfile,
    getTodayUnix
}