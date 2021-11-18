import fs from "fs";
import {StatsData} from "@xor/xor-stats-client-domain";

export async function loadStatsData(dataFilePath: string): Promise<StatsData> {
    // There is something seriously wrong if we cannot find it
    const contents = await fs.promises.readFile(dataFilePath, "ascii");
    return JSON.parse(contents) as StatsData;
}
