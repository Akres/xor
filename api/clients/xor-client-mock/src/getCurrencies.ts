import {Currency} from "@xor/xor-client-schema";
import currencies from "./currencies.json";

export default function getCurrencies(): Promise<Currency[]> {
    return Promise.resolve(
        Object.entries(currencies).map(([code, name]) => ({code, name}))
    );
}
