import React, { Component } from "react";
import bitcoinCoin from "../bitcoin.png";
import dollarCoin from "../Dolar-coin.png";
import bull from "../wallstreet.jpg";
import dai from "../dai.png";
import chainlink from "../chainlink.png";
import dappImage from "../dapp.png";

class Main extends Component {
  render() {
    return (
      <div id="content" className="mt-3">
        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col">Addresss of Price Contract is: {this.props.priceContractAddress}</th>
              <th scope="col">Reward Balance</th>
            </tr>
          </thead>
        </table>  
      </div>
    );
  }
}

export default Main;
