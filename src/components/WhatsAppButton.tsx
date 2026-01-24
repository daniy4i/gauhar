import { useLanguage, getWhatsAppUrl } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WhatsAppButtonProps {
  variant?: 'default' | 'outline' | 'ghost' | 'icon' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  showLabel?: boolean;
  customMessage?: string;
}

const WhatsAppButton = ({ 
  variant = 'default', 
  size = 'default',
  className,
  showLabel = true,
  customMessage,
}: WhatsAppButtonProps) => {
  const { language, t } = useLanguage();
  
  const handleClick = () => {
    const url = getWhatsAppUrl(language, customMessage);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (variant === 'icon') {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={handleClick}
        className={cn(
          "text-primary hover:text-primary hover:bg-primary/10",
          className
        )}
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
      </Button>
    );
  }

  // Map our variants to button variants
  const getButtonVariant = () => {
    if (variant === 'outline') return 'outline';
    if (variant === 'secondary') return 'secondary';
    if (variant === 'ghost') return 'ghost';
    return 'default';
  };

  return (
    <Button
      variant={getButtonVariant()}
      size={size}
      onClick={handleClick}
      className={cn(
        "group",
        className
      )}
    >
      <MessageCircle className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
      {showLabel && t.nav.whatsapp}
    </Button>
  );
};

export default WhatsAppButton;
