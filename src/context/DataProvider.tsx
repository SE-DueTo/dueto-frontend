import DashboardDataProvider from "./DashboardDataProvider"
import GroupProvider from "./GroupProvider"
import SettleDebtProvider from "./SettleDebtProvider"
import TransactionProvider from "./TransactionProvider"

export type ProviderType = {
    children?: JSX.Element
}

function DataProvider({children}:ProviderType) {
    return (
        <DashboardDataProvider>
            <SettleDebtProvider>
                <GroupProvider>
                    <TransactionProvider>
                        { children }
                    </TransactionProvider>
                </GroupProvider>
            </SettleDebtProvider>
        </DashboardDataProvider>
    )
}
export default DataProvider