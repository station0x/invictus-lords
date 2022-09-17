module.exports = async ({
    getNamedAccounts,
    deployments
  }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    console.log("Deploying contracts with the account:", deployer);
  
    await deploy('VictusCronusPotion', {
      from: deployer,
      args: ['Victus Cronus Potion', 'VON']
    });
  };

  module.exports.tags = ['rewards']

  // add minter as minter in erc20 token
  // add erc20 token address to minter
  // update dailyLimit in minter