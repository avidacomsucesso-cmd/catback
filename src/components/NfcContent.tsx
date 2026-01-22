import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Zap, Nfc, ArrowRight, Check, Frown, Sparkles, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

// Placeholder for the NFC Display illustration
const NfcDisplayIllustration: React.FC = () => (
  <div className="relative w-full max-w-xs mx-auto lg:max-w-sm">
    <img 
      src="/display_catback.png" 
      alt="Display NFC CATBACK para Avaliações Google" 
      className="w-full h-auto rounded-xl shadow-2xl"
      onError={(e) => {
        // Fallback to a generic placeholder if image fails to load
        e.currentTarget.onerror = null; 
        e.currentTarget.src = "/placeholder.svg";
        e.currentTarget.className = "w-1/3 h-1/3 object-contain mx-auto my-auto p-4";
      }}
    />
  </div>
);

const benefits = [
    {
        icon: Nfc,
        title: "Tecnologia 'Tap & Review'",
        subtitle: "Encostou, Avaliou.",
        description: "Equipado com tecnologia NFC (Near Field Communication) e um QR Code de alta visibilidade, o nosso display elimina todas as barreiras. Funciona com 99% dos smartphones modernos. É literalmente a forma mais fácil do mundo de obter uma avaliação.",
        color: "text-catback-purple",
    },
    {
        icon: Star,
        title: "Aumento de 300% nas Avaliações",
        subtitle: "Mais Avaliações. Melhor Ranking.",
        description: "Negócios que usam os nossos displays reportam um aumento médio de 300% no número de avaliações recebidas no primeiro mês. Mais avaliações positivas significam um melhor ranking no Google e mais clientes a entrar pela sua porta.",
        color: "text-catback-energy-orange",
    },
    {
        icon: Zap,
        title: "Integração com Fidelização (Killer Feature)",
        subtitle: "O Único Display que Liga Reviews ao seu Negócio.",
        description: "Apenas com o CATBACK, pode ligar as avaliações 5 estrelas diretamente ao seu programa de fidelidade, recompensando os seus melhores clientes com pontos ou selos bónus. Use o poder das reviews para incentivar o retorno e aumentar o seu faturamento.",
        color: "text-catback-success-green",
    },
    {
        icon: Check,
        title: "Design Premium e Profissional",
        subtitle: "Elegância que Convida à Ação.",
        description: "Fabricado em acrílico de alta qualidade, com um design minimalista e profissional, o display CATBACK valoriza o seu balcão. Não é apenas uma ferramenta, é uma peça de decoração que mostra que o seu negócio se preocupa com a opinião dos clientes.",
        color: "text-catback-dark-purple",
    },
];

const NfcContent: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-catback-purple/10 text-catback-purple mb-6 border border-catback-purple/20">
              <span className="relative flex h-3 w-3 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-catback-energy-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-catback-energy-orange"></span>
              </span>
              <span className="text-sm font-semibold tracking-wide uppercase">Oferta de Lançamento</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-catback-dark-purple mb-6 leading-tight">
              Seu Negócio no Topo do <span className="text-catback-purple">Google</span>
            </h2>

            <div className="mb-8 p-6 bg-gradient-to-r from-catback-purple to-catback-dark-purple rounded-2xl shadow-xl text-white transform -rotate-1">
                <p className="text-sm uppercase font-bold opacity-80 mb-1">Aproveite agora:</p>
                <div className="flex items-baseline gap-3">
                    <span className="text-gray-300 line-through text-2xl">€33,90</span>
                    <span className="text-5xl font-black text-white">€20,00</span>
                </div>
                <p className="mt-2 text-sm font-medium italic">* Apenas para as primeiras 100 unidades.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <div className="text-5xl font-extrabold text-catback-energy-orange">
                    €20,00
                </div>
                <div className="text-xl font-semibold">
                    Pagamento Único
                    <p className="text-sm font-normal text-catback-light-purple">Sem mensalidades</p>
                </div>
            </div>

            {/* Killer Feature Card - Adjusted to match purple section */}
            <Card className="bg-catback-purple/50 border-catback-light-purple/50">
              <CardContent className="p-4 flex items-center space-x-4">
                <Zap className="w-8 h-8 text-catback-energy-orange flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-bold text-white text-lg">Impulsione seu Negócio</h3>
                  <p className="text-sm text-white font-medium">
                    Aumente sua visibilidade online e atraia novos clientes com avaliações positivas constantes, garantindo que sua marca se destaque da concorrência no Google.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="pt-4">
                <Link to="/nfc-display/checkout">
                    <Button size="lg" className="bg-catback-energy-orange hover:bg-catback-energy-orange/90 text-white text-lg px-8 py-6 shadow-lg">
                        Quero o Meu Display <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative w-full max-w-xs mx-auto lg:max-w-sm">
              <img 
                src="/display_catback.png" 
                alt="Display NFC CATBACK para Avaliações Google" 
                className="w-full h-auto rounded-xl shadow-2xl"
                onError={(e) => {
                  // Fallback to a generic placeholder if image fails to load
                  e.currentTarget.onerror = null; 
                  e.currentTarget.src = "/placeholder.svg";
                  e.currentTarget.className = "w-1/3 h-1/3 object-contain mx-auto my-auto p-4";
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Benefits Grid */}
        <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
                Os 4 Benefícios Principais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {benefits.map((benefit, index) => (
                    <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow h-full">
                        <CardHeader>
                            <benefit.icon className={`w-8 h-8 mb-2 ${benefit.color}`} />
                            <CardTitle className="text-xl text-gray-900 dark:text-white">{benefit.subtitle}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-semibold text-catback-dark-purple dark:text-back-light-purple mb-2">{benefit.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default NfcContent;