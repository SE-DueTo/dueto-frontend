import { createContext, useContext } from "react"
import { get } from "../config/config"
import { Dashboard, Debt, defaultDashboard, defaultDebt, defaultTransaction, Transaction } from "../types/types"
import { ProviderType } from "./DataProvider"
import { LoginContext } from "./LoginProvider"


type DashboardDataContextType = {
    getDashboard: () => Promise<Dashboard>,
    getDashboardDebts: () => Promise<Debt[]>,
    getDashboardTransactions: () => Promise<Transaction[]>
}

const defaultValues:DashboardDataContextType = {
    getDashboard: async () => defaultDashboard,
    getDashboardDebts: async () => [defaultDebt],
    getDashboardTransactions: async () => [defaultTransaction]
}

export const DataContext = createContext<DashboardDataContextType>(defaultValues)

function DashboardDataProvider({children}:ProviderType) {

    const { token } = useContext(LoginContext)

    const getDashboard = async () => {
        const data = await fetch(`${get("url")}/v1/dashboard/`, {
            headers: {
                Authorization: token || ""
            }
        })
        if(data.status !== 200) return Promise.reject()
        const json = await data.json()
        return json
    }

    const getDashboardDebts = async () => {
        const data = await fetch(`${get("url")}/v1/dashboard/debts`, {
            headers: {
                Authorization: token || ""
            }
        })
        if(data.status !== 200) return Promise.reject()
        const json = await data.json()
        return json
    }

    const getDashboardTransactions = async () => {
        const data = await fetch(`${get("url")}/v1/dashboard/transactions`, {
            headers: {
                Authorization: token || ""
            }
        })
        if(data.status !== 200) return Promise.reject()
        const json = await data.json()
        return json
    }


    return (
        <DataContext.Provider value={{
            getDashboard,
            getDashboardDebts,
            getDashboardTransactions,
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DashboardDataProvider