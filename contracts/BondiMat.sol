// SPDX-License-Identifier: UNLICENSED
//pragma solidity ^0.8.4;
pragma solidity ^0.6.6;

// https://docs.openzeppelin.com/contracts/2.x/
// import working only if you add the contract with nmp: 'npm install @openzeppelin/contracts'
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// traveler should only see his own trips left
    
contract BondiMat{
    address codeQR;
    address payable public owner;
    uint256 public tripPrice;
    uint internal immutable deployDate; // Immutable variables are evaluated/assigned once at construction time and their value is copied to all the places in the code where they are accessed
    
    // Model a Traveler - Read/Write Travelers from DappUniversity at: https://www.dappuniversity.com/articles/solidity
    struct Traveler{
        // *** buyDate seems no longer important is it??
        uint buyDate; // to be used with traveler wallet address to generate QR code
        uint tripsLeft; // measuring the amount of days left
    }

    mapping(address => Traveler) public traveler;

    event TripsPurchased(
        address account,
        uint256 numberOfTrips
    );

    constructor() public{
        owner = msg.sender;
        deployDate = block.timestamp;
        tripPrice = 1 ether; // Initially 1 ETHER - ether is equivalent to MATIC in this contract code - 1 MATIC is approx 1USD at July 2021
        // start = block.timestamp + duration;
    }
    
    // send Ether to smart contract from Julian video: https://www.youtube.com/watch?v=4k_ak3SFczc
    // how to use States with enum form Escrow contract from Blockgeeks: https://www.youtube.com/watch?v=6Mry6oAQVXU 
    // add events from Hotelbooking from Greg dappuniversity: https://www.youtube.com/watch?v=oB1SahPR0MQ
    // copying from "book" function from Flight Contract https://github.com/smallbatch-apps/fairline-contract/blob/master/contracts/Flight.sol

    // Safer to do a transferFrom to avoid a hacker to modify transfer from Frontend
    function buyTicket(uint _numberOfTrips ) external payable {
        require(msg.value > 0, "You are trying to pay with Zero MATIC");
        uint256 totalCost = _numberOfTrips * tripPrice;
        require(msg.value >= totalCost, "Not enough MATIC for this payment");
        require(_numberOfTrips > 0, "Number of trips cannot be zero");
        _numberOfTrips = traveler[msg.sender].tripsLeft + _numberOfTrips;
        traveler[msg.sender] = Traveler(block.timestamp,_numberOfTrips);
        emit TripsPurchased(msg.sender, _numberOfTrips );
    
    }

    function getTotalCost(uint _numberOfTrips) external view returns(uint256){
        uint256 test = _numberOfTrips * tripPrice;
        return test;
    }
    
    function userTickets() external view returns(uint){
        return traveler[msg.sender].tripsLeft;
    }

    // *** Temporary trips Decrease function
    function usedTicket() external{
        require(traveler[msg.sender].tripsLeft > 0, "You already have 0 tickets");
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
    function balanceOfContract() external view onlyOwner returns(uint){
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
    //*** add states and events
    
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
