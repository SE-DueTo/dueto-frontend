import { DefaultHeader } from "./Header";
import LoginRegisterStack from "./LoginRegisterStack";
import { HeightWrapper } from "./utils";

export function LoginSite() {
    return (
        <HeightWrapper>
            <DefaultHeader/>
            <LoginRegisterStack/>
        </HeightWrapper>
    )
}