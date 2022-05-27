import { createContext, useContext } from "react";
import { Debt, defaultDebt, defaultGroupInfo, defaultTransaction, GroupAddNormalDTO, GroupInfo, Transaction } from "../types/types";
import { ProviderType } from "./DataInterfaceProvider";
import { LoginContext } from "./LoginProvider";

type GroupInterfaceProviderType = {
    getGroupInfo: (groupId: number) => Promise<GroupInfo>,
    getDebts: (groupId:number) => Promise<Debt[]>,
    getTransactions: (groupId:number) => Promise<Transaction[]>,
    addNormalGroup: (groupAddDTO:GroupAddNormalDTO) => Promise<number>,
    removeSpontaneousGroup: (groupId:number) => Promise<boolean>,
    addSpontaneousGroup: (groupId:number) => Promise<number>,
}

const defaultValues:GroupInterfaceProviderType = {
    getGroupInfo: async () => defaultGroupInfo,
    getDebts: async() => [defaultDebt],
    getTransactions: async() => [defaultTransaction],
    addNormalGroup: async () => 0,
    removeSpontaneousGroup: async () => true,
    addSpontaneousGroup: async () => 0,
}

export const GroupInterfaceContext = createContext<GroupInterfaceProviderType>(defaultValues)

function GroupInterfaceProvider({children}:ProviderType) {

    const { token } = useContext(LoginContext)

    const url = process.env.REACT_APP_URL;

    const getGroupInfo = async (groupId:number):Promise<GroupInfo> => {
        const data = await fetch(`${url}/v1/group/${groupId}`, {
            headers: {
                Authorization: token || ""
            }
        })
        if(data.status !== 200) return Promise.reject()
        const json = await data.json()
        return json
    }

    const getDebts = async (groupId:number):Promise<Debt[]> => {
        const data = await fetch(`${url}/v1/group/${groupId}/debts`, {
            headers: {
                Authorization: token || ""
            }
        })
        if(data.status !== 200) return Promise.reject()
        const json = await data.json()
        return json
    }

    const getTransactions = async (groupId:number):Promise<Transaction[]> => {
        const data = await fetch(`${url}/v1/group/${groupId}/transactions`, {
            headers: {
                Authorization: token || ""
            }
        })
        if(data.status !== 200) return Promise.reject()
        const json = await data.json()
        return json
    }

    const addNormalGroup = async (groupAddDTO:GroupAddNormalDTO) => {
        const data = await fetch(`${url}/v1/group/normal/add`, {
            headers: {
                Authorization: token || ""
            },
            method: "POST",
            body: JSON.stringify(groupAddDTO)
        })
        if(data.status !== 200) return Promise.reject()
        const text = await data.text()
        return parseInt(text)
    }

    const removeSpontaneousGroup = async (groupId:number) => {
        const data = await fetch(`${url}/v1/group/normal/remove/${groupId}`, {
            headers: {
                Authorization: token || ""
            },
            method: "POST",
        })
        if(data.status !== 200) return Promise.reject()
        const text = await data.text()
        return text==="true"
    }

    const addSpontaneousGroup = async (userId:number) => {
        const data = await fetch(`${url}/v1/group/spontaneous/add`, {
            headers: {
                Authorization: token || ""
            },
            method: "POST",
            body: `${userId}`
        })
        if(data.status !== 200) return Promise.reject()
        const text = await data.text()
        return parseInt(text)
    }

    return (
        <GroupInterfaceContext.Provider value={{
            getGroupInfo,
            getDebts,
            getTransactions,
            addNormalGroup,
            removeSpontaneousGroup,
            addSpontaneousGroup,
        }}>
            { children }
        </GroupInterfaceContext.Provider>
    )
}

export default GroupInterfaceProvider