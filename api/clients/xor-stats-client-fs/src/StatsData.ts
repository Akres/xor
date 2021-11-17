export interface StatsData {
    requestsPerCurrency: {
        [key: string]: number;
    };
    totalUsdConverted: number;
}

