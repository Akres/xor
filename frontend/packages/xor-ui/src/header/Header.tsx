import React from "react";

import "./Header.less";
import Xor from "./Xor";
export default function Header() {
    return (
        <header className="mt-5">
            <Xor />
            <span className="subheading">Xchange rates calculatOR</span>
        </header>
    );
}
