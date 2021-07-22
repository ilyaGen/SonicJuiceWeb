import { useCallback, useEffect, useState } from "react"
import jwt_decode from "jwt-decode"

const storageName = 'userData'


export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userID, setUserID] = useState(null)
    const [isReady, setIsReady] = useState(false)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserID(id)

        localStorage.setItem(storageName, JSON.stringify({ userID: id, token: jwtToken }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserID(null)
        localStorage.removeItem(storageName)
    }, [])


    useEffect(()=> {
        const data =  JSON.parse(localStorage.getItem(storageName))
        if (data && data.token) {
        
            const currentDate = new Date()

            if (jwt_decode(data.token).exp * 1000 < currentDate.getTime())  {
                logout()
            } else {
                login(data.token, data.userID)
            }
        }
        setIsReady(true)
    }, [login, logout])

    return { login, logout, token, userID, isReady }
}