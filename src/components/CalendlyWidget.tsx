"use client";

import React, { useEffect } from 'react';

const CalendlyWidget: React.FC = () => {
  useEffect(() => {
    // 1. Adicionar o link do CSS ao head
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // 2. Adicionar o script do Calendly ao body
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.type = 'text/javascript';
    
    script.onload = () => {
      // Inicializar o widget quando o script for carregado
      // @ts-ignore - Calendly é adicionado ao window globalmente pelo script
      if (window.Calendly) {
        // @ts-ignore
        window.Calendly.initBadgeWidget({
          url: 'https://calendly.com/catbackgmn/30min',
          text: 'Agende uma demonstração',
          color: '#8400ff',
          textColor: '#ffffff',
          branding: true
        });
      }
    };

    document.body.appendChild(script);

    // Cleanup: remover o widget e os scripts quando o componente for desmontado
    return () => {
      // Remover os elementos adicionados (opcional, dependendo do comportamento desejado)
      // document.head.removeChild(link);
      // document.body.removeChild(script);
      
      // Para remover o widget do Calendly do DOM
      const badge = document.querySelector('.calendly-badge-widget');
      if (badge) {
        badge.remove();
      }
    };
  }, []);

  return null; // O componente não renderiza nada visualmente no seu lugar, apenas injeta o widget global
};

export default CalendlyWidget;