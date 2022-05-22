import { createContext, useContext, useEffect, useState } from "react";
import { Debt, Group, Transaction, User } from "../types/types";
import { DashboardInterfaceContext } from "./DashboardInterfaceProvider";
import { ProviderType } from "./DataInterfaceProvider";

type DashboardDataProviderContextType = {
    user: User | null,
    groups: Group[] | null,
    balance: number,
    transactions: Transaction[] | null,
    debts: Debt[] | null
    update: () => Promise<void>
}
export const DashboardDataContext = createContext<DashboardDataProviderContextType>({
    user: null,
    groups: null,
    balance: 0,
    transactions: null,
    debts: null,
    update: async () => {}
})

function DashboardDataProvider({children}:ProviderType) {

    const [groups, setGroups] = useState<Group[] | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const [balance, setBalance] = useState(0)
    const [transactions, setTransactions] = useState<Transaction[] |null>(null)
    const [debts, setDebts] = useState<Debt[] |null>(null)

    const dashboard = useContext(DashboardInterfaceContext)

    const update = async () => {
        const dashboardData = await dashboard.getDashboard()
        setGroups(dashboardData.groups)
        setUser(dashboardData.user)
        setBalance(dashboardData.balance)

        const d = await dashboard.getDashboardDebts()
        setDebts(d)
        const t = await dashboard.getDashboardTransactions()
        setTransactions(t)
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
            transactions,
            debts,
            update
        }}>
            { children }
        </DashboardDataContext.Provider>        
    )
}

export default DashboardDataProvider