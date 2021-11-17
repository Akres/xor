import React from "react";

interface FavouriteCurrencyProps {
    currency: string;
}

export default function FavouriteCurrency({currency}: FavouriteCurrencyProps) {
    return (
        <div className="stats__variable" >
            <h6>Most Favourite Currency</h6>
            <h3 className="stats__value">{currency}</h3>
        </div>
    );
}
