import DashboardDataProvider from "./DashboardDataProvider"
import SettleDebtProvider from "./SettleDebtProvider"

export type ProviderType = {
    children?: JSX.Element
}

function DataProvider({children}:ProviderType) {
    return (
        <DashboardDataProvider>
            <SettleDebtProvider>
                {children}
            </SettleDebtProvider>
        </DashboardDataProvider>
    )
}
export default DataProvider