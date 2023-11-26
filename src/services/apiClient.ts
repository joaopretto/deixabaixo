import { setupAPIClient, setupAPIRecomendaClient, setupAPITracingClient } from "./api";

export const api = setupAPIClient();

export const apiRecomenda = setupAPIRecomendaClient();

export const apiTracing = setupAPITracingClient();