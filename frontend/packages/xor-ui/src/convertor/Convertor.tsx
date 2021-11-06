import React from "react";
import CurrencyAmount from "./CurrencyAmount";
import ArrowDownUp from "./ArrowDownUp";

export default function Convertor() {
    return (
        <form className="mt-3">
            <CurrencyAmount />
            <div className="my-4 text-light" >
                <ArrowDownUp />
            </div>
            <CurrencyAmount />
        </form>
    );
}
