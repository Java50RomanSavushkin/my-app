import { ReactNode, useEffect } from "react"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { RouteType } from "../../model/RouteType"
import './navigators.css'
type Props = {
    subnav?: boolean,
    routes: RouteType[]
}
export const Navigator: React.FC<Props> = ({ subnav, routes }) => {
    const navigate = useNavigate();
    useEffect(() => {
         if (!subnav){
            navigate(routes[0].path)
        }
         }, [])
    function getItems(): ReactNode {
        return routes.map((route, index) =>
            <li className="navigator-item" key={index}>
                <NavLink to={route.path}>{route.label}
                </NavLink></li>)
    }
    return <div style={{marginTop:"10vh"}}>
        <nav>
          <ul className={`navigator-list ${subnav ? 'navigator-sublist' : ''}`}>
            {getItems()}
        </ul>  
        </nav>
        
        <Outlet></Outlet>
    </div>
}