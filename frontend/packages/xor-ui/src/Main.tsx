import React from "react";
import {connect} from "react-redux";
import Stats from "./stats/Stats";
import {RootState} from "./state/RootState";
import {selectErrorMessage, selectHasError} from "./state/errorSelectors";
import Convertor from "./convertor/Convertor";
import ErrorDisplay from "./ErrorDisplay";

import "./Main.less";

interface MainProps {
    hasError: boolean;
    errorMessage: string;
}

function Main({hasError, errorMessage}: MainProps) {
    if (hasError) {
        return (
            <ErrorDisplay message={errorMessage} />
        );
    }

    return (
        <main role="main" className="main">
            <Convertor />
            <Stats />
        </main>
    );
}

const mapDispatchToProps = {

};

function mapStateToProps(state: RootState) {
    return {
        hasError: selectHasError(state),
        errorMessage: selectErrorMessage(state)
    };
}

const enhance = connect(mapStateToProps, mapDispatchToProps);

export default enhance(Main);
