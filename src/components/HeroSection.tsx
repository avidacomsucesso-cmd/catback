import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Store, User, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import HeroIllustration from "./HeroIllustration";

const HeroSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-white dark:bg-gray-950">
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text Content */}
        <div className="space-y-6 text-center lg:text-left">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-gray-900 dark:text-white">
            Atraia Clientes do <span className="text-catback-purple dark:text-catback-light-purple">Google</span>. Transforme-os em Fãs.
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-lg mx-auto lg:mx-0">
            Aumente suas avaliações 5 estrelas em tempo real com o Display NFC Catback. A tecnologia que coloca seu negócio no topo do Google.
          </p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white pt-2">
            Encontrado no Google. Lembrado pelos Clientes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
            <Link to="/nfc-display">
              <Button size="lg" className="w-full sm:w-auto bg-catback-purple hover:bg-catback-dark-purple text-lg px-8 py-6">
                Conhecer o Display NFC <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a href="https://wa.me/351928202241" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 border-catback-purple text-catback-purple">
                Solicitar Avaliação Grátis
              </Button>
            </a>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-gray-600 dark:text-gray-400 pt-4">
            <p className="flex items-center"><ArrowRight className="w-4 h-4 mr-1 text-catback-success-green" /> Sem cartão de crédito</p>
            <p className="flex items-center"><ArrowRight className="w-4 h-4 mr-1 text-catback-success-green" /> Configuração em 5 minutos</p>
            <p className="flex items-center"><ArrowRight className="w-4 h-4 mr-1 text-catback-success-green" /> Suporte em português</p>
          </div>
        </div>

        {/* Right: Illustration */}
        <div className="flex justify-center lg:justify-end relative">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;