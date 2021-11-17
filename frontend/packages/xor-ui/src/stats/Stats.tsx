import React from "react";
import {connect} from "react-redux";
import FavouriteCurrency from "./FavouriteCurrency";
import TotalUSDConverted from "./TotalUsdConverted";
import TotalConversionRequests from "./TotalConversionRequests";
import {RootState} from "../state/RootState";
import {selectStats} from "../state/rootSelectors";

import "./Stats.less";

interface StatsProps {
    favouriteTargetCurrency: string;
    totalConversionRequests: number;
    totalUsdConverted: number;
}

export function Stats({favouriteTargetCurrency, totalConversionRequests, totalUsdConverted}: StatsProps) {
    return (
        <div className="my-3 stats" >
            <FavouriteCurrency currency={favouriteTargetCurrency} />
            <TotalUSDConverted amount={totalUsdConverted} />
            <TotalConversionRequests requests={totalConversionRequests} />
        </div>
    );
}


function mapStateToProps(state: RootState) {
    const statsState = selectStats(state);
    return {
        favouriteTargetCurrency: statsState.favouriteTargetCurrency,
        totalConversionRequests: statsState.totalConversionRequests,
        totalUsdConverted: statsState.totalUsdConverted
    };
}

const enhance = connect(mapStateToProps, {});

export default enhance(Stats);
