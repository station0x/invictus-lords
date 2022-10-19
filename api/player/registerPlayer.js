"use strict";
// Import the dependency.
const clientPromise = require('../../api-utils/mongodb-client');
const getAddress = require('../../api-utils/getAddress');
const codec = require('json-url')('lzw');

function validate(address) {
    if(!address) throw new Error('Player address not provided')
    return true
}

module.exports = async (req, res) => {
    const address = getAddress(req.query.signature)
    const providerType = req.query.providerType.toLowerCase()
    const providerIdHash = req.query.hash
    const isAirdropCandidate = req.query.airdropCandidate
    console.log(providerIdHash)
    let playerAlias = req.query.playerAlias
    console.log(playerAlias, isAirdropCandidate)
    const useSteamName = req.query.useSteamName
    if(!providerIdHash) throw new Error('Hash is missing')
    if(!validate(address)) {
        res.json({success:false, error:"invalid"})
        return true
    }
    const client = await clientPromise;
    const db = client.db()
    const players = db.collection("players")
    const steam = db.collection("steamEntries")
    const playerDocByAddress = (await players.find({address}).limit(1).toArray())[0]
    if(playerDocByAddress) {
        res.status(500).json({ msg: 'Player address alreay registered! Connect another wallet address or Login with Metamask' })
        return true
    }

    const steamData = (await steam.find({steamHash: providerIdHash}).limit(1).toArray())[0]
    if(!steamData) throw new Error('No steam linked')
    const providerId = steamData.user.steamid
    const playerDocById = (await players.find({[`${providerType}`]:`${providerId}`}).limit(1).toArray())[0]
    if(playerDocById) {
        res.status(500).json({ msg: 'This steam account is already register, Login instead.' })
        return true
    }
    if(!playerAlias)  {
        playerAlias = steamData.user.username
    } else if(useSteamName === 'true') {
        playerAlias = steamData.user.username
    }
    
    //player document doesn't exist, let's create one
    await players.insertOne({
        address,
        [`${providerType}`] : `${providerId}`,
        playerAlias,
        avatar: req.query.avatar,
        personas: { 
            [`${providerType}`]: steamData.user
        },
        gamesList: ['csgo'],
        lastUpdated: Date.now(),
        createdAt: Date.now(),
        rewards: 0
    })
    if(isAirdropCandidate) {
        const airDropList = db.collection("airdropList")
        let projectName = isAirdropCandidate
        const projectDocument = (await airDropList.find({projectName}).limit(1).toArray())[0]
        if(projectDocument) {
            let newProjectDoc = {...projectDocument}
            let membersSet = new Set(newProjectDoc.members)
            membersSet.add(address)
            projectDocument.members = [...membersSet]
            await airDropList.updateOne({projectName}, {
                $set: newProjectDoc
            })
        } else {
            let newProjectDoc = {
                projectName: isAirdropCandidate,
                members: [address]
            }
            await airDropList.insertOne(newProjectDoc)
        }
    }
    res.status(200).json({ success: true });
}