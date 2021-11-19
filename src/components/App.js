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
      // Getting the Trips from current user
      const tripsLeft = await BondiMatContract.methods.userTickets().call((error, result) => {});
      this.setState({ tripsLeft })
      // Getting the Trip Cost from Contract
      let tripPrice = await BondiMatContract.methods.tripPrice().call((error, result) => {});
      tripPrice = web3.utils.fromWei(tripPrice )
      this.setState({ tripPrice })
      
      // Getting the Contract Balance (only Owner)    
      var balanceOfCont = await BondiMatContract.methods.balanceOfContract().call({from: this.state.account})
      console.log("balance del contrato", balanceOfCont)
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

  //Function to Buy tickets
  async buyTicket (numberOfTrips) {
    const web3 = window.web3
    this.setState({ loading: true })
    // Calculate again the cost of the trip
    let tripPrice = await this.state.BondiMatContract.methods.tripPrice().call((error, result) => {})
    // to avoid scientific notation when calculation times goes beyond 1000 Ethers, I change it to Ether and then after calculation I change it back to Wei
    tripPrice = web3.utils.fromWei( tripPrice ,'ether')
    let tripCost = tripPrice * numberOfTrips
    tripCost = web3.utils.toWei( tripCost.toString() , 'ether')
    console.log("numberofTrips and tripPrice and tripCost", numberOfTrips, tripPrice, tripCost)
    this.setState({ tripCost})
    // Execute the buyTicket Function
    await this.state.BondiMatContract.methods
      .buyTicket(numberOfTrips)
      .send({ from: this.state.account, value: tripCost })
      .on("transactionHash", (hash) => {
        this.setState({ loading: false })
        window.location.reload(false)
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
        window.location.reload(false)
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
          tripPrice={this.state.tripPrice}
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
