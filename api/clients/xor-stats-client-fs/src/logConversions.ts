import fs from "fs";
import {lock} from "proper-lockfile";
import {ConversionLog} from "@xor/xor-stats-client-domain";
import {StatsData} from "./StatsData";
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

function getNewStatsData(statsData: StatsData, log: ConversionLog): StatsData {
    const requestsBefore = statsData.requestsPerCurrency[log.targetCurrencyCode] || 0;
    return {
        requestsPerCurrency: {
            ...statsData.requestsPerCurrency,
            [log.targetCurrencyCode]: requestsBefore + 1
        },
        totalUsdConverted: statsData.totalUsdConverted + log.totalUsd
    };
}

export default async function logConversions(conversionLogs: ConversionLog[]): Promise<void> {
    const dataFilePath = getStatsFilePath();
    let release;
    try {
        release = await lock(dataFilePath, {retries: 10});
        const statsData = await loadStatsData(dataFilePath);
        const newStatsData = conversionLogs.reduce(getNewStatsData, statsData);
        await saveStatsData(dataFilePath, newStatsData);
    } finally {
        if (release) {
            await release();
        }
    }
}
