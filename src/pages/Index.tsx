import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Cat, Play } from "lucide-react";
import Layout from "@/components/Layout";
import ImpactNumbers from "@/components/ImpactNumbers";
import ProblemSolution from "@/components/ProblemSolution";
import HowItWorksSteps from "@/components/HowItWorksSteps";
import FeatureCards from "@/components/FeatureCards";
import PricingPreview from "@/components/PricingPreview";
import TestimonialsSection from "@/components/TestimonialsSection";
import IndustriesPreview from "@/components/IndustriesPreview";
import FinalCTA from "@/components/FinalCTA";
import RoleSelectionCTA from "@/components/RoleSelectionCTA";
import GmbSection from "@/components/GmbSection";
import NfcDisplaySection from "@/components/NfcDisplaySection"; // Importando a nova secção

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
      {/* Hero Section */}
      <div className="container pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Atraia Clientes do <span className="text-catback-purple">Google</span>. Transforme-os em Fãs.
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg lg:max-w-none mx-auto">
              Otimize seu perfil no Google para atrair novos clientes e use ferramentas de fidelização inteligentes para garantir que eles voltem sempre. <br/><strong>Encontrado no Google. Lembrado pelos Clientes.</strong>
            </p>
            
            {/* NEW CTAs: Role Selection */}
            <RoleSelectionCTA />

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
      </div>
      
      {/* Nova Secção GMB */}
      <GmbSection />

      {/* Nova Secção Display NFC */}
      <NfcDisplaySection />

      {/* 1. Números de Impacto */}
      <ImpactNumbers />

      {/* 2. Problema e Solução */}
      <ProblemSolution />

      {/* 3. Como Funciona (3 Passos Simples) */}
      <HowItWorksSteps />

      {/* 4. Funcionalidades Principais (Cards Interativos) */}
      <FeatureCards />

      {/* 5. Planos e Preços (Preview) */}
      <PricingPreview />

      {/* 6. Prova Social (Testemunhos) */}
      <TestimonialsSection />

      {/* 7. Para Quem é o CATBACK */}
      <IndustriesPreview />

      {/* 8. CTA Final */}
      <FinalCTA />
    </Layout>
  );
};

export default Index;