import {Client} from "@xor/xor-client-domain";
import createCachedGetter from "./createCachedGetter";

export default function createCachedClient(client: Client): Client {
    return {
        getExchangeRates: createCachedGetter(
            (baseCurrency) => baseCurrency,
            client.getExchangeRates
        ),
        getCurrencies: client.getCurrencies
    };
}
