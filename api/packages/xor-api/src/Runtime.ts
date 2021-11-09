import {Client} from "@xor/xor-client-schema";

export interface Runtime {
    getExchangeRatesClient(): Client;
}
