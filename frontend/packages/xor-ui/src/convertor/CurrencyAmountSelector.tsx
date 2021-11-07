import React from "react";
import {Currency} from "@xor/xor-domain";

interface CurrencyAmountProps {
    currencies: Currency[];
}

export default function CurrencyAmountSelector({currencies}: CurrencyAmountProps) {
    return(
        <div className="input-group input-group-md" >
            <input type="number" className="form-control" placeholder="1" />
            <select className="form-select currency-selector">
                {currencies.map(({code, name}) => (
                    <option value={code} key={code}>{code} - {name}</option>
                ))}
            </select>
        </div>
    );
}
