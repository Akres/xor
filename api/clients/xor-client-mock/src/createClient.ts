import {Client} from "@xor/xor-client-domain";
import getCurrencies from "./getCurrencies";
import getExchangeRates from "./getExchangeRates";

export default function createClient(): Client {
    return {
        getExchangeRates,
        getCurrencies
    };
}
