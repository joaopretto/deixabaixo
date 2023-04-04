import { createContext } from "react";

type SignInCredentials = {
    email: string;
    senha: string;
  }

type User = {
  email: string;
}

export type AuthContextType = {
    signin: ({email, senha}: SignInCredentials) => void;
    user?: User;
    signout: () => {}
}

export const AuthContext = createContext({} as AuthContextType);