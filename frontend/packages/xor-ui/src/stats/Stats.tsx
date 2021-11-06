import React from "react";
import FavouriteCurrency from "./FavouriteCurrency";
import TotalUSDConverted from "./TotalUsdConverted";
import TotalConversionRequests from "./TotalConversionRequests";

import "./Stats.less";

export default function Stats() {
    return (
        <div className="my-3 stats" >
            <FavouriteCurrency />
            <TotalUSDConverted />
            <TotalConversionRequests />
        </div>
    );
}
