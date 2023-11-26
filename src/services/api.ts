import axios from "axios"

export function setupAPIClient(ctx = undefined) {
    const api = axios.create({
        baseURL: "http://localhost:8080/",
    });

    return api;
}

export function setupAPIRecomendaClient(ctx = undefined) {
    const api = axios.create({
        baseURL: "http://localhost:5000/",
    });

    return api;
}

export function setupAPITracingClient(ctx = undefined) {
    const api = axios.create({
        baseURL: "http://localhost:8085/",
    });

    return api;
}