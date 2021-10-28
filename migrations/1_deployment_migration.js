const BondiMat = artifacts.require('BondiMat.sol')

module.exports = async (deployer, network, accounts) => {
    deployer.deploy(BondiMat)
}
