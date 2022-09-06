"use strict";
const SteamAuth = require("node-steam-openid");

const realm = process.env.REALM_URL
const returnUrl = realm + "/api/auth/steam/authenticate"
const steam = new SteamAuth({
  realm, // Site name displayed to users on logon
  returnUrl, // Your return route
  apiKey: process.env.STEAM_API_KEY // Steam API key
});


module.exports = async (req, res) => {
  const redirectUrl = await steam.getRedirectUrl();
  res.status(200).json({redirectUrl}) 
}
