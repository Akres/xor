import {Config} from "./Config";

const config: Config = {
    api: {
        port: 3333,
        openexchangerates: {
            appId: "",
            apiUrl: "https://openexchangerates.org/api",
            dataValidity: 60 * 60 * 1000 // Free plan has validity of 1 hour
        },
        useAlternativeCurrencies: false,
        useInactiveCurrencies: false,
        stats: {
            dataFilePath: "./stats-data/stats.json",
            client: "fs"
        },
        aws: {
            region: "",
            accessKeyId: "",
            secretAccessKey: ""
        }
    },
    frontend: {
        port: 3000,
        apiUrl: "http://localhost"
    }
};

export default config;
