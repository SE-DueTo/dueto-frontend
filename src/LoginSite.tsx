import LoginRegisterStack from "./LoginRegisterStack";
import Site from "./Site";

function LoginSite() {
    return (
        <Site showLogin={true}>
            <LoginRegisterStack/>
        </Site>
    )
}

export default LoginSite