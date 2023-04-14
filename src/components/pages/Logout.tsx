import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/authSlice";
export const Logout: React.FC = () => {
    const dispatch = useDispatch();
    return <Box>
        <Button onClick={() => dispatch(authActions.logout())}>Confirm Logout</Button>
    </Box>
}