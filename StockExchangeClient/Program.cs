using Grpc.Core;
using Grpc.Net.Client; // Импортируем для создания gRPC канала

using StockExchangeServer;

namespace StockExchangeClient
{
    internal class Program
    {
        static async Task Main(string[] args)
        {
            // Создаем gRPC канал для подключения к серверу
            using var channel = GrpcChannel.ForAddress("https://localhost:7042");
            // Создаем клиенты для каждого сервиса
            var stockClient = new StockExchange.StockExchangeClient(channel);
            var marketDataClient = new MarketData.MarketDataClient(channel);

            // Генерируем уникальный ID клиента
            var clientId = "client_" + Guid.NewGuid().ToString()[..8];

            Console.WriteLine($"=== Stock Exchange Client ({clientId}) ===");
            Console.WriteLine();

            // Демонстрируем различные функции
            await DemonstrateQuotesSubscription(stockClient);
            await DemonstrateOrderManagement(stockClient, clientId);
            await DemonstratePortfolio(stockClient, clientId);
            await DemonstrateMarketDataStream(marketDataClient, clientId);

            Console.WriteLine("Press any key to exit...");
            Console.ReadKey();
        }

        // Демонстрация подписки на котировки
        static async Task DemonstrateQuotesSubscription(StockExchange.StockExchangeClient client)
        {
            Console.WriteLine("1. Subscribing to Stock Quotes...");
            Console.WriteLine();

            // Создаем запрос на подписку
            var subscription = new QuoteSubscription
            {
                Symbols = { "AAPL", "GOOGL", "TSLA", "NVDA" }, // Символы для подписки
                UpdateIntervalMs = 2000 // Интервал обновления 2 секунды
            };

            // Открываем потоковое соединение
            using var call = client.SubscribeQuotes(subscription);
            var cancellationTokenSource = new CancellationTokenSource();

            // Читаем котировки в фоновой задаче
            var readTask = Task.Run(async () =>
            {
                var count = 0;
                // Читаем все сообщения из потока
                await foreach (var quote in call.ResponseStream.ReadAllAsync(cancellationTokenSource.Token))
                {
                    // Форматируем и выводим котировку
                    Console.WriteLine($"[{quote.Timestamp.ToDateTime():HH:mm:ss}] {quote.Symbol}: " +
                                    $"${quote.LastPrice:F2} (Bid: ${quote.BidPrice:F2}, Ask: ${quote.AskPrice:F2}) " +
                                    $"Change: {quote.ChangePercent:+#.##;-#.##;0}%");

                    if (++count >= 5) // Ограничиваем 5 сообщениями для демонстрации
                    {
                        cancellationTokenSource.Cancel(); // Отменяем чтение
                        break;
                    }
                }
            });

            try
            {
                await readTask; // Ждем завершения чтения
            }
            catch (OperationCanceledException) // Обрабатываем отмену
            {
                Console.WriteLine("Quote subscription completed.");
            }

            Console.WriteLine();
        }

        // Демонстрация управления ордерами
        static async Task DemonstrateOrderManagement(StockExchange.StockExchangeClient client, string clientId)
        {
            Console.WriteLine("2. Order Management Demo...");
            Console.WriteLine();

            // Размещение лимитного ордера на покупку
            var buyOrder = new OrderRequest
            {
                OrderId = $"order_{Guid.NewGuid()}", // Уникальный ID ордера
                Symbol = "AAPL", // Тикер
                OrderType = OrderType.Limit, // Тип - лимитный
                Direction = OrderDirection.Buy, // Направление - покупка
                Quantity = 100, // Количество
                Price = 175.0, // Лимитная цена
                ClientId = clientId, // ID клиента
                TimeInForce = TimeInForce.Day // Действует до конца дня
            };

            // Отправляем ордер на сервер
            var buyResponse = await client.PlaceOrderAsync(buyOrder);
            Console.WriteLine($"Buy Order Response: {buyResponse.Status}");
            Console.WriteLine($"Message: {buyResponse.Message}");
            if (buyResponse.ExecutedQuantity > 0) // Если есть исполнение
            {
                Console.WriteLine($"Executed: {buyResponse.ExecutedQuantity} @ ${buyResponse.ExecutedPrice:F2}");
            }
            Console.WriteLine();

            // Размещение рыночного ордера на продажу
            var sellOrder = new OrderRequest
            {
                OrderId = $"order_{Guid.NewGuid()}",
                Symbol = "GOOGL",
                OrderType = OrderType.Market, // Тип - рыночный
                Direction = OrderDirection.Sell, // Направление - продажа
                Quantity = 5,
                ClientId = clientId
            };

            var sellResponse = await client.PlaceOrderAsync(sellOrder);
            Console.WriteLine($"Sell Order Response: {sellResponse.Status}");
            Console.WriteLine($"Message: {sellResponse.Message}");
            if (sellResponse.ExecutedQuantity > 0)
            {
                Console.WriteLine($"Executed: {sellResponse.ExecutedQuantity} @ ${sellResponse.ExecutedPrice:F2}");
            }
            Console.WriteLine();

            // Получение истории ордеров
            var history = await client.GetOrderHistoryAsync(new OrderHistoryRequest
            {
                ClientId = clientId,
                MaxOrders = 5 // Максимум 5 ордеров
            });

            Console.WriteLine("Order History:");
            foreach (var order in history.Orders) // Выводим каждый ордер
            {
                Console.WriteLine($"- {order.OrderId}: {order.Status} " +
                                $"(Qty: {order.ExecutedQuantity}/{order.ExecutedQuantity + order.RemainingQuantity})");
            }
            Console.WriteLine();
        }

        // Демонстрация работы с портфелем
        static async Task DemonstratePortfolio(StockExchange.StockExchangeClient client, string clientId)
        {
            Console.WriteLine("3. Portfolio Demo...");
            Console.WriteLine();

            // Запрашиваем портфель клиента
            var portfolio = await client.GetPortfolioAsync(new PortfolioRequest { ClientId = clientId });

            // Выводим общую информацию
            Console.WriteLine($"Portfolio for {portfolio.ClientId}:");
            Console.WriteLine($"Total Value: ${portfolio.TotalValue:F2}");
            Console.WriteLine($"Cash Balance: ${portfolio.CashBalance:F2}");
            Console.WriteLine($"Daily PnL: ${portfolio.DailyPnl:F2}");
            Console.WriteLine($"Total PnL: ${portfolio.TotalPnl:F2}");
            Console.WriteLine();

            // Выводим детали по позициям
            Console.WriteLine("Holdings:");
            foreach (var item in portfolio.Items)
            {
                Console.WriteLine($"- {item.Symbol}: {item.Quantity} shares " +
                                $"@ avg ${item.AveragePrice:F2} (Current: ${item.CurrentPrice:F2})");
                Console.WriteLine($"  Market Value: ${item.MarketValue:F2} | Unrealized PnL: ${item.UnrealizedPnl:F2}");
            }
            Console.WriteLine();
        }

        // Демонстрация двунаправленного потока рыночных данных
        static async Task DemonstrateMarketDataStream(MarketData.MarketDataClient client, string clientId)
        {
            Console.WriteLine("4. Market Data Stream Demo...");
            Console.WriteLine();

            // Открываем двунаправленный поток
            using var call = client.StreamMarketData();

            // Отправляем начальный запрос
            await call.RequestStream.WriteAsync(new MarketDataRequest
            {
                ClientId = clientId,
                Symbols = { "TSLA", "NVDA" }, // Символы для подписки
                DataType = DataType.Quote // Тип данных - котировки
            });

            // Задача для чтения сообщений от сервера
            var readTask = Task.Run(async () =>
            {
                var count = 0;
                await foreach (var update in call.ResponseStream.ReadAllAsync()) // Читаем все обновления
                {
                    Console.WriteLine($"Market Data Update - {update.Symbol} [{update.DataType}]:");

                    // Обрабатываем разные типы данных
                    switch (update.DataCase)
                    {
                        case MarketDataUpdate.DataOneofCase.Quote: // Если котировка
                            var quote = update.Quote;
                            Console.WriteLine($"  Price: ${quote.LastPrice:F2}, Volume: {quote.Volume:N0}");
                            break;
                        case MarketDataUpdate.DataOneofCase.Trade: // Если сделка
                            var trade = update.Trade;
                            Console.WriteLine($"  Trade: {trade.Quantity} @ ${trade.Price:F2}");
                            break;
                    }

                    if (++count >= 3) // Ограничиваем 3 сообщениями для демонстрации
                        break;
                }
            });

            // Отправляем дополнительный запрос через 1 секунду
            await Task.Delay(1000);
            await call.RequestStream.WriteAsync(new MarketDataRequest
            {
                ClientId = clientId,
                Symbols = { "TSLA" }, // Изменяем подписку
                DataType = DataType.Trade // Запрашиваем сделки вместо котировок
            });

            await readTask; // Ждем завершения чтения
            await call.RequestStream.CompleteAsync(); // Завершаем отправку запросов

            Console.WriteLine("Market data stream demo completed.");
            Console.WriteLine();
        }

    }
}
