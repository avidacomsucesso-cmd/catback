import React from "react";
import Layout from "@/components/Layout";

const Help: React.FC = () => {
  return (
    <Layout>
      <div className="container py-16 text-center">
        <h1 className="text-4xl font-bold text-catback-dark-purple">Ajuda e FAQ</h1>
        <p className="mt-4 text-lg text-gray-600">Encontre respostas para suas dúvidas.</p>
      </div>
    </Layout>
  );
};

export default Help;