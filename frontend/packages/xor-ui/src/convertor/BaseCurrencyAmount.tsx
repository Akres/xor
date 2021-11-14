import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import classNames from "classnames";
import {Currency, CurrencyAmount} from "@xor/xor-domain";

interface BaseCurrencyAmountProps {
    currencies: Currency[];
    onCurrencyAmountChanged: (currencyAmount: CurrencyAmount) => void;
    currencyAmount: CurrencyAmount;
}

function getValidAmountOrNull(str: string): number | null {
    const amount = Number.parseFloat(str);
    return amount > 0 && amount.toString() === str
        ? amount
        : null;
}

export default function BaseCurrencyAmount({
    currencies,
    onCurrencyAmountChanged,
    currencyAmount
}: BaseCurrencyAmountProps) {

    const [isValid, setIsValid] = useState(true);
    const [value, setValue] = useState("0");

    useEffect(
        function setValueFromStore() {
            const newAmount = currencyAmount.amount;
            setIsValid(true);
            setValue(newAmount.toString());
        },
        [currencyAmount.amount]
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
                code: currencyAmount.code
            });
        }
    }

    function handleSelectCurrency(event: ChangeEvent<HTMLSelectElement>) {
        onCurrencyAmountChanged({
            ...currencyAmount,
            code: event.currentTarget.value
        });
    }

    return(
        <div className="input-group input-group-md" >
            <input
                type="text"
                className={classNames("form-control", "w-50", {"is-invalid": !isValid})}
                onInput={handleInputAmount}
                required
                value={value}
            />
            <select
                className="form-select currency-selector w-50"
                value={currencyAmount.code}
                onChange={handleSelectCurrency}
            >
                {currencies.map(({code, name}) => (
                    <option value={code} key={code}>{code} - {name}</option>
                ))}
            </select>
        </div>
    );
}
