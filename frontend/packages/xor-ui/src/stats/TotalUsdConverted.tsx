import React from "react";

interface TotalUsdConvertedProps {
    amount: number;
}

export default function TotalUSDConverted({amount}: TotalUsdConvertedProps) {
    const displayAmount = Math.floor(amount);
    return (
        <div className="stats__variable" >
            <h6>Total USD Converted</h6>
            <h3 className="stats__value">{displayAmount}$</h3>
        </div>
    );
}
