import { createContext, useContext } from "react";
import { get } from "../config/config";
import { SettleDebtAddDTO } from "../types/types";
import { ProviderType } from "./DataProvider";
import { LoginContext } from "./LoginProvider";

type SettleDebtContextType = {
    addDebt: (settleDebtAddDTO: SettleDebtAddDTO) => Promise<boolean>
}

const defaultValues:SettleDebtContextType = {
    addDebt: async () => true
}

const SettleDebtContext = createContext<SettleDebtContextType>(defaultValues)

function SettleDebtProvider({children}:ProviderType) {
    
    const { token } = useContext(LoginContext)

    const addDebt = async (settleDebtAddDTO: SettleDebtAddDTO) => {
        const data = await fetch(`${get("url")}/v1/debt/add`, {
            headers: {
                Authorization: token || ""
            },
            method: "POST",
            body: JSON.stringify(settleDebtAddDTO)
        })
        if(data.status !== 200) return Promise.reject()
        const text = await data.text()
        return text==="true"
    }
    
    return (
        <SettleDebtContext.Provider value={{
            addDebt
        }}>
            { children }
        </SettleDebtContext.Provider>
    )
}

export default SettleDebtProvider