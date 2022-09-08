"use strict";
const SteamAuth = require("../../../api-utils/node-steam-openid")
const url = require('url');
const codec = require('json-url')('lzw');
const ethers = require('ethers')
const clientPromise = require('../../../api-utils/mongodb-client');


const realm = process.env.REALM_URL
const returnUrl = realm + "/api/auth/steam/authenticate"
const steam = new SteamAuth({
  realm, // Site name displayed to users on logon
  returnUrl, // Your return route
  apiKey: process.env.STEAM_API_KEY // Steam API key
});

module.exports = async (req, res) => {
  try {
    const user = await steam.authenticate(req)
    const steamHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(user))
    const client = await clientPromise;
    const db = client.db()
    const players = db.collection("players")
    const playerDocById = (await players.find({steam: user.steamid}).limit(1).toArray())[0]
    if(playerDocById) {
      const redirectURL = url.format({
        host: process.env.REALM_URL,
        pathname: '/'
      }).toString()
      res.redirect(redirectURL)
      throw new Error('Player already registered')
    }
    const steamCollection = db.collection("steamEntries")
    const steamByHash = (await steamCollection.find({steamHash}).limit(1).toArray())[0]
    if(!steamByHash) {
      await steamCollection.insertOne({
        user,
        steamHash
      })
    }
    codec.compress({
      steamHash,
      avatar: user.avatar.large,
      username: user.username
    }).then(userURL => {
      const redirectURL = url.format({
        host: process.env.REALM_URL,
        pathname: '/new-lord/' + '/0/' + userURL // 0 bool not metamask
      }).toString()
      res.redirect(redirectURL)
    })
  } catch (error) {
    console.error(error);
  }
}
