using Grpc.Core;
using StockExchangeServer.Models;
using System.Collections.Concurrent;

namespace StockExchangeServer.Services
{
    public class MarketDataService : MarketData.MarketDataBase
    {
        private readonly ILogger<MarketDataService> _logger;
        private readonly StockMarket _marker; // Ссылка на модель биржи


        private readonly ConcurrentDictionary<string, HashSet<IServerStreamWriter<MarketDataUpdate>>> _subscribers = new();

        public MarketDataService(ILogger<MarketDataService> logger, StockMarket marker)
        {
            _logger = logger;
            _marker = marker;   // Инициализация модели биржи
        }

        public override async Task StreamMarketData(MarketDataRequest request,
                                                IServerStreamWriter<MarketDataUpdate> responseStream,
                                                ServerCallContext context)
        {

            string clientId = string.Empty;    // Переменная для хранения ИД клиента

            try
            {
                clientId = request.ClientId;

                _logger.LogInformation($"Клиент {clientId} подписан на данные рынка по символу: {string.Join(", ", request.Symbols)}");

                foreach (var symbol in request.Symbols)
                {
                    if (!_subscribers.ContainsKey(symbol))
                    {
                        _subscribers[symbol] = new HashSet<IServerStreamWriter<MarketDataUpdate>>();
                    }
                    _subscribers[symbol].Add(responseStream);
                }

                //while (await requestStream.MoveNext())
                //{
                //    request = requestStream.Current;

                //    // TODO: Здесь можно обновить подписку при  изменении запроса
                //}

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Ошибка в потоке рыночных данных для пользователя {clientId}");
            }
            //finally
            //{
            //    foreach (var symbol in _subscribers.Keys)
            //    {
            //        _subscribers[symbol].Remove(responseStream);
            //    }
            //}
        }


        public async Task BroadcastMarketDataUpdate(MarketDataUpdate update)
        {
            if (_subscribers.TryGetValue(update.Symbol, out var subscribers))
            {
                foreach (var subscriber in subscribers.ToList())
                {
                    try
                    {
                       await subscriber.WriteAsync(update);
                    }
                    catch(Exception ex)
                    {
                        _logger.LogError(ex, "Ошибка рассылки обновленных рыночных данных");
                    }
                }

            }

        }







    }
}
