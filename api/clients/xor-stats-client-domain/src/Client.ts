import {StatsData} from "./StatsData";

export interface Client {
    getStatsData(): Promise<StatsData>;
    addStatsData(delta: StatsData): Promise<void>;
    init(): Promise<void>;
}
