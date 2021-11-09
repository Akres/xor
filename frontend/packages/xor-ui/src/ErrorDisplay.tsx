import React from "react";

interface ErrorDisplayProps {
    message: string;
}

export default function ErrorDisplay({message}: ErrorDisplayProps) {
    return (
        <div className="alert alert-danger" role="alert">
            <h3>An error has occurred</h3>
            {message}
        </div>
    );
}
