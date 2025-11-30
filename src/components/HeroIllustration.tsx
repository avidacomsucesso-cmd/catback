import React from "react";
import { MapPin, CreditCard, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const HeroIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-xs mx-auto lg:max-w-sm p-4">
      {/* Mock Smartphone Frame */}
      <div className="relative w-full h-[450px] bg-gray-900 dark:bg-gray-700 rounded-3xl shadow-2xl border-8 border-gray-700 dark:border-gray-900 overflow-hidden">
        
        {/* Screen Content */}
        <div className="h-full w-full bg-white dark:bg-gray-800 p-4 flex flex-col justify-between">
          
          {/* Top: Google Review Focus */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-1 text-catback-energy-orange">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-catback-energy-orange" />
                ))}
            </div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Avalie o Café da Praça
            </p>
            <div className="flex items-center justify-center text-xs text-gray-500">
                <MapPin className="w-3 h-3 mr-1" /> Google Maps
            </div>
          </div>

          {/* Middle: Digital Loyalty Card */}
          <div className="relative h-40 w-full rounded-xl p-3 bg-catback-purple shadow-lg flex flex-col justify-between text-white">
            <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                    <p className="text-lg font-bold">Cartão Café</p>
                    <p className="text-xs opacity-80">Recompensa: 1 Café Grátis</p>
                </div>
                <img src="/images/catback-logo.png" alt="Logo" className="w-6 h-6" />
            </div>
            <div className="text-center">
                <p className="text-4xl font-extrabold">7/10</p>
                <p className="text-sm opacity-90">Selos Acumulados</p>
            </div>
            <div className="flex justify-between text-xs opacity-70">
                <span>ID: 4A2B3C</span>
                <CreditCard className="w-4 h-4" />
            </div>
          </div>

          {/* Bottom: CTA */}
          <div className="text-center">
            <button className="w-full py-2 bg-catback-energy-orange text-white font-semibold rounded-lg text-sm">
                Ver Meus Cartões
            </button>
          </div>
        </div>
      </div>
      
      {/* Floating Element: Google Pin */}
      <div className="absolute -top-4 -right-4 p-3 bg-white rounded-full shadow-xl transform rotate-6">
        <MapPin className="w-8 h-8 text-red-500" />
      </div>
      
      {/* Floating Element: Star */}
      <div className="absolute -bottom-4 -left-4 p-2 bg-catback-success-green rounded-full shadow-xl transform -rotate-12">
        <Star className="w-6 h-6 text-white fill-white" />
      </div>
    </div>
  );
};

export default HeroIllustration;