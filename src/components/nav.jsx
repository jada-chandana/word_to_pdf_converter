import React from "react";
import "./nav.css"; 
import logo from "../assets/AspireLogo.png"
function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="navbar-content">
          <img src={logo}/>
          <h1 className="head">Aspire Tekhub Solutions</h1>
          <h1 className="logo">
            Word<span className="highlight">To</span>PDF
          </h1>
        </div>
      </div>
    </>
  );
}

export default Navbar;

