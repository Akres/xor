import axios, {Axios} from "axios";

const apiServerUrl = "https://openexchangerates.org/api";

export default function createApiClient(): Axios {
    return axios.create({
        baseURL: apiServerUrl,
        transformResponse: []
    });
}
