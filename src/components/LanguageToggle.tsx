import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';

interface LanguageToggleProps {
  className?: string;
}

const LanguageToggle = ({ className }: LanguageToggleProps) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`flex items-center gap-1 ${className || ''}`}>
      <Button
        variant={language === 'ru' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('ru')}
        className="px-2 h-8 text-xs font-medium min-w-[36px]"
      >
        RU
      </Button>
      <span className="text-muted-foreground text-xs">|</span>
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className="px-2 h-8 text-xs font-medium min-w-[36px]"
      >
        EN
      </Button>
    </div>
  );
};

export default LanguageToggle;
