import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import BotaoWhatsapp from "./BotaoWhatsapp";

const FinalCTA: React.FC = () => {
  return (
    <section className="py-20 bg-catback-purple dark:bg-catback-dark-purple">
      <div className="container text-center text-white">
        <ArrowRight className="w-16 h-16 mx-auto mb-6 fill-white" />
        
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          Pronto Para Transformar Seu Negócio?
        </h2>
        
        <p className="text-xl font-light mb-8">
          Solicite uma avaliação Grátis hoje. Sem cartão de crédito. Cancele quando quiser.
        </p>

        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Descubra como a CATBACK pode transformar a relação com seus clientes e impulsionar seu crescimento.
        </p>
        <div className="mt-8">
          <BotaoWhatsapp
            size="lg"
            className="bg-catback-purple hover:bg-catback-dark-purple text-white"
          >
            Agendar Demonstração Gratuita
            <ArrowRight className="ml-2 h-5 w-5" />
          </BotaoWhatsapp>
        </div>

        <p className="text-sm mt-6 opacity-80">
          Mais de 1.000 negócios já confiam no CATBACK
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;