import GroupDashboard from "./GroupDashboard";
import SideBarSite from "./SideBarSite";
import Site from "./Site";

function GroupDashboardSite() {
    return (
        <Site showLogin={false}>
            <SideBarSite>
                <GroupDashboard/>
            </SideBarSite>
        </Site>
    )
}

export default GroupDashboardSite