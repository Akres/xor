import {Stats, Convert} from "./generated";

export default function parseStats(str: string): Stats {
    return Convert.toStats(str);
}
