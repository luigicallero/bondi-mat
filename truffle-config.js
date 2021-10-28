require('babel-register')
require('babel-polyfill')
const HDWalletProvider = require('@truffle/hdwallet-provider')

require('dotenv').config()
const mnemonic = process.env.MNEMONIC
const rpc_url = process.env.MUMBAI_MORALIS_RPC_URL

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    live: {
      provider: () => {
        return new HDWalletProvider(process.env.MNEMONIC, process.env.KOVAN_RPC_URL)
      },
      network_id: '*',
      // ~~Necessary due to https://github.com/trufflesuite/truffle/issues/1971~~
      // Necessary due to https://github.com/trufflesuite/truffle/issues/3008
      skipDryRun: true,
    },
    kovan: {
      provider: () => {
        return new HDWalletProvider(mnemonic, url)
      },
      network_id: '42',
      skipDryRun: true
    },
    matic: {
      //Mumbai RPC addresses
      //provider: () => new HDWalletProvider(mnemonic, rpc_url),
      //provider: () => new HDWalletProvider(mnemonic, `https://rpc-mumbai.matic.today`),
      provider: () => new HDWalletProvider(mnemonic, `https://matic-mumbai.chainstacklabs.com`),
      //provider: () => new HDWalletProvider(mnemonic, `https://rpc-mumbai.maticvigil.com`), //Worked on 2021-10-06 17:40hs
      //provider: () => new HDWalletProvider(mnemonic, `https://matic-testnet-archive-rpc.bwarelabs.com`),
      network_id: 80001, // to be used with Public Polygon Mumbai rpc
      //network_id: '*', // to be used with Infura Polygon Mumbai rpc
      confirmations: 2,
      timeoutBlocks: 200,
      gas: 6000000,
      gasPrice: 10000000000,
      skipDryRun: true,
      networkCheckTimeout: 100000,
    },
    rinkeby: {
      provider: () => {
        return new HDWalletProvider(process.env.MNEMONIC, process.env.RINKEBY_RPC_URL)
      },
      network_id: '4',
      skipDryRun: true,
    },
  },
  //contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: "petersburg",
      version: "0.6.6"
    }
  }
}
