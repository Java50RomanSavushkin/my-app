import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/authSlice";

export const Logout: React.FC = () => {
    const authUser = useSelector<any, string>(state => state.auth.authUser)
    const dispatch = useDispatch();
    return <div>
        <button onClick={() => dispatch(authActions.logout())}>Logout {authUser}</button>
    </div>
}