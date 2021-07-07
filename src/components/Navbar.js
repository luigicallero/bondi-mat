import React, { Component } from "react";


class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a className="logo" href="" target="">Bondi-Mat</a>
        <a class="menubar" href="">Home</a>
        <a class="menubar" href="#pagetwo">Buy Trip</a>        
      </nav>
    );
  }
}

export default Navbar;