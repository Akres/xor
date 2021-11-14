import React, {MouseEvent} from "react";

interface AddButtonProps {
    onAdd: () => void;
}

export default function AddButton({onAdd}: AddButtonProps) {
    function handleClick(e: MouseEvent<HTMLButtonElement>) {
        onAdd();
        e.preventDefault();
    }
    return (
        <button className="btn btn-success" onClick={handleClick}>
            <i role="button" className="bi bi-plus-lg" />
        </button>
    );
}
