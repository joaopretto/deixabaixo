import { ReactNode, useState } from "react";
import { api } from "../../services/apiClient"
import { AuthContext } from "./AuthContext";
import Router from "next/router"
import { message } from "antd";

type RegisterCredentials = {
  email: string;
  nome: string;
  senha: string;
}

type SignInCredentials = {
  email: string;
  senha: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

type User = {
  email: string;
}

export function AuthProvider({ children }: AuthProviderProps) {

  const [user, setUser] = useState<User>();
  
  async function signin({email, senha}: SignInCredentials)  {
    try {
        const response = await api.post("/signin", {
            email,
            senha
        });

        setUser({email});

        const { token } = response.data;

        if (typeof localStorage !== "undefined") {
            localStorage.setItem("token", token);
        }

        Router.push("/");
    } catch (error: any) {
        if (error.response.status === 401) {
            message.error({
              content: error.response.data,
              duration: 5
            });
        }
    }
}

  async function register({email, nome, senha}: RegisterCredentials) {
    try {
      const response = await api.post("/usuarios", {
        email,
        nome,
        senha
      });
  
      // Verifica se a resposta do servidor foi bem-sucedida
      if (response.status === 200) {
        message.success("Usuário cadastrado com sucesso!");
        Router.push("/login");
      } else {
        message.error({
          content: "Ocorreu um erro ao cadastrar o usuário.",
          duration: 5
        });
      }
    } catch (error: any) {
      message.error({
        content: error?.response?.data || error.message,
        duration: 5
      });
    }
  }

  function signout() {
    return new Promise((resolve, reject) => {
      try{
        localStorage.removeItem("token");
        resolve("Logout com sucesso");
      }catch(error){
        reject(error);
      }
    })
  } 

  return (
    <AuthContext.Provider value={{ signin, user, signout, register }}>
      {children}
    </AuthContext.Provider>
  )
}