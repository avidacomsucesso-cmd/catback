import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Zap, Nfc, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Placeholder for the NFC Display illustration
const NfcDisplayIllustration: React.FC = () => (
  <div className="relative w-full max-w-xs mx-auto lg:max-w-sm">
    <img 
      src="/images/nfc-display.png" 
      alt="Display NFC CATBACK para Avaliações Google" 
      className="w-full h-auto rounded-xl shadow-2xl"
    />
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
                    €29,90
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
                    O CATBACK liga as suas avaliações do Google ao seu CRM, permitindo-lhe monitorizar e responder a todas as opiniões diretamente do seu dashboard.
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
        </div>
      </div>
    </section>
  );
};

export default NfcDisplaySection;