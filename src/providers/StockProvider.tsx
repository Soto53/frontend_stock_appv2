import React, { createContext, useContext ,useState} from 'react';
import { useSubscription } from '../hooks/useSubscription';

interface AlpacaContextValue {
  lastJsonMessage: any;
  readyState: number;
  isAuthed: boolean;
  tickers: string[];
  setTickers: React.Dispatch<React.SetStateAction<string[]>>
}



// Make a React context
const AlpacaContext = createContext<AlpacaContextValue | null>(null);

// Accept tickers as a prop to your provider
export function StockProvider({
  children,
  
}: {
  children: React.ReactNode;
 
}) {
  const [tickers, setTickers] = useState<string[]>([]);
  const { lastJsonMessage, readyState, isAuthed } = useSubscription(tickers);

  return (
    <AlpacaContext.Provider
      value={{
        lastJsonMessage,
        readyState,
        isAuthed,
        tickers,
        setTickers,
      }}
    >
      {children}
    </AlpacaContext.Provider>
  );
}

// Export a custom hook so child components can consume the context
export function useStock() {
  const context = useContext(AlpacaContext);
  if (!context) {
    throw new Error('useAlpaca must be used within an AlpacaProvider');
  }
  return context;
}