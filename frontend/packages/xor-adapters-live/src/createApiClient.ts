import axios, {Axios} from "axios";

const apiServerUrl = "http://localhost:3333";

export default function createApiClient(): Axios {
    return axios.create({
        baseURL: apiServerUrl,
        headers: {
            "Content-Type": "application/json"
        }
    });
}
