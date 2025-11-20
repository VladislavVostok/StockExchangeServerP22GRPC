import React, { useState, useEffect, useRef } from 'react';
import { StockQuote } from '../types/stock_pb';
import { stockExchangeService } from '../services/stockExchangeService';
import { ClientReadableStream } from 'grpc-web';

interface QuoteData {
  symbol: string;
  lastPrice: number;
  bidPrice: number;
  askPrice: number;
  change: number;
  changePercent: number;
  volume: number;
  timestamp: Date;
}

const QuoteStream: React.FC = () => {
  const [quotes, setQuotes] = useState<Map<string, QuoteData>>(new Map());
  const [isSubscribed, setIsSubscribed] = useState(false);
  const subscriptionRef = useRef<ClientReadableStream<StockQuote> | null>(null);

  const symbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'NVDA'];

  const startSubscription = () => {
    if (isSubscribed) return;

    subscriptionRef.current = stockExchangeService.subscribeQuotes(
      symbols,
      (quote: StockQuote) => {
        const quoteData: QuoteData = {
          symbol: quote.getSymbol(),
          lastPrice: quote.getLastPrice(),
          bidPrice: quote.getBidPrice(),
          askPrice: quote.getAskPrice(),
          change: quote.getChange(),
          changePercent: quote.getChangePercent(),
          volume: quote.getVolume(),
          timestamp: new Date(quote.getTimestamp()!.getSeconds() * 1000)
        };

        setQuotes(prev => new Map(prev.set(quoteData.symbol, quoteData)));
      },
      (error) => {
        console.error('Quote subscription error:', error);
        setIsSubscribed(false);
      },
      2000
    );


  };

  const stopSubscription = () => {
    if (subscriptionRef.current) {
      subscriptionRef.current.cancel();
      subscriptionRef.current = null;
    }
    setIsSubscribed(false);
  };

  useEffect(() => {
    return () => {
      stopSubscription();
    };
  }, []);

  const getChangeColor = (change: number) => {
    return change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600';
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Real-time Quotes</h2>
        <div className="flex space-x-2">
          <button
            onClick={startSubscription}
            disabled={isSubscribed}
            className={`px-4 py-2 rounded ${
              isSubscribed 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            Start Stream
          </button>
          <button
            onClick={stopSubscription}
            disabled={!isSubscribed}
            className={`px-4 py-2 rounded ${
              !isSubscribed 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            Stop Stream
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from(quotes.values()).map((quote) => (
          <div key={quote.symbol} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">{quote.symbol}</h3>
              <span className={`text-sm font-bold ${getChangeColor(quote.change)}`}>
                {quote.changePercent > 0 ? '+' : ''}{quote.changePercent.toFixed(2)}%
              </span>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-600">Last:</span>
                <span className="font-semibold">{formatPrice(quote.lastPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bid:</span>
                <span>{formatPrice(quote.bidPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ask:</span>
                <span>{formatPrice(quote.askPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Volume:</span>
                <span>{quote.volume.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="mt-2 text-xs text-gray-500">
              Updated: {quote.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>

      {quotes.size === 0 && (
        <div className="text-center text-gray-500 py-8">
          {isSubscribed ? 'Waiting for quotes...' : 'Click "Start Stream" to begin'}
        </div>
      )}
    </div>
  );
};

export default QuoteStream;