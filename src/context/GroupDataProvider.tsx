import { createContext, useContext, useEffect, useState } from "react";
import SetleDebtsModal from "../SettleDebts";
import { Debt, GroupInfo, Transaction } from "../types/types";
import { GroupInterfaceContext } from "./GroupInterfaceProvider";

type GroupDataProviderContextType = {
    groupInfo: GroupInfo | null,
    transactions: Transaction[] | null,
    debts: Debt[] | null
}

export const GroupDataContext = createContext<GroupDataProviderContextType>({
    groupInfo: null,
    transactions: null,
    debts: null,
})

type GroupDataProviderType = {
    children: JSX.Element,
    groupId: number,
}

function GroupDataProvider({children, groupId}:GroupDataProviderType) {

    const groupInterfaceContext = useContext(GroupInterfaceContext)

    const [groupInfo, setGroupInfo] = useState<GroupInfo | null>(null)
    const [transactions, setTransactions] = useState<Transaction[] | null>(null)
    const [debts, setDebts] = useState<Debt[] | null>(null)

    useEffect(() => {
        (async () => {
            const gI = await groupInterfaceContext.getGroupInfo(groupId)
            setGroupInfo(gI)
            const t = await groupInterfaceContext.getTransactions(groupId)
            setTransactions(t)
            const d = await groupInterfaceContext.getDebts(groupId)
            setDebts(d)
        })()
    }, [])

    return (
        <GroupDataContext.Provider value={{
            groupInfo,
            transactions,
            debts,
        }}>
            { children }
        </GroupDataContext.Provider>
    )
}

export default GroupDataProvider