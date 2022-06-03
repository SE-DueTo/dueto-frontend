import Logout from "./Logout"
import Site from "./Site"

function LogoutSite() {
    return (
        <Site showAppBar={false} showLogin={false}>
            <Logout/>
        </Site>
    )
}

export default LogoutSite