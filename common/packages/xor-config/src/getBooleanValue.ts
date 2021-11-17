import getStringValue from "./getStringValue";

export default function getBooleanValue(name: string): boolean | null {
    const value = getStringValue(name);
    if (value === null) {
        return null;
    }

    if (value === "1" || value.toLowerCase() == "true" || value.toLowerCase() === "yes") {
        return true;
    }
    if (value === "0" || value.toLowerCase() == "false" || value.toLowerCase() === "no") {
        return true;
    }

    throw new Error(`Unrecognized boolean value ${value} for env variable ${name}`);
}
