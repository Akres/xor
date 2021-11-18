import {StatsData} from "@xor/xor-stats-client-domain";
import {loadStatsData} from "./loadStatsData";
import getStatsFilePath from "./getStatsFilePath";

export default async function getStatsData(): Promise<StatsData> {
    return loadStatsData(getStatsFilePath());
}
