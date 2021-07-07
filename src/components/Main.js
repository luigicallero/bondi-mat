import React, { Component } from "react";

class Main extends Component {
  //window.alert(this.props.priceContractAddress)
  render() {
    return (
      <div id="content" className="mt-3">
        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col">Your Current Matic: {this.props.balance}</th>
              <th scope="col">BondiMat Contract Address: {this.props.BondiMatContractAddress}</th>
              <th scope="col">Trip Cost: {this.props.tripCost}</th>
            </tr>
          </thead>
        </table>  
      </div>
    );
  }
}

export default Main;
