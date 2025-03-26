import React, { useState,useEffect } from 'react';
import {FetchSymbolServices, getMarketData} from '../api/Services'
 


interface MarketData{
    dailyBar: {
      close: number,
      high: number ,
      low: number ,
      numberoftrades: number,
      openPrice: number ,
      Timestramp: string ,
      Volume: number,
      VolumeWeighted: number,
    },
    latestQuote: {
      AskPrice: number,
      AskSize: number,
      AskExchange:string,
      BidPrice: number,
      BidSize: number,
      BidExchange: string,
      Conditions:conditions[],
      TimeStamp: string,
      Tape: string,
    },
    latestTrade: {
      Conditions: conditions[],
      Trade_id: number,
      Price: number,
      Size: number,
      Timestamp: string,
      Exchange: string,
      Tape: string,
    },
    minuteBar: {
      ClosePrice: number,
      HighPrice: number,
      LowPrice: number,
      NumberOfTrades: number,
      OpenPrice: number,
      Timestamp: string,
      Volume: number,
      VolumeWeightedAveragePrice: number,
    },
    prevDailyBar: {
      ClosePrice: number,
      HighPrice: number,
      LowPrice: number,
      NumberOfTrades: number,
      OpenPrice: number,
      TimeStamp: string,
      Volume: number,
      VolumeWeightedAveragePrice: number,
    },
    symbol: string,
  }
  interface conditions{
    condition: string,
  }
const StockChart: React.FC = () => {

    const [stockData, setStockData] = useState<MarketData | null>();
    const [symbol, setSymbol] = useState<string| null >();
    const [input , setInput] = useState('');


    const  DataTest = async(ticker:string) => {
console.log("passing this symbol to marketData",ticker);
        const marketData:MarketData = await getMarketData(ticker);
       
        setStockData(marketData);
        setSymbol(marketData.symbol)
    
      console.log('fetchedSymbol', marketData);
  }
       const handleInputChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        setInput(e.target.value);
        console.log("this is input",input);
           

       }
   
      const handleSubmit = (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        


        const tickersArray = input.split(/\s*,\s*/); // Splits by comma (handles spaces too)
        const cleanedTickers = tickersArray.map(ticker => ticker.toUpperCase());
        const uniqueTickers = [...new Set(cleanedTickers)];
    console.log("tickers",symbol,"uniqueTickers",uniqueTickers)

    DataTest(input);
        

      }



    return (
        <div className="stock-chart-watchlist">
 

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

            <div className="stock-chart">
                <h2>Selected Symbol: {symbol ? symbol : 'No ticker selected'}</h2> 
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

export default StockChart;