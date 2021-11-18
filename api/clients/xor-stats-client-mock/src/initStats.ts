import {StatsData} from "@xor/xor-stats-client-domain";

function getRandomInt(min: number, max: number): number {
    return min + Math.floor(Math.random() * (max - min));
}

function getRandomChar(chars: string): string {
    return chars.charAt(getRandomInt(0, chars.length));
}

function getRandomCurrency(): string {
    const chars = "ABCDEFGHIJKLMOPQRSTUVWXYZ";
    return getRandomChar(chars) + getRandomChar(chars) + getRandomChar(chars);
}

function getRandomRequestsPerCurrency(numberOfCurrencies: number): Record<string, number> {
    return Object.fromEntries(
        Array.from({length: numberOfCurrencies}, () => [getRandomCurrency(), getRandomInt(10, 10_000)])
    );
}

export default function getInitStats(): StatsData {
    const nCurrencies = Math.floor(Math.random() * 10 + 3);

    return {
        requestsPerCurrency: getRandomRequestsPerCurrency(nCurrencies),
        totalUsdConverted: Math.random() * 10_0000 + 10_000
    };
}
