import { ChannelCredentials, ClientReadableStream } from "@grpc/grpc-js";
import { StockExchangeClient as StockExchangeServiceClient } from "../types/stock_grpc_pb";
import { 
    CancelOrderRequest,
    CancelOrderResponse,
    OrderRequest,
    OrderResponse,
    QuoteSubscription,
    StockQuote, 

} from "../types/stock_pb";

import { Guid } from "guid-ts";

class StockExchangeService{
    private client: StockExchangeServiceClient;

    constructor(){
        const insecureCredentials = ChannelCredentials.createInsecure() // TODO: Включить HTTPS

        // const rootCert = fs.readFileSync('path/to/ca-cert.pem');
        // const secureCredentials = grpc.ChannelCredentials.createSsl(rootCert);
        // const clientSecure = new MyServiceClient('localhost:50051', secureCredentials);

        this.client = new StockExchangeServiceClient('http://localhost:7042', insecureCredentials);
    }

    // Подписки на котировки (серверный поток)
    subscribeQuotes(
        symbols: string[],
        onMessage:(quote: StockQuote) => void,
        onError: (error: any) => void,
        updateIntervalMs: number = 1000
    ): ClientReadableStream<StockQuote> {
        const request = new QuoteSubscription();
        request.setSymbolsList(symbols);
        request.setUpdateIntervalMs(updateIntervalMs);

        return this.client.subscribeQuotes(request).on('data', onMessage).on('error', onError);
    }

     // Размещение ордера (серверный поток)
    async placeOrder(orederRequest: OrderRequest): Promise<OrderResponse>{
        return new Promise((resolve, reject)  => {
            const request = new OrderRequest();
            request.setOrderId(`order_${Guid.newGuid()}`);
            request.setSymbol(orederRequest.getSymbol());
            request.setOrderType(orederRequest.getOrderType());
            request.setDirection(orederRequest.getDirection());
            request.setQuantity(orederRequest.getQuantity());
            request.setClientId(orederRequest.getClientId());
            request.setPrice(orederRequest.getPrice());
            request.setTimeInForce(orederRequest.getTimeInForce());

            this.client.placeOrder(request, (error, response)=> {
                if(error){
                    reject(error)
                } else {
                    resolve(response!);
                }
            });

        
        });
    }

    // Отмена ордера (серверный поток)
    async cancelOrder(orderId: string, clientId: string): Promise<CancelOrderResponse>{
        return new Promise((resolve, reject)  => {
            const request = new CancelOrderRequest();
            request.setOrderId(orderId);
            request.setClientId(clientId);
 

            this.client.cancelOrder(request, (error, response)=> {
                if(error){
                    reject(error)
                } else {
                    resolve(response!);
                }
            });
        });
    }
}