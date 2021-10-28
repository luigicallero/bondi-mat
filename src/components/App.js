import React, { Component } from "react"
import Web3 from "web3"
import BondiMat from "../abis/BondiMat.json"
import Navbar from "./Navbar"
import Main from "./Main"
import PageMain from "./pageMain"
import SecondPage from "./secondPage"
import QRcodePage from "./qrcode"
import "./App.css"
import polygon from "../polygon-logo.png"

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3() // Loading Metamask
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load Traveler Wallet information
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    let balance = await web3.eth.getBalance(this.state.account)
    balance = web3.utils.fromWei(balance)
    this.setState({ balance: balance})

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

      /*let tripsLeft = await BondiMatContract.methods.traveler(this.state.account).call()
        .then(console.log)
      console.log(tripsLeft)
      this.setState({ tripsLeft })
      */

      // Getting the Trip Cost from Contract
      let tripCost = await BondiMatContract.methods.tripCost.call().call((error, result) => {});
      tripCost = web3.utils.fromWei(tripCost)
      this.setState({ tripCost})

      //This function is not working    
      var balanceOfCont = await BondiMatContract.methods.balanceOfCont().call({from: this.state.account})
      console.log(balanceOfCont)
      //this.setState({ balanceOfCont: balanceOfCont })
    

    //console.log(tripsLeft)
    //this.setState({ tripsLeft })


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

  //Function to Buy tickets - Metamask alert: ALERT: Transaction Error. Exception thrown in contract code.
  // Where is it specified the $$$ for metamask???
  buyTicket = (numberOfTrips) => {
    this.setState({ loading: true })
    //const web3 = window.web3
    //amount = web3.utils.toWei(amount)
    console.log(numberOfTrips)
    this.state.BondiMatContract.methods
      .buyTicket(numberOfTrips)
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        this.setState({ loading: false })
      })
  };
      
  //Function to Update the cost of tickets
  updateCost = (new_price) => {
    const web3 = window.web3
    new_price = web3.utils.toWei(new_price)
    this.state.BondiMatContract.methods
      .updateCost(new_price)
      .send({ from: this.state.account})
      .on("transactionHash", (hash) => {
        this.setState({ loading: false })
      })  
  };
  
      /*
      await BondiMatContract.methods.buyTicket(1).send({from: this.state.account}, function(error, transactionHash){
        console.log(transactionHash)
      });
      
      await BondiMatContract.methods.buyTicket(this.state.account).call()
      .then(console.log)
      */

  constructor(props) {
    super(props)
    this.state = {
      account: "0x0",
      balance: 0,
      tripsLeft: 10,
      BondiMatContractAddress: "",
      loading: true,
      image: polygon,
      tokenName: "LINK",
      price: 0.07,
    }
  }

  render() {
    console.log(this.state.tripsLeft)
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
          </div>
        </div>
        <PageMain 
          tripsLeft={this.state.tripsLeft}
          traveler={this.state.account}
        />
        <SecondPage 
          price={this.state.tripCost}
          balance={this.state.balance}
          buyTicket={this.buyTicket.bind(this)}
          updateCost={this.updateCost.bind(this)}
          //unstakeTokens={this.unstakeTokens.bind(this)}
          />
        <QRcodePage 
          qrcode={this.state.account}
          />
      </div>
    )
  }
}

export default App
