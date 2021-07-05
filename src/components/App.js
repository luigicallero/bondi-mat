import React, { Component } from "react"
import Web3 from "web3"
import BondiMat from "../abis/BondiMat.json"
import Navbar from "./Navbar"
import Main from "./Main"
import "./App.css"
import chainlink from "../chainlink.png"

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3() // Loading Metamask
    //window.alert("Aquí estamos a punto de llamar a Metamask")
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId() 

    // Load BondiMat Contract information
    const BondiMatContractExists = BondiMat.networks[networkId]
    if (BondiMatContractExists) {
      const BondiMatContract = new web3.eth.Contract(
      BondiMat.abi, 
      BondiMatContractExists.address
      )
      this.setState({ BondiMatContractAddress: BondiMatContractExists.address })
      this.setState({ BondiMatContract })
//*** This function is not working    
      /*let balanceOfCont = await BondiMatContract.methods
        .balanceOfCont()
        .call()
      this.setState({ balanceOfCont: balanceOfCont.toString() })
    */
    } else {
      window.alert("BondiMat contract not deployed to detected network. Please check that Metamask is in the correct Network: Polygon (MATIC)")
    }
  //window.alert("Si llegamos aquí loading debería ser false")
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
      BondiMatContractAddress: "",
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
          BondiMatContractAddress={this.state.BondiMatContractAddress}
          balanceOfCont={this.state.balanceOfCont}
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
