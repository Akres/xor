import React, {ChangeEvent} from "react";
import {Currency} from "@xor/xor-domain";
import {ExchangeItem} from "./state/ExchangeItem";
import SwapButton from "./SwapButton";
import RemoveButton from "./RemoveButton";

import "./TargetCurrencyAmount.less";

interface TargetCurrencyAmountProps {
    currencies: Currency[];
    onCurrencyChanged: (currency: Currency) => void;
    exchangeItem: ExchangeItem;
    onSwap: () => void;
    onRemove: () => void;
    showRemoveButton: boolean;
}

export default function TargetCurrencyAmount({
    currencies,
    onCurrencyChanged,
    exchangeItem,
    showRemoveButton,
    onSwap,
    onRemove
}: TargetCurrencyAmountProps) {

    function handleSelectCurrency(event: ChangeEvent<HTMLSelectElement>) {
        onCurrencyChanged(currencies.find(({code}) => code === event.currentTarget.value) || currencies[0]);
    }

    return(
        <div className="target-currency-amount">
            <div className="input-group input-group-md" >
                {!exchangeItem.isLoading &&
                <div className="input-group-text w-50" id="basic-addon1">{exchangeItem.currencyAmount.amount}</div>
                }
                {exchangeItem.isLoading &&
                <div className="input-group-text w-50 target-currency-amount__loading-input override">
                    <span className="spinner-grow spinner-grow-sm" role="status" />
                </div>
                }
                <select
                    className="form-select currency-selector w-50"
                    value={exchangeItem.currencyAmount.code}
                    onChange={handleSelectCurrency}
                >
                    {currencies.map(({code, name}) => (
                        <option value={code} key={code}>{code} - {name}</option>
                    ))}
                </select>
            </div>

            <SwapButton
                onSwap={function handleSwap() {
                    if (!exchangeItem.isLoading) {
                        onSwap();
                    }
                }}
            />
            {showRemoveButton && <RemoveButton
                onRemove={function handleRemove() {
                    if (!exchangeItem.isLoading) {
                        onRemove();
                    }
                }}
            />}
        </div>
    );
}
