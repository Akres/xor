import {isAbsolute, join} from "path";
import {config} from "@xor/xor-config";

export default function getStatsFilePath(): string{
    return isAbsolute(config.api.stats.dataFilePath)
        ? config.api.stats.dataFilePath
        : join(process.cwd(), config.api.stats.dataFilePath);
}
