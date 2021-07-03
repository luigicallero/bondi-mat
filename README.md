# Bondi-Mat
Descentralized bus crypto payment on Polygon blockchain with benefits for bus company and users

## Comments

## Requirements

- NPM

## Installation

1. Install truffle

```bash
npm install truffle -g
```

2. Setup repo

```bash
mkdir BondiMat
cd BondiMat/
```

3. Copy from Repossitory

```bash
git clone https://github.com/luigicallero/bondi-mat
```

4. Install dependencies by running:

```bash
sudo npm install
```

## Deploy

For deploying to the Polygon test network (Mumbai), Truffle will use `truffle-hdwallet-provider` for your mnemonic and an RPC URL. Set your environment variables `$RPC_URL` and `$MNEMONIC` before running and make sure you have enough MATICs in your wallet (0.3 Matics should be fine; Matic Faucet: https://faucet.matic.network):

```bash
export rpc_url='https://kovan.infura.io/v3/YOUR_PROJECT_ID'
export mnemonic='YOUR_12_SECRET_METAMASK'

truffle migrate --network kovan --reset
```
## Troubleshooting
If you face any socket issues during deployment on Mumbai testnet try with a different testnet RPC as seen in documentation:
https://docs.matic.network/docs/develop/network-details/network


## TODO

- Pending Scan function for BUS driver
- Prepare tests for truffle environment