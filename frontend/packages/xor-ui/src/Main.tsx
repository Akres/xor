import React from "react";
import {connect, HandleThunkActionCreator} from "react-redux";
import {RootState} from "./state/RootState";
import {selectErrorMessage, selectHasError} from "./state/errorSelectors";
import {selectIsLoadingCurrencies} from "./convertor/state/currenciesSelectors";
import {selectIsLoadingStats} from "./stats/state/statsSelectors";
import Stats from "./stats/Stats";
import Convertor from "./convertor/Convertor";
import ErrorDisplay from "./ErrorDisplay";

import "./Main.less";
import useOnMount from "./utils/useOnMount";
import {getCurrencies} from "./convertor/state/currenciesActions";
import {getStats} from "./stats/state/statsActions";

interface MainProps {
    hasError: boolean;
    errorMessage: string;
    isLoading: boolean;
    loadCurrencies: HandleThunkActionCreator<typeof getCurrencies>;
    loadStats: HandleThunkActionCreator<typeof getStats>;
}

function Main({hasError, errorMessage, isLoading, loadCurrencies, loadStats}: MainProps) {
    useOnMount(function onMount() {
        loadCurrencies();
        loadStats();
    });

    if (hasError) {
        return (
            <ErrorDisplay message={errorMessage} />
        );
    }

    if (isLoading) {
        return <div className="spinner-border" role="status" />;
    }

    return (
        <main role="main" className="main">
            <Convertor />
            <Stats />
        </main>
    );
}

const mapDispatchToProps = {
    loadCurrencies: getCurrencies,
    loadStats: getStats
};

function mapStateToProps(state: RootState) {
    return {
        hasError: selectHasError(state),
        errorMessage: selectErrorMessage(state),
        isLoading: selectIsLoadingCurrencies(state) || selectIsLoadingStats(state)
    };
}

const enhance = connect(mapStateToProps, mapDispatchToProps);

export default enhance(Main);
