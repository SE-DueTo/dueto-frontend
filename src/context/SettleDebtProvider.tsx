import { createContext } from "react";
import { ProviderType } from "./DataProvider";

//TODO

type SettleDebtContextType = {

}

const defaultValues:SettleDebtContextType = {
    
}

const SettleDebtContext = createContext<SettleDebtContextType>(defaultValues)

function SettleDebtProvider({children}:ProviderType) {
    return (
        <></>
    )
}

export default SettleDebtProvider