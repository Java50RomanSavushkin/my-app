import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/authSlice";
import { AUTH_USER_ITEM, authService } from "../../config/auth-service-config";
export const Logout: React.FC = () => {
    const dispatch = useDispatch();
    async function logoutFn() {
        await authService.logout();
        localStorage.setItem(AUTH_USER_ITEM, '');
        dispatch(authActions.logout());
    }
    return <Box>
        <Button onClick={logoutFn}>Confirm Logout</Button>
    </Box>
}