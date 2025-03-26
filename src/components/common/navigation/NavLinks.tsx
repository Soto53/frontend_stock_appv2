 //NavLinks.js

 import '../styles/NavBar.css';
 import {Outlet,Link} from 'react-router-dom'
 import { NavLink } from 'react-router-dom';
 

 const NavLinks = () =>{
     return(
         <nav className="Hamburger-menu">
                  
                    <ul>
                    <li><Link to="/">Landing Page</Link></li>  
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/news">Chat</Link></li> 
                    <li><Link to="/stocks">Stocks</Link></li>
                    <li><Link to="/login">Login</Link></li>    
                    <li><Link to="/crypto">crypto</Link></li>     
                    </ul>
         
                <Outlet/>
     </nav>
     )
 }

 export default NavLinks;
