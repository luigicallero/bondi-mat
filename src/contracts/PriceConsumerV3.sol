// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceETH;
    AggregatorV3Interface internal priceMATIC;
    AggregatorV3Interface internal priceDAI;

    /**
     * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331

     * Network: Matic Mumbai Testnet
     * Oracle: 0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9
     * Job ID: da20aae0e4c843f6949e5cb3f7cfe8c4
     * LINK address: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
     * Fee: 0.01 LINK
     * CHAINLINK Price Feeds:
     * DAI / USD    8   0x0FCAa9c899EC5A91eBc3D5Dd869De833b06fB046
     * ETH / USD   8   0x0715A7794a1dc8e42615F059dD6e406A6594651A
     * MATIC / USD 8   0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada
     * 
     */


//    constructor(address _priceFeed) public {
    constructor() public {
//        priceFeed = AggregatorV3Interface(_priceFeed);
        priceETH = AggregatorV3Interface(0x0715A7794a1dc8e42615F059dD6e406A6594651A);
        priceMATIC = AggregatorV3Interface(0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada);
        priceDAI = AggregatorV3Interface(0x0FCAa9c899EC5A91eBc3D5Dd869De833b06fB046);
    }

    /**
     * Returns the latest price
     */
    function getLatestETH() public view returns (int) {
        (
            /* uint80 roundID */,
            int priceETHLatest,
            /* uint startedAt */,
            /* uint timeStamp */,
            /* uint80 answeredInRound */
        ) = priceETH.latestRoundData();
        return priceETHLatest;
    }
    function getLatestMATIC() public view returns (int) {
        (
            /* uint80 roundID */,
            int priceMATICLatest,
            /* uint startedAt */,
            /* uint timeStamp */,
            /* uint80 answeredInRound */
        ) = priceMATIC.latestRoundData();
        return priceMATICLatest;
    }
    function getLatestDAI() public view returns (int) {
        (
            /* uint80 roundID */,
            int priceDAILatest,
            /* uint startedAt */,
            /* uint timeStamp */,
            /* uint80 answeredInRound */
        ) = priceDAI.latestRoundData();
        return priceDAILatest;
    }
}
