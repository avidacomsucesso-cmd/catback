import React, { useEffect } from 'react';

const GOOGLE_TAG_ID = 'AW-17858320955';

const GoogleTag: React.FC = () => {
  useEffect(() => {
    // Universal Click Listener
    const handleUniversalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const element = target.closest('button, a, div[role="button"]');
      if (element) {
          let text = (element.innerText || element.textContent || "").toLowerCase();
          // Deteta palavras-chave de compra
          if (text.includes('comprar') || text.includes('checkout') || text.includes('finalizar') || text.includes('pedir')) {
              console.log('Google Ads: Disparo Manual de Conversão para AW-17858320955');
              if (typeof (window as any).gtag === 'function') {
                (window as any).gtag('event', 'conversion', {
                    'send_to': 'AW-17858320955/HMT2CPye_AbELu0wcNC',
                    'value': 33.90,
                    'currency': 'EUR'
                });
              }
          }
      }
    };

    document.addEventListener('click', handleUniversalClick, true);

    // Load Google Tag script
    if (!document.querySelector(`script[src*="id=${GOOGLE_TAG_ID}"]`)) {
      const gtagScript = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`;
      document.head.appendChild(gtagScript);

      gtagScript.onload = () => {
        const gtagInlineScript = document.createElement('script');
        gtagInlineScript.id = `gtag-inline-script-${GOOGLE_TAG_ID}`;
        gtagInlineScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_TAG_ID}');
        `;
        document.head.appendChild(gtagInlineScript);
      };
    }

    return () => {
      document.removeEventListener('click', handleUniversalClick, true);
    };
  }, []);

  return null;
};

export default GoogleTag;