"use strict";
const SteamAuth = require("node-steam-openid");
const url = require('url');
const codec = require('json-url')('lzw');

const realm = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://invictuslords.com"
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
        protocol: process.env.NODE_ENV === "development" ? 'http' : 'https',
        host: process.env.URL,
        pathname: '/register-player/' + userURL
      }).toString()
      res.redirect(redirectURL)
    })
  } catch (error) {
    console.error(error);
  }
}
