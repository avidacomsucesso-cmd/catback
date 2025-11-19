import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, MessageSquare, Mail, Share2, Zap } from "lucide-react";

const features = [
  {
    title: "Campanhas SMS e WhatsApp",
    description: "Comunique-se diretamente com seus clientes inativos ou VIPs usando mensagens personalizadas e de alto impacto.",
    icon: MessageSquare,
    details: [
      "Envio massivo para segmentos específicos",
      "Mensagens personalizadas (nome, pontos, etc.)",
      "Rastreamento de entrega e conversão",
      "Custo transparente por mensagem",
    ],
    color: "text-catback-success-green",
  },
  {
    title: "E-mail Marketing e Cupons",
    description: "Crie newsletters e envie cupons de desconto exclusivos para incentivar a primeira ou próxima compra.",
    icon: Mail,
    details: [
      "Editor de e-mail simples e intuitivo",
      "Templates otimizados para conversão",
      "Geração automática de cupons únicos",
      "Relatórios de abertura e clique",
    ],
    color: "text-catback-purple",
  },
  {
    title: "Gestão de Redes Sociais",
    description: "Agende posts e gerencie interações do Facebook e Instagram em um único lugar.",
    icon: Share2,
    details: [
      "Calendário de conteúdo unificado",
      "Impulsionamento de posts integrado",
      "Inbox unificado para mensagens",
      "Análise de performance social",
    ],
    color: "text-catback-energy-orange",
  },
];

const MarketingAutomatizado: React.FC = () => {
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
                    <Check className="w-4 h-4 mr-2 text-catback-purple flex-shrink-0 mt-1" />
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
            Automações de Marketing
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Configure fluxos automáticos para enviar mensagens de aniversário, lembretes de inatividade ou ofertas de boas-vindas sem levantar um dedo.
          </p>
        </div>
        <Zap className="w-12 h-12 text-catback-dark-purple mt-4 md:mt-0" />
      </div>
    </div>
  );
};

export default MarketingAutomatizado;