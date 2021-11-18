import {constantCase} from "constant-case";

function toEnvVarName(configPath: string): string {
    return `XOR_${constantCase(configPath)}`;
}

export default function throwIfValueEmpty(value: any, path: string) {
    if (value === undefined || value === null || value === "") {
        throw new Error(`${toEnvVarName(path)} variable not set`);
    }
}
