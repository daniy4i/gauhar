import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage, contactInfo, getWhatsAppUrl } from '@/lib/i18n';
import LanguageToggle from '@/components/LanguageToggle';
import { ThemeToggle } from '@/components/ThemeToggle';
import AnimatedLogo from '@/components/AnimatedLogo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, MessageCircle, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

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
      // Clear the state
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const navLinks: NavLink[] = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about, sectionId: 'about' },
    { href: '/portfolio', label: t.nav.portfolio, sectionId: 'portfolio' },
    { href: '/services', label: t.nav.services, sectionId: 'services' },
    { href: '/contact', label: t.nav.contact, sectionId: 'contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const handleNavClick = (e: React.MouseEvent, link: NavLink) => {
    if (location.pathname === '/' && link.sectionId) {
      e.preventDefault();
      const element = document.getElementById(link.sectionId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
      setIsOpen(false);
    } else if (link.sectionId && location.pathname !== '/') {
      // Navigate to home page then scroll
      e.preventDefault();
      navigate('/', { state: { scrollTo: link.sectionId } });
      setIsOpen(false);
    }
  };

  const handleWhatsAppClick = () => {
    const url = getWhatsAppUrl(language);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${contactInfo.email}`;
  };

  const ctaLabels = {
    ru: {
      whatsapp: 'WhatsApp',
      email: 'Email',
    },
    en: {
      whatsapp: 'WhatsApp',
      email: 'Email',
    },
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md py-4"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <AnimatedLogo />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={cn(
                  "text-sm transition-colors duration-200 relative",
                  isActive(link.href)
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              onClick={handleEmailClick}
            >
              <Mail className="h-4 w-4 mr-2" />
              {ctaLabels[language].email}
            </Button>
            <Button
              size="sm"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              {ctaLabels[language].whatsapp}
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs tracking-[0.3em] font-medium">GAUHAR</span>
                  </div>
                  
                  <nav className="flex flex-col gap-4 flex-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        onClick={(e) => handleNavClick(e, link)}
                        className={cn(
                          "text-lg py-2 border-b border-border transition-colors",
                          isActive(link.href)
                            ? "text-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>

                  <div className="pt-6 border-t border-border space-y-3">
                    <Button
                      variant="outline"
                      onClick={handleEmailClick}
                      className="w-full"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      {ctaLabels[language].email}
                    </Button>
                    <Button
                      onClick={handleWhatsAppClick}
                      className="w-full"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {ctaLabels[language].whatsapp}
                    </Button>
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
