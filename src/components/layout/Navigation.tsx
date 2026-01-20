import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';
import LanguageToggle from '@/components/LanguageToggle';
import WhatsAppButton from '@/components/WhatsAppButton';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavLink {
  href: string;
  label: string;
  sectionId?: string;
}

const Navigation = () => {
  const { t } = useLanguage();
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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-lg md:text-xl font-light tracking-wide hover:opacity-70 transition-opacity"
          >
            <span className="font-medium">Gauhar</span>
            <span className="text-muted-foreground ml-1">Sergazina</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={cn(
                  "text-sm tracking-wide transition-all duration-300 relative group py-1",
                  isActive(link.href)
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground",
                  // Special styling for Portfolio
                  link.sectionId === 'portfolio' && "font-medium"
                )}
              >
                <span className="relative">
                  {link.label}
                  {/* Animated underline */}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-[2px] bg-foreground transition-all duration-500 ease-smooth",
                      isActive(link.href) 
                        ? "w-full" 
                        : "w-0 group-hover:w-full",
                      // Premium glow effect on Portfolio
                      link.sectionId === 'portfolio' && "group-hover:shadow-[0_0_8px_hsl(var(--foreground)/0.3)]"
                    )}
                  />
                </span>
                {/* Subtle opacity shift on hover */}
                <span 
                  className={cn(
                    "absolute inset-0 bg-foreground/5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mx-2 -my-1",
                    isActive(link.href) && "opacity-50"
                  )}
                  style={{ padding: '0.25rem 0.5rem', margin: '-0.25rem -0.5rem' }}
                />
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />
            <WhatsAppButton size="sm" />
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
                    <span className="text-lg font-medium">Gauhar Sergazina</span>
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

                  <div className="pt-6 border-t border-border">
                    <WhatsAppButton className="w-full" />
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
