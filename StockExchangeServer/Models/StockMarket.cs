using CryptoExchange;
using System.Collections.Concurrent;

namespace StockExchangeServer.Models
{
    public class StockMarket
    {
        private readonly ILogger<StockMarket> _logger;
        private readonly ConcurrentDictionary<string, StockQuote> _quotes = new();
        private readonly ConcurrentDictionary<string, OrderResponse> _orders = new();


        public StockMarket(ILogger<StockMarket> logger)
        {
            _logger = logger;
        }
        private void InitializeMarketData()
        {
            var symbols = new[] { "BTC", "ETH" };

            var basePrices = new Dictionary<string, double>()
            {
                ["BTC"] = 120000.0,
                ["ETH"] = 4300.0
            };

            foreach (var symbol in symbols) {
                _quotes[symbol] = new StockQuote
                {
                    Symbol = symbol,
                    BidPrice = basePrices[symbol] - 0.1,
                    AskPrice = basePrices[symbol] + 0.1,
                    LastPrice = basePrices[symbol],
                    Volume = 
                }
            }
        }

    }

    internal class OrderResponse
    {
        // заглушка сделать этот класс в protobuff
    }
}
