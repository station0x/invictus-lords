module.exports = async ({
    getNamedAccounts,
    deployments
  }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    console.log("Deploying contracts with the account:", deployer);
  
    await deploy('GuardedERC20', {
      from: deployer,
      args: ['Dark Blood Stone', 'DBST']
    });
  };

  module.exports.tags = ['rewards']

  // add minter as minter in erc20 token
  // add erc20 token address to minter
  // update dailyLimit in minter