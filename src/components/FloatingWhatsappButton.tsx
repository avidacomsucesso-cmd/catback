'use client'

import React from 'react';
import BotaoWhatsapp from './BotaoWhatsapp';
import { Phone } from 'lucide-react';

const FloatingWhatsappButton: React.FC = () => {
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <BotaoWhatsapp
        size="lg"
        className="bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center p-4 h-16 w-16"
      >
        <Phone className="h-8 w-8" />
        <span className="sr-only">Fale Conosco no WhatsApp</span>
      </BotaoWhatsapp>
    </div>
  );
};

export default FloatingWhatsappButton;