import axios from 'axios';
import { MarketData } from '../types/types'
import { ChartData } from '../types/types';


export const FetchSymbolServices = async (): Promise<string> => {
  const response: any = await axios.get('http://localhost:3000/api/symbol/AAPL');

  // Just returning the symbol from the response
  const getSymbol = response.data.symbol;

  console.log('Fetched Symbol:', getSymbol);

  return (getSymbol);
};

export const getMarketData = async (ticker: string): Promise<MarketData> => {
  console.log("getMarketData pinged");
  console.log("this it the ticker you are looking for ", ticker);

  const response: any = await axios.get(`http://localhost:3000/api/mapped/${ticker}/snapshot`);

  const marketData = response.data;
  console.log("MarketData.response", response.data)

  return marketData;

}

export const getMarketNews = async (ticker: string) => {
  const response: any = await axios.get('');

  const marketNews = response.data;

  return marketNews;

}


//send websocket data
export const sendSocketData = async(lastJsonMessage:ChartData)=>{


  axios.post('');


}



