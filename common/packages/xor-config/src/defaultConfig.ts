import {Config} from "./Config";

const config: Config = {
    api: {
        port: 3333,
        openexchangerates: {
            appId: "",
            apiUrl: "https://openexchangerates.org/api"
        },
        useAlternativeCurrencies: false,
        useInactiveCurrencies: false
    },
    frontend: {
        port: 3000,
        apiUrl: "http://localhost"
    }
};

export default config;
