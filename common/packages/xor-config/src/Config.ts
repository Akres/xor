export interface Config {
    frontend: {
        port: number;
        apiUrl: string;
    };
    api: {
        port: number;
        openexchangerates: {
            appId: string;
            apiUrl: string;
        };
        useAlternativeCurrencies: boolean;
        useInactiveCurrencies: boolean;
    };
}
