import {Client, StatsData} from "@xor/xor-stats-client-domain";
import getInitStats from "./initStats";
import joinStatsData from "./joinStatsData";

export default function createClient(): Client {

    let stats = getInitStats();

    return {
        getStatsData: () => Promise.resolve(stats),
        addStatsData: async (deltaStatsData: StatsData) => {
            stats = joinStatsData(stats, deltaStatsData);
        },
        init: () => Promise.resolve()
    };
}
