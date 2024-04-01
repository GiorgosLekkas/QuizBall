import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStore } from "../stores/store";

export default function RequireAuth(){
    const {accountStore: {isLoggedIn}} = useStore();
    const location = useLocation();

    if (!isLoggedIn)
        return <Navigate to='/accessdenied' state = {{from: location}} />

    return <Outlet/>
}