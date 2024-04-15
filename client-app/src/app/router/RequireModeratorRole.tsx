import { Navigate, Outlet, useLocation } from "react-router-dom";
import { store, useStore } from "../stores/store";

export default function RequireModeratorRole(){
    const {accountStore: {isLoggedIn}, questionStore: {isSet}} = useStore();
    const location = useLocation();

    if (!isLoggedIn || store.accountStore.getRole()==="User")
        return <Navigate to='/accessdenied' state = {{from: location}} />
    if (isSet == true)
        return <Navigate to='/activegame' state = {{from: location}} />

    return <Outlet/>
}