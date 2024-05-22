import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStore } from "../stores/store";

export default function RequireSecondUser(){
    const {accountStore: {isLoggedIn}, gameStore: {secPlayer}} = useStore();
    const location = useLocation();

    if (!secPlayer)
        return <Navigate to='/seconduserselection' state = {{from: location}} />

    return <Outlet/>
}