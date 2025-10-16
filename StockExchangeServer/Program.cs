using StockExchangeServer.Models;
using StockExchangeServer.Services;

namespace StockExchangeServer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);


            builder.Services.AddGrpc();
            builder.Services.AddSingleton<StockMarket>(); 
            builder.Services.AddSingleton<MarketDataService>();

            //builder.WebHost.ConfigureKestrel(options =>
            //{
            //    options.ListenAnyIP(50051);
            //});

            var app = builder.Build();

            app.MapGrpcService<StockExchangeService>();
            app.MapGrpcService<MarketDataService>();
            app.MapGet("/", () => "Биржа запущена как gRPC сервер");

            app.Run();
        }
    }
}