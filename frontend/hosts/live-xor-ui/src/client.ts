import {render} from "react-dom";
import createApp from "./createApp";

const root = document.getElementById("root");

if (!root) {
    throw new Error("Root element cannot be found.");
}

render(createApp(), root);
