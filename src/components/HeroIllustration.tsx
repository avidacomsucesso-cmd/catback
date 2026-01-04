import React from "react";
import { MapPin, CreditCard, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const HeroIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-[208px] lg:max-w-[250px] mx-auto p-4">
      {/* Mock Smartphone Frame */}
      <div className="relative w-full h-[292px] bg-gray-900 dark:bg-gray-700 rounded-3xl shadow-2xl border-8 border-gray-700 dark:border-gray-900 overflow-hidden">
        
        {/* Screen Content */}
        <div className="h-full w-full bg-white dark:bg-gray-800 p-2 flex flex-col justify-between">
          
          {/* Top: Google Review Focus */}
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center space-x-1 text-catback-energy-orange">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-catback-energy-orange" />
                ))}
            </div>
            <p className="text-xs font-semibold text-gray-900 dark:text-white">
                Avalie o Café da Praça
            </p>
            <div className="flex items-center justify-center text-xs text-gray-500">
                <MapPin className="w-2 h-2 mr-1" /> Google Maps
            </div>
          </div>

          {/* Middle: Digital Loyalty Card */}
          <div className="relative h-28 w-full rounded-xl p-2 bg-catback-purple shadow-lg flex flex-col justify-between text-white">
            <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                    <p className="text-sm font-bold">Cartão Café</p>
                    <p className="text-[10px] opacity-80">Recompensa: 1 Café Grátis</p>
                </div>
                <img src="/images/catback-logo.png" alt="Logo" className="w-4 h-4" />
            </div>
            <div className="text-center">
                <p className="text-2xl font-extrabold">7/10</p>
                <p className="text-[10px] opacity-90">Selos Acumulados</p>
            </div>
            <div className="flex justify-between text-[8px] opacity-70">
                <span>ID: 4A2B3C</span>
                <CreditCard className="w-3 h-3" />
            </div>
          </div>

          {/* Bottom: CTA */}
          <div className="text-center">
            <button className="w-full py-1.5 bg-catback-energy-orange text-white font-semibold rounded-lg text-xs">
                Ver Meus Cartões
            </button>
          </div>
        </div>
      </div>
      
      {/* Floating Element: Google Pin */}
      <div className="absolute -top-2 -right-2 p-2 bg-white rounded-full shadow-xl transform rotate-6">
        <MapPin className="w-5 h-5 text-red-500" />
      </div>
      
      {/* Floating Element: Star */}
      <div className="absolute -bottom-2 -left-2 p-1.5 bg-catback-success-green rounded-full shadow-xl transform -rotate-12">
        <Star className="w-4 h-4 text-white fill-white" />
      </div>
    </div>
  );
};

export default HeroIllustration;