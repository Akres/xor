import {Client as RatesClient} from "@xor/xor-client-domain";
import {Client as StatsClient} from "@xor/xor-stats-client-domain";

export interface Runtime {
    getExchangeRatesClient(): RatesClient;
    getStatsClient(): StatsClient;
}
