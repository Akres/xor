import fs from "fs";
import {dirname} from "path";
import getStatsFilePath from "./getStatsFilePath";
import {StatsData} from "./StatsData";

const emptyStats: StatsData = {
    "requestsPerCurrency": {},
    "totalUsdConverted": 0
};

export default async function init() {
    const dataFilePath = getStatsFilePath();

    try {
        await fs.promises.access(dataFilePath);
    } catch { // does not exist
        await fs.promises.mkdir(dirname(dataFilePath), {recursive: true});
        await fs.promises.writeFile(dataFilePath, JSON.stringify(emptyStats));
    }
}

