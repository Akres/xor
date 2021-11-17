import {Client} from "@xor/xor-stats-client-domain";
import getStats from "./getStats";
import logConversions from "./logConversions";
import init from "./init";

export default function createClient(): Client {
    return {
        getStats,
        logConversions,
        init
    };
}
