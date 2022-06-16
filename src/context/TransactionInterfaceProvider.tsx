import { createContext, useContext } from "react";
import { url } from "../config/configuration";
import { TransactionAddDTO } from "../types/types";
import { ProviderType } from "./DataInterfaceProvider";
import { LoginContext } from "./LoginProvider";

type TransactionInterfaceContextType = {
    addTransaction: (transaction:TransactionAddDTO) => Promise<void>
}

const defaultValues:TransactionInterfaceContextType = {
    addTransaction: async () => {/*overwritten by provider*/}
}

export const TransactionInterfaceContext = createContext<TransactionInterfaceContextType>(defaultValues)

function TransactionInterfaceProvider({children}:ProviderType) {

    const { token } = useContext(LoginContext)
    
    const addTransaction = async (transaction:TransactionAddDTO):Promise<void> => {
        const data = await fetch(`${url}/v1/transaction/add/`, {
            headers: {
                Authorization: token || "",
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(transaction)
        })
        if(data.status !== 200) {
            Promise.reject()
        }
    }


    return (
        <TransactionInterfaceContext.Provider value={{addTransaction}}>
            {children}
        </TransactionInterfaceContext.Provider>
    )
}

export default TransactionInterfaceProvider