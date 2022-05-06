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
    getDashboard: () => {
        return new Promise((res) => res(defaultDashboard))
    },
    getDashboardDebts: () => {
        return new Promise((res) => res([defaultDebt]))
    },
    getDashboardTransactions: () => {
        return new Promise((res) => res([defaultTransaction]))
    }
}

const DataContext = createContext<DashboardDataContextType>(defaultValues)

function DashboardDataProvider({children}:ProviderType) {

    const { token } = useContext(LoginContext)

    const getDashboard = ():Promise<Dashboard> => {
        return new Promise(async (res, rej) => {
            const data = await fetch(`${get("url")}/v1/dashboard/`, {
                headers: {
                    Authorization: token || ""
                }
            })
            if(data.status !== 200) {
                rej()
                return
            }
            const json = await data.json()
            res(json)
        })
    }

    const getDashboardDebts = ():Promise<Debt[]> => {
        return new Promise(async (res, rej) => {
            const data = await fetch(`${get("url")}/v1/dashboard/debts`, {
                headers: {
                    Authorization: token || ""
                }
            })
            if(data.status !== 200) {
                rej()
                return
            }
            const json = await data.json()
            res(json)
        })
    }

    const getDashboardTransactions = ():Promise<Transaction[]> => {
        return new Promise(async (res, rej) => {
            const data = await fetch(`${get("url")}/v1/dashboard/transactions`, {
                headers: {
                    Authorization: token || ""
                }
            })
            if(data.status !== 200) {
                rej()
                return
            }
            const json = await data.json()
            res(json)
        })
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