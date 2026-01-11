import React, { useEffect } from 'react';

const GOOGLE_TAG_IDS = ['AW-17858320955', 'AW-17823816531'];

const GoogleTag: React.FC = () => {
  useEffect(() => {
    GOOGLE_TAG_IDS.forEach(id => {
      const existingScript = document.querySelector(`script[src="https://www.googletagmanager.com/gtag/js?id=${id}"]`);
      if (existingScript) {
        return;
      }

      const gtagScript = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      document.head.appendChild(gtagScript);

      const gtagInlineScript = document.createElement('script');
      gtagInlineScript.id = `gtag-inline-script-${id}`;
      gtagInlineScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${id}');
      `;
      document.head.appendChild(gtagInlineScript);
    });
  }, []);

  return null;
};

export default GoogleTag;