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
      // @ts-ignore
      if (window.Calendly) {
        // @ts-ignore
        window.Calendly.initBadgeWidget({
          url: 'https://calendly.com/catbackgmn/30min',
          text: 'Agende uma Reunião (apenas 15 min.)',
          color: '#8400ff',
          textColor: '#ffffff',
          branding: false
        });

        // 3. Injetar CSS para formatar o texto do selo
        // Como o Calendly não suporta quebra de linha nativa no parâmetro 'text',
        // usamos CSS para manipular o conteúdo do texto injetado.
        const style = document.createElement('style');
        style.innerHTML = `
          .calendly-badge-content {
            display: flex !important;
            flex-direction: column !important;
            line-height: 1.2 !important;
            padding: 10px 20px !important;
            height: auto !important;
            text-align: center !important;
          }
          /* Esconde o texto original e reconstrói com quebra de linha */
          .calendly-badge-content {
            font-size: 0 !important;
          }
          .calendly-badge-content::before {
            content: "Agende uma Reunião";
            font-size: 16px !important;
            display: block !important;
            margin-bottom: 4px !important;
          }
          .calendly-badge-content::after {
            content: "(apenas 15 min.)";
            font-size: 13px !important;
            display: block !important;
            opacity: 0.9 !important;
          }
        `;
        document.head.appendChild(style);
      }
    };

    document.body.appendChild(script);

    return () => {
      const badge = document.querySelector('.calendly-badge-widget');
      if (badge) {
        badge.remove();
      }
    };
  }, []);

  return null; 
};

export default CalendlyWidget;