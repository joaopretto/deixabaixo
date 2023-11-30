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
        auth: {
            username: process.env.NEXT_PUBLIC_BASIC_AUTH_USERNAME!,
            password: process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD!,
          },
    });

    return api;
}

export function setupAPITracingClient(ctx = undefined) {
    const api = axios.create({
        baseURL: "http://localhost:8085/",
        
    });

    return api;
}

