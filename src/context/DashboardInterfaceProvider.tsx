import { createContext, useContext } from "react"
import { get } from "../config/config"
import { Dashboard, Debt, defaultDashboard, defaultDebt, defaultTransaction, Transaction } from "../types/types"
import { ProviderType } from "./DataInterfaceProvider"
import { LoginContext } from "./LoginProvider"


type DashboardInterfaceContextType = {
    getDashboard: () => Promise<Dashboard>,
    getDashboardDebts: () => Promise<Debt[]>,
    getDashboardTransactions: () => Promise<Transaction[]>
}

const defaultValues:DashboardInterfaceContextType = {
    getDashboard: async () => defaultDashboard,
    getDashboardDebts: async () => [defaultDebt],
    getDashboardTransactions: async () => [defaultTransaction]
}

export const DashboardInterfaceContext = createContext<DashboardInterfaceContextType>(defaultValues)

function DashboardInterfaceProvider({children}:ProviderType) {

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
        <DashboardInterfaceContext.Provider value={{
            getDashboard,
            getDashboardDebts,
            getDashboardTransactions,
        }}>
            {children}
        </DashboardInterfaceContext.Provider>
    )
}

export default DashboardInterfaceProvider