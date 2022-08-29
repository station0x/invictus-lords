"use strict";
const SteamAuth = require("node-steam-openid");

const steam = new SteamAuth({
  realm: "http://localhost:3000", // Site name displayed to users on logon
  returnUrl: "http://localhost:3000/api/auth/steam/authenticate", // Your return route
  apiKey: process.env.STEAM_API_KEY // Steam API key
});

module.exports = async (req, res) => {
  const redirectUrl = await steam.getRedirectUrl();
  res.status(200).json({redirectUrl}) 
}
