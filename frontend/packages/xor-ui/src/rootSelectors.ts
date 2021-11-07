import {RootState} from "./RootState";
import {CurrenciesState} from "./convertor/CurrenciesState";

export function selectCurrencies(state: RootState): CurrenciesState {
    return state?.currencies;
}
