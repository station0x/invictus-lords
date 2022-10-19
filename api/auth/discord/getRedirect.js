
const axios = require('axios')
const url = require("url")

module.exports = async (req, res) => {
  // console.log(req.query)
  const { code } = req.query
  if(code) {
    try {
      const formData = new url.URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code.toString(),
        redirect_uri: "http://localhost:3000/api/auth/discord/getRedirect"
      })
      const response = await axios.post("https://discord.com/api/v8/oauth2/token",
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })

      const data = response.data
      res.status(200).json({res: data})
    } catch(err) {
      console.log(err)
      res.status(500)
      return true
    }
  } else {
    console.log(res.data)
    res.status(200).json({success: true }) 
  }
  res.status(500)
}
