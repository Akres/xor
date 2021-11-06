import React from "react";

import "./CurrencyAmount.less";

export default function CurrencyAmount() {
    return(
        <div className="input-group input-group-md" >
            <input type="number" className="form-control" placeholder="1" />
            <select className="form-select currency-selector">
                <option value="USD">USD - United States Dollar</option>
                <option value="CZK">CZK	- Czech Republic Koruna</option>
                <option value="EUR">EUR - Euro</option>
            </select>
        </div>
    );
}
