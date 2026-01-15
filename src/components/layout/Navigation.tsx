import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';
import LanguageToggle from '@/components/LanguageToggle';
import WhatsAppButton from '@/components/WhatsAppButton';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/portfolio', label: t.nav.portfolio },
    { href: '/services', label: t.nav.services },
    { href: '/contact', label: t.nav.contact },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
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
                className={cn(
                  "text-sm tracking-wide transition-colors relative group",
                  isActive(link.href)
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300",
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  )}
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
                        onClick={() => setIsOpen(false)}
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
