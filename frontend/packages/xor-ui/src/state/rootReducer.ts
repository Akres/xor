import {combineReducers} from "redux";
import {RootState} from "./RootState";
import currenciesReducer from "../convertor/state/currenciesReducer";
import exchangeReducer from "../convertor/state/exchangeReducer";

export default combineReducers<RootState>({
    currencies: currenciesReducer,
    exchange: exchangeReducer
});
