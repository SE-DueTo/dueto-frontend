import { createContext, useContext } from "react"
import { url } from "../config/configuration"
import { Dashboard, Debt, defaultDashboard, defaultDebt, defaultTransaction, Transaction } from "../types/types"
import { ProviderType } from "./DataInterfaceProvider"
import { LoginContext } from "./LoginProvider"


type DashboardInterfaceContextType = {
    getDashboard: () => Promise<Dashboard>,
    getDashboardDebts: (from: number, limit: number) => Promise<Debt[]>,
    getDashboardTransactions: (from: number, limit: number) => Promise<Transaction[]>
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
        const data = await fetch(`${url}/v1/dashboard/`, {
            headers: {
                Authorization: token || ""
            }
        })
        if(data.status !== 200) return Promise.reject()
        return data.json()
    }

    const getDashboardDebts = async (from: number, limit: number) => {
        const data = await fetch(`${url}/v1/dashboard/debts?from=${from}&limit=${limit}`, {
            headers: {
                Authorization: token || ""
            }
        })
        if(data.status !== 200) return Promise.reject()
        return data.json()
    }

    const getDashboardTransactions = async (from:number, limit:number) => {
        const data = await fetch(`${url}/v1/dashboard/transactions?from=${from}&limit=${limit}`, {
            headers: {
                Authorization: token || ""
            }
        })
        if(data.status !== 200) return Promise.reject()
        return data.json()
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