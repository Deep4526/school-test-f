import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-primary text-xl font-semibold animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  
  if (adminOnly && user.role !== 'admin' && user.role !== 'super_admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;