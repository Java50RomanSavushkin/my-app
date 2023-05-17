import { Typography } from "@mui/material"
import { RouteType } from "../../model/RouteType"

export type Props = {
    subnav?: boolean,
    routes: RouteType[]
}
export const NavigatorPortrait: React.FC<Props> = (props) => {
    return <Typography>Navigator for Portrait Layout </Typography>
}