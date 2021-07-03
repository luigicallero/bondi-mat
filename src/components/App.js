import React, { Component } from "react"
import Web3 from "web3"
import BondiMat from "../abis/BondiMat.json"
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
    const BondiMatContractExists = BondiMat.networks[networkId]
    if (BondiMatContractExists) {
      const priceContract = new web3.eth.Contract(
      BondiMat.abi, 
      BondiMatContractExists.address
      )
      this.setState({ priceContractAddress: BondiMatContractExists.address })
      // this.setState({ pepe: "DALEEEEEEE",})
      this.setState({ priceContract })
      const getLatestPrice = await priceContract.methods
        //.getLatestETH(this.state.account)
        .getLatestETH()
        .call()
      this.setState({ getLatestPrice: getLatestPrice.toString() })

    } else {
      window.alert("BondiMat contract not deployed to detected network.")
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
      priceContractAddress: "",
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
          image={this.state.image}
          priceContractAddress={this.state.priceContractAddress}
          getLatestPrice={this.state.getLatestPrice}
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
