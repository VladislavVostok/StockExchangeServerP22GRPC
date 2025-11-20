import React, { useState, useEffect, useRef } from 'react';
import { marketDataService } from '../services/marketDataService';
import { MarketDataUpdate } from '../types/stock_pb';
import { ClientReadableStream } from 'grpc-web';

const MarketData: React.FC = () => {
  const [updates, setUpdates] = useState<MarketDataUpdate[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [symbols, setSymbols] = useState(['TSLA', 'NVDA']);
  const [dataType, setDataType] = useState(0); // QUOTE
  const subscriptionRef = useRef<ClientReadableStream<MarketDataUpdate> | null>(null);

  const startStream = () => {
    if (isConnected) return;

    subscriptionRef.current = marketDataService.streamMarketData(
      (update: MarketDataUpdate) => {
        setUpdates(prev => [update, ...prev.slice(0, 49)]); // Keep last 50 updates
      },
      (error) => {
        console.error('Market data stream error:', error);
        setIsConnected(false);
      },
      () => {
        setIsConnected(false);
      }
    );

    setIsConnected(true);
  };

  const stopStream = () => {
    if (subscriptionRef.current) {
      subscriptionRef.current.cancel();
      subscriptionRef.current = null;
    }
    setIsConnected(false);
  };

  useEffect(() => {
    return () => {
      stopStream();
    };
  }, []);

  const getDataTypeText = (type: number) => {
    const typeMap: { [key: number]: string } = {
      0: 'QUOTE',
      1: 'TRADE', 
      2: 'ORDER_BOOK'
    };
    return typeMap[type] || 'UNKNOWN';
  };

  const formatUpdate = (update: MarketDataUpdate) => {
    const symbol = update.getSymbol();
    const dataType = getDataTypeText(update.getDataType());
    const timestamp = new Date(update.getTimestamp()!.getSeconds() * 1000).toLocaleTimeString();
    
    let details = '';
    switch (update.getDataCase()) {
      case MarketDataUpdate.DataCase.QUOTE:
        const quote = update.getQuote()!;
        details = `Price: $${quote.getLastPrice().toFixed(2)} | Change: ${quote.getChangePercent().toFixed(2)}%`;
        break;
      case MarketDataUpdate.DataCase.TRADE:
        const trade = update.getTrade()!;
        details = `Trade: ${trade.getQuantity()} @ $${trade.getPrice().toFixed(2)}`;
        break;
      case MarketDataUpdate.DataCase.ORDER_BOOK:
        const orderBook = update.getOrderBook()!;
        details = `Bids: ${orderBook.getBidsList().length} | Asks: ${orderBook.getAsksList().length}`;
        break;
      default:
        details = 'No data';
    }

    return { symbol, dataType, timestamp, details };
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Market Data Stream</h2>
        <div className="flex space-x-2">
          <button
            onClick={startStream}
            disabled={isConnected}
            className={`px-4 py-2 rounded ${
              isConnected 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            Connect
          </button>
          <button
            onClick={stopStream}
            disabled={!isConnected}
            className={`px-4 py-2 rounded ${
              !isConnected 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            Disconnect
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Symbols (comma separated)
          </label>
          <input
            type="text"
            value={symbols.join(',')}
            onChange={(e) => setSymbols(e.target.value.split(',').map(s => s.trim()))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data Type
          </label>
          <select
            value={dataType}
            onChange={(e) => setDataType(parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={0}>QUOTE</option>
            <option value={1}>TRADE</option>
            <option value={2}>ORDER_BOOK</option>
          </select>
        </div>

        <div className="flex items-end">
          <div className={`px-3 py-2 rounded ${
            isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            Status: {isConnected ? 'Connected' : 'Disconnected'}
          </div>
        </div>
      </div>

      <div className="border rounded-lg">
        <div className="bg-gray-50 px-4 py-2 border-b">
          <h3 className="font-semibold">Live Market Data Updates</h3>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {updates.map((update, index) => {
            const formatted = formatUpdate(update);
            return (
              <div key={index} className="border-b px-4 py-3 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium">{formatted.symbol}</span>
                  <span className="text-sm text-gray-500">{formatted.timestamp}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {formatted.dataType}
                  </span>
                  <span className="text-sm text-gray-700">{formatted.details}</span>
                </div>
              </div>
            );
          })}
          
          {updates.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              {isConnected ? 'Waiting for market data...' : 'Click "Connect" to start receiving data'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketData;