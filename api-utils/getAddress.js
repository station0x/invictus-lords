import { ethers } from 'ethers'

module.exports = function(signature) {
    return ethers.utils.verifyMessage("Welcome to my house! Enter freely. Go safely, and leave something of the happiness you bring", ethers.utils.splitSignature(signature))
}