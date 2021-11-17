import {Runtime, startServer} from "@xor/xor-api";
import {createClient} from "@xor/xor-client-openexchangerates";
import {createCachedClient} from "@xor/xor-api-cache";

const client = createCachedClient(createClient());

const runtime: Runtime = {
    getExchangeRatesClient: () => client
};
startServer(runtime);
