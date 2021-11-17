import {Config} from "./Config";
import defaultConfig from "./defaultConfig";
import loadConfigValue from "./loadConfigValue";

function getConfig(): Config {
    const config = loadConfigValue( {...defaultConfig}, "XOR");

    return config as any as Config;
}

export default getConfig();
