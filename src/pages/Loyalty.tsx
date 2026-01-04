"use client";

import React from "react";
import Layout from "@/components/Layout";
import ProblemSolution from "@/components/ProblemSolution";
import FinalCTA from "@/components/FinalCTA";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, UserCheck, Trophy, ArrowRight } from "lucide-react";

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

      {/* Anexo 1: Comece a Fidelizar em 3 Passos Simples */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Comece a Fidelizar em 3 Passos Simples
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-16 max-w-3xl mx-auto">
            A nossa plataforma foi desenhada para ser intuitiva e rápida de implementar, garantindo resultados imediatos.
          </p>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center gap-8 text-left">
                <div className="flex-shrink-0 flex items-center justify-center w-24 h-24 text-6xl font-black text-catback-purple/20">
                  {step.number}
                </div>
                <div className="flex-shrink-0">
                  <step.icon className={`w-12 h-12 ${step.color}`} />
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-xl">{step.description}</p>
                </div>
                <Card className="flex-shrink-0 w-full md:w-80 border-l-4 border-l-catback-purple shadow-sm">
                  <CardContent className="p-4 py-6">
                    <ul className="space-y-2">
                      {step.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                          <ArrowRight className="w-4 h-4 mr-2 text-catback-purple" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
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