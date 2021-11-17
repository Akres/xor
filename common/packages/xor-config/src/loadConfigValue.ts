import {constantCase} from "constant-case";
import getBooleanValue from "./getBooleanValue";
import getIntegerValue from "./getIntegerValue";
import getStringValue from "./getStringValue";

type ConfigValueType = string | number | boolean | ConfigObject;

export interface ConfigObject {
    [key: string]: ConfigValueType;
}

type ConfigValue = ConfigValueType | ConfigObject;

function notNullOrDefault(value: ConfigValueType | null, defaultValue: ConfigValue): ConfigValue {
    return value === null
        ? defaultValue
        : value;
}

export default function loadConfigValue(defaultValue: ConfigValue, prefix: string = ""): ConfigValue {

    const actualPrefix = prefix === ""
        ? ""
        : prefix + "_";

    // Does some weird stuff
    /* eslint-disable indent */
    switch(typeof defaultValue) {
        case "object":
            return Object.fromEntries(
                Object.entries(defaultValue).map(([name, defaultValue]) =>
                    [name, loadConfigValue(defaultValue, `${actualPrefix}${constantCase(name)}` )]
                )
            );
        case "boolean":
            return notNullOrDefault(getBooleanValue(prefix), defaultValue);
        case "number":
            return notNullOrDefault(getIntegerValue(prefix), defaultValue);
        case "string":
            return notNullOrDefault(getStringValue(prefix), defaultValue);
        default:
            throw new Error(`Cannot load config value ${prefix} of type ${typeof defaultValue}`);
    }

    /* eslint-enable indent */


}
