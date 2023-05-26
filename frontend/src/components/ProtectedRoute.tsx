import { useAuthUser } from 'react-auth-kit';
import { Navigate } from 'react-router-dom';
import { ProtectedType } from '../customTypesAndInterface/AdminCustomTypes';

const ProtectedRoute = ({ roles, children }: ProtectedType) => {
  const authState = useAuthUser();
  const isAuthorized = roles.includes(authState()?.role);

  if (!isAuthorized) {
    return <Navigate to='/forbidden' replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
