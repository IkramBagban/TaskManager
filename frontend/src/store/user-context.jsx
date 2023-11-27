import { createContext } from "react";

const UserContext = createContext({
    users : [],
    onLogin:({email,password})=>{},
    onSignup:({email,password})=>{},
    onLogout: ()=>{},
    isAuthenticated: false,
    token : "",
    setToken:()=>{}
})


export default UserContext;