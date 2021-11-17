import {StatsRepository} from "@xor/xor-domain";
import getStats from "./getStats";

export default function getStatsRepository(): StatsRepository {
    return {
        getStats
    };
}
