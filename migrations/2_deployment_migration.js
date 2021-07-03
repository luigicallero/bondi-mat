const BondiMat = artifacts.require('BondiMat.sol')

module.exports = async (deployer, network, [defaultAccount]) => {
    deployer.deploy(BondiMat)
}
