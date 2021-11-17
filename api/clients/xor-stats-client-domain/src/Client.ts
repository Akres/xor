import {Stats} from "@xor/xor-api-schema";
import {ConversionLog} from "./ConversionLog";

export interface Client {
    getStats(): Promise<Stats>;
    logConversions(conversionLogs: ConversionLog[]): Promise<void>;
    init(): Promise<void>;
}
