import React from 'react';
import NavLinks from '../NavLinks';
import '../styles/NavBar.css';
import { useState } from "react";

const logo = "logo192.png";

const DesktopNavigation = () => {

 const [click, setclick] = useState(true);

  return (
    <nav className="DesktopNavigation">
     <img 
          src={logo} 
          alt="Logo" 
          className="HamburgerMenu" 
          onClick={() => setclick(!click)} // Toggle the menu on logo click
        />
    

      {click && <NavLinks />}
    </nav>
  );
};

export default DesktopNavigation;

