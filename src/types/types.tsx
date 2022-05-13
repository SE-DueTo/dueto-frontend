export type User = {
    avatarUrl: string | null,
    email: string,
    userId: number,
    username: string
}

export const defaultUser:User = {
    avatarUrl: null,
    email: "",
    userId: 0,
    username: "N/A"
}

export type Group = {
    groupId: number,
    groupName: string,
    groupType: "NORMAL" | "SPONTANEOUS",
    users: User[],
}

export const defaultGroup:Group = {
    groupId: 0,
    groupName: "",
    groupType: "NORMAL",
    users: [defaultUser],
}

export type GroupInfo = {
    sum: number,
    group: Group
}

export const defaultGroupInfo:GroupInfo = {
    sum: 0,
    group: defaultGroup
}

export type GroupAddNormalDTO = {
    groupname: string,
    password: string,
    users: number[]
}

export type Debt = {
    amount: number,
    creditor: User,
    creditorId: number,
    date: string,
    debtId: number,
    debtor: User,
    group: Group,
    paymentMethod: string
}

export const defaultDebt:Debt = {
    amount: 0,
    creditor: defaultUser,
    creditorId: 0,
    date: "",
    debtId: 0,
    debtor: defaultUser,
    group: defaultGroup,
    paymentMethod: "",
}

export type Transaction = {
    amount: number,
    date: string,
    groupId: number,
    paymentMethod: string,
    purpose: string,
    repeatingInterval: number,
    transactionId: number,
    userAmountList: any
}

export type TransactionAddDTO = {
    amount: number,
    date: string,
    groupId: number,
    paymentMethod: string,
    purpose: string,
    repeatingInterval: number,
    userAmountList: any
}

export const defaultTransaction:Transaction= {
    amount: 0,
    date: "",
    groupId: 0,
    paymentMethod: "",
    purpose: "",
    repeatingInterval: -1,
    transactionId: 0,
    userAmountList: {}
}

export type Dashboard = {
    balance: number,
    groups: Group[],
    user: User,
}

export const defaultDashboard:Dashboard = {
    balance: 0,
    groups: [defaultGroup],
    user: defaultUser,
}