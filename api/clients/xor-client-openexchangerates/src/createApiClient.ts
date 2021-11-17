import axios, {Axios} from "axios";
import {config} from "@xor/xor-config";

const apiServerUrl = config.api.openexchangerates.apiUrl;

export default function createApiClient(): Axios {
    return axios.create({
        baseURL: apiServerUrl,
        transformResponse: []
    });
}
