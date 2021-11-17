import createRuntimeThunk from "../../utils/createRuntimeThunk";


export const getStats = createRuntimeThunk(
    "stats/getStats",
    async function (runtime) {
        const statsRepository = runtime.getStatsRepository();
        return await statsRepository.getStats();
    }
);
