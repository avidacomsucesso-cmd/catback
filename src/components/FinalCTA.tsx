import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cat } from "lucide-react";

const FinalCTA: React.FC = () => {
  return (
    <section className="py-20 bg-catback-purple dark:bg-catback-dark-purple">
      <div className="container text-center text-white">
        <Cat className="w-16 h-16 mx-auto mb-6 fill-white" />
        
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          Pronto Para Transformar Seu Negócio?
        </h2>
        
        <p className="text-xl font-light mb-8">
          Comece grátis hoje. Sem cartão de crédito. Cancele quando quiser.
        </p>

        <Link to="/signup">
          <Button 
            size="lg" 
            className="w-full sm:w-auto text-lg px-10 py-7 bg-catback-energy-orange hover:bg-catback-energy-orange/90 text-white transition-all shadow-xl shadow-catback-energy-orange/40"
          >
            <Cat className="w-5 h-5 mr-2 fill-white" /> Começar Grátis - 14 Dias de Teste
          </Button>
        </Link>

        <p className="text-sm mt-6 opacity-80">
          Mais de 1.000 negócios já confiam no CATBACK
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;