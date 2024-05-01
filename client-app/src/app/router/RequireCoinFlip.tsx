import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStore } from "../stores/store";

export default function RequireCoinFlip(){
    const {accountStore: {isLoggedIn}, questionStore: {coinflip}} = useStore();
    const location = useLocation();

    if (!isLoggedIn || (!coinflip))
        return <Navigate to='/accessdenied' state = {{from: location}} />

    return <Outlet/>
}