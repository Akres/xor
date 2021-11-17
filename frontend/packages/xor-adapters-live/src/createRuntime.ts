import {Runtime} from "@xor/xor-domain";
import getRatesRepository from "./rates/getRatesRepository";
import getStatsRepository from "./stats/getStatsRepository";
import createApiClient from "./createApiClient";

export function createRuntime(): Runtime {
    const apiClient = createApiClient();
    return {
        getRatesRepository: getRatesRepository.bind(null, apiClient),
        getStatsRepository: getStatsRepository.bind(null, apiClient)
    };
}
