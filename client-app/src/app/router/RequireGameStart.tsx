import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStore } from "../stores/store";

export default function RequireGameStart(){
    const {accountStore: {isLoggedIn}, gameStore: {isSet}} = useStore();
    const location = useLocation();

    if (!isLoggedIn || isSet == false)
        return <Navigate to='/accessdenied' state = {{from: location}} />

    return <Outlet/>
}