import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { LoginContext } from "../../context/LoginProvider"

type CheckSiteLoginType = {
    children: JSX.Element,
    check: boolean,
}
function CheckSiteLogin({children, check}: CheckSiteLoginType) {

    const loginContext = useContext(LoginContext)
    return (check && !loginContext.isLoggedIn) ? <Navigate to="/login"/> : children

}


export default CheckSiteLogin