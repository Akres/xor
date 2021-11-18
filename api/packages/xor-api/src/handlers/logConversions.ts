import {Runtime} from "../Runtime";

function toRequestsPerCurrency(currencies: string[]): Record<string, number> {
    const result: Record<string, number> = {};
    currencies.forEach(function addCurrencyRequest(currency) {
        result[currency] = (result[currency] || 0) + 1;
    });
    return result;
}

export default async function logConversions(
    runtime: Runtime,
    targetCurrencies: string[],
    requestAmountInUsd: number
): Promise<void> {
    const statsClient = runtime.getStatsClient();

    await statsClient.addStatsData({
        requestsPerCurrency: toRequestsPerCurrency(targetCurrencies),
        totalUsdConverted: requestAmountInUsd * targetCurrencies.length
    });
}
