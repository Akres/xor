import React from "react";
import {render} from "react-dom";
import {App} from "@xor/ui";

const root = document.getElementById("root");

if (!root) {
    throw new Error("Root element cannot be found.");
}



render(<App/>, root);
