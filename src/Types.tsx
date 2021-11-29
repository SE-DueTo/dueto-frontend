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

export enum GroupType {
    NORMAL,
    SPONTANEOUS
}