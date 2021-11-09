import {Runtime} from "@xor/xor-domain";
import getRatesRepository from "./rates/getRatesRepository";

export function createRuntime(): Runtime {
    return {
        getRatesRepository
    };
}
