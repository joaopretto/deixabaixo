import LoginPage from "@/pages/login";
import {useContext} from "react";
import { AuthContext } from "./AuthContext";

export const RequireAuth = ({children}: {children: JSX.Element}) => {
    const auth = useContext(AuthContext);

    if(!auth.user){
        return <LoginPage/>
    }
    return children;
}