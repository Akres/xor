import {Runtime, startServer} from "@xor/xor-api";
import {createClient} from "@xor/xor-client-openexchangerates";
import {createClient as createStatsClientFs} from "@xor/xor-stats-client-fs";
import {createClient as createStatsClientAws} from "@xor/xor-stats-client-aws";
import {createCachedClient} from "@xor/xor-api-cache";
import {config, throwIfValueEmpty, throwIfValueNotInEnum} from "@xor/xor-config";


// Verify config
throwIfValueEmpty(config.api.stats.client, "api.statsClient");
throwIfValueNotInEnum(config.api.stats.client, "api.statsClient", ["fs", "aws"]);

function createStatsClient() {
    /* eslint-disable indent */
    switch (config.api.stats.client) {
        case "fs":
            return createStatsClientFs();
        case "aws":
            return createStatsClientAws();
        default:
            throw new Error("Unsupported stats client type. This should not be happening.");
    }
    /* eslint-enable indent */
}

const client = createCachedClient(createClient());
const statsClient = createStatsClient();

const runtime: Runtime = {
    getExchangeRatesClient: () => client,
    getStatsClient: () => statsClient
};
startServer(runtime);
