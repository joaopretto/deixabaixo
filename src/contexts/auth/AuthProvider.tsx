import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { AuthContext } from "./AuthContext";
import { useApi } from "@/hooks/useAPI";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const api = useApi();
  const user = api.getUSer();

  const signin = async (email: string, password: string) => {
    const data = await api.signin(email, password);
    if (data.user && data.token) {
      return true;
    }
    return false;
  };

  const signout = async () => {
    await api.logout();
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};