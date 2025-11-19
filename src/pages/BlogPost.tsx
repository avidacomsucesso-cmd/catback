import React from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FinalCTA from "@/components/FinalCTA";
import { ArrowLeft } from "lucide-react";

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // In a real app, you would fetch post data based on the slug.
  // Using a simple placeholder for now.
  const postTitle = slug?.replace(/-/g, ' ').toUpperCase() || "Artigo do Blog";

  return (
    <Layout>
      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          <Link to="/blog" className="flex items-center text-catback-purple hover:text-catback-dark-purple mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao Blog
          </Link>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            {postTitle}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Publicado em 15 de Outubro, 2024 | Categoria: Fidelização
          </p>

          <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-8 flex items-center justify-center">
            <span className="text-gray-500">Imagem de Capa</span>
          </div>

          <div className="prose dark:prose-invert lg:prose-lg">
            <p>
              Este é o conteúdo detalhado do artigo sobre {postTitle}. Aqui, exploramos as melhores práticas e dicas para implementar a estratégia de fidelização digital no seu negócio.
            </p>
            <h3>A Importância da Retenção</h3>
            <p>
              Estudos mostram que adquirir um novo cliente pode custar até 5 vezes mais do que reter um cliente existente. O foco na lealdade é crucial para a sustentabilidade a longo prazo.
            </p>
            <p>
              Com o CATBACK, você tem as ferramentas para transformar clientes ocasionais em embaixadores da sua marca.
            </p>
            {/* More content placeholder */}
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <FinalCTA />
      </div>
    </Layout>
  );
};

export default BlogPost;