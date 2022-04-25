import {createContext, useState} from "react";
import { get } from "../config/config";

type LoginProviderType = {
    children: JSX.Element,
}

type LoginContextType = {
    login: (username: string, password: string) => Promise<void>,
    logout: () => Promise<void>
    token: string|null,
    isLoggedIn: boolean
}

export const LoginContext = createContext<LoginContextType>({
    isLoggedIn: false, 
    token: null, 
    login: (_, __) => new Promise((_, rej) => rej()),
    logout: () => new Promise((_, rej) => rej()),
})

function getCookie(key:string):(string|null) {
    const cookie = document.cookie.split("; ").map(e => {
        var split = e.split("=");
        var key = split[0]
        var value = e.substring(e.indexOf("=")+1)
        return [key, value]
    }).filter(e=>(
        e[0] === key
    ))[0]
    return cookie ? cookie[1] : null
}

function LoginProvider({children}:LoginProviderType) {

    const setTokenCookie = (token: (string|null)) => {
        if(!token) {
            document.cookie = `login=; path=/; expires=Sun, 20 Aug 2000 12:00:00 UTC`
            return
        }
        document.cookie = `login=${token}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`
    }

    console.log(getCookie("login"));
    
    const [token, sT] = useState<string|null>(getCookie("login"))

    console.log(token)

    const setToken = (token: (string|null)) => {
        sT(token)
        setTokenCookie(token)
    }

    const login = (username:string, password:string):Promise<void> => {
        return new Promise((resolve, reject) => {
            fetch(`${get("url")}/login`, {
                method: "POST",
                body: JSON.stringify({username, password}),
            })
            .then(e => {
                if(e.status !== 200) {
                    throw Error()
                } else {
                    return e.text()
                }
            })
            .catch(() => { reject() })
            .then(body => {
                body && setToken(body)
                resolve()
            })
        })
    }

    const logout = ():Promise<void> => {
        return new Promise((resolve, reject) => {
            if(!token) {
                resolve()
                return
            }

            fetch(`${get("url")}/v1/user/logout`, {
                headers: {
                    Authorization: token
                },
                method: "POST"
            })
            .then(e => {
                if(e.status !== 200) {
                    throw Error()
                }
            })
            .catch(() => {reject(); return null })
            .then((e) => {
                if(e === null) return

                setToken(null)
                resolve()
            })
        })
    }

    
    const loggedIn = !!token
    console.log(loggedIn, token)

    return (
        <LoginContext.Provider value={{
            isLoggedIn: loggedIn,
            token: token,
            login: login,
            logout: logout,
        }}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginProvider