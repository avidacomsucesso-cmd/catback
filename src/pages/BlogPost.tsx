import React from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FinalCTA from "@/components/FinalCTA";
import { ArrowLeft, Clock, User } from "lucide-react";

// Mock data lookup (In a real app, this would be a fetch call)
const mockPostDetails = {
    "5-estrategias-fidelizacao-cafes": {
        title: "5 Estratégias de Fidelização para Cafés em 2024",
        date: "15 de Outubro, 2024",
        category: "Fidelização",
        author: "Equipa CATBACK",
        image: "/placeholder-cafe.jpg",
        content: (
            <>
                <p className="lead">
                    A fidelização de clientes é a espinha dorsal de qualquer café ou pastelaria de sucesso. Em 2024, depender apenas de cartões de papel é um erro. Descubra como a tecnologia digital pode transformar a frequência de visitas dos seus clientes.
                </p>
                
                <h2>1. O Fim dos Cartões de Papel Perdidos</h2>
                <p>
                    Quantos cartões de carimbo já foram esquecidos na carteira ou perdidos? A solução digital do CATBACK permite que o cliente guarde o cartão diretamente no telemóvel (PWA), garantindo que ele está sempre acessível na hora da compra.
                </p>
                
                <h3>Estratégia: Cartões de Selos Digitais</h3>
                <p>
                    Configure um cartão de 10 selos para um café grátis. A validação é feita pelo seu staff via QR Code, de forma rápida e segura.
                </p>
                
                <h2>2. Lembretes de Aniversário Automatizados</h2>
                <p>
                    Use o CRM para registar a data de aniversário dos seus clientes. Enviar uma oferta de bolo ou um desconto especial no dia certo cria uma conexão emocional forte e incentiva uma visita extra.
                </p>
                
                <h2>3. Cashback para Compras Maiores</h2>
                <p>
                    Para produtos de maior valor (como bolos de festa ou refeições completas), o cashback é um incentivo poderoso. Ofereça 5% de volta para ser usado na próxima visita, garantindo o retorno.
                </p>
                
                <h2>4. Segmentação de Clientes Inativos</h2>
                <p>
                    Identifique clientes que não visitam há mais de 30 dias e envie-lhes uma campanha de SMS/WhatsApp com um cupão de "Saudades". Esta é uma das formas mais eficazes de reativar clientes.
                </p>
                
                <h2>5. Otimização do Google My Business</h2>
                <p>
                    Clientes satisfeitos são a sua melhor publicidade. Use o Display NFC do CATBACK para simplificar a coleta de avaliações 5 estrelas no Google, aumentando a sua visibilidade local.
                </p>
            </>
        ),
    },
    // Adicionar mais posts mockados aqui se necessário, ou usar um fallback genérico
};

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = mockPostDetails[slug as keyof typeof mockPostDetails] || {
    title: slug?.replace(/-/g, ' ').toUpperCase() || "Artigo do Blog",
    date: "Data Desconhecida",
    category: "Geral",
    author: "Equipa CATBACK",
    image: "/placeholder.svg",
    content: (
        <p className="lead">
            O conteúdo deste artigo não foi encontrado. Por favor, volte à página do blog.
        </p>
    ),
  };

  return (
    <Layout>
      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          <Link to="/blog" className="flex items-center text-catback-purple hover:text-catback-dark-purple mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao Blog
          </Link>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
            <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" /> {post.date}
            </span>
            <span className="flex items-center">
                <User className="w-4 h-4 mr-1" /> {post.author}
            </span>
            <span className="font-semibold text-catback-energy-orange">
                Categoria: {post.category}
            </span>
          </div>

          <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-8 overflow-hidden">
            <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                    e.currentTarget.onerror = null; 
                    e.currentTarget.src = "/placeholder.svg";
                    e.currentTarget.className = "w-1/3 h-1/3 object-contain mx-auto my-auto p-4";
                }}
            />
          </div>

          <div className="prose dark:prose-invert lg:prose-lg">
            {post.content}
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