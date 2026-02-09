import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Zap, Rocket } from "lucide-react";

const HowItWorksNfc = () => {
  return (
    <section className="py-14 bg-white dark:bg-gray-950">
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
          {/* Card 1: Como funciona? (Agora com Vídeo) */}
          <Card className="border-none shadow-lg overflow-hidden flex flex-col bg-gray-50/50">
            <div className="aspect-[4/3] relative overflow-hidden bg-black">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/ai3fCymBuCo?autoplay=0&mute=1&loop=1&playlist=ai3fCymBuCo"
                title="CATBACK Display NFC"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0"
              ></iframe>
            </div>
            <CardContent className="p-8 flex-grow text-center flex flex-col items-center">
              <div className="mb-4">
                <Smartphone className="w-12 h-12 text-catback-purple" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Como funciona?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Graças ao chip NFC de alto desempenho integrado no Display CATBACK, os seus clientes apenas precisam aproximar o telemóvel para que se abra a sua página de avaliações no Google. Sem fricção, sem pesquisas.
              </p>
            </CardContent>
          </Card>

          {/* Card 2: O que é o NFC? */}
          <Card className="border-none shadow-lg overflow-hidden flex flex-col bg-gray-50/50">
            <div className="aspect-[4/3] relative overflow-hidden bg-white">
              <img 
                src="/images/nfc-tech-detail.png" 
                alt="O que é o NFC?" 
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              />
            </div>
            <CardContent className="p-8 flex-grow text-center flex flex-col items-center">
              <div className="mb-4">
                <Zap className="w-12 h-12 text-catback-energy-orange" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                O que é o NFC?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Significa tecnologia de aproximação sem contacto. O Display CATBACK deteta o telemóvel do cliente instantaneamente e direciona-o para deixar uma avaliação 5 estrelas em apenas 5 segundos.
              </p>
            </CardContent>
          </Card>

          {/* Card 3: Como começar? */}
          <Card className="border-none shadow-lg overflow-hidden flex flex-col bg-gray-50/50">
            <div className="aspect-[4/3] relative overflow-hidden bg-white">
              <img 
                src="/images/nfc-review-ai.png" 
                alt="Como começar?" 
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              />
            </div>
            <CardContent className="p-8 flex-grow text-center flex flex-col items-center">
              <div className="mb-4">
                <Rocket className="w-12 h-12 text-catback-success-green" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Como começar?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                Passo 1: Coloque o Display CATBACK no seu balcão.
                Passo 2: Os seus clientes aproximam o telemóvel e as avaliações começam a subir todos os dias de forma automática.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksNfc;