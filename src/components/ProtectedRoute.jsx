// have login inside the protected route .. 
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { login } from "../pages/Login";

import {useAuth} from "./context/AuthContext"

export default function ProtectedRoute() {
    const {user, loading}  = useAuth();
    const location = useLocation();

    // loading 
    if(loading) {
        return <h1>Checking that session exists or not .. </h1>
    }
    // authenticating the user
    if(!user) {
        return (
            <Navigate 
            to="/login"
            replace
            state={{from: location}}
            />
        );
    }
return <Outlet/>
}