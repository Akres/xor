import {RatesRepository} from "./rates/RatesRepository";

export interface Runtime {
    getRatesRepository(): RatesRepository;
}
