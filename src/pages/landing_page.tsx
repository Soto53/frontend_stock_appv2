
import React from 'react';
import '../styles/landing_page.css';
import '../styles/styles.css';
 

import Footer from '../components/common/footer';
import CryptoCard from '../components/widget/crypto_card';

const LandingPage: React.FC = () => {

  return (

    <div className="landing-page">

      <header className="hero-section">
        <div className="hero-content">
          <h1>Your Ultimate Stock Information Hub</h1>
          <p>Stay ahead with real-time stock news, insights, and community discussions.</p>
          <a href="/login" className="cta-btn">Get Started</a>
        </div>
        <div className="hero-image">
        </div>
      </header>

      <section id="features" className="features-section">
        <h2>Features</h2>
        <div className="feature-cards">

          <CryptoCard/>
          <div className="feature-card">
            <h3>Company News</h3>
            <p>Latest news and updates from top companies.</p>
          </div>
          <div className="feature-card">
            <h3>Historical Data</h3>
            <p>Access to historical stock and crypto data.</p>
          </div>
          <div className="feature-card">
            <h3>Congress Tracker</h3>
            <p>Track congressional activities impacting the market.</p>
          </div>
          <div className="feature-card">
            <h3>Buy/Sell/Hold Meter</h3>
            <p>Insights on when to buy, sell, or hold your investments.</p>
          </div>
          <div className="feature-card">
            <h3>Community Forum</h3>
            <p>Engage with a community of investors and traders.</p>
          </div>
        </div>
      </section>
      <Footer/>

    </div>
  );
};

export default LandingPage;
