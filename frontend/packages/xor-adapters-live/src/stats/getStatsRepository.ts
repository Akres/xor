import {Axios} from "axios";
import {StatsRepository} from "@xor/xor-domain";
import getStats from "./getStats";

export default function getStatsRepository(apiClient: Axios): StatsRepository {
    return {
        getStats: getStats.bind(null, apiClient)
    };
}
