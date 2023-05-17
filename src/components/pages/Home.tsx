import { useSelector } from "react-redux"
import { Products } from "./Products";
import { Orders } from "./Orders";

export const Home: React.FC = () => {
    const authUser = useSelector<any,string>(state => state.auth.authUser);
    return !authUser || !authUser.includes('admin') ? <Products /> : <Orders/>
}