import { createContext } from "react";

type SignInCredentials = {
    email: string;
    senha: string;
  }

type RegisterCredentials = {
    email: string;
    nome: string;
    senha: string;
  }

type User = {
  email: string;
}

export type AuthContextType = {
    signin: ({email, senha}: SignInCredentials) => void;
    user?: User;
    signout: () =>void;
    register: ({email, nome, senha}: RegisterCredentials) => void;
}

export const AuthContext = createContext({} as AuthContextType);