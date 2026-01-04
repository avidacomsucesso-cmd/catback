import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Search, Camera, Bot, Star } from "lucide-react";

const features = [
  {
    title: "Otimização do Perfil",
    description: "Garantimos que o seu negócio é encontrado. Otimizamos o seu perfil Google para máxima visibilidade e presença online.",
    icon: Search,
    details: [
      "Configuração de SEO Local",
      "Palavras-chave estratégicas",
      "Informação de contacto verificada",
      "Ligação direta ao seu site",
    ],
    color: "text-catback-success-green",
  },
  {
    title: "Gestão de Conteúdo",
    description: "Mantenha a sua página ativa e atraente com a inserção semanal de posts, fotos e novidades do seu negócio.",
    icon: Camera,
    details: [
      "Posts semanais agendados",
      "Upload de fotos de alta qualidade",
      "Divulgação de ofertas especiais",
      "Destaque de produtos e serviços",
    ],
    color: "text-catback-purple",
  },
  {
    title: "Respostas Automáticas com IA",
    description: "Nunca deixe um cliente sem resposta. A nossa IA Catback responde a todas as avaliações de forma automática e profissional.",
    icon: Bot,
    details: [
      "IA treinada em português de Portugal",
      "Respostas personalizadas e cordiais",
      "Gestão de reputação 24/7",
      "Análise de sentimento do feedback",
    ],
    color: "text-catback-energy-orange",
  },
];

const GoogleMeuNegocio: React.FC = () => {
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
            Domine as Pesquisas Locais
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Um perfil ativo e bem gerido no Google é o fator nº 1 para atrair novos clientes na sua área. Deixe que a tecnologia Catback trate de tudo por si.
          </p>
        </div>
        <Star className="w-12 h-12 text-catback-dark-purple mt-4 md:mt-0" />
      </div>
    </div>
  );
};

export default GoogleMeuNegocio;