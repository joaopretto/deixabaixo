import { User } from "@/types/user";
import { createContext } from "react";

type SignInCredentials = {
    email: string;
    password: string;
  }

export type AuthContextType = {
    signin: ({email, password}: SignInCredentials) => void;
}

export const AuthContext = createContext({} as AuthContextType);