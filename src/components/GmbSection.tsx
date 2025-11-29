import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, Bot, PieChart, MapPin } from "lucide-react";

const gmbFeatures = [
  {
    icon: LayoutDashboard,
    title: "O Centro de Comando da Sua Reputação",
    description: "Esqueça o caos de gerir múltiplas plataformas. Centralize todas as suas avaliações do Google, responda a clientes e monitore a sua reputação online a partir de um único dashboard intuitivo.",
    color: "text-catback-purple",
  },
  {
    icon: Bot,
    title: "Respostas Inteligentes, 24/7",
    description: "A nossa Inteligência Artificial, treinada em português de Portugal, sugere respostas personalizadas para cada avaliação, permitindo-lhe responder em segundos e manter um tom profissional e consistente.",
    color: "text-catback-energy-orange",
  },
  {
    icon: PieChart,
    title: "Decifre a Voz dos Seus Clientes",
    description: "Transforme opiniões em dados acionáveis. A nossa IA analisa o sentimento das avaliações, identifica tendências e revela o que os seus clientes realmente pensam sobre o seu serviço, comida ou atendimento.",
    color: "text-catback-success-green",
  },
  {
    icon: MapPin,
    title: "Domine as Pesquisas Locais",
    description: "Um perfil ativo, com muitas avaliações e respostas rápidas, é o segredo para subir no ranking do Google. O CATBACK automatiza este processo, colocando o seu negócio à frente da concorrência.",
    color: "text-catback-dark-purple",
  },
];

const GmbSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">
          O Seu Negócio Está Invisível no Google?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {gmbFeatures.map((feature, index) => (
            <Card key={index} className="text-left hover:shadow-xl transition-shadow duration-300 h-full">
              <CardHeader className="flex flex-row items-start space-x-4 p-6">
                <feature.icon className={`w-10 h-10 ${feature.color} flex-shrink-0 mt-1`} />
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GmbSection;