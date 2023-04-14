import { LoginForm } from "../forms/LoginForm";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/authSlice";
export const Login: React.FC = () => {
    const dispatch = useDispatch();
    return <LoginForm submitFn={(loginData) =>
        dispatch(authActions.login(loginData.email))} />
}