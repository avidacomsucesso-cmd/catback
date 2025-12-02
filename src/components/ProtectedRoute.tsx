import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectPath = '/login' }) => {
  const { user, isLoading } = useAuth();

  console.log("ProtectedRoute: user =", user, "isLoading =", isLoading); // Log para depuração

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-catback-purple" />
      </div>
    );
  }

  if (!user) {
    console.log("ProtectedRoute: User is null, redirecting to", redirectPath); // Log para depuração
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;