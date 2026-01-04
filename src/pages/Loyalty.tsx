"use client";

import React from "react";
import Layout from "@/components/Layout";
import ProblemSolution from "@/components/ProblemSolution";
import FinalCTA from "@/components/FinalCTA";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, UserCheck, Trophy, ArrowRight, MapPin, CreditCard, Star } from "lucide-react";

// Ilustração dinâmica transferida da Hero
const DigitalCardIllustration = () => (
  <div className="relative w-full max-w-xs mx-auto p-4 scale-90 md:scale-100">
    <div className="relative w-full h-[450px] bg-gray-900 dark:bg-gray-700 rounded-3xl shadow-2xl border-8 border-gray-700 dark:border-gray-900 overflow-hidden">
      <div className="h-full w-full bg-white dark:bg-gray-800 p-4 flex flex-col justify-between">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-1 text-catback-energy-orange">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-catback-energy-orange" />
            ))}
          </div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">Avalie o Café da Praça</p>
          <div className="flex items-center justify-center text-xs text-gray-500">
            <MapPin className="w-3 h-3 mr-1" /> Google Maps
          </div>
        </div>

        <div className="relative h-40 w-full rounded-xl p-3 bg-catback-purple shadow-lg flex flex-col justify-between text-white">
          <div className="flex justify-between items-start">
            <div className="space-y-0.5">
              <p className="text-lg font-bold">Cartão Café</p>
              <p className="text-xs opacity-80">Recompensa: 1 Café Grátis</p>
            </div>
            <img src="/images/catback-logo.png" alt="Logo" className="w-6 h-6 invert" />
          </div>
          <div className="text-center">
            <p className="text-4xl font-extrabold">7/10</p>
            <p className="text-sm opacity-90">Selos Acumulados</p>
          </div>
          <div className="flex justify-between text-xs opacity-70">
            <span>ID: 4A2B3C</span>
            <CreditCard className="w-4 h-4" />
          </div>
        </div>

        <div className="text-center">
          <button className="w-full py-2 bg-catback-energy-orange text-white font-semibold rounded-lg text-sm">
            Ver Meus Cartões
          </button>
        </div>
      </div>
    </div>
    <div className="absolute -top-4 -right-4 p-3 bg-white rounded-full shadow-xl transform rotate-6">
      <MapPin className="w-8 h-8 text-red-500" />
    </div>
    <div className="absolute -bottom-4 -left-4 p-2 bg-catback-success-green rounded-full shadow-xl transform -rotate-12">
      <Star className="w-6 h-6 text-white fill-white" />
    </div>
  </div>
);

const steps = [
  {
    number: "1",
    icon: Settings,
    title: "Configuração Rápida",
    description: "Em menos de 5 minutos, personalize seu cartão de fidelidade (selos, pontos ou cashback) com a identidade visual do seu negócio.",
    features: ["Escolha o tipo de recompensa", "Defina as regras de acumulação", "Adicione logo e cores"],
    color: "text-catback-purple",
  },
  {
    number: "2",
    icon: UserCheck,
    title: "Adesão do Cliente",
    description: "Os clientes aderem ao programa em segundos, escaneando um QR Code ou recebendo um link via WhatsApp.",
    features: ["QR Code no balcão ou fatura", "Sem necessidade de baixar app", "Registo rápido via email/Google"],
    color: "text-catback-energy-orange",
  },
  {
    number: "3",
    icon: Trophy,
    title: "Fidelização e Retorno",
    description: "Acompanhe o progresso dos clientes e incentive o retorno com recompensas automáticas e lembretes inteligentes.",
    features: ["Acompanhamento em tempo real", "Recompensas automáticas", "Aumento da recorrência"],
    color: "text-catback-success-green",
  },
];

const Loyalty = () => {
  return (
    <Layout>
      <div className="pt-16 pb-8 text-center container">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Fidelização <span className="text-catback-purple">Inteligente</span>
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Transforme visitantes em clientes recorrentes com a nossa plataforma completa de fidelização digital.
        </p>
      </div>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                Comece a Fidelizar em 3 Passos Simples
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl">
                A nossa plataforma foi desenhada para ser intuitiva e rápida de implementar, garantindo resultados imediatos.
              </p>
              
              <div className="space-y-8 mt-12">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4 text-left">
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-catback-purple/10 text-catback-purple font-bold text-xl">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{step.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Ilustração transferida aqui */}
            <div className="flex justify-center">
              <DigitalCardIllustration />
            </div>
          </div>
        </div>
      </section>

      <ProblemSolution />

      <div className="mt-12">
        <FinalCTA />
      </div>
    </Layout>
  );
};

export default Loyalty;