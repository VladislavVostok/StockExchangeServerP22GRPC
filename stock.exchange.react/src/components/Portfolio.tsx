import React, { useState, useEffect } from 'react';
import { stockExchangeService } from '../services/stockExchangeService';
import { PortfolioResponse, PortfolioItem } from '../types/stock_pb';

const Portfolio: React.FC = () => {
  const [portfolio, setPortfolio] = useState<PortfolioResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [clientId, setClientId] = useState('client1');

  const loadPortfolio = async () => {
    setLoading(true);
    try {
      const response = await stockExchangeService.getPortfolio(clientId);
      setPortfolio(response);
    } catch (error) {
      console.error('Error loading portfolio:', error);
      alert('Failed to load portfolio');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPortfolio();
  }, [clientId]);

  const getPnLColor = (pnl: number) => {
    return pnl > 0 ? 'text-green-600' : pnl < 0 ? 'text-red-600' : 'text-gray-600';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center">Loading portfolio...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Portfolio</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            placeholder="Client ID"
            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
          />
          <button
            onClick={loadPortfolio}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
          >
            Refresh
          </button>
        </div>
      </div>

      {portfolio ? (
        <div className="space-y-4">
          {/* Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-blue-50 rounded-lg">
            <div className="text-center">
              <div className="text-sm text-gray-600">Total Value</div>
              <div className="text-lg font-bold">${portfolio.getTotalValue().toFixed(2)}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Cash</div>
              <div className="text-lg font-bold">${portfolio.getCashBalance().toFixed(2)}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Daily PnL</div>
              <div className={`text-lg font-bold ${getPnLColor(portfolio.getDailyPnl())}`}>
                ${portfolio.getDailyPnl().toFixed(2)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Total PnL</div>
              <div className={`text-lg font-bold ${getPnLColor(portfolio.getTotalPnl())}`}>
                ${portfolio.getTotalPnl().toFixed(2)}
              </div>
            </div>
          </div>

          {/* Holdings */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Holdings</h3>
            {portfolio.getItemsList().length > 0 ? (
              <div className="space-y-3">
                {portfolio.getItemsList().map((item: PortfolioItem, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-lg">{item.getSymbol()}</h4>
                      <div className="text-right">
                        <div className="font-bold">${item.getMarketValue().toFixed(2)}</div>
                        <div className={`text-sm ${getPnLColor(item.getUnrealizedPnl())}`}>
                          ${item.getUnrealizedPnl().toFixed(2)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      <div>
                        <span className="text-gray-600">Quantity:</span>
                        <div className="font-medium">{item.getQuantity()}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Avg Price:</span>
                        <div className="font-medium">${item.getAveragePrice().toFixed(2)}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Current Price:</span>
                        <div className="font-medium">${item.getCurrentPrice().toFixed(2)}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">PnL %:</span>
                        <div className={`font-medium ${getPnLColor(item.getUnrealizedPnl())}`}>
                          {(((item.getCurrentPrice() - item.getAveragePrice()) / item.getAveragePrice()) * 100).toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                No holdings in portfolio
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          No portfolio data available
        </div>
      )}
    </div>
  );
};

export default Portfolio;