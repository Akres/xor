import {Stats} from "@xor/xor-stats-client-domain";
import {loadStatsData} from "./loadStatsData";
import getStatsFilePath from "./getStatsFilePath";
import {StatsData} from "./StatsData";

function getTotalRequests(statsData: StatsData): number {
    return Object.values(statsData.requestsPerCurrency)
        .reduce((acc, curr) => acc + curr, 0);
}

function getFavouriteCurrency(statsData: StatsData): string {
    const maxRequests = 0;
    let favouriteCurrency = "-";
    Object.entries(statsData.requestsPerCurrency).forEach(function compareRequests([currency, nOfRequests]) {
        if (nOfRequests > maxRequests) {
            favouriteCurrency = currency;
        }
    });
    return favouriteCurrency;
}

export default async function getStats(): Promise<Stats> {
    const statsData = await loadStatsData(getStatsFilePath());
    return {
        favouriteTargetCurrency: getFavouriteCurrency(statsData),
        totalConversionRequests: getTotalRequests(statsData),
        totalUsdConverted: statsData.totalUsdConverted
    };

}
