import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Cat } from "lucide-react";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import Layout from "@/components/Layout";

const CustomerAuth: React.FC = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated customers to their cards page
  React.useEffect(() => {
    if (user && !isLoading) {
      navigate("/customer-cards", { replace: true });
    }
  }, [user, isLoading, navigate]);

  if (isLoading || user) {
    // Show nothing or a loader while redirecting
    return null;
  }

  return (
    <Layout>
      <div className="container py-16 flex justify-center">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <Cat className="w-8 h-8 mx-auto text-catback-purple mb-2" />
            <CardTitle className="text-3xl font-bold text-catback-dark-purple">Acesso Cliente</CardTitle>
            <p className="text-sm text-gray-500">Entre ou crie sua conta para ver seus cartões de fidelidade.</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                    default: {
                        colors: {
                            brand: 'hsl(262 76% 51%)', // catback-purple
                            brandAccent: 'hsl(262 63% 24%)', // catback-dark-purple
                        },
                    },
                },
              }}
              providers={['google', 'apple']}
              redirectTo={`${window.location.origin}/customer-cards`}
              view="sign_in"
              theme="light"
            />
            <div className="text-center text-sm text-gray-500 pt-4">
              <Link to="/login" className="text-catback-energy-orange hover:underline">
                Acesso para Lojistas
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CustomerAuth;