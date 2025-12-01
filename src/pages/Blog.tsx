import React from "react";
import Layout from "@/components/Layout";
import FinalCTA from "@/components/FinalCTA";
import BlogCard from "@/components/BlogCard";

// Mock Data
const mockPosts = [
  {
    id: 1,
    title: "5 Estratégias de Fidelização para Cafés em 2024",
    summary: "Descubra como os cartões de selos digitais podem aumentar a retenção de clientes em 65%. Um guia prático para o seu negócio de restauração.",
    date: "15 de Outubro, 2024",
    category: "Fidelização",
    image: "/placeholder-cafe.jpg", // Placeholder image
    slug: "5-estrategias-fidelizacao-cafes",
  },
  {
    id: 2,
    title: "Como Reduzir No-Shows em Barbearias com Lembretes Automáticos",
    summary: "Aprenda a usar o Agendamento Online do CATBACK para garantir que seus clientes apareçam e otimizar o tempo do seu staff.",
    date: "10 de Outubro, 2024",
    category: "Agendamento",
    image: "/placeholder-barber.jpg", // Placeholder image
    slug: "reduzir-no-shows-barbearias",
  },
  {
    id: 3,
    title: "CRM para Pequenos Negócios: O Guia Essencial",
    summary: "Entenda como uma base de clientes centralizada pode impulsionar suas vendas e marketing, transformando dados em lucro.",
    date: "01 de Outubro, 2024",
    category: "CRM",
    image: "/placeholder-crm.jpg", // Placeholder image
    slug: "crm-pequenos-negocios-guia",
  },
  {
    id: 4,
    title: "Cashback vs. Pontos: Qual o Melhor para o Seu Restaurante?",
    summary: "Análise detalhada dos dois principais métodos de recompensa para o setor de restauração e como escolher o ideal.",
    date: "25 de Setembro, 2024",
    category: "Restauração",
    image: "/placeholder-cashback.jpg", // Placeholder image
    slug: "cashback-vs-pontos-restaurante",
  },
  {
    id: 5,
    title: "O Poder do Display NFC: Avaliações 5 Estrelas Sem Esforço",
    summary: "Descubra como a tecnologia NFC pode simplificar a coleta de avaliações positivas no Google My Business.",
    date: "20 de Setembro, 2024",
    category: "Marketing",
    image: "/placeholder-nfc.jpg", // Placeholder image
    slug: "o-poder-do-display-nfc",
  },
  {
    id: 6,
    title: "Maximizando o LTV: Estratégias de Retenção Pós-Compra",
    summary: "Técnicas avançadas para garantir que o cliente volte após a primeira visita, usando automações de marketing.",
    date: "10 de Setembro, 2024",
    category: "Estratégia",
    image: "/placeholder-ltv.jpg", // Placeholder image
    slug: "maximizando-o-ltv",
  },
];

const Blog: React.FC = () => {
  return (
    <Layout>
      <div className="container py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
            Blog CATBACK
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Dicas e estratégias para fidelizar clientes e fazer o seu negócio crescer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        
        {/* Pagination Placeholder */}
        <div className="mt-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">Mais artigos em breve...</p>
        </div>
      </div>
      <div className="mt-12">
        <FinalCTA />
      </div>
    </Layout>
  );
};

export default Blog;