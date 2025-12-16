import React from "react";
import "./nav.css"; 
import logo from "../assets/AspireLogo.png"
function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="navbar-content">
          <img src={logo}/>
          <h1 className="head">Word To PDF</h1>
          <h1 className="logo">
           Aspire Tekhub Solutions
          </h1>
        </div>
      </div>
    </>
  );
}

export default Navbar;

