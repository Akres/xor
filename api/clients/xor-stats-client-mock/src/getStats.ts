import {Stats} from "@xor/xor-stats-client-domain";

function getRandomChar(chars: string): string {
    return chars.charAt(Math.floor(Math.random() * chars.length));
}

function getRandomCurrency(): string {
    const chars = "ABCDEFGHIJKLMOPQRSTUVWXYZ";
    return getRandomChar(chars) + getRandomChar(chars) + getRandomChar(chars);
}

export default async function getStats(): Promise<Stats> {
    return {
        favouriteTargetCurrency: getRandomCurrency(),
        totalConversionRequests: Math.floor(Math.random() * 1000 + 100),
        totalUsdConverted: Math.random() * 10_0000 + 10_000
    };
}
