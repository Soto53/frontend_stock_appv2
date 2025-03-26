import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";  // Importing useQuery from react-query
import { useAlpaca } from "../providers/AlpachaProvider"; // Assuming useAlpaca is your custom hook
import '../styles/stocks.css';
import { ChartData } from '../types/types';



const Stocks: React.FC = () => {

  console.log("stocks refresh");

  // Track whether the query has already been triggered
  const [hasInitialized, setHasInitialized] = useState(false);
  const [input, setInput] = useState('');

  const { lastJsonMessage, readyState, isAuthed, tickers, setTickers } = useAlpaca();

  // This useEffect hook is not inside any conditional logic
  useEffect(() => {
    if (!hasInitialized) {
      setTickers([]); // Set tickers array to empty on initial load
      setHasInitialized(true);
      console.log("useEffect triggered, ticker is", tickers);
    }
  }, [hasInitialized, setTickers]);

  // Use the useQuery hook to fetch data only once
  const { data, error, isLoading } = useQuery(
    "alpachaQuery",  // Unique key for the query
    () => {
      console.log("useQuery triggered with this msg", lastJsonMessage);
      return lastJsonMessage;
    },
    {
      enabled: !hasInitialized,  // Prevent the query from running more than once
      refetchOnWindowFocus: false, // Prevent refetching when window refocuses
      staleTime: Infinity, // Keep the data fresh indefinitely
    }
  );

  
  const [lineArray, setLineArray] = useState<any[]>([]); 
  const [valuemin,setValuemin] = useState<number>(50000); 
  const[valuemax, setValuemax] = useState<number>(90000);

  // This will structure the data for the chart (convert your data to the format expected by recharts)
  const formatDataForChart = (lastJsonMessage: ChartData[]) => {
    
    const newData = lastJsonMessage.map((item) => ({
      name: item.t,   // Use the timestamp `t` as the name (X-axis label)
      uv: item.c,     // Use the closing price as `uv` (for the line chart)
      pv: item.v,     // Use the volume as `pv` (for the volume line)
    }));
    console.log("formatDataforChart",newData)
  
    return newData
     }; 


     useEffect(() => {
      if (lastJsonMessage && lastJsonMessage.length > 0) {
        const firstItem = lastJsonMessage[0];
        const openValue = firstItem.o;
  
        const MaxValue = Math.floor(openValue + 1000);
        const MinValue = Math.floor(openValue - 1000);
  
        setValuemax(MaxValue);
        setValuemin(MinValue);
  
        console.log(`Updated max value: ${MaxValue}, min value: ${MinValue}`);
      }
    }, [lastJsonMessage]); 



//recalculate range of graph chart 
useEffect(() => {
  console.log('lineArray:', lineArray); // Check if lineArray is updating
}, [lineArray]);
 
useEffect(() => {
  if (lastJsonMessage && lastJsonMessage.length > 0) {
    const formattedData = formatDataForChart(lastJsonMessage);
    setLineArray(prevArray => [...prevArray, ...formattedData]); // Append new data
  }
}, [lastJsonMessage]); 

  


  // Move hooks above the return statement so they're not inside any conditionals
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleButtonClick = () => {
    // Split the input by spaces or commas (you can customize the split logic)
    const tickersArray = input.split(/\s*,\s*/); // Splits by comma (handles spaces too)
    const cleanedTickers = tickersArray.map(ticker => ticker.toUpperCase()); 
    const uniqueTickers = [...new Set(cleanedTickers)];
    console.log("tickers", tickers, "setTickers", setTickers, "uniqueTickers", uniqueTickers);
    setTickers(uniqueTickers);
  };

  // Render JSX as before
  return (
<div className="min-h-screen flex flex-col items-center justify-center bg-gray p-6">
  <div className="text-black bg-gray-500 p-6 m-6 w-full max-w-3xl rounded-lg shadow-lg">
    <h2>Stocks</h2>
    <p>Stock Info: {JSON.stringify(lastJsonMessage, null, 2)}</p>
    <p>Status: {readyState === 1 ? "Ready" : "Not ready"}</p>
    <p>Authentication: {isAuthed ? "Authenticated" : "Not authenticated"}</p>

    <div>
      <label>
        Enter Ticker(s):
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter tickers (e.g., BTC, ETH)"
          className="border px-2 py-1 rounded"
        />
      </label>
      <button onClick={handleButtonClick} className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
        Submit
      </button>

      <div>
        <h3>Tickers Array:</h3>
        <pre>{JSON.stringify(tickers, null, 2)}</pre>
    </div>
    </div>

    {/* Render LineChart only if lineArray has data */}
    {lineArray && lineArray.length > 0 && (
      <div className="mt-6 p-4 bg-gray rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineArray} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis type="number" domain={[86000, 88000]} allowDataOverflow />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )}
  </div>
</div>
  )
};

export default Stocks;
