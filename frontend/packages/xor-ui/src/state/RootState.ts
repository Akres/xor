import {CurrenciesState} from "../convertor/state/CurrenciesState";
import {ExchangeState} from "../convertor/state/ExchangeState";
import {ErrorState} from "./ErrorState";

export interface RootState {
    currencies: CurrenciesState;
    exchange: ExchangeState;
    error: ErrorState;
}
