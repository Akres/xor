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
            dataValidity: number; // In miliseconds
        };
        aws: {
            region: string;
            secretAccessKey: string;
            accessKeyId: string;
        };
        useAlternativeCurrencies: boolean;
        useInactiveCurrencies: boolean;
        stats: {
            dataFilePath: string;
            client: string;
        };
    };
}
