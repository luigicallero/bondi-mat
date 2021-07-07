# Bondi-Mat
Descentralized bus crypto payment on Polygon blockchain with benefits for bus company and users

![bondimat_mainpage](https://user-images.githubusercontent.com/58836287/124709014-63461300-ded1-11eb-9c16-4f742b011207.png)

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
export mnemonic='YOUR_12_SECRET_METAMASK'

truffle migrate --network matic --reset
```
If you face any socket issues during deployment on Mumbai testnet try with a different testnet RPC as seen in documentation:
https://docs.matic.network/docs/develop/network-details/network

## Front-End
Front-end is Reactjs based, to start it execute the following command from the project folder:

```bash
npm start
```

## TODO

- Pending Scan function for BUS driver
- Prepare tests for truffle environment
