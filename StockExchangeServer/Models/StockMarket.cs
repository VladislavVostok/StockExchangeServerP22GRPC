using Google.Protobuf.WellKnownTypes;
using StockExchangeServer;
using System.Collections.Concurrent;

namespace StockExchangeServer.Models
{
    public class StockMarket
    {
        private readonly ILogger<StockMarket> _logger; // Логгер для записи событий

        // Потокобезопасные словари для хранения данных
        private readonly ConcurrentDictionary<string, StockQuote> _quotes = new();      // Котировки
        private readonly ConcurrentDictionary<string, OrderResponse> _orders = new();   // Ордера
        private readonly ConcurrentDictionary<string, Portfolio> _portfolios = new();   // Портфели

        private readonly Random _random = new(); // Генератор случайных чисел

        public StockMarket(ILogger<StockMarket> logger)
        {
            _logger = logger;
            InitializeMarketData();
        }
        // Инициализация тестовых данных рынка
        private void InitializeMarketData()
        {
            // Массив символов для инициализации
            var symbols = new[] { "AAPL", "GOOGL", "MSFT", "TSLA", "AMZN", "META", "NFLX", "NVDA" };
            // Базовые цены для каждого символа
            var basePrices = new Dictionary<string, double>
            {
                ["AAPL"] = 180.0,
                ["GOOGL"] = 2700.0,
                ["MSFT"] = 330.0,
                ["TSLA"] = 240.0,
                ["AMZN"] = 3500.0,
                ["META"] = 340.0,
                ["NFLX"] = 420.0,
                ["NVDA"] = 480.0
            };

            // Инициализируем котировки для каждого символа
            foreach (var symbol in symbols)
            {
                _quotes[symbol] = new StockQuote
                {
                    Symbol = symbol, // Тикер
                    BidPrice = basePrices[symbol] - 0.1, // Цена покупки
                    AskPrice = basePrices[symbol] + 0.1, // Цена продажи
                    LastPrice = basePrices[symbol], // Последняя цена
                    Volume = _random.Next(1000000, 5000000), // Случайный объем
                    Timestamp = Timestamp.FromDateTime(DateTime.UtcNow), // Текущее время
                    Change = 0, // Изменение цены
                    ChangePercent = 0, // Изменение в процентах
                    Status = QuoteStatus.Normal // Статус - нормальный
                };
            }

            // Инициализируем тестовые портфели
            _portfolios["client1"] = new Portfolio
            {
                ClientId = "client1", // ID клиента
                CashBalance = 100000, // Начальный баланс
                Items = // Список позиций
                {
                    new PortfolioItem { Symbol = "AAPL", Quantity = 100, AveragePrice = 170.0 },
                    new PortfolioItem { Symbol = "GOOGL", Quantity = 10, AveragePrice = 2600.0 }
                }
            };
        }

        // Получение котировки по символу с имитацией изменений
        public StockQuote GetQuote(string symbol)
        {
            if (_quotes.TryGetValue(symbol, out var quote)) // Если котировка найдена
            {
                // Имитация изменения цены (-1 до +1)
                var change = (_random.NextDouble() - 0.5) * 2.0;
                var newPrice = Math.Max(0.1, quote.LastPrice + change); // Новая цена (не меньше 0.1)

                // Создаем обновленную котировку
                var updatedQuote = new StockQuote(quote) // Копируем существующую котировку
                {
                    LastPrice = newPrice, // Обновляем цену
                    BidPrice = newPrice - 0.1, // Обновляем цену покупки
                    AskPrice = newPrice + 0.1, // Обновляем цену продажи
                    Change = newPrice - 150.0, // Изменение от базовой цены (пример)
                    ChangePercent = ((newPrice - 150.0) / 150.0) * 100.0, // Изменение в процентах
                    Volume = quote.Volume + _random.Next(100, 1000), // Увеличиваем объем
                    Timestamp = Timestamp.FromDateTime(DateTime.UtcNow) // Обновляем время
                };

                _quotes[symbol] = updatedQuote; // Сохраняем обновленную котировку
                return updatedQuote; // Возвращаем котировку
            }

            return null; // Если символ не найден
        }

        // Получение списка доступных символов
        public List<string> GetAvailableSymbols()
        {
            return _quotes.Keys.ToList();
        }

        // Размещение ордера
        public OrderResponse PlaceOrder(OrderRequest request)
        {
            var orderId = string.IsNullOrEmpty(request.OrderId) ? Guid.NewGuid().ToString() : request.OrderId;
            var isSuccessful = _random.NextDouble() > 0.1;

            if (isSuccessful)
            {
                var executeQuantity = request.OrderType == OrderType.Market
                    ? request.Quantity // Рыночный - полное исполнение
                    : _random.Next(0, request.Quantity + 1); // Лимитный - случайное исполнение

                var status =
                    (executeQuantity == request.Quantity)
                        ? OrderStatus.Filled
                        : (executeQuantity > 0)
                        ? OrderStatus.PartiallyFilled
                        : OrderStatus.Pending;


                var response = new OrderResponse
                {
                    OrderId = orderId,
                    Status = status,
                    ExecutedPrice = request.OrderType == OrderType.Market ? GetQuote(request.Symbol).LastPrice : request.Price,
                    ExecutedQuantity = executeQuantity,
                    RemainingQuantity = request.Quantity - executeQuantity,
                    Message = "Ордер обработан успешно",
                    Timestamp = Timestamp.FromDateTime(DateTime.UtcNow)

                };

                _orders[orderId] = response;

                UpdatePortfolio(request, response);

                return response;

            }
            else
            {
                return new OrderResponse
                {
                    OrderId = orderId,
                    Status = OrderStatus.Rejected,
                    Message = "Ордер отменен: Что-то пошло не так",
                    Timestamp = Timestamp.FromDateTime(DateTime.UtcNow)
                };

            }

        }

        // Отмена ордера
        public CancelOrderResponse CancelOrder(string orderId, string clientId)
        {
            if (_orders.TryGetValue(orderId, out var order)) // Если ордер найден
            {
                // Можно отменять только pending или частично исполненные ордера
                if (order.Status == OrderStatus.Pending || order.Status == OrderStatus.PartiallyFilled)
                {
                    order.Status = OrderStatus.Cancelled; // Меняем статус на отмененный
                    return new CancelOrderResponse { Success = true, Message = "Order cancelled successfully" };
                }
            }

            return new CancelOrderResponse { Success = false, Message = "Order not found or cannot be cancelled" };
        }

        // Получение истории ордеров
        public List<OrderResponse> GetOrderHistory(string clientId, int maxOrders)
        {
            return _orders.Values
                .Where(o => o.OrderId.StartsWith(clientId) || _orders.Count < 10) // Фильтруем по clientId
                .Take(maxOrders > 0 ? maxOrders : 10) // Ограничиваем количество
                .ToList(); // Преобразуем в список
        }

        // Получение портфеля клиента
        public PortfolioResponse GetPortfolio(string clientId)
        {
            if (_portfolios.TryGetValue(clientId, out var portfolio)) // Если портфель найден
            {
                // Обновляем текущие цены для всех позиций
                foreach (var item in portfolio.Items)
                {
                    var quote = GetQuote(item.Symbol); // Получаем текущую котировку
                    if (quote != null)
                    {
                        item.CurrentPrice = quote.LastPrice; // Текущая цена
                        item.MarketValue = item.Quantity * quote.LastPrice; // Рыночная стоимость
                        item.UnrealizedPnl = (quote.LastPrice - item.AveragePrice) * item.Quantity; // Нереализованная PnL
                    }
                }

                var totalValue = portfolio.Items.Sum(i => i.MarketValue) + portfolio.CashBalance; // Общая стоимость

                return new PortfolioResponse
                {
                    ClientId = portfolio.ClientId,
                    TotalValue = totalValue,
                    CashBalance = portfolio.CashBalance,
                    Items = { portfolio.Items }, // Список позиций
                    DailyPnl = _random.NextDouble() * 1000 - 500, // Случайный дневной PnL
                    TotalPnl = portfolio.Items.Sum(i => i.UnrealizedPnl) // Суммарная нереализованная PnL
                };
            }

            // Создаем новый портфель если не существует
            var newPortfolio = new PortfolioResponse
            {
                ClientId = clientId,
                CashBalance = 50000, // Начальный баланс
                TotalValue = 50000,
                DailyPnl = 0,
                TotalPnl = 0
            };

            return newPortfolio;
        }

        private void UpdatePortfolio(OrderRequest request, OrderResponse response)
        {
            // Создаем портфель если не существует
            if (!_portfolios.ContainsKey(request.ClientId))
            {
                _portfolios[request.ClientId] = new Portfolio { ClientId = request.ClientId, CashBalance = 100000 };
            }

            var portfolio = _portfolios[request.ClientId];

            // Обновляем только исполненные ордера
            if (response.Status == OrderStatus.Filled || response.Status == OrderStatus.PartiallyFilled)
            {
                var cost = response.ExecutedPrice * response.ExecutedQuantity; // Стоимость сделки

                if (request.Direction == OrderDirection.Buy) // Если покупка
                {
                    portfolio.CashBalance -= cost; // Уменьшаем баланс

                    // Ищем существующую позицию
                    var existingItem = portfolio.Items.FirstOrDefault(i => i.Symbol == request.Symbol);
                    if (existingItem != null) // Если позиция существует
                    {
                        // Пересчитываем среднюю цену
                        var totalQuantity = existingItem.Quantity + response.ExecutedQuantity;
                        var totalCost = (existingItem.AveragePrice * existingItem.Quantity) + cost;
                        existingItem.AveragePrice = totalCost / totalQuantity; // Новая средняя цена
                        existingItem.Quantity = totalQuantity; // Новое количество
                    }
                    else // Если новая позиция
                    {
                        portfolio.Items.Add(new PortfolioItem
                        {
                            Symbol = request.Symbol,
                            Quantity = response.ExecutedQuantity,
                            AveragePrice = response.ExecutedPrice
                        });
                    }
                }
                else // Если продажа
                {
                    portfolio.CashBalance += cost; // Увеличиваем баланс

                    // Ищем существующую позицию
                    var existingItem = portfolio.Items.FirstOrDefault(i => i.Symbol == request.Symbol);
                    if (existingItem != null)
                    {
                        existingItem.Quantity -= response.ExecutedQuantity; // Уменьшаем количество
                        if (existingItem.Quantity <= 0) // Если позиция закрыта
                        {
                            portfolio.Items.Remove(existingItem); // Удаляем позицию
                        }
                    }
                }
            }
        }
    }

    internal class Portfolio
    {
        public string ClientId { get; set; }
        public double CashBalance { get; set; }
        public List<PortfolioItem> Items { get; } = new();
    }

}