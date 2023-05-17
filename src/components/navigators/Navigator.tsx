
import { useMediaQuery } from "@mui/material"
import { RouteType } from "../../model/RouteType"
import './navigators.css'
import { NavigatorDesktop } from "./NavigatorDesktop"
import { NavigatorPortrait } from "./NavigatorPortrait"
type Props = {
    subnav?: boolean,
    routes: RouteType[]
}
export const Navigator: React.FC<Props> = (props) => {
    const navigatorDesktop =  useMediaQuery('(min-width:600px)');
    return navigatorDesktop ? <NavigatorDesktop routes={props.routes}/>: <NavigatorPortrait routes={props.routes}/>;
}