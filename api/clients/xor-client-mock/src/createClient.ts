import {Client} from "@xor/xor-client-schema";
import getCurrencies from "./getCurrencies";
import getExchangeRates from "./getExchangeRates";

export default function createClient(): Client {
    return {
        getExchangeRates,
        getCurrencies
    };
}
