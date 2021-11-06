import React from "react";
import Convertor from "./convertor/Convertor";
import Stats from "./stats/Stats";

import "./Main.less";

export default function Main() {
    return (
        <main role="main" className="main">
            <Convertor />
            <Stats />
        </main>
    );
}
