import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CreditCard, Calendar, Users, MapPin, ArrowRight } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Google Meu Negócio",
    description: "Otimização de perfil, gestão de página e respostas automáticas com IA.",
    details: [
      "Otimização do Perfil Google",
      "Gestão de Página GMN",
      "Posts e Fotos Semanais",
      "Respostas Automáticas com IA",
    ],
    href: "/features#gmb",
    color: "text-catback-success-green",
  },
  {
    icon: CreditCard,
    title: "Fidelização Digital",
    description: "Cartões de selos digitais, pontos acumulativos e cashback automático.",
    details: [
      "Cartões de selos digitais",
      "Pontos acumulativos",
      "Cashback automático",
      "Recompensas personalizadas",
    ],
    href: "/features#fidelizacao",
    color: "text-catback-purple",
  },
  {
    icon: Calendar,
    title: "Agendamento Online",
    description: "Calendário inteligente, reservas 24/7 e lembretes automáticos.",
    details: [
      "Calendário inteligente",
      "Reservas 24/7",
      "Lembretes automáticos",
      "Gestão de disponibilidade",
    ],
    href: "/features#agendamento",
    color: "text-catback-energy-orange",
  },
  {
    icon: Users,
    title: "CRM Inteligente",
    description: "Base de clientes centralizada, histórico de compras e segmentação automática.",
    details: [
      "Base de clientes centralizada",
      "Histórico de compras",
      "Segmentação automática",
      "Analytics e relatórios",
    ],
    href: "/features#crm",
    color: "text-catback-dark-purple",
  },
];

const FeatureCards: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">
          Uma Plataforma, Infinitas Possibilidades
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-left hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center space-x-4 p-6">
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-gray-600 dark:text-gray-400 mb-4">{feature.description}</p>
                <ul className="space-y-2 mb-6">
                  {feature.details.map((detail, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <ArrowRight className="w-4 h-4 mr-2 text-catback-purple flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
                <Link to={feature.href} className="flex items-center text-catback-purple font-semibold hover:text-catback-dark-purple transition-colors">
                  Saiba Mais <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;