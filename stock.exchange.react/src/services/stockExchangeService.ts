import * as grpcWeb from 'grpc-web';
import { StockExchangeClient } from '../types/StockServiceClientPb';
import {
  QuoteSubscription,
  StockQuote,
  OrderRequest,
  OrderResponse,
  CancelOrderRequest,
  CancelOrderResponse,
  OrderHistoryRequest as OrderHistoryRequestMessage,
  OrderHistoryResponse as OrderHistoryResponseMessage,
  PortfolioRequest as PortfolioRequestMessage,
  PortfolioResponse as PortfolioResponseMessage,
} from '../types/stock_pb';
import { Guid } from 'guid-ts';

class StockExchangeService {
  private readonly client: StockExchangeClient;
  private readonly hostname: string = 'http://localhost:50051'; // Assuming grpc-web proxy is running here

  constructor() {
    this.client = new StockExchangeClient(this.hostname);
  }

  subscribeQuotes(
    symbols: string[],
    onMessage: (quote: StockQuote) => void,
    onError: (error: grpcWeb.RpcError) => void,

    updateIntervalMs: number = 2000
  ): grpcWeb.ClientReadableStream<StockQuote> {
    const request = new QuoteSubscription();
    request.setSymbolsList(symbols);
    request.setUpdateIntervalMs(updateIntervalMs);

    const stream = this.client.subscribeQuotes(request, {});

    stream.on('data', onMessage);
    stream.on('error', onError);


    return stream;
  }

  async placeOrder(orderRequest: OrderRequest): Promise<OrderResponse> {
    const request = new OrderRequest();
    request.setOrderId(`order_${Guid.newGuid()}`);
    request.setSymbol(orderRequest.getSymbol());
    request.setOrderType(orderRequest.getOrderType());
    request.setDirection(orderRequest.getDirection());
    request.setQuantity(orderRequest.getQuantity());
    request.setClientId(orderRequest.getClientId());
    request.setPrice(orderRequest.getPrice());
    request.setTimeInForce(orderRequest.getTimeInForce());

    return this.client.placeOrder(request, null);
  }

  async cancelOrder(
    orderId: string,
    clientId: string
  ): Promise<CancelOrderResponse> {
    const request = new CancelOrderRequest();
    request.setOrderId(orderId);
    request.setClientId(clientId);

    return this.client.cancelOrder(request, null);
  }

  async getOrderHistory(
    clientId: string,
    maxOrders: number = 10
  ): Promise<OrderHistoryResponseMessage> {
    const request = new OrderHistoryRequestMessage();
    request.setClientId(clientId);
    request.setMaxOrders(maxOrders);

    return this.client.getOrderHistory(request, null);
  }

  async getPortfolio(
    clientId: string
  ): Promise<PortfolioResponseMessage> {
    const request = new PortfolioRequestMessage();
    request.setClientId(clientId);

    return this.client.getPortfolio(request, null);
  }
}

export const stockExchangeService = new StockExchangeService();