import React from "react";
import { Coffee, Scissors, Utensils, Dumbbell, Stethoscope, ShoppingBag, Check, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const industryData = [
  {
    name: "Cafés e Pastelarias",
    icon: Coffee,
    color: "text-catback-energy-orange",
    benefits: [
      "Cartão de selos digital para o 10º café grátis.",
      "Lembretes de aniversário com oferta de bolo.",
      "Acompanhamento de frequência de visita.",
    ],
  },
  {
    name: "Salões de Beleza e Barbearias",
    icon: Scissors,
    color: "text-catback-purple",
    benefits: [
      "Agendamento online 24/7 com lembretes SMS.",
      "Pontos por cada serviço (ex: corte, coloração).",
      "Gestão de disponibilidade de staff e comissões.",
    ],
  },
  {
    name: "Lojas de Retalho",
    icon: ShoppingBag,
    color: "text-catback-dark-purple",
    benefits: [
      "Cashback automático em compras.",
      "Segmentação de clientes por ticket médio.",
      "Campanhas de SMS para coleções novas.",
    ],
  },
  {
    name: "Restaurantes",
    icon: Utensils,
    color: "text-catback-success-green",
    benefits: [
      "Pontos por consumo e recompensas exclusivas.",
      "Gestão de reservas e lista de espera.",
      "Feedback pós-visita automatizado.",
    ],
  },
  {
    name: "Academias e Estúdios",
    icon: Dumbbell,
    color: "text-catback-energy-orange",
    benefits: [
      "Fidelização por mensalidades e aulas.",
      "Agendamento de aulas de grupo e pessoais.",
      "Comunicação via WhatsApp sobre horários.",
    ],
  },
  {
    name: "Clínicas e Consultórios",
    icon: Stethoscope,
    color: "text-catback-purple",
    benefits: [
      "Lembretes de consulta para reduzir faltas.",
      "Base de dados segura e centralizada.",
      "Comunicação profissional e segmentada.",
    ],
  },
];

const IndustriesContent: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
            CATBACK: Soluções Feitas Para o Seu Setor
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Não importa o seu negócio, temos as ferramentas certas para aumentar a retenção e o valor de vida do cliente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industryData.map((industry, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow h-full">
              <CardHeader className="flex flex-row items-center space-x-4">
                <industry.icon className={`w-8 h-8 ${industry.color}`} />
                <CardTitle className="text-2xl">{industry.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {industry.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start text-gray-700 dark:text-gray-300">
                      <Check className="w-5 h-5 mr-2 text-catback-success-green flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/signup" className="mt-6 inline-flex items-center text-catback-purple font-semibold hover:text-catback-dark-purple transition-colors">
                  Começar no setor de {industry.name} <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesContent;