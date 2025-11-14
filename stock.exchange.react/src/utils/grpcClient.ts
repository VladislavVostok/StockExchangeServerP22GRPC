import { Metadata } from "@grpc/grpc-js";
//import { Metadata } from "grpc-web";

// Базовый класс для gRPC клиентов

export class GrpcClient{
    protected baseUrl: string;

    constructor(){
        this.baseUrl ='https://localhost:7042';  // Сервер gRPC на asp .net core TODO: Актуализировать урл севера.
    }

    protected getMetadata(): Metadata{
        const metadata = new Metadata();
        metadata.set('x-client-type', 'react-web');
        return metadata;
    }

}