"use strict";
const SteamAuth = require("node-steam-openid");
const url = require('url');
const codec = require('json-url')('lzw');

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
    codec.compress(user).then(userURL => {
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
