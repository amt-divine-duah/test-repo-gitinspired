import { useAuthUser } from "react-auth-kit";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ roles, children }) => {
  const authState = useAuthUser();
  const isAuthorized = roles.includes(authState()?.role);

  if (!isAuthorized) {
    return <Navigate to="/forbidden" replace={true}/>;
  }
  return children
};

export default ProtectedRoute
