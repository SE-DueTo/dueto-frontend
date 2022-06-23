import { createContext, useContext, useEffect, useState } from "react";
import { Debt, Group, GroupInfo, Transaction, User } from "../types/types";
import { GroupInterfaceContext } from "./GroupInterfaceProvider";

type GroupDataProviderContextType = {
    groupInfo: GroupInfo | null,
    transactions: Transaction[] | null,
    debts: Debt[] | null,
    group: Group | null | undefined,
    users: User[] | null | undefined,
    update: () => Promise<void>,
    loadGroupInfo: () => Promise<void>,
    loadMoreDebts: () => Promise<void>,
    loadMoreTransactions: () => Promise<void>,
}

export const GroupDataContext = createContext<GroupDataProviderContextType>({
    groupInfo: null,
    transactions: null,
    debts: null,
    group: null,
    users: null,
    update: async () => {/*overwritten by provider*/},
    loadGroupInfo: async () => {/*overwritten by provider*/},
    loadMoreDebts: async () => {/*overwritten by provider*/},
    loadMoreTransactions: async () => {/*overwritten by provider*/},
})

type GroupDataProviderType = {
    children: JSX.Element,
    groupId: number,
}

export const DEFAULT_LIMIT = 10;

function GroupDataProvider({children, groupId}:GroupDataProviderType) {
    
    const groupInterfaceContext = useContext(GroupInterfaceContext)
    const [groupInfo, setGroupInfo] = useState<GroupInfo | null>(null)
    const [group, setGroup] = useState<Group | null | undefined>(null)
    const [users, setUsers] = useState<User[] | null | undefined>(null)
    const [transactions, setTransactions] = useState<Transaction[] | null>(null)
    const [debts, setDebts] = useState<Debt[] | null>(null)
    

    const groupDashboard = useContext(GroupInterfaceContext)


    const update = async () => {
        await loadGroupInfo()
        setGroup(groupInfo?.group)
        setUsers(group?.users)
        await loadTransactions()
        await loadDebts()
    }

    const loadGroupInfo = async () => {
        const gI = await groupDashboard.getGroupInfo(groupId)
        setGroupInfo(gI)
    }

    const loadTransactions = async () => {
        const t = await groupDashboard.getTransactions(groupId,  0, DEFAULT_LIMIT);
        setTransactions(t)
    }

    const loadMoreTransactions = async () => {
        const from = (transactions || []).length
        const t = await groupDashboard.getTransactions(groupId, from, DEFAULT_LIMIT);
        setTransactions(oldTransactions => {
            const tempTransactions = (oldTransactions || [])
            tempTransactions.push(...t);
            return tempTransactions;
        })
    }

    const loadDebts = async () => {
        const d = await groupInterfaceContext.getDebts(groupId,  0 , DEFAULT_LIMIT)
        setDebts(d)
    }

    const loadMoreDebts = async () => {
        const from = (debts || []).length
        const d = await groupDashboard.getDebts(groupId, from, DEFAULT_LIMIT);
        setDebts(oldDebts => {
            const tempDebts = (oldDebts || [])
            tempDebts.push(...d);
            return tempDebts;
        })
    }

    useEffect(() => {
        update()
        console.log("update", groupId)
    // eslint-disable-next-line
    }, [groupId])

    return (
        <GroupDataContext.Provider value={{
            groupInfo,
            transactions,
            debts,
            group,
            users,
            update,
            loadGroupInfo,
            loadMoreDebts,
            loadMoreTransactions
        }}>
            { children }
        </GroupDataContext.Provider>
    )
}

export default GroupDataProvider