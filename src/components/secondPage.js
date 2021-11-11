import React, { Component } from "react";

class SecondPage extends Component{
    
    constructor(props){
        super(props);   
        // this.incrementar = this.incrementar.bind(this);
        this.state = { tripbuy: 1 };
        this.handleChange = this.handleChange.bind(this);
    } 
    
/*     incrementar(){
        let price = this.props.price; 
        let tripbuy = document.getElementById('tripbuy').value;
        let totaltrip = document.getElementById('totaltrip'); // Initially 0
        const calcula = price * tripbuy; 
        totaltrip.innerHTML = calcula // Shows the result of calculation on change
    }  */

    handleChange(event) {    
        let priceNow = this.props.tripPrice; 
        this.setState({tripbuy: event.target.value});
        let tripbuyNow = document.getElementById('tripbuy').value;
        let totaltrip = document.getElementById('totaltrip');
        const calcula = priceNow * tripbuyNow;
        totaltrip.innerHTML = calcula
    }

    render(){
        return(            
            <div className="pagetwo" id="pagetwo">
                <div className="buytrip" id="buytrip">
                    
                    <div><h3>Buy new trips</h3></div><br/>
                    <div id="tripcost">
                        <h5>Current Price in MATIC:</h5>
                        <p className="price" id='price'>{this.props.tripPrice}</p>
                    </div>
                    <h5>How many trips you want?:</h5>
                        {/* <input type="number" value={this.state.tripbuy} ref={this.tripbuy} id='tripbuy' className="tripbuy" onChange={this.incrementar}/><br/><br/> */}
                        <input type="number" value={this.state.tripbuy} id='tripbuy' className="tripbuy" onChange={this.handleChange}/><br/><br/>
                    <h5>Total Cost in MATIC:</h5>
                    <div>
                        <p className="price" id='totaltrip'>{this.props.tripPrice * this.state.tripbuy }</p>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-link btn-block btn-sm"
                        onClick={(event) => {
                            event.preventDefault();
                            let numberOfTrips = this.state.tripbuy;
                            console.log(numberOfTrips);
                            this.props.buyTicket(numberOfTrips);
                        }}
                        > Buy Tickets
                    </button>
                    <div>Your Current Matic is: {this.props.balance}</div>
                </div><br/>
                <div className="basetwo" id="basetwo">

                <button
                    type="submit"
                    className="btn btn-link btn-block btn-sm"  
                    onClick={(event) => {
                        event.preventDefault();
                        let newTripCost = document.getElementById('newTripCost').value;
                        this.props.updateCost(newTripCost);
                    }}
                    > Update Trip Cost in MATIC
                </button> 
                <input type="number" id="newTripCost" className="tripbuy"/><br/>
                </div>
          </div>
        )
    }
}
export default SecondPage;