import React from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">A carregar...</div>;
  }

  if (!user) {
    // This should be handled by a protected route wrapper later, but for now, redirect manually
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="container max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-catback-dark-purple dark:text-white mb-6">
          Dashboard do Lojista
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Bem-vindo(a), {user.email}! Esta é a área interna do seu negócio.
        </p>
        
        <Button onClick={handleLogout} variant="destructive">
          Sair
        </Button>
        
        <div className="mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Próximos Passos:
            </h2>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700 dark:text-gray-300">
                <li>1. Implementar a Proteção de Rotas.</li>
                <li>2. Criar o Layout do Dashboard (Sidebar/Header).</li>
                <li>3. Desenvolver a funcionalidade de Cartões de Fidelidade.</li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;