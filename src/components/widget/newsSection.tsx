import React, { useState } from 'react';
import { getMarketNews } from '../api/Services'
import { MarketData } from '../types/types'

const NewsSection: React.FC = () => {



  const [stockData, setStockData] = useState<MarketData | null>();
  const [symbol, setSymbol] = useState<string | null>();
  const [input, setInput] = useState('');

  const DataTest = async (ticker: string) => {
    console.log("passing this symbol to marketData", ticker);
    const marketData: MarketData = await getMarketNews(ticker);

    setStockData(marketData);
    setSymbol(marketData.symbol)

    console.log('fetchedSymbol', marketData);
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    console.log("this is input", input);


  }

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();



    const tickersArray = input.split(/\s*,\s*/); // Splits by comma (handles spaces too)
    const cleanedTickers = tickersArray.map(ticker => ticker.toUpperCase());
    const uniqueTickers = [...new Set(cleanedTickers)];
    console.log("tickers", symbol, "uniqueTickers", uniqueTickers)

    DataTest(input);


  }



  return (
    <div className="stock-chart-watchlist">
      <div className="watchlist">
        {/* <button onClick={() => DataTest()}>Get market data</button> */}
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Enter Ticker(s):
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Enter tickers (e.g., BTC, ETH)"
            />
          </label>
          <button type="submit">Submit</button>
        </form>

        <div>
          <h3>Tickers Array:</h3>
          <pre>{JSON.stringify(input, null, 2)}</pre>
        </div>
      </div>

      <div className="news-section">
        <h2>Selected Symbol: {symbol ? symbol : 'No symbol selected'}</h2>
        {stockData ? (
          <div>
            <p>Stock Info: {JSON.stringify(stockData, null, 2)}</p>

          </div>
        ) : (
          <p>Loading stock data...</p>
        )}


      </div>

    </div>
  );


};

export default NewsSection;