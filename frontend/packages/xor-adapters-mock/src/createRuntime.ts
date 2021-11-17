import {Runtime} from "@xor/xor-domain";
import getRatesRepository from "./rates/getRatesRepository";
import getStatsRepository from "./stats/getStatsRepository";

export function createRuntime(): Runtime {
    return {
        getRatesRepository,
        getStatsRepository
    };
}
