import { createContext, useContext } from "react";
import { get } from "../config/config";
import { TransactionAddDTO } from "../types/types";
import { ProviderType } from "./DataProvider";
import { LoginContext } from "./LoginProvider";

type TransactionContextType = {
    addTransaction: (transaction:TransactionAddDTO) => Promise<void>
}

const defaultValues:TransactionContextType = {
    addTransaction: (_:TransactionAddDTO) => {
        return new Promise(res => res())
    }
}

const SettleDebtContext = createContext<TransactionContextType>(defaultValues)

function TransactionProvider({children}:ProviderType) {

    const { token } = useContext(LoginContext)

    const addTransaction = (transaction:TransactionAddDTO):Promise<void> => {
        return new Promise(async (res, rej) => {
            const data = await fetch(`${get("url")}/v1/transaction/add/`, {
                headers: {
                    Authorization: token || ""
                },
                method: "POST",
                body: JSON.stringify(transaction)
            })
            if(data.status !== 200) {
                rej()
                return
            }
            res()
        })
    }


    return (
        <SettleDebtContext.Provider value={{addTransaction}}>
            {children}
        </SettleDebtContext.Provider>
    )
}

export default TransactionProvider