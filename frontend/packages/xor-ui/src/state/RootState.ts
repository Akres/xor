import {CurrenciesState} from "../convertor/state/CurrenciesState";
import {ExchangeState} from "../convertor/state/ExchangeState";

export interface RootState {
    currencies: CurrenciesState;
    exchange: ExchangeState;
}
