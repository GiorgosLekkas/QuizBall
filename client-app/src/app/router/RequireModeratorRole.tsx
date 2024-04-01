import { Navigate, Outlet, useLocation } from "react-router-dom";
import { store, useStore } from "../stores/store";

export default function RequireModeratorRole(){
    const {accountStore: {isLoggedIn}} = useStore();
    const location = useLocation();

    if (!isLoggedIn || store.accountStore.getRole()==="User")
        return <Navigate to='/accessdenied' state = {{from: location}} />

    return <Outlet/>
}