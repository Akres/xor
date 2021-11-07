import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import classNames from "classnames";
import {Currency, CurrencyAmount} from "@xor/xor-domain";
import {ExchangeItem} from "./state/ExchangeItem";

import "./CurrencyAmountSelector.less";

interface CurrencyAmountProps {
    currencies: Currency[];
    onCurrencyAmountChanged: (currencyAmount: CurrencyAmount) => void;
    exchangeItem: ExchangeItem;
}

function getValidAmountOrNull(str: string): number | null {
    const amount = Number.parseFloat(str);
    return amount > 0 && amount.toString() === str
        ? amount
        : null;
}

export default function CurrencyAmountSelector({
    currencies,
    onCurrencyAmountChanged,
    exchangeItem
}: CurrencyAmountProps) {

    const [isValid, setIsValid] = useState(true);
    const [value, setValue] = useState("0");

    useEffect(
        function setValueFromStore() {
            const newAmount = exchangeItem.currencyAmount.amount;
            setIsValid(true);
            setValue(newAmount.toString());
        },
        [exchangeItem.currencyAmount.amount]
    );


    function handleInputAmount(event: FormEvent<HTMLInputElement>) {
        const newValue = event.currentTarget.value;
        setValue(newValue);
        const newAmount = getValidAmountOrNull(newValue);
        if (newAmount === null) {
            setIsValid(false);
        } else {
            setIsValid(true);
            onCurrencyAmountChanged({
                amount: newAmount,
                code: exchangeItem.currencyAmount.code
            });
        }
    }

    function handleSelectCurrency(event: ChangeEvent<HTMLSelectElement>) {
        onCurrencyAmountChanged({
            ...exchangeItem.currencyAmount,
            code: event.currentTarget.value
        });
    }

    return(
        <div className="input-group input-group-md" >
            {!exchangeItem.isLoading &&
                <input
                    type="text"
                    className={classNames("form-control", {"is-invalid": !isValid})}
                    onInput={handleInputAmount}
                    required
                    value={value}
                />
            }
            {exchangeItem.isLoading &&
                <div
                    className="form-control currency-amount-selector__loading-input override"
                    onInput={handleInputAmount}
                >
                    <span className="spinner-grow spinner-grow-sm" role="status" />
                </div>
            }
            <select
                className="form-select currency-selector"
                value={exchangeItem.currencyAmount.code}
                onChange={handleSelectCurrency}
            >
                {currencies.map(({code, name}) => (
                    <option value={code} key={code}>{code} - {name}</option>
                ))}
            </select>
        </div>
    );
}
