const { assert } = require('chai');

const BondiMat = artifacts.require('BondiMat')

var should = require('chai').should() 

// Converting tokens from Ether to Wei (or similar metrics for this Token)
function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}


contract('Bondi-MAT deployed', (accounts) => {
  let BondiMatContract

  before(async () => {
    // Contracts Deployed
    BondiMatContract = await BondiMat.new()
    console.log("Contract Address: ", BondiMatContract.address)
  })

  describe('Contracts deployment', async () => {
    it('Bondi-MAT initial Price is 100 WEI of MATIC', async () => {
      const tripPrice = await BondiMatContract.tripPrice()
      assert.equal( tripPrice , 100 )
    })
  })

  describe('Buying a Ticket', async () => {
    let result
    
    before(async () => {
      // Sending 100 WEI to buy 10 tickets
      result = await BondiMatContract.buyTicket(10, {from: accounts[1], value: '1000'})
    })

    it('User1 purchased 10 trips. Balance in contract is now 1000 WEI of MATIC', async () => {
      //const numberOfTrips = '10'
      //const totalCost = await BondiMatContract.buyTicket.call(numberOfTrips)
      //console.log(totalCost)
      //assert.equal( totalCost.toString() , 1000 )
      const bondimatBalance = await BondiMatContract.balanceOfContract.call()
      assert.equal( bondimatBalance.toString(), 1000)
      //console.log(bondimatBalance)
      //await BondiMatContract.approve(BondiMatContract.address, totalCost, { from: accounts[1] });
    })

    it('User1 finds 10 tickets in his balance', async () => {
      const userTickets = await BondiMatContract.userTickets.call({from: accounts[1]})
      //console.log("Amount of tickets for user1: ", userTickets)
      assert.equal( userTickets, 10)
    })
  })

})