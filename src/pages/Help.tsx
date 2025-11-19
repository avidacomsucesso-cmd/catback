import React from "react";
import Layout from "@/components/Layout";
import FinalCTA from "@/components/FinalCTA";

const Help: React.FC = () => {
  return (
    <Layout>
      <div className="container py-16 text-center">
        <h1 className="text-4xl font-bold text-catback-dark-purple">Ajuda e FAQ</h1>
        <p className="mt-4 text-lg text-gray-600">Encontre respostas para suas dúvidas.</p>
        <div className="mt-10 p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-700 dark:text-gray-300">Conteúdo de Ajuda e FAQ em breve...</p>
        </div>
      </div>
      <div className="mt-12">
        <FinalCTA />
      </div>
    </Layout>
  );
};

export default Help;