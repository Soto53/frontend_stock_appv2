import { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

interface AlpacaWebSocketMsg {
  T: string;
  msg: string;
}
interface lastmessage{
  array : stuff[];
}
interface stuff{
  elements : string;
}
export function useSubscription(tickers: string[]) {
  const url = 'wss://stream.data.alpaca.markets/v2/iex';

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(url, {
    share: false,
    shouldReconnect: () => true,
  });

  const [sentAuth, setSentAuth] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  // For controlling repeated subscriptions:
  const [previousTickers, setPreviousTickers] = useState<string[]>([]);

  // 1) Auth once
  useEffect(() => {
    if (readyState === ReadyState.OPEN && !sentAuth) {
      sendJsonMessage({
        action: 'auth',
        key: 'PKMQH30TFV7J4VZ7XD2J',
        secret: 'AtoRkjIvkgnmcOZQRe8B7WZGKZdjFgbHF3Ov4gz9',
      });
      setSentAuth(true);
      console.log('Sent Auth to Alpaca');
    }
  }, [readyState, sentAuth, sendJsonMessage]);

  // 2) Check for "connected" or "authenticated"
  useEffect(() => {
    if (Array.isArray(lastJsonMessage)) {
      const messages = lastJsonMessage as AlpacaWebSocketMsg[];
      messages.forEach((m) => {
        if (!isAuthed && m.T === 'success' && m.msg === 'connected') {
          setIsAuthed(true);
          console.log('Alpaca says connected (authenticated).');
        }
        if (m.T === 'error') {
          console.error('Alpaca Error:', m.msg);
        }
      });
    }
  }, [lastJsonMessage, isAuthed]);

  // 3) Subscribe whenever new tickers appear AND we're authenticated
  useEffect(() => {
    // Only subscribe if connected & authed, and if ticker list actually changed
    if (readyState === ReadyState.OPEN && isAuthed && tickers.length > 0) {
      // Prevent resubscription if the tickers are the same
      const changed = tickers.length !== previousTickers.length || tickers.some((ticker, index) => ticker !== previousTickers[index]);
     
      if (changed) {
        
        const messages = lastJsonMessage as AlpacaWebSocketMsg[];
       console.log('Subscribing to tickers:', tickers,messages);

        sendJsonMessage({
          action: 'subscribe',
          trades: tickers,
        });
        setPreviousTickers(tickers);
      }
    }   
  }, [readyState, isAuthed, tickers, previousTickers, sendJsonMessage]);

  const messages = lastJsonMessage as AlpacaWebSocketMsg[];
  console.log("last msg ", messages );

  return {
    lastJsonMessage,
    readyState,
    isAuthed,
  };
}
