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
            username: '0e].Q>+KO35l0Q#p}[sgW1U]FIbl+,Q?9,Xx)K,8T?b;O,vnh2',
            password: 'So0ABqxBpnmdR+<stEOQ8nh2tI4Ph;.wVLq5y0g5aWJiS{;VE^ft>o1K<w7cSwOr6hhuJHuL{89ldgp$m0Iid2UK.',
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

