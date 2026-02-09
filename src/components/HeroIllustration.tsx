import React from "react";

const HeroIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:mx-0 p-4 space-y-6">
      {/* Imagem Original (Destaque do Produto) */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.01] duration-500">
        <img 
          src="/images/hero-display.png" 
          alt="CATBACK Display NFC e Fidelização Digital" 
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Novo Vídeo ou Diagrama (Como Funciona) */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-catback-purple/20 transition-transform hover:scale-[1.01] duration-500">
        <img 
          src="/images/display-diagram.png" 
          alt="Diagrama de Funcionamento NFC" 
          className="w-full h-auto object-cover"
        />
        <div className="absolute top-2 left-2 bg-catback-purple text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
          Alta Tecnologia
        </div>
      </div>
      
      {/* Elementos decorativos flutuantes para manter o estilo dinâmico */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-catback-purple/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-catback-energy-orange/10 rounded-full blur-3xl animate-pulse" />
    </div>
  );
};

export default HeroIllustration;