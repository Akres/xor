import {Client} from "@xor/xor-stats-client-domain";
import getStatsData from "./getStatsData";
import addStatsData from "./addStatsData";
import init from "./init";

export default function createClient(): Client {
    return {
        getStatsData,
        addStatsData,
        init
    };
}
