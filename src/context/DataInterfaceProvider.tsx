import DashboardInterfaceProvider from "./DashboardInterfaceProvider"
import GroupInterfaceProvider from "./GroupInterfaceProvider"
import SettleDebtInterfaceProvider from "./SettleDebtInterfaceProvider"
import TransactionInterfaceProvider from "./TransactionInterfaceProvider"

export type ProviderType = {
    children?: JSX.Element
}

function DataInterfaceProvider({children}:ProviderType) {
    return (
        <DashboardInterfaceProvider>
            <SettleDebtInterfaceProvider>
                <GroupInterfaceProvider>
                    <TransactionInterfaceProvider>
                        { children }
                    </TransactionInterfaceProvider>
                </GroupInterfaceProvider>
            </SettleDebtInterfaceProvider>
        </DashboardInterfaceProvider>
    )
}
export default DataInterfaceProvider