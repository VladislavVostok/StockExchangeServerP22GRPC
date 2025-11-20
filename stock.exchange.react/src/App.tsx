import React, { useState } from 'react';
import QuoteStream from './components/QuoteStream';
import OrderForm from './components/OrderForm';
import Portfolio from './components/Portfolio';
import OrderHistory from './components/OrderHistory';
import MarketData from './components/MarketData';
import './App.css';

type TabType = 'quotes' | 'orders' | 'portfolio' | 'history' | 'marketdata';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('quotes');

  const tabs = [
    { id: 'quotes' as TabType, label: 'Real-time Quotes' },
    { id: 'orders' as TabType, label: 'Place Order' },
    { id: 'portfolio' as TabType, label: 'Portfolio' },
    { id: 'history' as TabType, label: 'Order History' },
    { id: 'marketdata' as TabType, label: 'Market Data' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'quotes':
        return <QuoteStream />;
      case 'orders':
        return <OrderForm />;
      case 'portfolio':
        return <Portfolio />;
      case 'history':
        return <OrderHistory />;
      case 'marketdata':
        return <MarketData />;
      default:
        return <QuoteStream />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Stock Exchange</h1>
              <p className="text-sm text-gray-500">Real-time trading platform</p>
            </div>
            <div className="text-sm text-gray-500">
              gRPC Web Client
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center text-sm text-gray-500">
            Stock Exchange gRPC Web Client • Built with React & TypeScript
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;