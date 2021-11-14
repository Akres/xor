import {ConvertQueryParams} from "./ConvertQueryParams";

function isISOCurrencyCode(str: string) {
    return str.length === 3
        && str.toUpperCase() === str;
}

function validateDefined(value: any, name: string) {
    if (typeof value === "undefined") {
        throw new Error(`${name} parameter is required`);
    }
}

function validateDefinedStringAndISO(value: any, name: string) {
    validateDefined(value, name);
    if (typeof value !== "string" || !isISOCurrencyCode(value)) {
        throw new Error(`${name} parameter must be a 3-letter ISO currency code`);
    }
}

function validateDefinedNumberString(value: any, name: string) {
    validateDefined(value, name);

    // Query passes everything as string, so we need to parse the number
    if (typeof value !== "string") {
        throw new Error(`${name} parameter must be a decimal number`);
    }

    if (Number.parseFloat(value).toString() !== value) {
        throw new Error(`${name} parameter must be a decimal number`);
    }
}


export default function getValidatedQueryParams(query: any): ConvertQueryParams {
    validateDefinedStringAndISO(query?.from, "from");
    validateDefinedNumberString(query?.amount, "amount");

    let to;

    if (Array.isArray(query?.to)) {
        query.to.map((toValue: any) => validateDefinedStringAndISO(toValue, "to"));
        to = [...query.to];
    } else {
        validateDefinedStringAndISO(query?.to, "to");
        to = [query.to];
    }

    return {
        from: query.from,
        to,
        amount: Number.parseFloat(query.amount)
    };
}
