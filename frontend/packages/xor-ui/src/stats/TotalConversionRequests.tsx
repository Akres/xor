import React from "react";

interface TotalConversionRequestsProps {
    requests: number;
}

export default function TotalConversionRequests({requests}: TotalConversionRequestsProps) {
    return (
        <div className="stats__variable" >
            <h6>Total Conversion Requests</h6>
            <h3 className="stats__value">{requests}</h3>
        </div>
    );
}
