import { ReactNode, useState } from "react";
import { api } from "../../services/apiClient"
import { AuthContext } from "./AuthContext";
import Router from "next/router"

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

      const { token, principal } = response.data;

      if(typeof localStorage !== "undefined"){
        localStorage.setItem(
            "token",
            token
          );
      }
      Router.push("/");
    } catch {}
  }

  async function signout() {
    localStorage.removeItem("token");
  }  

  return (
    <AuthContext.Provider value={{ signin, user, signout }}>
      {children}
    </AuthContext.Provider>
  )
}