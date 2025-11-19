import React from "react";
import Layout from "@/components/Layout";
import FinalCTA from "@/components/FinalCTA";

const Blog: React.FC = () => {
  return (
    <Layout>
      <div className="container py-16 text-center">
        <h1 className="text-4xl font-bold text-catback-dark-purple">Blog CATBACK</h1>
        <p className="mt-4 text-lg text-gray-600">Dicas e estratégias para o seu negócio.</p>
        <div className="mt-10 p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-700 dark:text-gray-300">Conteúdo do Blog em breve...</p>
        </div>
      </div>
      <div className="mt-12">
        <FinalCTA />
      </div>
    </Layout>
  );
};

export default Blog;