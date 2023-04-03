import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export const useApi = () => ({
  validateToken: async (token: string) => {
    const response = await api.post("/validate", { token });
    return response.data;
  },
  getUSer: () => {
    if(typeof localStorage !== "undefined"){
        const userString = localStorage.getItem("deixabaixo.user");
        if (userString) return JSON.parse(userString);
        return null;
    }
  },
  signin: async (email: string, password: string) => {
    if(typeof localStorage !== "undefined"){
        localStorage.setItem(
            "deixabaixo.user",
            JSON.stringify({ id: 3, name: "João", email: "joao@gmail.com" })
          );
    }
    return {
      user: { id: 3, name: "João", email: "joao@gmail.com" },
      token: "123456789",
    };
    const response = await api.post("/signin", { email, password }).then((response) => {
    const {authenticated, principal} = response.data;
    });
    
  },
  logout: async () => {
    if(typeof localStorage !== "undefined"){
        localStorage.removeItem("deixabaixo.user");
        const response = await api.post("/logout");
        return response.data;
    }
  },
});