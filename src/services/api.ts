import axios from "axios"

export function setupAPIClient(ctx = undefined) {
    const api = axios.create({
        baseURL: "http://localhost:8080/",
    });

    return api;
}