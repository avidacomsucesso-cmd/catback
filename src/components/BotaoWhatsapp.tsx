'use client'

import { Button, ButtonProps } from "@/components/ui/button";
import React from "react";

// Permite passar todas as propriedades do botão, exceto onClick, para personalização
interface BotaoWhatsappProps extends Omit<ButtonProps, 'onClick'> {
  children: React.ReactNode;
}

const BotaoWhatsapp: React.FC<BotaoWhatsappProps> = ({ children, ...props }) => {

  const abrirWhatsapp = () => {
    const urlWhatsapp = 'https://wa.me/351928202241';

    // 1. Avisa o Google Ads que a conversão aconteceu
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-17858320955/PQmpCOfy5d8bElu0wcNc',
      });
    }

    // 2. Abre o WhatsApp em uma nova aba
    window.open(urlWhatsapp, '_blank', 'noopener,noreferrer');
  }

  return (
    <Button onClick={abrirWhatsapp} {...props}>
      {children}
    </Button>
  )
}

export default BotaoWhatsapp;