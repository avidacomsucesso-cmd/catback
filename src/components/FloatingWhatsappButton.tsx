'use client'

import React from 'react';
import BotaoWhatsapp from './BotaoWhatsapp';

const FloatingWhatsappButton: React.FC = () => {
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <BotaoWhatsapp
        size="lg"
        className="bg-transparent hover:bg-transparent text-white rounded-full shadow-lg flex items-center justify-center p-0 h-16 w-16"
      >
        <img src="/images/whatsapp-logo.png" alt="WhatsApp" className="h-16 w-16" />
        <span className="sr-only">Fale Conosco no WhatsApp</span>
      </BotaoWhatsapp>
    </div>
  );
};

export default FloatingWhatsappButton;