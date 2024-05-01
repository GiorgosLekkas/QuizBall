import { Navigate, Outlet, useLocation } from "react-router-dom";
import { store, useStore } from "../stores/store";

export default function RequireAdminRole(){
    const {accountStore: {isLoggedIn}, questionStore: {isSet, coinflip}} = useStore();
    const location = useLocation();

    if (!isLoggedIn || store.accountStore.getRole()!=="Admin")
        return <Navigate to='/accessdenied' state = {{from: location}} />
    if (isSet == true)
        return <Navigate to='/activegame' state = {{from: location}} />
    if (coinflip)
        return <Navigate to='/category_selection_is_going' state = {{from: location}} />

    return <Outlet/>
}