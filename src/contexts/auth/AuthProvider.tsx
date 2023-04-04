import { ReactNode, useEffect } from "react";
import { api } from "../../services/apiClient"
import { AuthContext } from "./AuthContext";
import Router from "next/router"

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  
  async function signin({email, password}: SignInCredentials)  {
    try {
      const response = await api.post("/signin", {
        email,
        password
      });

      console.log(response);

      const { authenticated, principal } = response.data;

      if(typeof localStorage !== "undefined"){
        localStorage.setItem(
            authenticated,
            principal
          );
      }

      Router.push("/");
      
    } catch {}
  }

  return (
    <AuthContext.Provider value={{ signin }}>
      {children}
    </AuthContext.Provider>
  )
}