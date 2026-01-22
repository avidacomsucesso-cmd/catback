"use client";

import React, { useEffect } from 'react';

const PIXEL_ID = '1187152749412426';

const MetaPixel: React.FC = () => {
  useEffect(() => {
    // Standard Meta Pixel initialization
    if (!(window as any).fbq) {
      (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      
      (window as any).fbq('init', PIXEL_ID);
    }
    
    // Track page view on initial load
    (window as any).fbq('track', 'PageView');

    // Listener for universal click tracking (conversions)
    const handlePixelClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const element = target.closest('button, a, div[role="button"]');
      if (element) {
        let text = (element.innerText || element.textContent || "").toLowerCase();
        if (text.includes('comprar') || text.includes('checkout') || text.includes('finalizar') || text.includes('pagar')) {
          if (typeof (window as any).fbq === 'function') {
            (window as any).fbq('track', 'InitiateCheckout', {
              value: 20.00,
              currency: 'EUR'
            });
          }
        }
      }
    };

    document.addEventListener('click', handlePixelClick, true);

    return () => {
      document.removeEventListener('click', handlePixelClick, true);
    };
  }, []);

  return (
    <noscript>
      <img 
        height="1" 
        width="1" 
        style={{ display: 'none' }} 
        src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`} 
        alt=""
      />
    </noscript>
  );
};

export default MetaPixel;