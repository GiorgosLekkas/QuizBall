import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStore } from "../stores/store";

export default function RequireAuth(){
    const {accountStore: {isLoggedIn}, questionStore: {isSet}} = useStore();
    const location = useLocation();

    if (!isLoggedIn)
        return <Navigate to='/accessdenied' state = {{from: location}} />
    if (isSet == true)
        return <Navigate to='/activegame' state = {{from: location}} />

    return <Outlet/>
}