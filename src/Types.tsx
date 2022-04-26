export type User = {
    userId: number,
    username: string,
    email: string,
    avatarUrl: string | null
}

export type Group = {
    groupname: string,
    groupId: number,
    users: User[],
    type: GroupType
}

export type Transaction = {
    transactor: User,
    group: Group,
    amount: number,
    paymentMethod: PaymentMethods,
    purpose: string,
    date: string
}

export enum GroupType {
    NORMAL,
    SPONTANEOUS
}

export enum PaymentMethods {
    CASH,
    CREDITCARD,
    OTHERS
}