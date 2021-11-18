import {constantCase} from "constant-case";
import throwIfValueEmpty from "./throwIfValueEmpty";

function toEnvVarName(configPath: string): string {
    return `XOR_${constantCase(configPath)}`;
}

export default function throwIfValueNotInEnum<T extends string | number | boolean>(
    value: T,
    path: string,
    values: T[]
) {
    throwIfValueEmpty(value, path);
    if (!values.includes(value)) {
        throw new Error(`${toEnvVarName(path)} variable can only have values ${values.join(", ")}`);
    }
}
