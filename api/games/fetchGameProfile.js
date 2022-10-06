"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');
const CONSTANTS = require('../../constants')
const axios = require('axios')
const { fetchGameProfile } = require('../../api-utils/fetchGameProfile')

function getTodayUnix() {
    return Math.floor((Date.now()/CONSTANTS.economicPolicy.releaseInterval)/1000)
}

module.exports = async (req, res) => {
    const address = req.query.address
    const game = req.query.game
    let fetchedGameProfile = (await fetchGameProfile(address, game))
    if(!fetchedGameProfile) throw new Error('Server error!')
    else if(fetchedGameProfile[0] === 0) return fetchedGameProfile[1]
    else return res.status(fetchedGameProfile[0]).json(fetchedGameProfile[1])
}