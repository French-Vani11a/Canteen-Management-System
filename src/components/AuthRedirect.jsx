import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import Home from "../pages/Home";
import StudentDashboard from "../pages/StudentDashboard";
import AdminDashboard from "../pages/AdminDashboard";

const AuthRedirect = ({element}) => {
    const { isAuthenticated, isStudent } = useContext(AuthContext);

  return isAuthenticated ? element : <Home />;
}

export default AuthRedirect