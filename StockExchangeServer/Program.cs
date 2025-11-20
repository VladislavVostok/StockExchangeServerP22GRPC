using Microsoft.AspNetCore.Server.Kestrel.Core;
using StockExchangeServer.Models;
using StockExchangeServer.Services;

namespace StockExchangeServer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.WebHost.ConfigureKestrel(options =>
            {
                options.ListenAnyIP(50051, listenOptions =>
                {
                    listenOptions.Protocols = HttpProtocols.Http1AndHttp2;
                });
            });

            builder.Services.AddGrpc();
            builder.Services.AddSingleton<StockMarket>();
            builder.Services.AddSingleton<MarketDataService>();

            builder.Services.AddCors(o => o.AddPolicy("AllowAll", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader()
                       .WithExposedHeaders(
                            "Grpc-Status", 
                            "Grpc-Message", 
                            "Grpc-Encoding", 
                            "Grpc-Accept-Encoding", 
                            "Grpc-Status-Details-Bin"
                       );
            }));

            var app = builder.Build();

            app.UseGrpcWeb(new GrpcWebOptions { DefaultEnabled = true });
            app.UseCors("AllowAll");


            app.MapGrpcService<StockExchangeService>();
            app.MapGrpcService<MarketDataService>();
            app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

            app.Run();
        }
    }
}