import { Navigate } from 'react-router-dom';
import { isAdminAuthenticated } from '../../utils/adminAuth';

export default function ProtectedRoute({ children }) {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/painel/login" replace />;
  }
  return children;
}
