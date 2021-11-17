import {CurrenciesState} from "../convertor/state/CurrenciesState";
import {ExchangeState} from "../convertor/state/ExchangeState";
import {ErrorState} from "./ErrorState";
import {StatsState} from "../stats/state/StatsState";

export interface RootState {
    currencies: CurrenciesState;
    exchange: ExchangeState;
    error: ErrorState;
    stats: StatsState;
}
