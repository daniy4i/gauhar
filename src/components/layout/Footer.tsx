import { Link } from 'react-router-dom';
import { useLanguage, contactInfo, getWhatsAppUrl } from '@/lib/i18n';
import { Instagram, Youtube, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const { language, t } = useLanguage();

  const currentYear = new Date().getFullYear();

  const handleWhatsAppClick = () => {
    const url = getWhatsAppUrl(language);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleTelegramClick = () => {
    window.open(contactInfo.telegramUrl, '_blank', 'noopener,noreferrer');
  };

  const footerContent = {
    ru: {
      office: 'Алматы',
      address: 'РК, г. Алматы, ул. Хаджимукана, 49',
      email: 'Почта',
      phone: contactInfo.phone,
      writeToUs: 'Напишите нам:',
      social: 'Соцсети',
      privacy: 'Политика конфиденциальности',
      offer: 'Публичная оферта',
      whatsapp: 'WhatsApp',
      telegram: 'Telegram',
    },
    en: {
      office: 'Almaty',
      address: 'Kazakhstan',
      email: 'Email',
      phone: contactInfo.phone,
      writeToUs: 'Write to us:',
      social: 'Social',
      privacy: 'Privacy Policy',
      offer: 'Public Offer',
      whatsapp: 'WhatsApp',
      telegram: 'Telegram',
    },
  };

  const content = footerContent[language];

  return (
    <footer className="bg-[hsl(240,6%,6%)] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 md:px-8 py-20 lg:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Office / Location */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {content.office}
            </h3>
            <p className="text-[hsl(0,0%,55%)] text-sm leading-relaxed">
              {content.address}
            </p>
          </div>

          {/* Column 2: Email */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {content.email}
            </h3>
            <a 
              href={`mailto:${contactInfo.email}`}
              className="text-[hsl(0,0%,55%)] text-sm hover:text-white transition-colors duration-200"
            >
              {contactInfo.email}
            </a>
          </div>

          {/* Column 3: Phone + CTA Buttons */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              <a 
                href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                className="hover:text-primary transition-colors duration-200"
              >
                {content.phone}
              </a>
            </h3>
            <p className="text-[hsl(0,0%,55%)] text-sm mb-4">
              {content.writeToUs}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleTelegramClick}
                className="bg-primary text-white hover:bg-[hsl(211,100%,55%)] hover:shadow-[0_0_20px_hsl(211,100%,50%/0.4)]"
              >
                <Send className="h-4 w-4 mr-2" />
                {content.telegram}
              </Button>
              <Button
                onClick={handleWhatsAppClick}
                className="bg-primary text-white hover:bg-[hsl(211,100%,55%)] hover:shadow-[0_0_20px_hsl(211,100%,50%/0.4)]"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                {content.whatsapp}
              </Button>
            </div>
          </div>

          {/* Column 4: Social */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {content.social}
            </h3>
            <div className="flex gap-4">
              <a 
                href={contactInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-[hsl(0,0%,25%)] flex items-center justify-center text-[hsl(0,0%,55%)] hover:text-white hover:border-white transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href={contactInfo.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-[hsl(0,0%,25%)] flex items-center justify-center text-[hsl(0,0%,55%)] hover:text-white hover:border-white transition-all duration-200"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Line */}
      <div className="border-t border-[hsl(0,0%,18%)]">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[hsl(0,0%,45%)] text-sm">
            <div className="flex flex-wrap gap-6">
              <Link 
                to="/privacy" 
                className="hover:text-white transition-colors duration-200 underline underline-offset-4"
              >
                {content.privacy}
              </Link>
              <Link 
                to="/offer" 
                className="hover:text-white transition-colors duration-200 underline underline-offset-4"
              >
                {content.offer}
              </Link>
            </div>
            <p>
              © Gauhar Sergazina, {currentYear}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;