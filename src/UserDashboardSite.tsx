import SideBarSite from "./SideBarSite"
import Site from "./Site"
import UserDashboard from "./UserDashboard"

function UserDashboardSite() {
    return (
        <Site showLogin={false}>
            <SideBarSite>
                <UserDashboard/>
            </SideBarSite>
        </Site>
    )
}

export default UserDashboardSite