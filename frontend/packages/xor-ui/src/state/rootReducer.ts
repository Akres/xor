import {combineReducers} from "redux";
import {RootState} from "./RootState";
import currenciesReducer from "../convertor/state/currenciesReducer";
import exchangeReducer from "../convertor/state/exchangeReducer";
import errorReducer from "./errorReducer";
import statsReducer from "../stats/state/statsReducer";

export default combineReducers<RootState>({
    currencies: currenciesReducer,
    exchange: exchangeReducer,
    error: errorReducer,
    stats: statsReducer
});
