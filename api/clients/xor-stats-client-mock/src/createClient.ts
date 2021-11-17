import {Client} from "@xor/xor-stats-client-domain";
import getStats from "./getStats";

export default function createClient(): Client {
    return {
        getStats,
        logConversions: () => Promise.resolve(),
        init: () => Promise.resolve()
    };
}
