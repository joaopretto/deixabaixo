import axios from "axios"

export function setupAPIClient(ctx = undefined) {
    const api = axios.create({
        baseURL: process.env.REACT_APP_API,
    });

    return api;
}