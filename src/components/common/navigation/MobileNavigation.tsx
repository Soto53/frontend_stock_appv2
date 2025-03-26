import React from 'react';
import NavLinks from './NavLinks';
import '../styles/NavBar.css';
import { MdOutlineMenu } from 'react-icons/md'; // Import the hamburger menu icon
import { useState } from "react";

const logo = "logo192.png";


const MobileNavigation: React.FC = () => {

    const [click, setclick] = useState(false);



  return (
    <nav className="MobileNavigation">
     
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

export default MobileNavigation;