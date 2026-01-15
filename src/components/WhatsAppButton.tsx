import { useLanguage, contactInfo, getWhatsAppUrl } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WhatsAppButtonProps {
  variant?: 'default' | 'outline' | 'ghost' | 'icon';
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
          "text-[#25D366] hover:text-[#25D366] hover:bg-[#25D366]/10",
          className
        )}
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant={variant === 'outline' ? 'outline' : 'default'}
      size={size}
      onClick={handleClick}
      className={cn(
        variant === 'default' && "bg-[#25D366] hover:bg-[#20BD5A] text-white",
        variant === 'outline' && "border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10",
        className
      )}
    >
      <MessageCircle className="mr-2 h-4 w-4" />
      {showLabel && t.nav.whatsapp}
    </Button>
  );
};

export default WhatsAppButton;
