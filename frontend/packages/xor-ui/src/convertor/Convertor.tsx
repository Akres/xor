import React from "react";
import {connect, HandleThunkActionCreator} from "react-redux";
import {Currency} from "@xor/xor-domain";
import useOnMount from "../utils/useOnMount";
import CurrencyAmountSelector from "./CurrencyAmountSelector";
import ArrowDownUp from "./ArrowDownUp";
import {RootState} from "../RootState";
import {getCurrencies} from "./currenciesActions";
import {selectCurrencyList} from "./currenciesSelectors";

interface ConvertorProps {
    loadCurrencies: HandleThunkActionCreator<typeof getCurrencies>;
    currencies: Currency[];
}

function Convertor({loadCurrencies, currencies}: ConvertorProps) {
    useOnMount(function onMount() {
        loadCurrencies();
    });

    return (
        <form className="mt-3">
            <CurrencyAmountSelector currencies={currencies} />
            <div className="my-4 text-light" >
                <ArrowDownUp />
            </div>
            <CurrencyAmountSelector currencies={currencies} />
        </form>
    );
}

const mapDispatchToProps = {
    loadCurrencies: getCurrencies
};

function mapStateToProps(state: RootState) {
    return {
        currencies: selectCurrencyList(state)
    };
}

const enhance = connect(mapStateToProps, mapDispatchToProps);

export default enhance(Convertor);
