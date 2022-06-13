import { createContext, useContext } from "react"
import { url } from "../config/configuration"
import { defaultUser, User } from "../types/types"
import { ProviderType } from "./DataInterfaceProvider"
import { LoginContext } from "./LoginProvider"

type UserInterfaceContextType = {
    getUsers: (username: string, limit: number) => Promise<User[]>,
}

const defaultValues:UserInterfaceContextType = {
    getUsers: async () => [defaultUser],
}

export const UserInterfaceContext = createContext<UserInterfaceContextType>(defaultValues)

function UserInterfaceProvider({children}:ProviderType) {
    
    const { token } = useContext(LoginContext)

    const getUsers = async (username: string, limit: number) => {
        const data = await fetch(`${url}/v1/user/${username}?limit=${limit}`, {
            headers: {
                Authorization: token || ""
            }
        })
        if(data.status !== 200) return Promise.reject()
        return data.json()
    }

    return (
        <UserInterfaceContext.Provider value={{
            getUsers,
        }}>
            {children}
        </UserInterfaceContext.Provider>
    )
}

export default UserInterfaceProvider