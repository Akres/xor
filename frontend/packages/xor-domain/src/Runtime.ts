import {RatesRepository} from "./rates/RatesRepository";
import {StatsRepository} from "./stats/StatsRepository";

export interface Runtime {
    getRatesRepository(): RatesRepository;
    getStatsRepository(): StatsRepository;
}
