import React, { Component } from "react";
import bitcoinCoin from "../bitcoin.png";
import dollarCoin from "../Dolar-coin.png";
import bull from "../wallstreet.jpg";
import dai from "../dai.png";
import chainlink from "../chainlink.png";



class Main extends Component {
  render() {
    return (
      <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">  
      <title>Bondi-Mat</title>
      <link rel="stylesheet" href="style.css">  
      <script src="main.js"> </script>
      <script src="qrcode.min.js"></script>  
      <script type="text/javascript" src="jquery.min.js"></script>
      <script type="text/javascript" src="qrcode.js"></script>
      
      <body>
        <header href="#" class="logo">
        <a href="#" class="logo"><span class="">Bondi</span>-Mat</a>
        </header>
        <nav class="navbar">
            <a class="menubar" href="">Home</a>
            <a class="menubar" onclick="getTrip()">Get Trip</a>
            <a class="menubar" href="">Scan</a>
        </nav>
        <div class="container" id="container">

        <div class="option" id="option">
          <h3 class="logo">Code</h3>
          <img src="qr logo.png" onclick="ocultar()"></img>
        </div>

    <div class="option" id="option">
      <h3 class="logo">Bus</h3>
      <img src="bus.png" onclick="ocultar()"></img>
    </div>

    <div class="option" id="option">
      <h3 class="logo">Train</h3>
      <img src="train.png" onclick="ocultar()"></img>
    </div><br>
    <div class="option" id="option">
      <h3 class="logo">Subway</h3>
      <img src="subway.png" onclick="ocultar()"></img>
    </div>

    <div class="option" id="option1">
      <h3 class="logo">Bus</h3>
      <img src="bus.png" onclick="ocultar()"></img>
    </div>

    <div class="option" id="option2">
      <h3 class="logo">Train</h3>
      <img src="train.png" onclick="ocultar()"></img>
    </div>
    <div class="option" id="option">
      <h3 class="logo">Subway</h3>
      <img src="subway.png" onclick="ocultar()"></img>
    </div>
    <div class="option" id="option">
      <h3 class="logo">Subway</h3>
      <img src="subway.png" onclick="ocultar()"></img>
    </div>
    
    <div class="container2" id="container2">
      <div class="option">
        <h4>Enter the code</h4><br>
      <input type="text" id="qr-data" ></input><br>
      <button type="button" class="getcode" onclick="generateQR()">Get you QR Code</button><br><br>
      <div id="qrcode">
      </div>
    <script src="qrcode.min.js"></script>
    <script>
      let qrdata = document.getElementById('qr-data')
      let qrcode = new QRCode(document.getElementById('qrcode'))
    </script>

      <div class="trip-class" id="trip-class">
        <div class="trip-box">
          <h3>Get you trip</h3>      
          <img src="road.png" class="img-road"> </img>      
          <p class="p-road">Enjoy all the benefits that we have for you due convenant with top companies, with great discounts for pay before hand with our app. Enter in a new experience of managing your money, enter to the Bondi-Mat World </p>
          <br><br>      
          <button class="getcode" onclick="oneMonth()">One Month</button><br><br><button class="getcode" onclick="oneDay()">One Day</button></br></br>
          </br></br>
        </div>
      </div>
      <div class="chooseB">
      <div id="chooseB">
        <h3>Welcome to a new experience</h3><br>
        <img src="felicidad.jpg" class="happy"></img>
        <p class="happyD" id="oneMonth">Thanks for Choosing the One Month Trip, please enter the code and get the QR Code to the <strong>Greatest benefits</strong> for use our app!!</p>
        <p class="happyD" id="oneDay">Thanks for Choosing the One Day Trip, please enter the code and get the QR Code,<strong>Thanks for use our app!!</strong></p>
        <br><button type="button" class="getcode" onclick="generateQR()">Get Code</button></br>
      </br></div></div>
    </br></br></br></br>
    </div>
    </div>
    </br></div></body>
    );
  }
}

export default Main;

      function generateQR(){
          data = qrdata.value
          qrcode.makeCode(data)
      }

function ocultar(){
  document.getElementById('container').style.display= "none";
  document.getElementById('container2').style.display= "block";
  document.getElementById('back').style.display= "block";

  
}
function mostrar(){
  document.getElementById('container').style.display= "flex";
  document.getElementById('back').style.display= "none";
  document.getElementById('container2').style.display= "none";
}
function getTrip(){
  document.getElementById('trip-class').style.display= "flex";  
  document.getElementById('container').style.display= "none";
  document.getElementById('oneMonth').style.display= "none"
  document.getElementById('oneDay').style.display = "none" 
  document.getElementById('chooseB').style.display = "none"
}
function oneDay(){
  document.getElementById('trip-class').style.display= "none";  
  document.getElementById('chooseB').style.display = "block"
  document.getElementById('oneMonth').style.display= "none"
  document.getElementById('oneDay').style.display = "block"  
}
function oneMonth(){
  document.getElementById('trip-class').style.display= "none";  
  document.getElementById('chooseB').style.display = "block"
  document.getElementById('oneMonth').style.display= "block"
  document.getElementById('oneDay').style.display = "none"  
}


