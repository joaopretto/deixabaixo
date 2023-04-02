import { User } from "@/types/user";
import { createContext } from "react";

export type AuthContextType = {
    user: User | null;
    signin: (email: string, password: string) => Promise<boolean>;
    signout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: {
        id: 1,
        name: "Test",
        email: "test@test.com",
    },
    signin: (email, password) => Promise.resolve(true),
    signout: () => {},
});