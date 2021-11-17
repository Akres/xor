import {Client, CurrencyRates} from "@xor/xor-client-domain";

function isValid(currencyRates: CurrencyRates): boolean {
    return Date.now() < currencyRates.validUntil;
}

export default function createCachedClient(client: Client): Client {
    const cache = new Map<string, CurrencyRates>(); // currency code -> currency rates

    return {
        async getExchangeRates(baseCurrency: string): Promise<CurrencyRates> {
            const cachedValue = cache.get(baseCurrency);

            // hit
            if (cachedValue && isValid(cachedValue)) {
                return Promise.resolve(cachedValue);
            }

            // miss or expired
            const newValue = await client.getExchangeRates(baseCurrency);
            cache.set(baseCurrency, newValue);
            return newValue;
        },
        getCurrencies: client.getCurrencies
    };
}
