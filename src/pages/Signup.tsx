import React from "react";
import Layout from "@/components/Layout";

const Signup: React.FC = () => {
  return (
    <Layout>
      <div className="container py-16 text-center">
        <h1 className="text-4xl font-bold text-catback-dark-purple">Começar Grátis</h1>
        <p className="mt-4 text-lg text-gray-600">Inicie seu teste de 14 dias.</p>
      </div>
    </Layout>
  );
};

export default Signup;