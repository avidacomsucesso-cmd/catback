import React, { useEffect } from 'react';

const GOOGLE_TAG_IDS = ['AW-17858320955', 'AW-17823816531'];

const GoogleTag: React.FC = () => {
  useEffect(() => {
    // Universal Click Listener
    const handleUniversalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      let text = target.innerText || target.textContent || "";
      text = text.toLowerCase();

      if (text.includes('comprar') || text.includes('finalizar') || text.includes('checkout') || text.includes('pedir agora')) {
        console.log('Google Ads: Conversão de Compra Disparada');
        
        if (typeof (window as any).gtag === 'function') {
          (window as any).gtag('event', 'conversion', {
              'send_to': 'AW-17858320955/HMT2CPye_AbELu0wcNC',
              'value': 33.90, // Using the actual product price
              'currency': 'EUR',
              'transaction_id': `tx-${Date.now()}` // Unique ID to avoid duplicates
          });
        }
      }
    };

    document.addEventListener('click', handleUniversalClick);

    // Load Google Tag scripts
    GOOGLE_TAG_IDS.forEach(id => {
      if (document.querySelector(`script[src*="id=${id}"]`)) return;

      const gtagScript = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      document.head.appendChild(gtagScript);

      gtagScript.onload = () => {
        const gtagInlineScript = document.createElement('script');
        gtagInlineScript.id = `gtag-inline-script-${id}`;
        gtagInlineScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');
        `;
        document.head.appendChild(gtagInlineScript);
      };
    });

    return () => {
      document.removeEventListener('click', handleUniversalClick);
      // Note: Scripts are not removed on unmount to ensure they persist across navigation
    };
  }, []);

  return null;
};

export default GoogleTag;