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
    update: () => Promise<void>,
    loadMoreDebts: () => Promise<void>,
    loadMoreTransactions: () => Promise<void>,
}
export const DashboardDataContext = createContext<DashboardDataProviderContextType>({
    user: null,
    groups: null,
    balance: 0,
    transactions: null,
    debts: null,
    update: async () => {/*overwritten by provider*/},
    loadMoreDebts: async () => {/*overwritten by provider*/},
    loadMoreTransactions: async () => {/*overwritten by provider*/},
})

export const DEFAULT_LIMIT = 10;

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

        await loadMoreDebts()
        await loadMoreTransactions()
    }

    const loadMoreTransactions = async () => {
        const from = (transactions || []).length
        const t = await dashboard.getDashboardTransactions(from, DEFAULT_LIMIT);
        setTransactions(transactions => {
            const tempTransactions = (transactions || [])
            tempTransactions.push(...t);
            return tempTransactions;
        })
    }

    const loadMoreDebts = async () => {
        const from = (debts || []).length
        const d = await dashboard.getDashboardDebts(from, DEFAULT_LIMIT);
        setDebts(debts => {
            const tempDebts = (debts || [])
            tempDebts.push(...d);
            return tempDebts;
        })
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
            update,
            loadMoreDebts,
            loadMoreTransactions
        }}>
            { children }
        </DashboardDataContext.Provider>        
    )
}

export default DashboardDataProvider