import createRuntimeThunk from "../utils/createRuntimeThunk";


export const getCurrencies = createRuntimeThunk(
    "currencies/getCurrencies",
    async function (runtime) {
        const ratesRepository = runtime.getRatesRepository();
        return await ratesRepository.fetchCurrencies();
    }
);
