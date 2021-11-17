import {isAbsolute, join} from "path";
import {config} from "@xor/xor-config";

export default function getStatsFilePath(): string{
    return isAbsolute(config.api.statsDataFilePath)
        ? config.api.statsDataFilePath
        : join(process.cwd(), config.api.statsDataFilePath);
}
