import getStringValue from "./getStringValue";

export default function getIntegerValue(name: string): number | null {
    const value = getStringValue(name);
    if (value === null) {
        return null;
    }
    
    const parsed = Number.parseInt(value);

    if (isNaN(parsed) || parsed.toString() !== value) {
        throw new Error(`Invalid whole number value ${value} for env variable ${name}`);
    }

    return parsed;
}
