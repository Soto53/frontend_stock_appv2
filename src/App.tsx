import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import necessary routing components
import Stockwidget from './components/widget/stockwidget';
import LandingPage from './pages/landing_page';
import NavBar from './components/common/navigation/NavBar';


import Home from './pages/home';
import News from './pages/news';
import Login from './components/common/auth/login';
import Stocks from './pages/stocks';
import Crypto from './pages/crypto';

import { AlpacaProvider } from './providers/AlpachaProvider';
import './styles/styles.css';
import './styles/widget.css';
import Widget from './components/widget/widget';

const App: React.FC = () => {
 
  return (
    <AlpacaProvider>

    <Router>
      <NavBar /> {/* This will render the navigation bar across all pages */}
    
    <div >
<Widget/>
  </div>
      <Routes> 
      
      <Route path="/" element={<LandingPage/>} /> 
        <Route path="/home" element={<Home />} /> 
        <Route path="/news" element={<News />} />
        <Route path="/login" element={<Login />} />
        <Route path="/crypto" element={<Crypto />} />
        <Route path="/stocks" element={<Stocks />} />  
      </Routes>
    </Router>
</AlpacaProvider>

  );
};

export default App;

