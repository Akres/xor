import sleep from "sleep-promise";
import {CurrencyAmount} from "@xor/xor-domain";

function getMultiplier(t: number, min: number, max: number): number {
    return min + t * (max - min);
}

export default async function convert(
    baseAmount: number,
    baseCurrency: string,
    targetCurrencies: string[]
): Promise<CurrencyAmount[]> {
    await sleep(1234);
    return targetCurrencies.map((code) => ({
        code,
        amount: baseAmount * getMultiplier(Math.random(), 0.5, 12)
    }));
}
