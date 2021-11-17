import axios, {Axios} from "axios";
import {config} from "@xor/xor-config";

const apiServerUrl = `${config.frontend.apiUrl}:${config.api.port}`;

export default function createApiClient(): Axios {
    return axios.create({
        baseURL: apiServerUrl,
        transformResponse: []
    });
}
