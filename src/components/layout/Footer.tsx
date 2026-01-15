import { Link } from 'react-router-dom';
import { useLanguage, contactInfo } from '@/lib/i18n';
import { Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-xl font-medium">Gauhar</span>
              <span className="text-xl text-muted-foreground ml-1">Sergazina</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {t.footer.designer}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-4 text-sm uppercase tracking-wider">
              {language === 'ru' ? 'Навигация' : 'Navigation'}
            </h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t.nav.home}
              </Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t.nav.about}
              </Link>
              <Link to="/portfolio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t.nav.portfolio}
              </Link>
              <Link to="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t.nav.services}
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t.nav.contact}
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-medium mb-4 text-sm uppercase tracking-wider">
              {t.nav.contact}
            </h4>
            <div className="flex flex-col gap-3">
              <a 
                href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="h-4 w-4" />
                {contactInfo.phone}
              </a>
              <a 
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                {contactInfo.email}
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{contactInfo.address[language]}</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-medium mb-4 text-sm uppercase tracking-wider">
              {t.contact.info.socials}
            </h4>
            <div className="flex flex-col gap-3">
              <a 
                href={contactInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="h-4 w-4" />
                @{contactInfo.instagram}
              </a>
              <a 
                href={contactInfo.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Youtube className="h-4 w-4" />
                {contactInfo.youtube}
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
