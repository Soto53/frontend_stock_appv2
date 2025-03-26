

export interface AlpacaWebSocketMsg {
    T: string;
    msg: string;
  }

  export interface MarketData{
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

  export interface ChartData {
    S: string;   // Symbol
    T: string;   // Timestamp
    c: number;   // Close price
    h: number;   // High price
    l: number;   // Low price
    o: number;   // Open price
    t: string;   // Time (ISO format)
    v: number;   // Volume
    vw: number;  // VWAP (Volume Weighted Average Price)
  }