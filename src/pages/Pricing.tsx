import React from "react";
import Layout from "@/components/Layout";

const Pricing: React.FC = () => {
  return (
    <Layout>
      <div className="container py-16 text-center">
        <h1 className="text-4xl font-bold text-catback-dark-purple">Planos e Preços</h1>
        <p className="mt-4 text-lg text-gray-600">Escolha o plano ideal para o seu negócio.</p>
      </div>
    </Layout>
  );
};

export default Pricing;