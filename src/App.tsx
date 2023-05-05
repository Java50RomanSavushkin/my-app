
import React, { ReactNode, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import { Customers } from './components/pages/Customers';
import { Home } from './components/pages/Home';
import { NotFound } from './components/pages/NotFound';
import { Orders } from './components/pages/Orders';
import { Products } from './components/pages/Products';
import { ShoppingCart } from './components/pages/ShoppingCart';
import { routes } from './config/layout-config'

import { NavigatorDesktop } from './components/navigators/NavigatorDesktop';
import { useSelector, useDispatch } from 'react-redux';
import { RouteType } from './model/RouteType';
import { Login } from './components/pages/Login';
import { Logout } from './components/pages/Logout';
import { productsService } from './config/products-service-config';
import { ProductType } from './model/ProductType';
import { productsActions } from './redux/productsSlice';
import { Subscription } from 'rxjs';
import { ordersService } from './config/orders-service-config';
import { shoppingActions } from './redux/shoppingSlice';

function App() {
     const authUser = useSelector<any, string>(state=>state.auth.authUser);
const [routesState, setRoutes] = useState(getRoutes());
const dispatch = useDispatch();
function getRoutes(): RouteType[] {
     const routesRes = routes.filter(routePredicate);
     const logoutRoute = routes.find(route => route.path === '/logout');
     if (logoutRoute) {
          logoutRoute.label = authUser;
     }
     return routesRes;
}
function routePredicate(route: RouteType): boolean | undefined {
     return route.always ||( route.authenticated && !!authUser )
      || (route.admin && authUser.includes('admin')) ||
       (route.no_authenticated && !authUser)  || (route.client && authUser != '' && !authUser.includes("admin"))
}
useEffect(() => {
     setRoutes(getRoutes());
}, [authUser]);
useEffect (() => {
     const subscription = productsService.getProducts()
     .subscribe({
          next: (products: ProductType[]) => {
               console.log(products)
               dispatch(productsActions.setProducts(products))
          }
     })
     return () => subscription.unsubscribe()
}, []);
useEffect(() => {
     let subscription: Subscription;
     if (authUser != '' && !authUser.includes("admin")) {
          subscription = ordersService.getShoppingCart(authUser).subscribe ({
               next: (shopping) => dispatch(shoppingActions.setShopping(shopping))
          })
     } else {
          dispatch(shoppingActions.resetShopping());
     }
     return () => {
          if (subscription) {
               subscription.unsubscribe();
          }
     }
}, [authUser])

     return <BrowserRouter>
          <Routes>
               <Route path='/' element={<NavigatorDesktop routes={routesState} />}>
                    <Route index element={<Home />} />
                    <Route path='customers' element={<Customers />} />
                    <Route path='orders' element={<Orders />} />
                    <Route path='shoppingcart' element={<ShoppingCart />} />
                    <Route path='products' element={<Products/>} />
                    <Route path='login' element={<Login></Login>}/>
                    <Route path='logout' element={<Logout></Logout>}/>
                    <Route path='/*' element={<NotFound/>}/>
              
               </Route>
          </Routes>
     </BrowserRouter>
}

export default App;
