import createRuntimeThunk from "../../utils/createRuntimeThunk";
import {initializeExchangeItems} from "./exchangeActions";


export const getCurrencies = createRuntimeThunk(
    "currencies/getCurrencies",
    async function (runtime,_, dispatch) {
        const ratesRepository = runtime.getRatesRepository();
        const currencies = await ratesRepository.fetchCurrencies();
        dispatch(initializeExchangeItems(currencies));
        return currencies;
    }
);
