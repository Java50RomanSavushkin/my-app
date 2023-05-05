import { useSelector } from "react-redux"
import { NavLink, Outlet } from "react-router-dom"
import { ProductsClient } from "./ProductsClient";
import { ProductsAdmin } from "./ProductsAdmin";

export const Products: React.FC = () => {
    const authUser = useSelector<any, string>(state => state.auth.authUser);
    return  authUser == '' || !authUser.includes("admin") ? <ProductsClient /> : <ProductsAdmin/>

}