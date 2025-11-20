import React, { useState, useEffect } from 'react';
import { stockExchangeService } from '../services/stockExchangeService';
import { OrderResponse } from '../types/stock_pb';

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [clientId, setClientId] = useState('client1');

  const loadOrderHistory = async () => {
    setLoading(true);
    try {
      const response = await stockExchangeService.getOrderHistory(clientId, 20);
      setOrders(response.getOrdersList());
    } catch (error) {
      console.error('Error loading order history:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderHistory();
  }, [clientId]);

  const getStatusColor = (status: number) => {
    const statusColors: { [key: number]: string } = {
      0: 'bg-yellow-100 text-yellow-800', // PENDING
      1: 'bg-blue-100 text-blue-800',     // PARTIALLY_FILLED
      2: 'bg-green-100 text-green-800',   // FILLED
      3: 'bg-gray-100 text-gray-800',     // CANCELLED
      4: 'bg-red-100 text-red-800',       // REJECTED
      5: 'bg-orange-100 text-orange-800'  // EXPIRED
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: number) => {
    const statusMap: { [key: number]: string } = {
      0: 'PENDING',
      1: 'PARTIALLY FILLED',
      2: 'FILLED',
      3: 'CANCELLED',
      4: 'REJECTED',
      5: 'EXPIRED'
    };
    return statusMap[status] || 'UNKNOWN';
  };

  // const getDirectionText = (direction: number) => {
  //   return direction === 0 ? 'BUY' : 'SELL';
  // };

  // const getDirectionColor = (direction: number) => {
  //   return direction === 0 ? 'text-green-600' : 'text-red-600';
  // };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Order History</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            placeholder="Client ID"
            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
          />
          <button
            onClick={loadOrderHistory}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm disabled:bg-gray-400"
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading order history...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Symbol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Direction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                    {order.getOrderId().slice(0, 8)}...
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.getOrderId().split('_')[1] || 'N/A'}
                  </td>
                  {/* <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getDirectionColor(order.getDirection())}`}>
                    {getDirectionText(order.getDirection())}
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.getExecutedQuantity()}/{order.getExecutedQuantity() + order.getRemainingQuantity()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${order.getExecutedPrice().toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.getStatus())}`}>
                      {getStatusText(order.getStatus())}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.getTimestamp()!.getSeconds() * 1000).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {orders.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No order history found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;