import { ReactNode, useState } from "react";
import { api } from "../../services/apiClient"
import { AuthContext } from "./AuthContext";
import Router from "next/router"
import { rejects } from "assert";

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

      console.log(response);

      const { token } = response.data;

      if(typeof localStorage !== "undefined"){
        localStorage.setItem(
            "token",
            token
          );
      }
      Router.push("/");
    } catch {}
  }

  async function register({email, nome, senha}: RegisterCredentials){
    try{
      await api.post("/usuarios", {
        email,
        nome,
        senha
      });
      Router.push("/login");
    } catch{}
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