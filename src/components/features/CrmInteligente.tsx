import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Users, History, Filter, BarChart } from "lucide-react";

const features = [
  {
    title: "Base de Clientes Centralizada",
    description: "Tenha um perfil completo de cada cliente, incluindo dados de contacto, notas e preferências.",
    icon: Users,
    details: [
      "Perfil unificado (Fidelização + Agendamento)",
      "Notas e tags personalizadas do lojista",
      "Dados de contacto e aniversário",
      "Exportação de dados (CSV/Excel)",
    ],
    color: "text-catback-dark-purple",
  },
  {
    title: "Histórico de Interações",
    description: "Acompanhe o LTV (Lifetime Value), frequência de visitas e ticket médio de cada cliente.",
    icon: History,
    details: [
      "Histórico completo de compras e serviços",
      "Métricas automáticas (LTV, Frequência)",
      "Risco de Churn (algoritmo preditivo)",
      "Nível de fidelidade (Tier)",
    ],
    color: "text-catback-purple",
  },
  {
    title: "Segmentação Automática",
    description: "Crie grupos de clientes dinâmicos para campanhas de marketing altamente direcionadas.",
    icon: Filter,
    details: [
      "Segmentos pré-definidos (VIPs, Inativos, Novos)",
      "Criação de regras customizadas",
      "Segmentação por comportamento de compra",
      "Recálculo noturno automático",
    ],
    color: "text-catback-energy-orange",
  },
];

const CrmInteligente: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <feature.icon className={`w-8 h-8 mb-2 ${feature.color}`} />
              <CardTitle className="text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.details.map((detail, i) => (
                  <li key={i} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                    <Check className="w-4 h-4 mr-2 text-catback-success-green flex-shrink-0 mt-1" />
                    {detail}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-catback-light-purple/20 dark:bg-catback-dark-purple/50 p-8 rounded-xl flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-2/3 text-left">
          <h3 className="text-2xl font-bold text-catback-dark-purple dark:text-white mb-2">
            Analytics e Relatórios
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Dashboards visuais para acompanhar a performance do negócio, taxa de retorno e eficácia das campanhas de fidelização.
          </p>
        </div>
        <BarChart className="w-12 h-12 text-catback-success-green mt-4 md:mt-0" />
      </div>
    </div>
  );
};

export default CrmInteligente;