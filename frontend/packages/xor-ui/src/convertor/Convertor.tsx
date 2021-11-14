import React from "react";
import {connect, HandleThunkActionCreator} from "react-redux";
import {Currency, CurrencyAmount} from "@xor/xor-domain";
import useOnMount from "../utils/useOnMount";
import BaseCurrencyAmount from "./BaseCurrencyAmount";
import TargetCurrencyAmount from "./TargetCurrencyAmount";
import {RootState} from "../state/RootState";
import {getCurrencies} from "./state/currenciesActions";
import {selectCurrencyList, selectIsLoadingCurrencies} from "./state/currenciesSelectors";
import {selectBaseCurrencyAmount, selectTargetItems} from "./state/exchangeSelectors";
import {
    addTargetItem,
    convertBaseToAll,
    convertTarget, removeTargetItem,
    setBaseCurrencyAmount,
    setTargetCurrency,
    swapTargetItem
} from "./state/exchangeActions";
import {ExchangeItem} from "./state/ExchangeItem";

import "./Convertor.less";
import AddButton from "./AddButton";

interface ConvertorProps {
    loadCurrencies: HandleThunkActionCreator<typeof getCurrencies>;
    isLoadingCurrencies: boolean;
    currencies: Currency[];
    baseCurrencyAmount: CurrencyAmount;
    targetItems: ExchangeItem[];
    updateBaseCurrencyAmount: HandleThunkActionCreator<typeof setBaseCurrencyAmount>;
    updateTargetCurrency: HandleThunkActionCreator<typeof setTargetCurrency>;
    doConvertBase: HandleThunkActionCreator<typeof convertBaseToAll>;
    doConvertTarget: HandleThunkActionCreator<typeof convertTarget>;
    doSwapItem: HandleThunkActionCreator<typeof swapTargetItem>;
    doRemoveItem: HandleThunkActionCreator<typeof removeTargetItem>;
    doAddItem: HandleThunkActionCreator<typeof addTargetItem>;
}

function Convertor({
    loadCurrencies,
    isLoadingCurrencies,
    currencies,
    baseCurrencyAmount,
    targetItems,
    updateBaseCurrencyAmount,
    updateTargetCurrency,
    doConvertBase,
    doConvertTarget,
    doSwapItem,
    doRemoveItem,
    doAddItem
}: ConvertorProps) {
    useOnMount(function onMount() {
        loadCurrencies();
    });

    const showAddButton = targetItems.length < 6; // An arbitrary limit to be reasonable

    return !isLoadingCurrencies
        ? (
            <form className="mt-3">
                <BaseCurrencyAmount
                    currencies={currencies}
                    onCurrencyAmountChanged={async (currencyAmount) => {
                        updateBaseCurrencyAmount(currencyAmount);
                        doConvertBase();
                    }}
                    currencyAmount={baseCurrencyAmount}
                />
                <div className="my-4 text-light" >
                    <i className="bi bi-arrow-down convertor__direction-icon" />
                </div>
                {
                    targetItems.map((item, i) =>
                        <TargetCurrencyAmount
                            key={`${item.currencyAmount.code}${i}`}
                            currencies={currencies}
                            onCurrencyChanged={async (currency) => {
                                updateTargetCurrency({targetIndex: i, currency});
                                doConvertTarget(i);
                            }}
                            exchangeItem={item}
                            onSwap={() => doSwapItem(i)}
                            onRemove={() => doRemoveItem(i)}
                            showRemoveButton={targetItems.length > 1}
                        />
                    )
                }
                <div className="mt-5" />
                {showAddButton && <AddButton onAdd={doAddItem} />}
            </form>
        )
        : (
            <span className="spinner-border" role="status" />
        );
}

const mapDispatchToProps = {
    loadCurrencies: getCurrencies,
    updateBaseCurrencyAmount: setBaseCurrencyAmount,
    updateTargetCurrency: setTargetCurrency,
    doConvertBase: convertBaseToAll,
    doConvertTarget: convertTarget,
    doSwapItem: swapTargetItem,
    doRemoveItem: removeTargetItem,
    doAddItem: addTargetItem
};

function mapStateToProps(state: RootState) {
    return {
        isLoadingCurrencies: selectIsLoadingCurrencies(state),
        currencies: selectCurrencyList(state),
        baseCurrencyAmount: selectBaseCurrencyAmount(state),
        targetItems: selectTargetItems(state)
    };
}

const enhance = connect(mapStateToProps, mapDispatchToProps);

export default enhance(Convertor);
