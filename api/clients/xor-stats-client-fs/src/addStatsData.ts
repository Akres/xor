import fs from "fs";
import {lock} from "proper-lockfile";
import {StatsData} from "@xor/xor-stats-client-domain";
import getStatsFilePath from "./getStatsFilePath";
import {loadStatsData} from "./loadStatsData";

async function saveStatsData(dataFilePath: string, statsData: StatsData): Promise<void> {
    await fs.promises.writeFile(
        dataFilePath,
        JSON.stringify(statsData),
        {
            encoding: "ascii"
        }
    );
}

function addRequestsPerCurrency(old: Record<string, number>, delta: Record<string, number>): Record<string, number> {
    const result = {...old};
    Object.entries(delta)
        .forEach(
            ([currencyCode, requests]) => result[currencyCode] = (result[currencyCode] || 0) + requests
        );
    return result;
}

function joinStatsData(old: StatsData, delta: StatsData): StatsData {
    return {
        requestsPerCurrency: addRequestsPerCurrency(old.requestsPerCurrency, delta.requestsPerCurrency),
        totalUsdConverted: old.totalUsdConverted + delta.totalUsdConverted
    };
}

export default async function addStatsData(deltaStatsData: StatsData): Promise<void> {
    const dataFilePath = getStatsFilePath();
    let release;
    try {
        release = await lock(dataFilePath, {retries: 10});
        const statsData = await loadStatsData(dataFilePath);
        const newStatsData = joinStatsData(statsData, deltaStatsData);
        await saveStatsData(dataFilePath, newStatsData);
    } finally {
        if (release) {
            await release();
        }
    }
}
