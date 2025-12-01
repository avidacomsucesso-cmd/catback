import React from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FinalCTA from "@/components/FinalCTA";
import { ArrowLeft, Clock, User } from "lucide-react";

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Mock data lookup (In a real app, this would be a fetch call)
  const mockPost = {
    title: slug?.replace(/-/g, ' ').toUpperCase() || "Artigo do Blog",
    date: "15 de Outubro, 2024",
    category: "Fidelização",
    author: "Equipa CATBACK",
    image: `/placeholder-${slug}.jpg`, // Use slug-specific image
  };

  return (
    <Layout>
      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          <Link to="/blog" className="flex items-center text-catback-purple hover:text-catback-dark-purple mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao Blog
          </Link>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            {mockPost.title}
          </h1>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
            <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" /> {mockPost.date}
            </span>
            <span className="flex items-center">
                <User className="w-4 h-4 mr-1" /> {mockPost.author}
            </span>
            <span className="font-semibold text-catback-energy-orange">
                Categoria: {mockPost.category}
            </span>
          </div>

          <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-8 overflow-hidden">
            <img 
                src={mockPost.image} 
                alt={mockPost.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                    e.currentTarget.onerror = null; 
                    e.currentTarget.src = "/placeholder.svg";
                    e.currentTarget.className = "w-1/3 h-1/3 object-contain mx-auto my-auto p-4";
                }}
            />
          </div>

          <div className="prose dark:prose-invert lg:prose-lg">
            <p className="lead">
              Este é o conteúdo detalhado do artigo sobre {mockPost.title}. A fidelização de clientes é a espinha dorsal de qualquer negócio local de sucesso. Neste artigo, vamos aprofundar as estratégias que o CATBACK oferece para garantir que os seus clientes não só voltem, mas também se tornem promotores da sua marca.
            </p>
            
            <h2>1. O Custo da Inatividade</h2>
            <p>
              Muitos negócios focam-se apenas na aquisição, esquecendo que reter um cliente é significativamente mais barato e gera um valor de vida (LTV) muito superior. A inatividade é um sinal de que a conexão emocional com o cliente foi perdida.
            </p>
            
            <h3>A Importância da Retenção Digital</h3>
            <p>
              Com os cartões de fidelidade digitais, o cliente tem o seu incentivo sempre no bolso. Não há cartões de papel perdidos ou esquecidos. A facilidade de uso é o primeiro passo para a recorrência.
            </p>
            
            <ul>
                <li><strong>Acessibilidade:</strong> Cartão guardado no telemóvel (PWA).</li>
                <li><strong>Engajamento:</strong> Notificações push sobre o progresso.</li>
                <li><strong>Simplicidade:</strong> Validação rápida via QR Code.</li>
            </ul>

            <h2>2. Integrando Agendamento e Fidelização</h2>
            <p>
              A verdadeira magia acontece quando as suas ferramentas trabalham juntas. Um agendamento concluído pode automaticamente adicionar pontos ou selos ao cartão do cliente.
            </p>
            
            <p>
              Além disso, a redução de no-shows através de lembretes automáticos (SMS/WhatsApp) não só economiza dinheiro, mas também melhora a experiência geral do cliente, que se sente cuidado e valorizado.
            </p>

            <h2>3. O Futuro é o CRM Inteligente</h2>
            <p>
              Saber quem são os seus clientes VIPs ou quem está em risco de inatividade permite campanhas de marketing cirúrgicas. Use a segmentação automática do CATBACK para enviar ofertas personalizadas e garantir que a sua mensagem chega à pessoa certa, na hora certa.
            </p>
            
            <p>
              Pronto para começar a escrever a sua própria história de sucesso?
            </p>
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