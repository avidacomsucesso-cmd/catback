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
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="container pt-16 pb-12 lg:pt-24 lg:pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Atraia Clientes do <span className="text-catback-purple">Google</span>. Transforme-os em Fãs.
            </h1>
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
      
      {/* Nova Secção GMB */}
      <GmbSection />
      
      {/* Nova Secção Display NFC */}
      <NfcDisplaySection />
      
      {/* 1. Números de Impacto */}
      <ImpactNumbers />
      
      {/* 2. Problema e Solução - REMOVIDO PARA LoyalY.tsx */}
      
      {/* 3. Como Funciona (3 Passos Simples) - REMOVIDO PARA LoyalY.tsx */}
      
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