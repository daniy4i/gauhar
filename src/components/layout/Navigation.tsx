import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage, contactInfo, getWhatsAppUrl } from '@/lib/i18n';
import LanguageToggle from '@/components/LanguageToggle';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { MessageCircle, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface NavLink {
  href: string;
  label: string;
  sectionId?: string;
}

const Navigation = () => {
  const { language, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle scroll after navigation from another page
  useEffect(() => {
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const navLinks: NavLink[] = [
    { href: '/portfolio', label: language === 'ru' ? 'Интерьеры' : 'Interiors', sectionId: 'portfolio' },
    { href: '/services', label: language === 'ru' ? 'Услуги' : 'Services', sectionId: 'services' },
    { href: '/about', label: language === 'ru' ? 'О нас' : 'About', sectionId: 'about' },
    { href: '/contact', label: language === 'ru' ? 'Контакты' : 'Contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const handleNavClick = (e: React.MouseEvent, link: NavLink) => {
    setIsOpen(false);
    
    // If link has no sectionId, let it navigate normally to the page
    if (!link.sectionId) {
      return; // Let the Link component handle navigation
    }
    
    // Only scroll to section if on homepage and section exists
    if (location.pathname === '/' && link.sectionId) {
      const element = document.getElementById(link.sectionId);
      if (element) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  const handleWhatsAppClick = () => {
    const url = getWhatsAppUrl(language);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleTelegramClick = () => {
    window.open(contactInfo.telegramUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md py-3"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between">
          {/* Left - Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-6 flex-1">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={cn(
                  "text-[11px] tracking-[0.15em] uppercase transition-all duration-300 relative group",
                  isActive(link.href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-foreground transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Center - Logo */}
          <Link 
            to="/" 
            className="text-[11px] tracking-[0.4em] uppercase font-normal text-foreground hover:opacity-70 transition-opacity duration-200"
          >
            GAUHAR
          </Link>

          {/* Right - Actions (Desktop) */}
          <div className="hidden lg:flex items-center gap-6 flex-1 justify-end">
            {navLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={cn(
                  "text-[11px] tracking-[0.15em] uppercase transition-all duration-300 relative group",
                  isActive(link.href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-foreground transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            {/* Hamburger Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="flex flex-col justify-center items-center gap-1.5 w-6 h-6 group">
                  <span className="w-5 h-[1.5px] bg-foreground transition-all group-hover:w-6" />
                  <span className="w-6 h-[1.5px] bg-foreground" />
                  <span className="w-4 h-[1.5px] bg-foreground transition-all group-hover:w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[380px] bg-card border-l border-border p-0" aria-describedby={undefined}>
                <VisuallyHidden>
                  <SheetTitle>{language === 'ru' ? 'Меню навигации' : 'Navigation Menu'}</SheetTitle>
                </VisuallyHidden>
                <div className="flex flex-col h-full p-8">
                  {/* Menu Links */}
                  <nav className="flex flex-col gap-1 mt-8">
                    <Link
                      to="/"
                      onClick={() => setIsOpen(false)}
                      className="text-base py-3 text-foreground hover:text-muted-foreground transition-colors"
                    >
                      {language === 'ru' ? 'На главную' : 'Home'}
                    </Link>
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        onClick={(e) => handleNavClick(e, link)}
                        className={cn(
                          "text-base py-3 transition-colors",
                          isActive(link.href)
                            ? "text-foreground"
                            : "text-foreground hover:text-muted-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>

                  {/* Office Info */}
                  <div className="mt-auto space-y-6">
                    <div>
                      <h4 className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground mb-2">
                        {language === 'ru' ? 'АЛМАТЫ' : 'ALMATY'}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {language === 'ru' ? contactInfo.address.ru : contactInfo.address.en}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <a 
                        href={`tel:${contactInfo.phone}`} 
                        className="block text-base text-foreground hover:text-muted-foreground transition-colors"
                      >
                        {contactInfo.phone}
                      </a>
                      <a 
                        href={`mailto:${contactInfo.email}`} 
                        className="block text-base text-foreground hover:text-muted-foreground transition-colors"
                      >
                        {contactInfo.email}
                      </a>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex gap-3 pt-4">
                      <Button
                        size="sm"
                        onClick={handleTelegramClick}
                        className="rounded-full px-5 h-9 text-xs"
                      >
                        <Send className="w-3.5 h-3.5 mr-2" />
                        Telegram
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleWhatsAppClick}
                        className="rounded-full px-5 h-9 text-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5 mr-2" />
                        WhatsApp
                      </Button>
                    </div>

                    {/* Language & Theme */}
                    <div className="flex items-center gap-3 pt-2">
                      <LanguageToggle />
                      <ThemeToggle />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Mobile - Hamburger only */}
          <div className="flex lg:hidden items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="flex flex-col justify-center items-center gap-1.5 w-6 h-6 group">
                  <span className="w-5 h-[1.5px] bg-foreground transition-all group-hover:w-6" />
                  <span className="w-6 h-[1.5px] bg-foreground" />
                  <span className="w-4 h-[1.5px] bg-foreground transition-all group-hover:w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[380px] bg-card border-l border-border p-0" aria-describedby={undefined}>
                <VisuallyHidden>
                  <SheetTitle>{language === 'ru' ? 'Меню навигации' : 'Navigation Menu'}</SheetTitle>
                </VisuallyHidden>
                <div className="flex flex-col h-full p-8">
                  {/* Menu Links */}
                  <nav className="flex flex-col gap-1 mt-8">
                    <Link
                      to="/"
                      onClick={() => setIsOpen(false)}
                      className="text-base py-3 text-foreground hover:text-muted-foreground transition-colors"
                    >
                      {language === 'ru' ? 'На главную' : 'Home'}
                    </Link>
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        onClick={(e) => handleNavClick(e, link)}
                        className={cn(
                          "text-base py-3 transition-colors",
                          isActive(link.href)
                            ? "text-foreground"
                            : "text-foreground hover:text-muted-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>

                  {/* Office Info */}
                  <div className="mt-auto space-y-6">
                    <div>
                      <h4 className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground mb-2">
                        {language === 'ru' ? 'АЛМАТЫ' : 'ALMATY'}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {language === 'ru' ? contactInfo.address.ru : contactInfo.address.en}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <a 
                        href={`tel:${contactInfo.phone}`} 
                        className="block text-base text-foreground hover:text-muted-foreground transition-colors"
                      >
                        {contactInfo.phone}
                      </a>
                      <a 
                        href={`mailto:${contactInfo.email}`} 
                        className="block text-base text-foreground hover:text-muted-foreground transition-colors"
                      >
                        {contactInfo.email}
                      </a>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex gap-3 pt-4">
                      <Button
                        size="sm"
                        onClick={handleTelegramClick}
                        className="rounded-full px-5 h-9 text-xs"
                      >
                        <Send className="w-3.5 h-3.5 mr-2" />
                        Telegram
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleWhatsAppClick}
                        className="rounded-full px-5 h-9 text-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5 mr-2" />
                        WhatsApp
                      </Button>
                    </div>

                    {/* Language & Theme */}
                    <div className="flex items-center gap-3 pt-2">
                      <LanguageToggle />
                      <ThemeToggle />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;