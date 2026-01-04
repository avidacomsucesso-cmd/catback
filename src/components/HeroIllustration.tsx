import React from "react";

const HeroIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:mx-0 p-4">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] duration-500">
        <img 
          src="/images/hero-display.png" 
          alt="CATBACK Display NFC e Fidelização Digital" 
          className="w-full h-auto object-cover"
        />
        {/* Overlay sutil para dar profundidade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>
      
      {/* Elementos decorativos flutuantes para manter o estilo dinâmico */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-catback-purple/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-catback-energy-orange/10 rounded-full blur-3xl animate-pulse" />
    </div>
  );
};

export default HeroIllustration;