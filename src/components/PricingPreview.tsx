import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const plans = [
  {
    name: "Starter",
    price: "€9,90",
    frequency: "/mês",
    description: "Fidelização Digital Essencial",
    features: ["Cartões de Selos Ilimitados", "Até 100 Clientes Ativos", "Notificações Push"],
    highlight: false,
  },
  {
    name: "Pro",
    price: "€29,90",
    frequency: "/mês",
    description: "Agendamento + CRM Completo",
    features: [
      "Tudo do Starter",
      "Agendamento 24/7",
      "Lembretes Automáticos",
      "Base de Clientes Centralizada",
      "Histórico de Compras",
      "Até 2000 Clientes Ativos",
    ],
    highlight: true,
  },
  {
    name: "Google Meu Negócio",
    price: "€39,90",
    frequency: "/mês",
    description: "Visibilidade e IA no Google",
    features: [
      "Otimização do Perfil Google",
      "Gestão de Página GMN",
      "Posts e Fotos Semanais",
      "Respostas Automáticas com IA",
      "Monitorização de Reputação",
      "Relatórios de Performance",
    ],
    highlight: false,
  },
];

const PricingPreview: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Planos que Crescem com Você
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
          Comece com 14 dias grátis em qualquer plano.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`flex flex-col justify-between transition-all duration-300 ${
                plan.highlight 
                  ? "border-2 border-catback-purple shadow-xl scale-[1.02] bg-white dark:bg-gray-900" 
                  : "border-gray-200 dark:border-gray-700"
              }`}
            >
              <CardHeader className="text-center pb-4">
                <CardTitle className={`text-2xl font-bold ${plan.highlight ? 'text-catback-purple' : 'text-gray-900 dark:text-white'}`}>
                  {plan.name}
                </CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400 min-h-[40px]">{plan.description}</p>
              </CardHeader>
              <CardContent className="flex flex-col items-center flex-grow">
                <div className="text-4xl font-extrabold text-gray-900 dark:text-white">
                  {plan.price}
                  <span className="text-lg font-medium text-gray-500 dark:text-gray-400">{plan.frequency}</span>
                </div>
                <div className="mt-6 text-left w-full space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-4 h-4 mr-2 text-catback-success-green flex-shrink-0 mt-1" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-6">
                <Link to="/signup" className="w-full">
                  <Button 
                    className={`w-full ${plan.highlight ? 'bg-catback-purple hover:bg-catback-dark-purple' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'}`}
                  >
                    Começar Teste Grátis
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <Link to="/pricing" className="text-catback-purple font-semibold hover:underline">
            Ver Tabela Comparativa Completa →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingPreview;