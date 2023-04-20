import { LoginForm } from "../forms/LoginForm";
import {useDispatch} from "react-redux";
import { authActions } from "../../redux/authSlice";
import { LoginData } from "../../model/LoginData";
import { AUTH_USER_ITEM, authService } from "../../config/auth-service-config";
import { codeActions } from "../../redux/codeSlice";
export const Login: React.FC = () => {
    const dispatch = useDispatch();
    async function loginFn(loginData: LoginData) {
        try {
            const email:string = await authService.login(loginData);
            localStorage.setItem(AUTH_USER_ITEM, email);
            dispatch(authActions.login(email));
            dispatch(codeActions.set("OK")) 
        } catch (error) {
            dispatch(codeActions.set("Wrong Credentials"))
        }
        
    }
    return <LoginForm submitFn = {loginFn}/>
}