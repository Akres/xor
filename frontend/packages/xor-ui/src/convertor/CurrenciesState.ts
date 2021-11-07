import {Currency} from "@xor/xor-domain";

export interface CurrenciesState {
    isLoading: boolean;
    currencies?: Currency[];
}
