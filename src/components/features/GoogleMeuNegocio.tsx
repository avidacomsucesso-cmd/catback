"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Search, Camera, Bot, Star, ArrowRight, Zap, TrendingUp, MapPin, Nfc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge"; // Import official badge
import { cn } from "@/lib/utils";

const gmbFeatures = [
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

const GmbIntroIllustration = () => (
  <div className="relative w-full h-[300px] bg-gradient-to-br from-catback-light-purple/20 to-catback-purple/10 rounded-2xl flex items-center justify-center p-8 border border-catback-purple/10">
    <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-sm">
        <div className="flex items-center space-x-3 mb-4 border-b pb-2">
            <MapPin className="text-red-500 w-5 h-5" />
            <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="space-y-3">
            <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-catback-energy-orange text-catback-energy-orange" />)}
            </div>
            <div className="h-2 w-full bg-gray-100 rounded" />
            <div className="h-2 w-2/3 bg-gray-100 rounded" />
            <div className="pt-2 flex justify-end">
                <div className="bg-catback-purple/10 p-2 rounded-full">
                    <Bot className="w-6 h-6 text-catback-purple" />
                </div>
            </div>
        </div>
    </div>
    <div className="absolute top-10 right-10 animate-bounce">
        <div className="bg-white p-3 rounded-lg shadow-lg flex items-center space-x-2">
            <TrendingUp className="text-catback-success-green w-5 h-5" />
            <span className="text-xs font-bold text-gray-700">+300%</span>
        </div>
    </div>
  </div>
);

const GmbComparisonIllustration = () => (
  <div className="grid grid-cols-2 gap-4 w-full">
    <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-100 dark:border-red-900/20 opacity-60">
        <div className="flex space-x-1 mb-2">
            <Star className="w-3 h-3 text-gray-300" />
            <Star className="w-3 h-3 text-gray-300" />
        </div>
        <div className="h-2 w-full bg-gray-200 rounded mb-1" />
        <p className="text-[10px] text-gray-400">Sem resposta há 3 meses</p>
    </div>
    <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-100 dark:border-green-900/20 shadow-lg scale-105">
        <div className="flex space-x-1 mb-2">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-catback-energy-orange text-catback-energy-orange" />)}
        </div>
        <div className="h-2 w-full bg-gray-200 rounded mb-2" />
        <div className="bg-catback-purple/5 p-2 rounded-md border-l-2 border-catback-purple">
            <p className="text-[10px] italic text-catback-purple font-medium">"Obrigado pelo seu feedback! A IA Catback..."</p>
        </div>
    </div>
  </div>
);

const GmbBenefitsIllustration = () => (
  <div className="relative w-full h-[250px] bg-white/5 rounded-2xl flex items-center justify-center overflow-hidden border border-white/10">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-catback-energy-orange/20 via-transparent to-transparent" />
    <div className="relative z-10 flex flex-col items-center">
        <Zap className="w-16 h-16 text-catback-energy-orange mb-4 animate-pulse" />
        <div className="flex -space-x-2">
            <div className="w-10 h-10 rounded-full bg-catback-purple border-2 border-white flex items-center justify-center">
                <Nfc className="w-5 h-5 text-white" />
            </div>
            <div className="w-10 h-10 rounded-full bg-catback-success-green border-2 border-white flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
            </div>
        </div>
    </div>
  </div>
);

const GoogleMeuNegocio: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section for GMB */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Domine as Pesquisas Locais e Atraia Mais Clientes
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Ter uma presença forte no Google Meu Negócio não é mais opcional. É o fator nº 1 para o Google recomendar o seu estabelecimento a quem procura por serviços na sua área.
          </p>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
                <Check className="w-6 h-6 text-catback-success-green flex-shrink-0 mt-1" />
                <p className="text-gray-700 dark:text-gray-300"><strong>Mais Avaliações:</strong> Aumento de 300% na coleta de opiniões 5 estrelas.</p>
            </div>
            <div className="flex items-start space-x-3">
                <Check className="w-6 h-6 text-catback-success-green flex-shrink-0 mt-1" />
                <p className="text-gray-700 dark:text-gray-300"><strong>IA Especializada:</strong> Respostas profissionais geradas em segundos pela IA Catback.</p>
            </div>
            <div className="flex items-start space-x-3">
                <Check className="w-6 h-6 text-catback-success-green flex-shrink-0 mt-1" />
                <p className="text-gray-700 dark:text-gray-300"><strong>Ranking Superior:</strong> Posts e fotos semanais que o colocam no topo do Google Maps.</p>
            </div>
          </div>
          <Link to="/nfc-display/checkout">
            <Button size="lg" className="bg-catback-energy-orange hover:bg-catback-energy-orange/90 text-white mt-4 px-8 py-6">
                Quero o Meu Display <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
        <div className="relative">
          <GmbIntroIllustration />
        </div>
      </div>

      {/* Comparison Section */}
      <div className="bg-gray-50 dark:bg-gray-900/50 p-8 md:p-12 rounded-3xl border border-gray-200 dark:border-gray-800">
        <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">O Poder da Reputação Online</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Veja a diferença que um perfil bem gerido faz no seu faturamento.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-l-destructive">
                    <h4 className="font-bold text-red-600 flex items-center mb-2 underline">❌ Sem a CATBACK</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Poucas avaliações, perfil desatualizado, clientes satisfeitos que se esquecem de avaliar e críticas sem resposta.</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-l-catback-success-green">
                    <h4 className="font-bold text-catback-success-green flex items-center mb-2 underline">✅ Com a CATBACK no Balcão</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Enxurrada de avaliações 5 estrelas, fotos profissionais semanais, IA a responder a todos e destaque total no Google Maps.</p>
                </div>
            </div>
            <div className="p-2">
                <GmbComparisonIllustration />
            </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {gmbFeatures.map((feature, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
            <CardHeader className="flex-grow pb-4">
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

      {/* Benefits Banner */}
      <div className="bg-catback-dark-purple text-white p-8 md:p-12 rounded-3xl flex flex-col lg:flex-row items-center gap-12 shadow-xl">
        <div className="lg:w-1/2 space-y-6">
            <Badge className="bg-catback-energy-orange text-white text-sm font-bold px-4 py-1 uppercase tracking-wider">Solução Completa</Badge>
            <h3 className="text-3xl md:text-4xl font-bold leading-tight">Receba Avaliações 5 Estrelas em 5 Segundos</h3>
            <p className="text-catback-light-purple text-lg">
                Coloque o nosso Display NFC no seu balcão e transforme o atendimento de hoje no faturamento de amanhã.
            </p>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                    <Zap className="w-6 h-6 text-catback-energy-orange mb-2" />
                    <p className="text-sm font-bold">Tecnologia NFC + QR Code</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                    <TrendingUp className="w-6 h-6 text-catback-success-green mb-2" />
                    <p className="text-sm font-bold">Mais faturamento</p>
                </div>
            </div>
        </div>
        <div className="lg:w-1/2 w-full">
            <GmbBenefitsIllustration />
        </div>
      </div>
    </div>
  );
};

export default GoogleMeuNegocio;