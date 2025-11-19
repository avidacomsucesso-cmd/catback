import React from "react";
import Layout from "@/components/Layout";

const Login: React.FC = () => {
  return (
    <Layout>
      <div className="container py-16 text-center">
        <h1 className="text-4xl font-bold text-catback-dark-purple">Entrar na Plataforma</h1>
        <p className="mt-4 text-lg text-gray-600">Acesso ao Dashboard do Lojista.</p>
      </div>
    </Layout>
  );
};

export default Login;