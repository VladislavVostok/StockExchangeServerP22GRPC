using CryptoExchange;

namespace StockExchangeServer.Services
{
    public class StockExchangeService : CryptoStockExchange.CryptoStockExchangeBase
    {
        private readonly ILogger<StockExchangeService> _logger;
        public StockExchangeService(ILogger<StockExchangeService> logger)
        {
            _logger = logger;
        }
    }

}
