import {Currency} from "@xor/xor-domain";

export interface CurrencyAmount {
    currency: Currency;
    amount: number;
}
