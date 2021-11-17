import {Stats} from "@xor/xor-api-schema";

export interface StatsRepository {
    getStats(): Promise<Stats>;
}
