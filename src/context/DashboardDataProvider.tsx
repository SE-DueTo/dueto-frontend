import { createContext, useContext, useEffect, useState } from "react";
import { Group, User } from "../types/types";
import { DashboardInterfaceContext } from "./DashboardInterfaceProvider";
import { ProviderType } from "./DataInterfaceProvider";

type DashboardDataProviderContextType = {
    user: User | null,
    groups: Group[] | null,
    balance: number,
    update: () => Promise<void>
}
export const DashboardDataContext = createContext<DashboardDataProviderContextType>({
    user: null,
    groups: null,
    balance: 0,
    update: async () => {}
})

function DashboardDataProvider({children}:ProviderType) {

    const [groups, setGroups] = useState<Group[] | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const [balance, setBalance] = useState(0)

    const dashboard = useContext(DashboardInterfaceContext)

    const update = async () => {
        const dashboardData = await dashboard.getDashboard()
        setGroups(dashboardData.groups)
        setUser(dashboardData.user)
        setBalance(dashboardData.balance)
    }

//const { groups, user, balance, update } = useContext(DashboardDataProviderContext)

    useEffect(() => {
        update()
    // eslint-disable-next-line
    }, [])
    
    return (
        <DashboardDataContext.Provider value={{
            user, 
            groups, 
            balance, 
            update
        }}>
            { children }
        </DashboardDataContext.Provider>        
    )
}

export default DashboardDataProvider