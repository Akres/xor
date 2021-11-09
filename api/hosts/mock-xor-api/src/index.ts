import {Runtime, startServer} from "@xor/xor-api";
import {createClient} from "@xor/xor-client-mock";

const client = createClient();
const runtime: Runtime = {
    getExchangeRatesClient: () => client
};
startServer(runtime);
