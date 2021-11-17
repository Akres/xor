import {Axios} from "axios";
import {Stats} from "@xor/xor-domain";
import {parseStats} from "@xor/xor-api-schema";

export default async function getStats(apiClient: Axios): Promise<Stats> {
    const response = await apiClient.get("/stats");
    return parseStats(response.data);
}
