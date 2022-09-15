module.exports = async ({
    getNamedAccounts,
    deployments
  }) => {
    const { deploy } = deployments;
    const { deployer, signerAddress } = await getNamedAccounts();

    console.log("Deploying contracts with the account:", deployer);
  
    const storeMinterContractAddress = await deploy('StoneMinter', {
      from: deployer,
      args: [signerAddress]
    });
  };

  module.exports.tags = ['rewards']