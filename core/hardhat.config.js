require("@nomiclabs/hardhat-waffle");
require('hardhat-deploy');
require('dotenv').config()

module.exports = {
  solidity: {
    compilers: [
      {
      version: "0.8.10",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
          }
        },
      }
    ]
  },
  networks:{
    hardhat: {},
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/C3nMlOB0Z40G5sJ18FQeERNOTzZhBz82',
      accounts: [process.env.TESTNET_PRIVKEY]
    },
    mainnet: {
      url: 'https://eth-mainnet.g.alchemy.com/v2/IJtZUWJFVrpzu1HshKSnAC_1CaLKhOIC',
      accounts: [process.env.MAINNET_PRIVKEY]
    }
  },
  namedAccounts: {
    deployer: {
      default:0
    },
    signerAddress: {
      1: '0x85cBA880c2CFbD19d3f48708Be155F7AC7B76d8E',
      5: '0x85cBA880c2CFbD19d3f48708Be155F7AC7B76d8E'
    }
  }
};
