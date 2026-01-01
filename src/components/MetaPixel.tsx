import { useEffect } from 'react';

interface MetaPixelProps {
  pixelId: string;
}

type FBQ = (event: string, ...args: unknown[]) => void;
interface WindowWithFbq extends Window {
  fbq?: FBQ;
}

const MetaPixel = ({ pixelId }: MetaPixelProps) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    script.async = true;
    script.onload = () => {
      const fbq = (window as WindowWithFbq).fbq;
      if (fbq) {
        fbq('init', pixelId);
        fbq('track', 'PageView');
      }
      const ctaButtons = document.querySelectorAll('[data-track-cta]');
      ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
          const fbqClick = (window as WindowWithFbq).fbq;
          if (fbqClick) {
            const ctaName = button.getAttribute('data-track-cta');
            fbqClick('track', 'Lead', {
              content_name: ctaName,
              content_category: 'Lead Generation'
            });
          }
        });
      });
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [pixelId]);

  return null;
};

export default MetaPixel;
