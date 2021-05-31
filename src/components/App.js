import React, { Component } from "react"
import Web3 from "web3"
import DappToken from "../abis/DappToken.json"
import TokenFarm from "../abis/TokenFarm.json"
import PriceConsumerV3 from "../abis/PriceConsumerV3.json"
import ERC20 from "../abis/ERC20.json"
import Navbar from "./Navbar"
import Main from "./Main"
import "./App.css"
import chainlink from "../chainlink.png"

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()

    // Load ETH/USD Price
    const PriceContract = PriceConsumerV3.networks[networkId]
    if (PriceContract) {
      window.alert("PriceConsumerV3 contract Successfully deployed to detected network.")
      const priceEth = new web3.eth.Contract(PriceConsumerV3.abi, PriceContract.address)
      const priceContractAddress = await priceEth.address
      this.setState({ priceContractAddress: priceContractAddress })
      //const priceLatestEth = await priceEth.methods.getLatestPrice()
      //this.setState({ priceLatestEth: priceLatestEth.toString() })
    } else {
      window.alert("PriceConsumerV3 contract not deployed to detected network.")
    }

  
    this.setState({ loading: false })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      )
    }
  }


  constructor(props) {
    super(props)
    this.state = {
      account: "0x0",
      erc20: {},
      dappToken: {},
      dappTokenAddress: "",
      tokenFarm: {},
      erc20Balance: "0",
      dappTokenBalance: "0",
      stakingBalance: "0",
      loading: true,
      image: chainlink,
      tokenName: "LINK",
    }
  }

  render() {
    let content
    if (this.state.loading) {
      content = (
        <p id="loader" className="text-center">
          Loading...
        </p>
      )
    } else {
      content = (
        <Main
          tokenName={this.state.tokenName}
          image={this.state.image}
        />
      )
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main
              role="main"
              className="col-lg-12 ml-auto mr-auto"
              style={{ maxWidth: "600px" }}
            >
              <div className="content mr-auto ml-auto">
                <a
                  href="https://alphachain.io"
                  target="_blank"
                  rel="noopener noreferrer"
                ></a>

                {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    )
  }
}

export default App
