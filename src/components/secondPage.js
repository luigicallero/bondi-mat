import React, { Component } from "react";

class SecondPage extends Component{
    render(){
        let price = this.props.price;
        let tripbuy = parseInt(document.getElementById('tripbuy'));
        let totaltrip = document.getElementById('totaltrip');
        let result = parseFloat(price) * parseInt(tripbuy);
        
        console.log(tripbuy)
         
        return(            
            <div className="pagetwo" id="pagetwo">
                <div className="buytrip" id="buytrip">
                    
                    <div><h3>Buy new trips</h3></div><br/>
                    <div id="tripcost">
                        <h5>Current Price:</h5><p className="price" id='price'>{this.props.price}</p></div><br/>
                        <h5>How many trips you want:</h5>
                    <input type="text" id="tripbuy" className="tripbuy"/><br/>
                    <h5>Total:</h5><div id="totaltrip">0</div><br/>
                    <button type="button" className="btn" onClick>Calculate</button>
                    <div>Your Current Matic is: {this.props.balance}</div>
                </div><br/>
                <div className="basetwo" id="basetwo">                
                     <button  className="btn" ><a href="#container" target="">Back</a></button>
                </div>
          </div>
        )
    }
}
export default SecondPage;

// Statement "Your Current Matic is xxx" should be in blue if enough Matic or in Red if not enough
// Delete "Back" button
// "Calculate" button should be "Buy" button, only enabled when enough Matic