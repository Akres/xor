import currencies from "./currencies.json";
import {CurrencyInfo} from "@xor/xor-client-schema";

export default function getCurrencies(): Promise<CurrencyInfo[]> {
    return Promise.resolve(
        Object.entries(currencies).map(([code, name]) => ({code, name}))
    );
}
