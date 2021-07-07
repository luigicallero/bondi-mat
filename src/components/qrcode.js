import React, { Component } from "react";
import QRCode from "react-qr-code";

class QRBondi extends Component{
    render(){
        return(
            <div>
                <QRCode id='code'
                value='0x6eB821E91Dc10D4dEc9b4b89B3e60d6d247A3259' />
            </div>
        )
    }
}


export default QRBondi