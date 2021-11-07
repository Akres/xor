import {combineReducers} from "redux";
import {RootState} from "./RootState";
import currenciesReducer from "./convertor/currenciesReducer";

export default combineReducers<RootState>({
    currencies: currenciesReducer
});
