import { useEffect } from 'react';
import { useLanguage } from '@/lib/i18n';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

const SEO = ({ title, description, image, url, type = 'website' }: SEOProps) => {
  const { language } = useLanguage();
  
  const defaultTitle = language === 'ru' 
    ? 'Гаухар Сергазина — Дизайнер интерьеров в Алматы' 
    : 'Gauhar Sergazina — Interior Designer in Almaty';
  
  const defaultDescription = language === 'ru'
    ? 'Профессиональный дизайн интерьеров в Алматы. Квартиры, дома, рестораны. Проекты под ключ от $100/м². Central Saint Martins, Лондон.'
    : 'Professional interior design in Almaty. Apartments, houses, restaurants. Turnkey projects from $100/m². Central Saint Martins, London.';
  
  const defaultImage = 'https://pure-architect-space-01.lovable.app/og-image.jpg';
  const defaultUrl = 'https://pure-architect-space-01.lovable.app';

  const finalTitle = title ? `${title} | ${language === 'ru' ? 'Гаухар Сергазина' : 'Gauhar Sergazina'}` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalImage = image || defaultImage;
  const finalUrl = url || defaultUrl;

  useEffect(() => {
    // Update document title
    document.title = finalTitle;

    // Helper to update or create meta tag
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    setMeta('description', finalDescription);
    setMeta('author', language === 'ru' ? 'Гаухар Сергазина' : 'Gauhar Sergazina');
    setMeta('keywords', language === 'ru' 
      ? 'дизайн интерьера, Алматы, дизайнер, Гаухар Сергазина, интерьер квартиры, дизайн дома'
      : 'interior design, Almaty, designer, Gauhar Sergazina, apartment interior, house design');

    // Open Graph tags
    setMeta('og:title', finalTitle, true);
    setMeta('og:description', finalDescription, true);
    setMeta('og:image', finalImage, true);
    setMeta('og:url', finalUrl, true);
    setMeta('og:type', type, true);
    setMeta('og:locale', language === 'ru' ? 'ru_RU' : 'en_US', true);
    setMeta('og:site_name', language === 'ru' ? 'Гаухар Сергазина' : 'Gauhar Sergazina', true);

    // Twitter Card tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', finalTitle);
    setMeta('twitter:description', finalDescription);
    setMeta('twitter:image', finalImage);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', finalUrl);

    // Language alternate
    let alternate = document.querySelector('link[rel="alternate"][hreflang]');
    if (!alternate) {
      alternate = document.createElement('link');
      alternate.setAttribute('rel', 'alternate');
      document.head.appendChild(alternate);
    }
    alternate.setAttribute('hreflang', language === 'ru' ? 'en' : 'ru');
    alternate.setAttribute('href', finalUrl);

  }, [finalTitle, finalDescription, finalImage, finalUrl, type, language]);

  return null;
};

export default SEO;
