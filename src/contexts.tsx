import React from "react"
import { Group, User } from "./Types"

type GroupUserdataContextType = {
    user: User | null,
    groups: Group[]
}
export const GroupUserdataContext = React.createContext<GroupUserdataContextType>({
    user: null,
    groups: []
})