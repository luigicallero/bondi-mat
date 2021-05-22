pragma solidity ^0.6.7;

import "https://github.com/smartcontractkit/chainlink/blob/master/evm-contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    string _coinToExchange;
    
    AggregatorV3Interface internal priceFeedETHUSD;
    AggregatorV3Interface internal priceFeedBNBUSD;
    AggregatorV3Interface internal priceFeedUSDETH;
    
    /**
     * Project based on Etherium Blockchain using Chainlink Latest Price Feed
     * Network: Kovan
     * Aggregator: ETH/USD - BNB/USD
     * Why there is no USD/ETH or USD/BNB???
    */
    
    constructor() public {
        priceFeedETHUSD = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
        priceFeedBNBUSD = AggregatorV3Interface(0x8993ED705cdf5e84D0a3B754b5Ee0e1783fcdF16);
    }

    /**
     * Returns the latest price
     */
    function ETHPrice() public view returns (int) {
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeedETHUSD.latestRoundData();
         return price;
    }
    
        function BNBPrice() public view returns (int) {
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeedBNBUSD.latestRoundData();
         return price;
    }
}
