using StockExchangeServer;

namespace StockExchangeServer.Services
{
    public class StockExchangeService : StockExchange.StockExchangeBase
    {
        private readonly ILogger<StockExchangeService> _logger;
        public StockExchangeService(ILogger<StockExchangeService> logger)
        {
            _logger = logger;
        }
    }

}
