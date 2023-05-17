import { RouteType } from "../model/RouteType";

export const routes: RouteType[] = [
    {path: '/', label: 'Home',always: true},
    {path: '/customers', label: 'Customers', admin: true},
    {path: '/shoppingcart', label: 'Shopping Cart', client: true},
    {path: '/orders', label: 'Orders', client: true},
    {path: '/products', label: 'Products', admin: true},
    {path: '/login', label: "Login",no_authenticated: true},
    {path: '/logout', label: "Logout", authenticated: true}
]