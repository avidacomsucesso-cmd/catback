import React, { useEffect } from 'react';

const GOOGLE_TAG_ID = 'AW-17823816531';

const GoogleTag: React.FC = () => {
  useEffect(() => {
    const existingScript = document.querySelector(`script[src="https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}"]`);
    if (existingScript) {
      return;
    }

    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`;
    document.head.appendChild(gtagScript);

    const gtagInlineScript = document.createElement('script');
    gtagInlineScript.id = 'gtag-inline-script';
    gtagInlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GOOGLE_TAG_ID}');
    `;
    document.head.appendChild(gtagInlineScript);

    return () => {
      // Cleanup on component unmount
      if (document.head.contains(gtagScript)) {
        document.head.removeChild(gtagScript);
      }
      const inlineScript = document.getElementById('gtag-inline-script');
      if (inlineScript && document.head.contains(inlineScript)) {
        document.head.removeChild(inlineScript);
      }
    };
  }, []);

  return null;
};

export default GoogleTag;