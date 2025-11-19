import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, QrCode, TrendingUp, Gift, Smartphone, Zap } from "lucide-react";

const features = [
  {
    title: "Cartões de Selos Digitais",
    description: "Crie cartões de fidelidade digitais personalizados em 5 minutos. O cliente guarda no telemóvel, sem apps.",
    icon: QrCode,
    details: [
      "Design personalizado com logo e cores",
      "Validação via QR Code rápido e seguro",
      "Notificações push automáticas",
      "Funciona sem conta (PWA)",
    ],
    color: "text-catback-purple",
  },
  {
    title: "Pontos Acumulativos",
    description: "Recompense clientes por cada euro gasto. Defina a taxa de conversão e crie um catálogo de prémios.",
    icon: TrendingUp,
    details: [
      "€1 = X pontos (configurável)",
      "Níveis de fidelidade (Bronze, Prata, Ouro)",
      "Multiplicadores de pontos em dias específicos",
      "Catálogo de recompensas flexível",
    ],
    color: "text-catback-energy-orange",
  },
  {
    title: "Cashback Automático",
    description: "Ofereça uma percentagem de volta em cada compra, incentivando o retorno imediato.",
    icon: Gift,
    details: [
      "Percentagem de cashback configurável",
      "Saldo disponível para próxima compra",
      "Limites de utilização definíveis",
      "Acompanhamento de saldo em tempo real",
    ],
    color: "text-catback-success-green",
  },
];

const FidelizacaoDigital: React.FC = () => {
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
            Segurança e Anti-Fraude
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Garantimos que apenas o seu staff pode validar selos e pontos, com QR Codes dinâmicos e logs de auditoria.
          </p>
        </div>
        <Zap className="w-12 h-12 text-catback-purple mt-4 md:mt-0" />
      </div>
    </div>
  );
};

export default FidelizacaoDigital;