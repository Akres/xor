import {StatsData} from "@xor/xor-stats-client-domain";

function addRequestsPerCurrency(old: Record<string, number>, delta: Record<string, number>): Record<string, number> {
    const result = {...old};
    Object.entries(delta)
        .forEach(
            ([currencyCode, requests]) => result[currencyCode] = (result[currencyCode] || 0) + requests
        );
    return result;
}

export default function joinStatsData(old: StatsData, delta: StatsData): StatsData {
    return {
        requestsPerCurrency: addRequestsPerCurrency(old.requestsPerCurrency, delta.requestsPerCurrency),
        totalUsdConverted: old.totalUsdConverted + delta.totalUsdConverted
    };
}

