import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Store, User, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import HeroIllustration from "./HeroIllustration";
import RoleSelectionCTA from "./RoleSelectionCTA";

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
            Melhore a visibilidade do seu negócio no Google através de avaliações reais e consistentes.
          </p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white pt-2">
            Encontrado no Google. Lembrado pelos Clientes.
          </p>
          
          <RoleSelectionCTA />
          
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