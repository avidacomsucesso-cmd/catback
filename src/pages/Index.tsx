import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Cat, Play } from "lucide-react";
import Layout from "@/components/Layout";

// Placeholder for the mascot illustration
const CatbackIllustration: React.FC = () => (
  <div className="relative w-full max-w-md mx-auto lg:mx-0 p-8 bg-catback-light-purple/30 rounded-xl shadow-lg border border-catback-light-purple/50">
    <div className="flex flex-col items-center justify-center h-64">
      <Cat className="w-20 h-20 text-catback-purple animate-bounce" />
      <p className="mt-4 text-lg font-semibold text-catback-dark-purple">
        Ilustração: Gato CATBACK com cartão de fidelidade digital
      </p>
    </div>
  </div>
);

const Index = () => {
  return (
    <Layout>
      <div className="container pt-16 pb-24 lg:pt-24 lg:pb-32">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Transforme Visitantes em <span className="text-catback-purple">Clientes Fiéis</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg lg:max-w-none mx-auto">
              Fidelização, Agendamento e CRM tudo em uma única plataforma. Comece grátis e cresça com seu negócio.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-catback-purple hover:bg-catback-dark-purple transition-all shadow-lg shadow-catback-purple/30">
                  <Cat className="w-5 h-5 mr-2 fill-white" /> Começar Grátis - 14 Dias
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 border-catback-purple text-catback-purple hover:bg-catback-light-purple/20">
                  <Play className="w-5 h-5 mr-2" /> Ver Como Funciona
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400 font-medium pt-4">
              <span className="flex items-center">
                <Check className="w-4 h-4 mr-1 text-catback-success-green" /> Sem cartão de crédito
              </span>
              <span className="flex items-center">
                <Check className="w-4 h-4 mr-1 text-catback-success-green" /> Configuração em 5 minutos
              </span>
              <span className="flex items-center">
                <Check className="w-4 h-4 mr-1 text-catback-success-green" /> Suporte em português
              </span>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="flex justify-center lg:justify-end">
            <CatbackIllustration />
          </div>
        </div>
        
        {/* Placeholder for subsequent sections */}
        <div className="mt-24 text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Próximas Secções da Home Page</h2>
            <p className="text-gray-500 mt-2">Números de Impacto, Problema e Solução, Como Funciona, Funcionalidades, Preços, Testemunhos, CTA Final.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;