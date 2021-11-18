import {Client} from "@xor/xor-stats-client-domain";
import {config, throwIfValueEmpty} from "@xor/xor-config";
import createDynamoDbClient from "./createDynamoDbClient";
import getStatsData from "./getStatsData";
import addStatsData from "./addStatsData";

function verifyConfig() {
    throwIfValueEmpty(config.api.aws.region, "api.aws.region");
    throwIfValueEmpty(config.api.aws.accessKeyId, "api.aws.accessKeyId");
    throwIfValueEmpty(config.api.aws.secretAccessKey, "api.aws.secretAccessKey");
}

export default function createClient(): Client {
    verifyConfig();
    const dynamoDbClient = createDynamoDbClient();

    return {
        getStatsData: getStatsData.bind(null, dynamoDbClient),
        addStatsData: addStatsData.bind(null, dynamoDbClient),
        init: () => Promise.resolve()
    };
}
