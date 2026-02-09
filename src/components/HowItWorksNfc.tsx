import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Zap, Rocket } from "lucide-react";

const HowItWorksNfc = () => {
  const steps = [
    {
      title: "Como funciona?",
      description: "Graças ao chip NFC de alto desempenho integrado no Display CATBACK, os seus clientes apenas precisam aproximar o telemóvel para que se abra a sua página de avaliações no Google. Sem fricção, sem pesquisas.",
      icon: <Smartphone className="w-12 h-12 text-catback-purple" />,
      image: "/images/hero-display.png", // Usando imagem existente ou placeholder
      bg: "bg-gray-50/50"
    },
    {
      title: "O que é o NFC?",
      description: "Significa tecnologia de aproximação sem contacto. O Display CATBACK deteta o telemóvel do cliente instantaneamente e direciona-o para deixar uma avaliação 5 estrelas em apenas 5 segundos.",
      icon: <Zap className="w-12 h-12 text-catback-energy-orange" />,
      image: "/images/nfc-tech-detail.png",
      bg: "bg-gray-50/50"
    },
    {
      title: "Como começar?",
      description: "Passo 1: Coloque o Display CATBACK no seu balcão.\nPasso 2: Os seus clientes aproximam o telemóvel e as avaliações começam a subir todos os dias de forma automática.",
      icon: <Rocket className="w-12 h-12 text-catback-success-green" />,
      image: "/images/nfc-review-ai.png",
      bg: "bg-gray-50/50"
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Tecnologia que <span className="text-catback-purple">Trabalha por Si</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Simples para o cliente, poderoso para o seu negócio. Veja como o NFC revoluciona a forma como recebe feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className={`border-none shadow-lg overflow-hidden flex flex-col ${step.bg}`}>
              <div className="aspect-[4/3] relative overflow-hidden bg-white">
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
              <CardContent className="p-8 flex-grow text-center flex flex-col items-center">
                <div className="mb-4">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksNfc;