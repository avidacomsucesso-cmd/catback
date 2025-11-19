import React from "react";
import Layout from "@/components/Layout";

const Blog: React.FC = () => {
  return (
    <Layout>
      <div className="container py-16 text-center">
        <h1 className="text-4xl font-bold text-catback-dark-purple">Blog CATBACK</h1>
        <p className="mt-4 text-lg text-gray-600">Dicas e estratégias para o seu negócio.</p>
      </div>
    </Layout>
  );
};

export default Blog;