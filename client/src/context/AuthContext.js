import { createContext } from "react";

function noop() {}

export const AuthContext = createContext({
    userID: null,
    token: null,
    login: noop,
    logout: noop,
    isAuthenticated: false
})