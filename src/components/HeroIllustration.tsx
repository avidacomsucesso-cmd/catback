import React from "react";

const HeroIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:mx-0 p-4 space-y-6">
      {/* Vídeo do YouTube em destaque */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video border-2 border-catback-purple/20 transition-transform hover:scale-[1.01] duration-500">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/ai3fCymBuCo?autoplay=0&mute=1&loop=1&playlist=ai3fCymBuCo"
          title="CATBACK Display NFC"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0"
        ></iframe>
      </div>

      {/* Imagem do Produto */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.01] duration-500">
        <img 
          src="/images/hero-display.png" 
          alt="CATBACK Display NFC e Fidelização Digital" 
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>
      
      {/* Elementos decorativos flutuantes */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-catback-purple/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-catback-energy-orange/10 rounded-full blur-3xl animate-pulse" />
    </div>
  );
};

export default HeroIllustration;