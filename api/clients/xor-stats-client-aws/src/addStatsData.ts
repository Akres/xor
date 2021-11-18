import {AttributeValue, DynamoDBClient, UpdateItemCommand} from "@aws-sdk/client-dynamodb";
import {StatsData} from "@xor/xor-stats-client-domain";


async function ensureCurrenciesExist(dynamoDbClient: DynamoDBClient, currencies: string[]) {

    const attributeNames = Object.fromEntries(
        currencies.map((currency) => [`#currency${currency}`, currency])
    );
    const expressionTerms = currencies.map((currency) =>
        // eslint-disable-next-line max-len
        `requestsPerCurrency.#currency${currency} = if_not_exists(requestsPerCurrency.#currency${currency}, :defaultRequests)`
    );
    const expression = "set " + expressionTerms.join(", ");
    await dynamoDbClient.send(
        new UpdateItemCommand({
            TableName: "xor-stats",
            Key: {"id": {N: "1"}},
            UpdateExpression: expression,
            ExpressionAttributeValues: {
                ":defaultRequests": {"N": "0"}
            },
            ExpressionAttributeNames: attributeNames,
            ReturnValues:"UPDATED_NEW"
        })
    );
}

function getAddExpressionAttributeNames(requestsPerCurrency: Record<string, number>): Record<string, string> {
    return Object.fromEntries(
        Object.keys(requestsPerCurrency)
            .map((currency) => [`#currency${currency}`, currency])
    );
}

function getAddExpressionTerms(requestsPerCurrency: Record<string, number>): string[] {
    return Object.keys(requestsPerCurrency)
        .map((currency) =>
            // eslint-disable-next-line max-len
            `requestsPerCurrency.#currency${currency} = requestsPerCurrency.#currency${currency} + :requestsDelta${currency}`
        );
}

function getAddExpressionValues(requestsPerCurrency: Record<string, number>): Record<string, AttributeValue> {
    return Object.fromEntries(
        Object.entries(requestsPerCurrency)
            .map(([currency, requests]) =>
                [`:requestsDelta${currency}`, {"N": requests.toString()}]
            )
    );
}

async function updateStats(
    dynamoDbClient: DynamoDBClient,
    {totalUsdConverted, requestsPerCurrency}: StatsData
): Promise<void> {
    const addExpressionTerms = getAddExpressionTerms(requestsPerCurrency);
    const addExpressionValues = getAddExpressionValues(requestsPerCurrency);
    const addExpressionAttributeNames = getAddExpressionAttributeNames(requestsPerCurrency);

    await dynamoDbClient.send(new UpdateItemCommand({
        TableName: "xor-stats",
        Key: {"id": {N: "1"}},
        UpdateExpression:
            "set totalUsdConverted = totalUsdConverted + :usdDelta, " + addExpressionTerms.join(", "),
        ExpressionAttributeValues: {
            ":usdDelta": {N: totalUsdConverted.toString()},
            ...addExpressionValues
        },
        ExpressionAttributeNames: addExpressionAttributeNames,
        ReturnValues:"UPDATED_NEW"
    }));
}

export default async function addStatsData(
    dynamoDbClient: DynamoDBClient,
    deltaStatsData: StatsData
): Promise<void> {

    try {
        await ensureCurrenciesExist(dynamoDbClient, Object.keys(deltaStatsData.requestsPerCurrency));
        await updateStats(dynamoDbClient, deltaStatsData);
    } catch (e: any) {
        throw new Error(`AWS Error: ${e.message}`);
    }


}
