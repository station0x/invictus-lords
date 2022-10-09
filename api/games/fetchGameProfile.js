"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');
const CONSTANTS = require('../../constants')
const axios = require('axios')
const { fetchGameProfile } = require('../../api-utils/fetchGameProfile')

function getTodayUnix() {
    return ((Date.now()/CONSTANTS.economicPolicy.releaseInterval)/1000).toFixed()
}

module.exports = async (req, res) => {
    const address = req.query.address
    const game = req.query.game
    let fetchedGameProfile = (await fetchGameProfile(address, game))
    if(!fetchedGameProfile) throw new Error('Server error!')
    else if(fetchedGameProfile[0] === 0) return fetchedGameProfile[1]
    else return res.status(fetchedGameProfile[0]).json(fetchedGameProfile[1])
}


                // newPlayerGameDoc.dailyGameInfo = []

                // daily progress
                // let deep =  undefined
                // const lastDay = newPlayerGameDoc.dailyGameInfo.length - 1
                // const snapshotDate = newPlayerGameDoc.dailyGameInfo[lastDay]
                // console.log('========)')
                // console.log(Number.parseInt(Object.keys(snapshotDate)[0]) === getTodayUnix())
                // if(Number.parseInt(Object.keys(snapshotDate)[0]) === getTodayUnix()) { // change time to today
                //     const snapshot = newPlayerGameDoc.dailyGameInfo[lastDay][today].snapshot
                //     console.log(snapshot)
                //     for(const property in snapshot) {
                //         if(snapshot.hasOwnProperty(property)) {
                //             // console.log(newPlayerGameDoc.gameInfoLifetime[property].value, snapshot[property].value)
                //             console.log('value: ', newPlayerGameDoc.gameInfoLifetime[property].value - snapshot[property].value, 'latest: ', newPlayerGameDoc.gameInfoLifetime[property].value, 'snap: ', snapshot[property].value)
                //             const value = newPlayerGameDoc.gameInfoLifetime[property].value - snapshot[property].value
                //             console.log(value)
                //             newPlayerGameDoc.dailyGameInfo[lastDay][today].stats[property] = {
                //                 value: value                   
                //             }
                //         }
                //     }
                //     // Calculate percentages-based stats
                //     newPlayerGameDoc.dailyGameInfo[lastDay][today].stats['kd'].value = newPlayerGameDoc.dailyGameInfo[lastDay][today].stats.kills.value / newPlayerGameDoc.dailyGameInfo[lastDay][today].stats.deaths.value || 0
                //     newPlayerGameDoc.dailyGameInfo[lastDay][today].stats['shotsAccuracy'].value = (newPlayerGameDoc.dailyGameInfo[lastDay][today].stats.shotsHit.value / newPlayerGameDoc.dailyGameInfo[lastDay][today].stats.shotsFired.value) * 100 || 0 
                //     newPlayerGameDoc.dailyGameInfo[lastDay][today].stats['wlPercentage'].value = (newPlayerGameDoc.dailyGameInfo[lastDay][today].stats.wins.value / newPlayerGameDoc.dailyGameInfo[lastDay][today].stats.matchesPlayed.value) * 100 || 0
                //     newPlayerGameDoc.dailyGameInfo[lastDay][today].stats['headshotPct'].value = (newPlayerGameDoc.dailyGameInfo[lastDay][today].stats.headshots.value / newPlayerGameDoc.dailyGameInfo[lastDay][today].stats.kills.value) * 100 || 0
                // } else {
                //     // const newDay = (newPlayerGameDoc.dailyGameInfo.length)
                //     console.log('here')
                //     console.log(today)
                //     let newPlayerGameDocDailyInfo = {...newPlayerGameDoc.dailyGameInfo}
                //     newPlayerGameDocDailyInfo.push({
                //         [today]: {
                //             snapshot: newPlayerGameDoc.gameInfoSnapshot,
                //             stats: newPlayerGameDoc.gameInfo
                //         }
                //     })
                //     newPlayerGameDoc.dailyGameInfo = newPlayerGameDocDailyInfo
                //     console.log(newPlayerGameDoc.dailyGameInfo)
                //     const createdDayEle = newPlayerGameDoc.dailyGameInfo.length - 1
                //     const snapshot = newPlayerGameDoc.dailyGameInfo[createdDayEle][today].snapshot
                //     console.log(snapshot)
                //     for(const property in snapshot) {
                //         if(snapshot.hasOwnProperty(property)) {
                //             // console.log(newPlayerGameDoc.gameInfoLifetime[property].value, snapshot[property].value)
                //             console.log('value: ', newPlayerGameDoc.gameInfoLifetime[property].value - snapshot[property].value, 'latest: ', newPlayerGameDoc.gameInfoLifetime[property].value, 'snap: ', snapshot[property].value)
                //             const value = newPlayerGameDoc.gameInfoLifetime[property].value - snapshot[property].value
                //             console.log(value)
                //             newPlayerGameDoc.dailyGameInfo[lastDay][today].stats[property] = {
                //                 value: value                   
                //             }
                //         }
                //     }
                //     // Calculate percentages-based stats
                //     newPlayerGameDoc.dailyGameInfo[createdDayEle][today].stats['kd'].value = newPlayerGameDoc.dailyGameInfo[createdDayEle][today].stats.kills.value / newPlayerGameDoc.dailyGameInfo[createdDayEle][today].stats.deaths.value || 0
                //     newPlayerGameDoc.dailyGameInfo[createdDayEle][today].stats['shotsAccuracy'].value = (newPlayerGameDoc.dailyGameInfo[createdDayEle][today].stats.shotsHit.value / newPlayerGameDoc.dailyGameInfo[createdDayEle][today].stats.shotsFired.value) * 100 || 0 
                //     newPlayerGameDoc.dailyGameInfo[createdDayEle][today].stats['wlPercentage'].value = (newPlayerGameDoc.dailyGameInfo[createdDayEle][today].stats.wins.value / newPlayerGameDoc.dailyGameInfo[createdDayEle][today].stats.matchesPlayed.value) * 100 || 0
                //     newPlayerGameDoc.dailyGameInfo[createdDayEle][today].stats['headshotPct'].value = (newPlayerGameDoc.dailyGameInfo[createdDayEle][today].stats.headshots.value / newPlayerGameDoc.dailyGameInfo[createdDayEle][today].stats.kills.value) * 100 || 0
                // }
                // deep = newPlayerGameDoc.dailyGameInfo[lastDay][today].stats
                // if(deep) {
                //     console.log('deep', deep)
                //     console.log('shallow', newPlayerGameDoc.dailyGameInfo)
                //     newPlayerGameDoc.dailyGameInfo[newPlayerGameDoc.dailyGameInfo.length - 1][today].stats = deep
                // }
                // console.log('latest',newPlayerGameDoc.dailyGameInfo[newPlayerGameDoc.dailyGameInfo.length - 1][today].stats)
