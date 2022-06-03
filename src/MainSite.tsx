import { Main } from "./Main"
import Site from "./Site"

function MainSite() {
    return (
        <Site showLogin={true}>
            <Main/>
        </Site>
    )
}

export default MainSite