// package: stock_exchange
// file: stock.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as stock_pb from "./stock_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

interface IStockExchangeService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    subscribeQuotes: IStockExchangeService_ISubscribeQuotes;
    placeOrder: IStockExchangeService_IPlaceOrder;
    cancelOrder: IStockExchangeService_ICancelOrder;
    getOrderHistory: IStockExchangeService_IGetOrderHistory;
    getPortfolio: IStockExchangeService_IGetPortfolio;
}

interface IStockExchangeService_ISubscribeQuotes extends grpc.MethodDefinition<stock_pb.QuoteSubscription, stock_pb.StockQuote> {
    path: "/stock_exchange.StockExchange/SubscribeQuotes";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<stock_pb.QuoteSubscription>;
    requestDeserialize: grpc.deserialize<stock_pb.QuoteSubscription>;
    responseSerialize: grpc.serialize<stock_pb.StockQuote>;
    responseDeserialize: grpc.deserialize<stock_pb.StockQuote>;
}
interface IStockExchangeService_IPlaceOrder extends grpc.MethodDefinition<stock_pb.OrderRequest, stock_pb.OrderResponse> {
    path: "/stock_exchange.StockExchange/PlaceOrder";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<stock_pb.OrderRequest>;
    requestDeserialize: grpc.deserialize<stock_pb.OrderRequest>;
    responseSerialize: grpc.serialize<stock_pb.OrderResponse>;
    responseDeserialize: grpc.deserialize<stock_pb.OrderResponse>;
}
interface IStockExchangeService_ICancelOrder extends grpc.MethodDefinition<stock_pb.CancelOrderRequest, stock_pb.CancelOrderResponse> {
    path: "/stock_exchange.StockExchange/CancelOrder";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<stock_pb.CancelOrderRequest>;
    requestDeserialize: grpc.deserialize<stock_pb.CancelOrderRequest>;
    responseSerialize: grpc.serialize<stock_pb.CancelOrderResponse>;
    responseDeserialize: grpc.deserialize<stock_pb.CancelOrderResponse>;
}
interface IStockExchangeService_IGetOrderHistory extends grpc.MethodDefinition<stock_pb.OrderHistoryRequest, stock_pb.OrderHistoryResponse> {
    path: "/stock_exchange.StockExchange/GetOrderHistory";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<stock_pb.OrderHistoryRequest>;
    requestDeserialize: grpc.deserialize<stock_pb.OrderHistoryRequest>;
    responseSerialize: grpc.serialize<stock_pb.OrderHistoryResponse>;
    responseDeserialize: grpc.deserialize<stock_pb.OrderHistoryResponse>;
}
interface IStockExchangeService_IGetPortfolio extends grpc.MethodDefinition<stock_pb.PortfolioRequest, stock_pb.PortfolioResponse> {
    path: "/stock_exchange.StockExchange/GetPortfolio";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<stock_pb.PortfolioRequest>;
    requestDeserialize: grpc.deserialize<stock_pb.PortfolioRequest>;
    responseSerialize: grpc.serialize<stock_pb.PortfolioResponse>;
    responseDeserialize: grpc.deserialize<stock_pb.PortfolioResponse>;
}

export const StockExchangeService: IStockExchangeService;

export interface IStockExchangeServer {
    subscribeQuotes: grpc.handleServerStreamingCall<stock_pb.QuoteSubscription, stock_pb.StockQuote>;
    placeOrder: grpc.handleUnaryCall<stock_pb.OrderRequest, stock_pb.OrderResponse>;
    cancelOrder: grpc.handleUnaryCall<stock_pb.CancelOrderRequest, stock_pb.CancelOrderResponse>;
    getOrderHistory: grpc.handleUnaryCall<stock_pb.OrderHistoryRequest, stock_pb.OrderHistoryResponse>;
    getPortfolio: grpc.handleUnaryCall<stock_pb.PortfolioRequest, stock_pb.PortfolioResponse>;
}

export interface IStockExchangeClient {
    subscribeQuotes(request: stock_pb.QuoteSubscription, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<stock_pb.StockQuote>;
    subscribeQuotes(request: stock_pb.QuoteSubscription, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<stock_pb.StockQuote>;
    placeOrder(request: stock_pb.OrderRequest, callback: (error: grpc.ServiceError | null, response: stock_pb.OrderResponse) => void): grpc.ClientUnaryCall;
    placeOrder(request: stock_pb.OrderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: stock_pb.OrderResponse) => void): grpc.ClientUnaryCall;
    placeOrder(request: stock_pb.OrderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: stock_pb.OrderResponse) => void): grpc.ClientUnaryCall;
    cancelOrder(request: stock_pb.CancelOrderRequest, callback: (error: grpc.ServiceError | null, response: stock_pb.CancelOrderResponse) => void): grpc.ClientUnaryCall;
    cancelOrder(request: stock_pb.CancelOrderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: stock_pb.CancelOrderResponse) => void): grpc.ClientUnaryCall;
    cancelOrder(request: stock_pb.CancelOrderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: stock_pb.CancelOrderResponse) => void): grpc.ClientUnaryCall;
    getOrderHistory(request: stock_pb.OrderHistoryRequest, callback: (error: grpc.ServiceError | null, response: stock_pb.OrderHistoryResponse) => void): grpc.ClientUnaryCall;
    getOrderHistory(request: stock_pb.OrderHistoryRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: stock_pb.OrderHistoryResponse) => void): grpc.ClientUnaryCall;
    getOrderHistory(request: stock_pb.OrderHistoryRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: stock_pb.OrderHistoryResponse) => void): grpc.ClientUnaryCall;
    getPortfolio(request: stock_pb.PortfolioRequest, callback: (error: grpc.ServiceError | null, response: stock_pb.PortfolioResponse) => void): grpc.ClientUnaryCall;
    getPortfolio(request: stock_pb.PortfolioRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: stock_pb.PortfolioResponse) => void): grpc.ClientUnaryCall;
    getPortfolio(request: stock_pb.PortfolioRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: stock_pb.PortfolioResponse) => void): grpc.ClientUnaryCall;
}

export class StockExchangeClient extends grpc.Client implements IStockExchangeClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public subscribeQuotes(request: stock_pb.QuoteSubscription, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<stock_pb.StockQuote>;
    public subscribeQuotes(request: stock_pb.QuoteSubscription, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<stock_pb.StockQuote>;
    public placeOrder(request: stock_pb.OrderRequest, callback: (error: grpc.ServiceError | null, response: stock_pb.OrderResponse) => void): grpc.ClientUnaryCall;
    public placeOrder(request: stock_pb.OrderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: stock_pb.OrderResponse) => void): grpc.ClientUnaryCall;
    public placeOrder(request: stock_pb.OrderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: stock_pb.OrderResponse) => void): grpc.ClientUnaryCall;
    public cancelOrder(request: stock_pb.CancelOrderRequest, callback: (error: grpc.ServiceError | null, response: stock_pb.CancelOrderResponse) => void): grpc.ClientUnaryCall;
    public cancelOrder(request: stock_pb.CancelOrderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: stock_pb.CancelOrderResponse) => void): grpc.ClientUnaryCall;
    public cancelOrder(request: stock_pb.CancelOrderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: stock_pb.CancelOrderResponse) => void): grpc.ClientUnaryCall;
    public getOrderHistory(request: stock_pb.OrderHistoryRequest, callback: (error: grpc.ServiceError | null, response: stock_pb.OrderHistoryResponse) => void): grpc.ClientUnaryCall;
    public getOrderHistory(request: stock_pb.OrderHistoryRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: stock_pb.OrderHistoryResponse) => void): grpc.ClientUnaryCall;
    public getOrderHistory(request: stock_pb.OrderHistoryRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: stock_pb.OrderHistoryResponse) => void): grpc.ClientUnaryCall;
    public getPortfolio(request: stock_pb.PortfolioRequest, callback: (error: grpc.ServiceError | null, response: stock_pb.PortfolioResponse) => void): grpc.ClientUnaryCall;
    public getPortfolio(request: stock_pb.PortfolioRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: stock_pb.PortfolioResponse) => void): grpc.ClientUnaryCall;
    public getPortfolio(request: stock_pb.PortfolioRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: stock_pb.PortfolioResponse) => void): grpc.ClientUnaryCall;
}

interface IMarketDataService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    streamMarketData: IMarketDataService_IStreamMarketData;
}

interface IMarketDataService_IStreamMarketData extends grpc.MethodDefinition<stock_pb.MarketDataRequest, stock_pb.MarketDataUpdate> {
    path: "/stock_exchange.MarketData/StreamMarketData";
    requestStream: true;
    responseStream: true;
    requestSerialize: grpc.serialize<stock_pb.MarketDataRequest>;
    requestDeserialize: grpc.deserialize<stock_pb.MarketDataRequest>;
    responseSerialize: grpc.serialize<stock_pb.MarketDataUpdate>;
    responseDeserialize: grpc.deserialize<stock_pb.MarketDataUpdate>;
}

export const MarketDataService: IMarketDataService;

export interface IMarketDataServer {
    streamMarketData: grpc.handleBidiStreamingCall<stock_pb.MarketDataRequest, stock_pb.MarketDataUpdate>;
}

export interface IMarketDataClient {
    streamMarketData(): grpc.ClientDuplexStream<stock_pb.MarketDataRequest, stock_pb.MarketDataUpdate>;
    streamMarketData(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<stock_pb.MarketDataRequest, stock_pb.MarketDataUpdate>;
    streamMarketData(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<stock_pb.MarketDataRequest, stock_pb.MarketDataUpdate>;
}

export class MarketDataClient extends grpc.Client implements IMarketDataClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public streamMarketData(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<stock_pb.MarketDataRequest, stock_pb.MarketDataUpdate>;
    public streamMarketData(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<stock_pb.MarketDataRequest, stock_pb.MarketDataUpdate>;
}
