import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Calendar, Clock, Bell, MapPin } from "lucide-react";

const features = [
  {
    title: "Calendário Inteligente 24/7",
    description: "Permita que seus clientes agendem a qualquer hora, com gestão automática de disponibilidade de staff e serviços.",
    icon: Calendar,
    details: [
      "Reservas 24/7 via link direto ou widget",
      "Gestão de múltiplos profissionais e serviços",
      "Bloqueios automáticos (almoço, folgas)",
      "Sincronização com Google Calendar e Outlook",
    ],
    color: "text-catback-energy-orange",
  },
  {
    title: "Lembretes Automáticos (No-Show Zero)",
    description: "Reduza as faltas (no-shows) em até 80% com lembretes automáticos e opções de confirmação/cancelamento.",
    icon: Bell,
    details: [
      "Lembretes via SMS, Email e WhatsApp",
      "Opção de confirmação/cancelamento pelo cliente",
      "Envio 24h e 2h antes do agendamento",
      "Atualização automática do status no dashboard",
    ],
    color: "text-catback-purple",
  },
  {
    title: "Gestão de Locais e Equipe",
    description: "Ideal para negócios com várias filiais ou grande número de colaboradores.",
    icon: MapPin,
    details: [
      "Gestão de múltiplos locais (Planos Pro/Premium)",
      "Controle de permissões para cada membro da equipe",
      "Relatórios de ocupação por profissional",
      "Interface de arrastar e soltar para reagendamento",
    ],
    color: "text-catback-dark-purple",
  },
];

const AgendamentoOnline: React.FC = () => {
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
            Otimização de Fluxo
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Defina tempos de buffer entre serviços para garantir que nunca há atrasos e que o seu staff tem tempo para se preparar.
          </p>
        </div>
        <Clock className="w-12 h-12 text-catback-energy-orange mt-4 md:mt-0" />
      </div>
    </div>
  );
};

export default AgendamentoOnline;