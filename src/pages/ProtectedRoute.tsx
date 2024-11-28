import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export default function ProtectedRoute({ children, requireAdmin }) {
  const user = useAuthStore.getState().user ?? null;

  if (!user || (requireAdmin && !user.isAdmin)) {
    return <Navigate to='/' replace />;
  }
  return children;
}
