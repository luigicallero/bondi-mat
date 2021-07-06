// SPDX-License-Identifier: UNLICENSED
//pragma solidity ^0.8.4;
pragma solidity ^0.6.6;

// https://docs.openzeppelin.com/contracts/2.x/
// import working only if you add the contract with nmp: 'npm install @openzeppelin/contracts'
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// traveler should only see his own trips left
    
contract BondiMat{
    uint public totalCost;
    address codeQR;
    address internal owner;
    uint256 tripCost;
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
        tripCost = 1 ether; // ether is simil to MATIC - 1 MATIC is approx 1USD at July 2021
        // start = block.timestamp + duration;
        // revisar acá como ponerle el msg.sender y que lo tome como una address payable
        // contractOwner = msg.sender;
    }
    
    // send Ether to smart contract from Julian video: https://www.youtube.com/watch?v=4k_ak3SFczc
    function buyTicket(uint _numberOfTrips) external payable{
        totalCost = _numberOfTrips * tripCost;
        // *** totalCost could be presented to customer or a preview before accepting (probably already done by Metamask)
        require(msg.value >= totalCost, "Not enough MATIC for this payment");
        _numberOfTrips = traveler[msg.sender].tripsLeft + _numberOfTrips;
        traveler[msg.sender] = Traveler(block.timestamp,_numberOfTrips);
    }
    
    // *** Temporary trips Decrease function
    function usedTicket() external{
        traveler[msg.sender].tripsLeft -= 1;
    }
    
    /** This provides traveler's QR code (wallet address)
    function showQR() external view returns(address) {
        return msg.sender;
    }
    */
    
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
