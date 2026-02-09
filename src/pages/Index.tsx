"use client";

import React from "react";
import Layout from "@/components/Layout";
import ImpactNumbers from "@/components/ImpactNumbers";
import FeatureCards from "@/components/FeatureCards";
import PricingPreview from "@/components/PricingPreview";
import TestimonialsSection from "@/components/TestimonialsSection";
import IndustriesPreview from "@/components/IndustriesPreview";
import FinalCTA from "@/components/FinalCTA";
import GmbSection from "@/components/GmbSection";
import NfcDisplaySection from "@/components/NfcDisplaySection";
import HeroIllustration from "@/components/HeroIllustration";
import HowItWorksNfc from "@/components/HowItWorksNfc";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="container pt-8 pb-12 lg:pt-16 lg:pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left lg:pt-4">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
              Atraia Clientes do <span className="text-catback-purple">Google</span>. <br/>Transforme-os em Fãs.
            </h1>
            
            {/* Texto de destaque vinculado ao Google My Business com cores de referência */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border-l-8 border-l-[#4285F4] shadow-md max-w-lg lg:max-w-none mx-auto transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <p className="text-2xl font-bold leading-relaxed">
                <span className="text-[#4285F4]">Quanto mais</span> <span className="text-[#EA4335]">avaliações</span>, 
                <span className="text-[#FBBC05]"> mais o Google</span> <span className="text-[#34A853]">te mostra</span> 
                <span className="text-gray-900 dark:text-white"> para quem busca seus serviços.</span>
              </p>
            </div>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg lg:max-w-none mx-auto">
              Melhore a visibilidade do seu negócio no Google através de avaliações reais e consistentes. <br/><strong>Encontrado no Google. Lembrado pelos Clientes.</strong>
            </p>
            
            {/* NEW CTAs: Replacing Role Selection */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <Link to="/nfc-display">
                <Button size="lg" className="w-full sm:w-auto bg-catback-purple hover:bg-catback-dark-purple text-lg px-8 py-6">
                  Conhecer o Display NFC <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              {/* Desativado temporariamente 
              <a href="https://wa.me/351928202241" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 border-catback-purple text-catback-purple">
                  Solicitar Avaliação Grátis
                </Button>
              </a>
              */}
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400 font-medium pt-4">
              <span className="flex items-center">
                <Check className="w-4 h-4 mr-1 text-catback-success-green" />
                Sem cartão de crédito
              </span>
              <span className="flex items-center">
                <Check className="w-4 h-4 mr-1 text-catback-success-green" />
                Configuração em 5 minutos
              </span>
              <span className="flex items-center">
                <Check className="w-4 h-4 mr-1 text-catback-success-green" />
                Suporte em português
              </span>
            </div>
          </div>
          {/* Right Illustration */}
          <div className="flex justify-center lg:justify-end">
            <HeroIllustration />
          </div>
        </div>
      </div>
      
      {/* Nova Secção Como Funciona NFC (Baseada na referência) */}
      <HowItWorksNfc />

      {/* Nova Secção GMB */}
      <GmbSection />
      
      {/* Nova Secção Display NFC */}
      <NfcDisplaySection />
      
      {/* 1. Números de Impacto */}
      <ImpactNumbers />
      
      {/* 2. Problema e Solução - REMOVIDO PARA LoyalY.tsx */}
      
      {/* 3. Como Funciona (3 Passos Simples) - REMOVIDO PARA LoyalY.tsx */}
      
      {/* 4. Funcionalidades Principais (Cards Interativos) - DESATIVADO TEMPORARIAMENTE
      <FeatureCards />
      */}
      
      {/* 5. Planos e Preços (Preview) - DESATIVADO TEMPORARIAMENTE
      <PricingPreview />
      */}
      
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