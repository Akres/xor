import React, {MouseEvent} from "react";

interface RemoveButtonProps {
    onRemove: () => void;
}

export default function RemoveButton({onRemove}: RemoveButtonProps) {
    function handleClick(e: MouseEvent<HTMLButtonElement>) {
        onRemove();
        e.preventDefault();
    }
    return (
        <button className="btn btn-danger" onClick={handleClick}>
            <i role="button" className="bi bi-x-lg" />
        </button>
    );
}
