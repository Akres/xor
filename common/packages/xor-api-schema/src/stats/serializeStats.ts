import {Convert, Stats} from "./generated";

export default function serializeStats(stats: Stats): string {
    return Convert.statsToJson(stats);
}
