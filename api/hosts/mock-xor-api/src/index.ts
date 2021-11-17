import {Runtime, startServer} from "@xor/xor-api";
import {createClient as createRatesClient} from "@xor/xor-client-mock";
import {createClient as createStatsClient} from "@xor/xor-stats-client-mock";
import {createCachedClient} from "@xor/xor-api-cache";

const ratesClient = createCachedClient(createRatesClient());
const statsClient = createStatsClient();


const runtime: Runtime = {
    getExchangeRatesClient: () => ratesClient,
    getStatsClient: () => statsClient
};
startServer(runtime);
