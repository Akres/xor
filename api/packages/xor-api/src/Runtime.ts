import {Client} from "@xor/xor-client-domain";

export interface Runtime {
    getExchangeRatesClient(): Client;
}
