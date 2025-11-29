import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Zap, Nfc, ArrowRight } from "lucide-react";

// Placeholder for the NFC Display illustration
const NfcDisplayIllustration: React.FC = () => (
  <div className="relative w-full max-w-xs mx-auto p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 flex flex-col items-center justify-center">
    <Nfc className="w-20 h-20 text-catback-energy-orange animate-pulse" />
    <p className="mt-4 text-lg font-semibold text-white">
      Display NFC CATBACK
    </p>
    <p className="text-sm text-gray-400">Aproxime para avaliar</p>
  </div>
);

const NfcDisplaySection: React.FC = () => {
  return (
    <section className="py-20 bg-background dark:bg-gray-950">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center bg-catback-dark-purple text-white p-8 md:p-12 rounded-2xl shadow-2xl">
          {/* Left: Illustration */}
          <div className="flex justify-center">
            <NfcDisplayIllustration />
          </div>

          {/* Right: Content */}
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold">
              Receba Avaliações 5 Estrelas em 5 Segundos
            </h2>
            <p className="text-lg text-catback-light-purple">
              Coloque o nosso Display NFC no seu balcão e transforme clientes satisfeitos em avaliações positivas no Google, sem esforço. Basta um toque do telemóvel.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <div className="text-4xl font-extrabold text-catback-energy-orange">
                    €14,90
                </div>
                <div className="text-lg font-semibold">
                    Pagamento Único
                    <p className="text-sm font-normal text-catback-light-purple">Sem mensalidades</p>
                </div>
            </div>

            <Card className="bg-catback-purple/50 border-catback-light-purple/50">
              <CardContent className="p-4 flex items-center space-x-4">
                <Zap className="w-8 h-8 text-catback-energy-orange flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-white">Automação Inteligente</h3>
                  <p className="text-sm text-catback-light-purple">
                    Recompense automaticamente clientes que deixam uma avaliação de 5 estrelas com selos ou pontos bónus no seu programa de fidelidade. (Ex: <strong>5★ → +2 Selos Bónus</strong>)
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="pt-4">
                <Button size="lg" className="bg-catback-energy-orange hover:bg-catback-energy-orange/90 text-white text-lg px-8 py-6 shadow-lg">
                    Quero o Meu Display <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NfcDisplaySection;