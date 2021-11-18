import {DynamoDBClient, GetItemCommand, ItemResponse} from "@aws-sdk/client-dynamodb";
import {StatsData} from "@xor/xor-stats-client-domain";



function dynamoDbItemToStatsData({Item}: ItemResponse): StatsData {
    if (!Item) {
        // This can happen only when someone removes the object from the DB
        throw new Error("AWS Error: Stats object not present in database.");
    }
    return {
        requestsPerCurrency: Object.fromEntries(
            Object.entries(Item.requestsPerCurrency.M || {}).map(([currency, requests]) =>
                [currency, Number.parseInt(requests.N || "")]
            )
        ),
        totalUsdConverted: Number.parseFloat(Item.totalUsdConverted.N || "")
    };
}

export default async function getStatsData(dynamoDbClient: DynamoDBClient): Promise<StatsData> {
    const command = new GetItemCommand({
        TableName: "xor-stats",
        Key: {
            "id": {N: "1"}
        }
    });

    let itemResponse: ItemResponse;
    try {
        itemResponse = await dynamoDbClient.send(command);
    } catch(e: any) {
        throw new Error(`AWS Error: Could not fetch stats object from database: ${e.message}`);
    }
    return dynamoDbItemToStatsData(itemResponse);
}
