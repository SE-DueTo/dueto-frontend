import { createContext, useContext } from "react";
import { TransactionAddDTO } from "../types/types";
import { ProviderType } from "./DataInterfaceProvider";
import { LoginContext } from "./LoginProvider";

type TransactionInterfaceContextType = {
    addTransaction: (transaction:TransactionAddDTO) => Promise<void>
}

const defaultValues:TransactionInterfaceContextType = {
    addTransaction: async () => {}
}

export const TransactionInterfaceContext = createContext<TransactionInterfaceContextType>(defaultValues)

function TransactionInterfaceProvider({children}:ProviderType) {

    const { token } = useContext(LoginContext)

    const url = process.env.REACT_APP_URL;
    
    const addTransaction = (transaction:TransactionAddDTO):Promise<void> => {
        return new Promise(async (res, rej) => {
            const data = await fetch(`${url}/v1/transaction/add/`, {
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
        <TransactionInterfaceContext.Provider value={{addTransaction}}>
            {children}
        </TransactionInterfaceContext.Provider>
    )
}

export default TransactionInterfaceProvider