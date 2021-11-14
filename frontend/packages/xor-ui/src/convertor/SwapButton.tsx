import React, {MouseEvent} from "react";

import "./SwapButton.less";

interface SwapButtonProps {
    onSwap: () => void;
}

export default function SwapButton({onSwap}: SwapButtonProps) {
    function handleClick(e: MouseEvent<HTMLButtonElement>) {
        onSwap();
        e.preventDefault();
    }
    return (
        <button className="btn btn-primary swap-button" onClick={handleClick}>
            <i role="button" className="bi bi-arrow-down-up" />
        </button>
    );
}
