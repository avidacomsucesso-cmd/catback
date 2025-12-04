import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Zap, Nfc, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Placeholder for the NFC Display illustration
const NfcDisplayIllustration: React.FC = () => (
  <div className="relative w-full max-w-xs mx-auto lg:max-w-sm">
    <img 
      src="/images/nfc-display.png" 
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
        description: "Negócios que usam os nossos displays reportam um aumento médio de 300% no número de avaliações recebidas no primeiro mês. Mais avaliações positivas significam um melhor ranking no Google Maps e mais clientes a entrar pela sua porta.",
        color: "text-catback-energy-orange",
    },
    {
        icon: Zap,
        title: "Integração com Fidelização (Killer Feature)",
        subtitle: "O Único Display que Liga Reviews ao CRM.",
        description: "Apenas com o CATBACK, pode ligar as avaliações 5 estrelas diretamente ao seu programa de fidelidade, recompensando os seus melhores clientes com pontos ou selos bónus. Use o poder das reviews para incentivar o retorno.",
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
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
            Receba Avaliações 5 Estrelas em 5 Segundos
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Apresentamos o Display NFC CATBACK: a forma mais rápida e elegante de transformar clientes satisfeitos em avaliações positivas no Google.
          </p>
        </div>

        {/* Dor vs Solução */}
        <div className="max-w-4xl mx-auto space-y-8 mb-16">
            <Card className="p-6 bg-red-50 dark:bg-red-900/20 border-red-300">
                <CardTitle className="text-xl text-destructive mb-2">A Dor:</CardTitle>
                <p className="text-gray-700 dark:text-gray-300">
                    Pedir uma avaliação a um cliente é estranho. Eles dizem 'sim, claro', mas depois esquecem-se. O processo é complicado: têm de procurar o seu negócio, encontrar a secção de avaliações, e só depois escrever. É pedir demasiado.
                </p>
            </Card>
            <Card className="p-6 bg-catback-light-purple/20 dark:bg-catback-dark-purple/50 border-catback-purple">
                <CardTitle className="text-xl text-catback-dark-purple dark:text-white mb-2">A Solução:</CardTitle>
                <p className="text-gray-700 dark:text-gray-300">
                    Agora, imagine isto: o seu cliente paga, você aponta para o display e diz 'Se gostou, deixe-nos a sua opinião aqui'. Ele encosta o telemóvel. A página de avaliação abre instantaneamente. Em 5 segundos, você ganhou uma nova avaliação 5 estrelas.
                </p>
            </Card>
        </div>

        {/* Main Content & CTA */}
        <div className="grid lg:grid-cols-2 gap-12 items-center bg-gray-100 dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-xl">
          {/* Left: Illustration */}
          <div className="flex justify-center">
            <NfcDisplayIllustration />
          </div>

          {/* Right: CTA & Price */}
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Adquira o Seu Display por um Preço Simbólico
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <div className="text-5xl font-extrabold text-catback-purple">
                    €39,90
                </div>
                <div className="text-xl font-semibold text-gray-900 dark:text-white">
                    Pagamento Único
                    <p className="text-sm font-normal text-gray-600 dark:text-gray-400">Este não é o preço do display. É o preço de começar a transformar a sua reputação online, hoje.</p>
                </div>
            </div>

            {/* Killer Feature Badge - Adjusted text */}
            <Card className="bg-catback-energy-orange/80 border-catback-energy-orange">
              <CardContent className="p-4 flex items-center justify-center space-x-4">
                <Zap className="w-8 h-8 text-white fill-white" />
                <div className="text-white text-center">
                  <h3 className="font-extrabold text-xl">🏆 EXCLUSIVO CATBACK</h3>
                  <p className="text-lg font-semibold">Integração Automática com Fidelização</p>
                </div>
              </CardContent>
            </Card>

            <div className="pt-4">
                <Button size="lg" className="w-full sm:w-auto bg-catback-energy-orange hover:bg-catback-energy-orange/90 text-white text-lg px-8 py-6 shadow-lg">
                    Quero o Meu Display <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
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
                            <h3 className="text-lg font-semibold text-catback-dark-purple dark:text-catback-light-purple mb-2">{benefit.title}</h3>
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