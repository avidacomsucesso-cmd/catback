import React from "react";
import { Cat, QrCode, Trophy, Settings, Send, Heart, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: 1,
    title: "Configuração Rápida",
    icon: Settings,
    description: "Em menos de 5 minutos, personalize seu cartão de fidelidade (selos, pontos ou cashback) com a identidade visual do seu negócio.",
    details: [
      "Escolha o tipo de recompensa",
      "Defina as regras de acumulação",
      "Adicione logo e cores",
    ],
    color: "text-catback-purple",
  },
  {
    number: 2,
    title: "Adesão do Cliente",
    icon: Send,
    description: "Seus clientes aderem instantaneamente, sem precisar baixar apps. Basta escanear um QR Code ou receber um link via WhatsApp.",
    details: [
      "QR Code no balcão ou fatura",
      "Envio automático via WhatsApp",
      "Cartão digital guardado no telemóvel",
    ],
    color: "text-catback-energy-orange",
  },
  {
    number: 3,
    title: "Fidelização e Crescimento",
    icon: Heart,
    description: "O CATBACK trabalha por si, enviando lembretes, ofertas de aniversário e campanhas de inatividade para garantir o retorno.",
    details: [
      "Aumento da frequência de visita",
      "Redução de no-shows (faltas)",
      "Relatórios de performance em tempo real",
    ],
    color: "text-catback-success-green",
  },
];

const HowItWorksContent: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
            Comece a Fidelizar em 3 Passos Simples
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A nossa plataforma foi desenhada para ser intuitiva e rápida de implementar, garantindo resultados imediatos.
          </p>
        </div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col lg:flex-row items-center gap-10 p-8 rounded-xl ${
                index % 2 === 0 
                  ? 'bg-gray-50 dark:bg-gray-800' 
                  : 'bg-catback-light-purple/10 dark:bg-catback-dark-purple/20'
              }`}
            >
              <div className={`text-6xl font-extrabold ${step.color} lg:w-1/12 text-center`}>
                {step.number}
              </div>
              <div className={`lg:w-1/12 flex justify-center ${step.color}`}>
                <step.icon className="w-12 h-12" />
              </div>
              <div className="lg:w-5/12 text-center lg:text-left">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
              <div className="lg:w-5/12">
                <ul className="space-y-2 p-4 border-l-4 border-catback-purple dark:border-catback-light-purple bg-white dark:bg-gray-900 rounded-md shadow-sm">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                      <ArrowRight className="w-4 h-4 mr-2 text-catback-success-green flex-shrink-0 mt-1" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/signup">
            <Button size="lg" className="text-lg px-8 py-6 bg-catback-purple hover:bg-catback-dark-purple transition-all">
              <Cat className="w-5 h-5 mr-2 fill-white" /> Começar Teste Grátis Agora
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksContent;