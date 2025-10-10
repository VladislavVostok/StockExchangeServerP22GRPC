using Grpc.Core;
using StockExchangeServer;
using StockExchangeServer.Models;

namespace StockExchangeServer.Services
{
    public class StockExchangeService : StockExchange.StockExchangeBase
    {
        private readonly ILogger<StockExchangeService> _logger;
        private readonly StockMarket _market;

        public StockExchangeService(ILogger<StockExchangeService> logger, StockMarket market)
        {
            _logger = logger;
            _market = market;
        }

        public override async Task SubscribeQuotes(QuoteSubscription request, IServerStreamWriter<StockQuote> responseStream, ServerCallContext context)
        {
            _logger.LogInformation($"Клиент подписался на данные по символу: {string.Join(", ", request.Symbols)}|");


            var symbols = request.Symbols.Count == 0 ? _market.GetAvailableSymbols() : request.Symbols.ToList<string>();

            try {
                while (!context.CancellationToken.IsCancellationRequested)
                {
                    foreach(var symbol in symbols)
                    {
                        var quote = _market.GetQuote(symbol); // Получаем котировку
                        if (quote != null)
                        {
                            await responseStream.WriteAsync(quote);
                        }
                    }
                    await Task.Delay(request.UpdateIntervalMs > 0 ? request.UpdateIntervalMs : 1000, context.CancellationToken);

                }
            }
            catch(OperationCanceledException) {   // Обработка отмены операции
                _logger.LogInformation("Подписка на котироку была отменена");
            }

        }

        public override Task<OrderResponse> PlaceOrder(OrderRequest request, ServerCallContext context)
        {
            _logger.LogInformation($"Размещение ордера: {request.OrderId} для клиента {request.ClientId}");

            var response = _market.PlaceOrder(request); // Разместить ордер через модель биржи

            return Task.FromResult(response);   // Возвращаем рузультат как завершунную задачу
        }


        public override Task<CancelOrderResponse> CancelOrder(CancelOrderRequest request, ServerCallContext context)
        {
            _logger.LogInformation($"Отмена ордера: {request.OrderId} для клиента {request.ClientId}");
            var response = _market.CancelOrder(request.OrderId, request.ClientId); // Отмена ордера через модель биржи

            return Task.FromResult(response);
        }



        public override Task<OrderHistoryResponse> GetOrderHistory(OrderHistoryRequest request, ServerCallContext context) {
            var orders = _market.GetOrderHistory(request.ClientId, request.MaxOrders); // Получаем историю ордеров
            return Task.FromResult(new OrderHistoryResponse { Orders = { orders } });
        }

        public override Task<PortfolioResponse> GetPortfolio(PortfolioRequest request, ServerCallContext context)
        {
            var portfolio = _market.GetPortfolio(request.ClientId); // Получаем портфель клиента
            return Task.FromResult(portfolio);
        }











        /*****************************/

    }

}
