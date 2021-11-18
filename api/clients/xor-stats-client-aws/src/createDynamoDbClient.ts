import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {config} from "@xor/xor-config";

export default function createDynamoDbClient(): DynamoDBClient {
    return new DynamoDBClient({
        region: config.api.aws.region,
        credentials: {
            accessKeyId: config.api.aws.accessKeyId,
            secretAccessKey: config.api.aws.secretAccessKey
        }
    });

}
