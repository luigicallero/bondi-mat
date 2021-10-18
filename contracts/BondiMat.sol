// SPDX-License-Identifier: UNLICENSED
//pragma solidity ^0.8.4;
pragma solidity ^0.6.6;

// https://docs.openzeppelin.com/contracts/2.x/
// import working only if you add the contract with nmp: 'npm install @openzeppelin/contracts'
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// traveler should only see his own trips left
    
contract BondiMat{
    address codeQR;
    address internal owner;
    uint256 public tripPrice;
    uint internal immutable deployDate; // Immutable variables are evaluated/assigned once at construction time and their value is copied to all the places in the code where they are accessed
    
    // Model a Traveler - Read/Write Travelers from DappUniversity at: https://www.dappuniversity.com/articles/solidity
    struct Traveler{
        // *** buyDate seems no longer important is it??
        uint buyDate; // to be used with traveler wallet address to generate QR code
        uint tripsLeft; // measuring the amount of days left
    }

    mapping(address => Traveler) public traveler;

    constructor() public{
        owner = msg.sender;
        deployDate = block.timestamp;
        tripPrice = 1000000000000000; // Initially 0.001 ETHER - ether is equivalent to MATIC in this contract code - 1 MATIC is approx 1USD at July 2021
        // start = block.timestamp + duration;
    }
    
    // send Ether to smart contract from Julian video: https://www.youtube.com/watch?v=4k_ak3SFczc
    /*function buyTicket(uint _numberOfTrips) external payable{
        totalCost = _numberOfTrips * tripPrice;
        // *** totalCost could be presented to customer or a preview before accepting (probably already done by Metamask)
        require(msg.value >= totalCost, "Not enough MATIC for this payment");
        _numberOfTrips = traveler[msg.sender].tripsLeft + _numberOfTrips;
        traveler[msg.sender] = Traveler(block.timestamp,_numberOfTrips);
    }
    */
    // copying from "book" function from Flight Contract https://github.com/smallbatch-apps/fairline-contract/blob/master/contracts/Flight.sol
    function buyTicket(uint _numberOfTrips) public payable{
        require(msg.value > 0, "Ticket Price is greater than zero");
        require(msg.value == _numberOfTrips * tripPrice, "Not enough MATIC for this payment");
        require(_numberOfTrips > 0, "Number of trips cannot be zero");
        _numberOfTrips = traveler[msg.sender].tripsLeft + _numberOfTrips;
        traveler[msg.sender] = Traveler(block.timestamp,_numberOfTrips);
    }

    function getTotalCost(uint _numberOfTrips) external view returns(uint256){
        uint256 test = _numberOfTrips * tripPrice;
        return test;
    }
    
    function getValue () public payable returns(uint256){
        return msg.value;
    }

    // *** Temporary trips Decrease function
    function usedTicket() external{
        traveler[msg.sender].tripsLeft -= 1;
    }
    
    function updateCost(uint256 _tripPrice) external onlyOwner{
        tripPrice = _tripPrice;
    }

    // This provides 1 Trip Cost
    function gettripPrice() external view returns(uint256) {
        return tripPrice;
    }
    
    // This provides Contract balance
    function balanceOfCont() external view onlyOwner returns(uint){
        return address(this).balance;
    }
    

    // Good info about it in https://www.dappuniversity.com/articles/solidity-tutorial#3
    modifier onlyOwner(){
        require(msg.sender == owner, "I am afraid only Contract Owner can perform this type of tasks");
        _;
    }


// ToDos
    //*** function to show current MATIC available or it could be shown when buying ... uint balance; // to show the user what the amount of MATIC he has to purchase  
    //*** function to update the cost of trips (onlyOwner or delegated)
    
// Flight Contract https://github.com/smallbatch-apps/fairline-contract/blob/master/contracts/Flight.sol
 //modifier hasTicket(){
    //require(_ownerSeats[msg.sender].length > 0, "Passenger must have active QR for this trip");
    //_;
    //}

  //modifier hasTicket(){
    //require(_contractOwner = owner)
    //_;
    //}

}

//Notes:
    // https://ethereum.stackexchange.com/questions/729/how-to-concatenate-strings-in-solidity
    //function append(string a, string b) internal pure returns (string) {
       // return string(abi.encodePacked(a, b));
    //}
