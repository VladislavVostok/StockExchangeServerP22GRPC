import * as jspb from 'google-protobuf'

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb'; // proto import: "google/protobuf/timestamp.proto"
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb'; // proto import: "google/protobuf/empty.proto"


export class StockQuote extends jspb.Message {
  getSymbol(): string;
  setSymbol(value: string): StockQuote;

  getBidPrice(): number;
  setBidPrice(value: number): StockQuote;

  getAskPrice(): number;
  setAskPrice(value: number): StockQuote;

  getLastPrice(): number;
  setLastPrice(value: number): StockQuote;

  getVolume(): number;
  setVolume(value: number): StockQuote;

  getTimestamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTimestamp(value?: google_protobuf_timestamp_pb.Timestamp): StockQuote;
  hasTimestamp(): boolean;
  clearTimestamp(): StockQuote;

  getChange(): number;
  setChange(value: number): StockQuote;

  getChangePercent(): number;
  setChangePercent(value: number): StockQuote;

  getStatus(): QuoteStatus;
  setStatus(value: QuoteStatus): StockQuote;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StockQuote.AsObject;
  static toObject(includeInstance: boolean, msg: StockQuote): StockQuote.AsObject;
  static serializeBinaryToWriter(message: StockQuote, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StockQuote;
  static deserializeBinaryFromReader(message: StockQuote, reader: jspb.BinaryReader): StockQuote;
}

export namespace StockQuote {
  export type AsObject = {
    symbol: string,
    bidPrice: number,
    askPrice: number,
    lastPrice: number,
    volume: number,
    timestamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    change: number,
    changePercent: number,
    status: QuoteStatus,
  }
}

export class QuoteSubscription extends jspb.Message {
  getSymbolsList(): Array<string>;
  setSymbolsList(value: Array<string>): QuoteSubscription;
  clearSymbolsList(): QuoteSubscription;
  addSymbols(value: string, index?: number): QuoteSubscription;

  getUpdateIntervalMs(): number;
  setUpdateIntervalMs(value: number): QuoteSubscription;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QuoteSubscription.AsObject;
  static toObject(includeInstance: boolean, msg: QuoteSubscription): QuoteSubscription.AsObject;
  static serializeBinaryToWriter(message: QuoteSubscription, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QuoteSubscription;
  static deserializeBinaryFromReader(message: QuoteSubscription, reader: jspb.BinaryReader): QuoteSubscription;
}

export namespace QuoteSubscription {
  export type AsObject = {
    symbolsList: Array<string>,
    updateIntervalMs: number,
  }
}

export class OrderRequest extends jspb.Message {
  getOrderId(): string;
  setOrderId(value: string): OrderRequest;

  getSymbol(): string;
  setSymbol(value: string): OrderRequest;

  getOrderType(): OrderType;
  setOrderType(value: OrderType): OrderRequest;

  getDirection(): OrderDirection;
  setDirection(value: OrderDirection): OrderRequest;

  getQuantity(): number;
  setQuantity(value: number): OrderRequest;

  getPrice(): number;
  setPrice(value: number): OrderRequest;

  getClientId(): string;
  setClientId(value: string): OrderRequest;

  getTimeInForce(): TimeInForce;
  setTimeInForce(value: TimeInForce): OrderRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OrderRequest.AsObject;
  static toObject(includeInstance: boolean, msg: OrderRequest): OrderRequest.AsObject;
  static serializeBinaryToWriter(message: OrderRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OrderRequest;
  static deserializeBinaryFromReader(message: OrderRequest, reader: jspb.BinaryReader): OrderRequest;
}

export namespace OrderRequest {
  export type AsObject = {
    orderId: string,
    symbol: string,
    orderType: OrderType,
    direction: OrderDirection,
    quantity: number,
    price: number,
    clientId: string,
    timeInForce: TimeInForce,
  }
}

export class OrderResponse extends jspb.Message {
  getOrderId(): string;
  setOrderId(value: string): OrderResponse;

  getStatus(): OrderStatus;
  setStatus(value: OrderStatus): OrderResponse;

  getExecutedPrice(): number;
  setExecutedPrice(value: number): OrderResponse;

  getExecutedQuantity(): number;
  setExecutedQuantity(value: number): OrderResponse;

  getRemainingQuantity(): number;
  setRemainingQuantity(value: number): OrderResponse;

  getMessage(): string;
  setMessage(value: string): OrderResponse;

  getTimestamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTimestamp(value?: google_protobuf_timestamp_pb.Timestamp): OrderResponse;
  hasTimestamp(): boolean;
  clearTimestamp(): OrderResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OrderResponse.AsObject;
  static toObject(includeInstance: boolean, msg: OrderResponse): OrderResponse.AsObject;
  static serializeBinaryToWriter(message: OrderResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OrderResponse;
  static deserializeBinaryFromReader(message: OrderResponse, reader: jspb.BinaryReader): OrderResponse;
}

export namespace OrderResponse {
  export type AsObject = {
    orderId: string,
    status: OrderStatus,
    executedPrice: number,
    executedQuantity: number,
    remainingQuantity: number,
    message: string,
    timestamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class CancelOrderRequest extends jspb.Message {
  getOrderId(): string;
  setOrderId(value: string): CancelOrderRequest;

  getClientId(): string;
  setClientId(value: string): CancelOrderRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CancelOrderRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CancelOrderRequest): CancelOrderRequest.AsObject;
  static serializeBinaryToWriter(message: CancelOrderRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CancelOrderRequest;
  static deserializeBinaryFromReader(message: CancelOrderRequest, reader: jspb.BinaryReader): CancelOrderRequest;
}

export namespace CancelOrderRequest {
  export type AsObject = {
    orderId: string,
    clientId: string,
  }
}

export class CancelOrderResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): CancelOrderResponse;

  getMessage(): string;
  setMessage(value: string): CancelOrderResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CancelOrderResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CancelOrderResponse): CancelOrderResponse.AsObject;
  static serializeBinaryToWriter(message: CancelOrderResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CancelOrderResponse;
  static deserializeBinaryFromReader(message: CancelOrderResponse, reader: jspb.BinaryReader): CancelOrderResponse;
}

export namespace CancelOrderResponse {
  export type AsObject = {
    success: boolean,
    message: string,
  }
}

export class OrderHistoryRequest extends jspb.Message {
  getClientId(): string;
  setClientId(value: string): OrderHistoryRequest;

  getMaxOrders(): number;
  setMaxOrders(value: number): OrderHistoryRequest;

  getFromDate(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setFromDate(value?: google_protobuf_timestamp_pb.Timestamp): OrderHistoryRequest;
  hasFromDate(): boolean;
  clearFromDate(): OrderHistoryRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OrderHistoryRequest.AsObject;
  static toObject(includeInstance: boolean, msg: OrderHistoryRequest): OrderHistoryRequest.AsObject;
  static serializeBinaryToWriter(message: OrderHistoryRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OrderHistoryRequest;
  static deserializeBinaryFromReader(message: OrderHistoryRequest, reader: jspb.BinaryReader): OrderHistoryRequest;
}

export namespace OrderHistoryRequest {
  export type AsObject = {
    clientId: string,
    maxOrders: number,
    fromDate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class OrderHistoryResponse extends jspb.Message {
  getOrdersList(): Array<OrderResponse>;
  setOrdersList(value: Array<OrderResponse>): OrderHistoryResponse;
  clearOrdersList(): OrderHistoryResponse;
  addOrders(value?: OrderResponse, index?: number): OrderResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OrderHistoryResponse.AsObject;
  static toObject(includeInstance: boolean, msg: OrderHistoryResponse): OrderHistoryResponse.AsObject;
  static serializeBinaryToWriter(message: OrderHistoryResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OrderHistoryResponse;
  static deserializeBinaryFromReader(message: OrderHistoryResponse, reader: jspb.BinaryReader): OrderHistoryResponse;
}

export namespace OrderHistoryResponse {
  export type AsObject = {
    ordersList: Array<OrderResponse.AsObject>,
  }
}

export class PortfolioRequest extends jspb.Message {
  getClientId(): string;
  setClientId(value: string): PortfolioRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PortfolioRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PortfolioRequest): PortfolioRequest.AsObject;
  static serializeBinaryToWriter(message: PortfolioRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PortfolioRequest;
  static deserializeBinaryFromReader(message: PortfolioRequest, reader: jspb.BinaryReader): PortfolioRequest;
}

export namespace PortfolioRequest {
  export type AsObject = {
    clientId: string,
  }
}

export class PortfolioResponse extends jspb.Message {
  getClientId(): string;
  setClientId(value: string): PortfolioResponse;

  getTotalValue(): number;
  setTotalValue(value: number): PortfolioResponse;

  getCashBalance(): number;
  setCashBalance(value: number): PortfolioResponse;

  getItemsList(): Array<PortfolioItem>;
  setItemsList(value: Array<PortfolioItem>): PortfolioResponse;
  clearItemsList(): PortfolioResponse;
  addItems(value?: PortfolioItem, index?: number): PortfolioItem;

  getDailyPnl(): number;
  setDailyPnl(value: number): PortfolioResponse;

  getTotalPnl(): number;
  setTotalPnl(value: number): PortfolioResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PortfolioResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PortfolioResponse): PortfolioResponse.AsObject;
  static serializeBinaryToWriter(message: PortfolioResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PortfolioResponse;
  static deserializeBinaryFromReader(message: PortfolioResponse, reader: jspb.BinaryReader): PortfolioResponse;
}

export namespace PortfolioResponse {
  export type AsObject = {
    clientId: string,
    totalValue: number,
    cashBalance: number,
    itemsList: Array<PortfolioItem.AsObject>,
    dailyPnl: number,
    totalPnl: number,
  }
}

export class PortfolioItem extends jspb.Message {
  getSymbol(): string;
  setSymbol(value: string): PortfolioItem;

  getQuantity(): number;
  setQuantity(value: number): PortfolioItem;

  getAveragePrice(): number;
  setAveragePrice(value: number): PortfolioItem;

  getCurrentPrice(): number;
  setCurrentPrice(value: number): PortfolioItem;

  getMarketValue(): number;
  setMarketValue(value: number): PortfolioItem;

  getUnrealizedPnl(): number;
  setUnrealizedPnl(value: number): PortfolioItem;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PortfolioItem.AsObject;
  static toObject(includeInstance: boolean, msg: PortfolioItem): PortfolioItem.AsObject;
  static serializeBinaryToWriter(message: PortfolioItem, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PortfolioItem;
  static deserializeBinaryFromReader(message: PortfolioItem, reader: jspb.BinaryReader): PortfolioItem;
}

export namespace PortfolioItem {
  export type AsObject = {
    symbol: string,
    quantity: number,
    averagePrice: number,
    currentPrice: number,
    marketValue: number,
    unrealizedPnl: number,
  }
}

export class MarketDataRequest extends jspb.Message {
  getClientId(): string;
  setClientId(value: string): MarketDataRequest;

  getSymbolsList(): Array<string>;
  setSymbolsList(value: Array<string>): MarketDataRequest;
  clearSymbolsList(): MarketDataRequest;
  addSymbols(value: string, index?: number): MarketDataRequest;

  getDataType(): DataType;
  setDataType(value: DataType): MarketDataRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MarketDataRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MarketDataRequest): MarketDataRequest.AsObject;
  static serializeBinaryToWriter(message: MarketDataRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MarketDataRequest;
  static deserializeBinaryFromReader(message: MarketDataRequest, reader: jspb.BinaryReader): MarketDataRequest;
}

export namespace MarketDataRequest {
  export type AsObject = {
    clientId: string,
    symbolsList: Array<string>,
    dataType: DataType,
  }
}

export class MarketDataUpdate extends jspb.Message {
  getSymbol(): string;
  setSymbol(value: string): MarketDataUpdate;

  getDataType(): DataType;
  setDataType(value: DataType): MarketDataUpdate;

  getQuote(): StockQuote | undefined;
  setQuote(value?: StockQuote): MarketDataUpdate;
  hasQuote(): boolean;
  clearQuote(): MarketDataUpdate;

  getTrade(): Trade | undefined;
  setTrade(value?: Trade): MarketDataUpdate;
  hasTrade(): boolean;
  clearTrade(): MarketDataUpdate;

  getOrderBook(): OrderBookUpdate | undefined;
  setOrderBook(value?: OrderBookUpdate): MarketDataUpdate;
  hasOrderBook(): boolean;
  clearOrderBook(): MarketDataUpdate;

  getTimestamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTimestamp(value?: google_protobuf_timestamp_pb.Timestamp): MarketDataUpdate;
  hasTimestamp(): boolean;
  clearTimestamp(): MarketDataUpdate;

  getDataCase(): MarketDataUpdate.DataCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MarketDataUpdate.AsObject;
  static toObject(includeInstance: boolean, msg: MarketDataUpdate): MarketDataUpdate.AsObject;
  static serializeBinaryToWriter(message: MarketDataUpdate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MarketDataUpdate;
  static deserializeBinaryFromReader(message: MarketDataUpdate, reader: jspb.BinaryReader): MarketDataUpdate;
}

export namespace MarketDataUpdate {
  export type AsObject = {
    symbol: string,
    dataType: DataType,
    quote?: StockQuote.AsObject,
    trade?: Trade.AsObject,
    orderBook?: OrderBookUpdate.AsObject,
    timestamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }

  export enum DataCase { 
    DATA_NOT_SET = 0,
    QUOTE = 3,
    TRADE = 4,
    ORDER_BOOK = 5,
  }
}

export class Trade extends jspb.Message {
  getTradeId(): string;
  setTradeId(value: string): Trade;

  getPrice(): number;
  setPrice(value: number): Trade;

  getQuantity(): number;
  setQuantity(value: number): Trade;

  getDirection(): TradeDirection;
  setDirection(value: TradeDirection): Trade;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Trade.AsObject;
  static toObject(includeInstance: boolean, msg: Trade): Trade.AsObject;
  static serializeBinaryToWriter(message: Trade, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Trade;
  static deserializeBinaryFromReader(message: Trade, reader: jspb.BinaryReader): Trade;
}

export namespace Trade {
  export type AsObject = {
    tradeId: string,
    price: number,
    quantity: number,
    direction: TradeDirection,
  }
}

export class OrderBookUpdate extends jspb.Message {
  getSymbol(): string;
  setSymbol(value: string): OrderBookUpdate;

  getBidsList(): Array<OrderBookLevel>;
  setBidsList(value: Array<OrderBookLevel>): OrderBookUpdate;
  clearBidsList(): OrderBookUpdate;
  addBids(value?: OrderBookLevel, index?: number): OrderBookLevel;

  getAsksList(): Array<OrderBookLevel>;
  setAsksList(value: Array<OrderBookLevel>): OrderBookUpdate;
  clearAsksList(): OrderBookUpdate;
  addAsks(value?: OrderBookLevel, index?: number): OrderBookLevel;

  getTimestamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTimestamp(value?: google_protobuf_timestamp_pb.Timestamp): OrderBookUpdate;
  hasTimestamp(): boolean;
  clearTimestamp(): OrderBookUpdate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OrderBookUpdate.AsObject;
  static toObject(includeInstance: boolean, msg: OrderBookUpdate): OrderBookUpdate.AsObject;
  static serializeBinaryToWriter(message: OrderBookUpdate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OrderBookUpdate;
  static deserializeBinaryFromReader(message: OrderBookUpdate, reader: jspb.BinaryReader): OrderBookUpdate;
}

export namespace OrderBookUpdate {
  export type AsObject = {
    symbol: string,
    bidsList: Array<OrderBookLevel.AsObject>,
    asksList: Array<OrderBookLevel.AsObject>,
    timestamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class OrderBookLevel extends jspb.Message {
  getPrice(): number;
  setPrice(value: number): OrderBookLevel;

  getQuantity(): number;
  setQuantity(value: number): OrderBookLevel;

  getOrderCount(): number;
  setOrderCount(value: number): OrderBookLevel;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OrderBookLevel.AsObject;
  static toObject(includeInstance: boolean, msg: OrderBookLevel): OrderBookLevel.AsObject;
  static serializeBinaryToWriter(message: OrderBookLevel, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OrderBookLevel;
  static deserializeBinaryFromReader(message: OrderBookLevel, reader: jspb.BinaryReader): OrderBookLevel;
}

export namespace OrderBookLevel {
  export type AsObject = {
    price: number,
    quantity: number,
    orderCount: number,
  }
}

export enum OrderType { 
  MARKET = 0,
  LIMIT = 1,
  STOP = 2,
  STOP_LIMIT = 3,
}
export enum OrderDirection { 
  BUY = 0,
  SELL = 1,
}
export enum OrderStatus { 
  PENDING = 0,
  PARTIALLY_FILLED = 1,
  FILLED = 2,
  CANCELLED = 3,
  REJECTED = 4,
  EXPIRED = 5,
}
export enum TimeInForce { 
  DAY = 0,
  GTC = 1,
  IOC = 2,
  FOK = 3,
}
export enum QuoteStatus { 
  NORMAL = 0,
  HALTED = 1,
  CLOSED = 2,
  AUCTION = 3,
}
export enum TradeDirection { 
  BUYER_INITIATED = 0,
  SELLER_INITIATED = 1,
}
export enum DataType { 
  QUOTE = 0,
  TRADE = 1,
  ORDER_BOOK = 2,
}
