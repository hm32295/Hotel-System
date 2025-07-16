import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/context';
import { Skeleton_Loader } from '../component_Admin/loader/Skeleton';

export default function ProtectedRoute({ children, allowedRole }) {
  const authContext = useContext(AuthContext);

  if (!authContext) return null; // context not ready

  const { loginData, isAuthLoading } = authContext;

  if (isAuthLoading) {
    return <Skeleton_Loader />
  }

  if (!loginData || loginData.role !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
}
