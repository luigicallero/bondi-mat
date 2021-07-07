import React, { Component } from "react";

class SecondPage extends Component{
    
    constructor(props){
        super(props);   
        this.incrementar = this.incrementar.bind(this);
        //let newTripCost = 0;
    } 
    
    incrementar(){
        let price = this.props.price;  // Trip Cost from Contract
        let tripbuy = document.getElementById('tripbuy').value;
        let totaltrip = document.getElementById('totaltrip'); // Initially 0
        const calcula = price * tripbuy; 
        totaltrip.innerHTML = calcula // Shows the result of calculation on change
    } 
    
    


    render(){
        return(            
            <div className="pagetwo" id="pagetwo">
                <div className="buytrip" id="buytrip">
                    
                    <div><h3>Buy new trips</h3></div><br/>
                    <div id="tripcost">
                        <h5>Current Price:</h5><p className="price" id='price'>{this.props.price}</p></div><br/>
                        <h5>How many trips you want:</h5>

                    <input type="number" ref={this.tripbuy} id='tripbuy' className="tripbuy" onChange={this.incrementar}/><br/>
                    <h5>Total MATIC:</h5><div id="totaltrip">0</div><br/>
                    <button type="button" className="btn" onClick>Calculate</button>
                    <div>Your Current Matic is: {this.props.balance}</div>
                </div><br/>
                <div className="basetwo" id="basetwo">
                <button
                    type="submit"
                    className="btn btn-link btn-block btn-sm"
                    onClick={(event) => {
                        event.preventDefault();
                        this.props.buyTicket(1);
                    }}
                >
                    Buy Tickets
                </button>
                <button
                    type="submit"
                    className="btn btn-link btn-block btn-sm"
                    
                    onClick={(event) => {
                        event.preventDefault();
                        let newTripCost = document.getElementById('newTripCost').value;
                        //console.log(newTripCost);
                        this.props.updateCost(newTripCost);
                    }}
                >
                    Update Trip Cost
                </button> 
                <input type="number" id="newTripCost" className="tripbuy"/><br/>
                </div>
          </div>
        )
    }
}
export default SecondPage;

// Statement "Your Current Matic is xxx" should be in blue if enough Matic or in Red if not enough
// Delete "Back" button
// "Calculate" button should be "Buy" button, only enabled when enough Matic