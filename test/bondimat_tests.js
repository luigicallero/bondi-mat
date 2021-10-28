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

    it('10 trips purchased by User1 is 1000 WEI of MATIC', async () => {
      //const numberOfTrips = '10'
      //const totalCost = await BondiMatContract.buyTicket.call(numberOfTrips)
      //console.log(totalCost)
      //assert.equal( totalCost.toString() , 1000 )
      const bondimatBalance = await BondiMatContract.balanceOfContract.call()
      assert.equal( bondimatBalance.toString(), 1000)
      //console.log(bondimatBalance)
      //await BondiMatContract.approve(BondiMatContract.address, totalCost, { from: accounts[1] });
    })
  })

})