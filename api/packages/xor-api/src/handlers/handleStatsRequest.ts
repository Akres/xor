import {NextFunction, Request, Response} from "express";
import {serializeStats} from "@xor/xor-api-schema";
import {StatsData} from "@xor/xor-stats-client-domain";
import {Runtime} from "../Runtime";

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

export default async function handleStatsRequest(
    runtime: Runtime,
    request: Request,
    response: Response,
    next: NextFunction
) {
    try {
        const client = runtime.getStatsClient();
        const statsData = await client.getStatsData();

        response.status(200);
        response.send(serializeStats({
            favouriteTargetCurrency: getFavouriteCurrency(statsData),
            totalConversionRequests: getTotalRequests(statsData),
            totalUsdConverted: statsData.totalUsdConverted
        }));
    } catch(e) {
        next(e);
    }
}



