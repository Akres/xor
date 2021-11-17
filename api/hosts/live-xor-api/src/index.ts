import {Runtime, startServer} from "@xor/xor-api";
import {createClient} from "@xor/xor-client-openexchangerates";
import {createClient as createStatsClient} from "@xor/xor-stats-client-fs";
import {createCachedClient} from "@xor/xor-api-cache";

const client = createCachedClient(createClient());
const statsClient = createStatsClient();

const runtime: Runtime = {
    getExchangeRatesClient: () => client,
    getStatsClient: () => statsClient
};
startServer(runtime);
