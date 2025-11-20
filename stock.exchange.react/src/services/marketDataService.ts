import * as grpcWeb from 'grpc-web';
import { MarketDataClient } from '../types/StockServiceClientPb';
import { MarketDataRequest, MarketDataUpdate } from '../types/stock_pb';

class MarketDataService {
  private readonly client: MarketDataClient;
  private readonly hostname: string = 'http://localhost:50051'; // Assuming grpc-web proxy is running here

  constructor() {
      this.client = new MarketDataClient(this.hostname);
  }

  streamMarketData(
    onMessage: (update: MarketDataUpdate) => void,
    onError: (error: grpcWeb.RpcError) => void,
    onEnd: () => void
  ): grpcWeb.ClientReadableStream<MarketDataUpdate> {
    const request = new MarketDataRequest();
    const stream = this.client.streamMarketData(request, {});
    stream.on('data', onMessage);
    stream.on('error', onError);
    stream.on('end', onEnd);
    return stream;
  }
}

export const marketDataService = new MarketDataService();
