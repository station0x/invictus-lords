import { ethers } from 'ethers'

module.exports = function(signature) {
    return ethers.utils.verifyMessage("Dear Lords! I'm confirming my ownership. (Read-only transaction)", ethers.utils.splitSignature(signature))
}