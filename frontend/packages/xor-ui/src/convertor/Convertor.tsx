import React from "react";
import {connect, HandleThunkActionCreator} from "react-redux";
import {Currency} from "@xor/xor-domain";
import useOnMount from "../utils/useOnMount";
import CurrencyAmountSelector from "./CurrencyAmountSelector";
import ArrowDownUp from "./ArrowDownUp";
import {RootState} from "../state/RootState";
import {getCurrencies} from "./state/currenciesActions";
import {selectCurrencyList, selectIsLoadingCurrencies} from "./state/currenciesSelectors";
import {selectExchangeItems} from "./state/exchangeSelectors";
import {convert, setExchangeItem} from "./state/exchangeActions";
import {ExchangeItem} from "./state/ExchangeItem";

interface ConvertorProps {
    loadCurrencies: HandleThunkActionCreator<typeof getCurrencies>;
    isLoadingCurrencies: boolean;
    currencies: Currency[];
    items: ExchangeItem[];
    updateExchangeItem: HandleThunkActionCreator<typeof setExchangeItem>;
    doConvert: HandleThunkActionCreator<typeof convert>;
}

function Convertor({
    loadCurrencies,
    isLoadingCurrencies,
    currencies,
    items,
    updateExchangeItem,
    doConvert
}: ConvertorProps) {
    useOnMount(function onMount() {
        loadCurrencies();
    });

    return !isLoadingCurrencies
        ? (
            <form className="mt-3">
                <CurrencyAmountSelector
                    currencies={currencies}
                    onCurrencyAmountChanged={async (currencyAmount) => {
                        updateExchangeItem({itemIndex: 0, currencyAmount});
                        doConvert(0);
                    }}
                    exchangeItem={items[0]}
                />
                <div className="my-4 text-light" >
                    <ArrowDownUp />
                </div>
                <CurrencyAmountSelector
                    currencies={currencies}
                    onCurrencyAmountChanged={async (currencyAmount) => {
                        updateExchangeItem({itemIndex: 1, currencyAmount});
                        doConvert(1);
                    }}
                    exchangeItem={items[1]}
                />
            </form>
        )
        : (
            <span className="spinner-border" role="status" />
        );
}

const mapDispatchToProps = {
    loadCurrencies: getCurrencies,
    updateExchangeItem: setExchangeItem,
    doConvert: convert
};

function mapStateToProps(state: RootState) {
    return {
        isLoadingCurrencies: selectIsLoadingCurrencies(state),
        currencies: selectCurrencyList(state),
        items: selectExchangeItems(state)
    };
}

const enhance = connect(mapStateToProps, mapDispatchToProps);

export default enhance(Convertor);
