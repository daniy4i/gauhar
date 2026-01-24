import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Check, ChevronDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const VideoBookingSection = () => {
  const { language } = useLanguage();
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countryCode, setCountryCode] = useState('+7');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const countryCodes = [
    { code: '+7', flag: '🇰🇿', label: 'KZ' },
    { code: '+7', flag: '🇷🇺', label: 'RU' },
    { code: '+1', flag: '🇺🇸', label: 'US' },
    { code: '+44', flag: '🇬🇧', label: 'UK' },
    { code: '+971', flag: '🇦🇪', label: 'UAE' },
  ];

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return `(${numbers}`;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    if (numbers.length <= 8) return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 8)}-${numbers.slice(8, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed || !phone) return;

    setIsSubmitting(true);
    try {
      const fullPhone = `${countryCode} ${phone}`;
      const { error } = await supabase.from('inquiries').insert({
        name: language === 'ru' ? 'Заявка на экскурсию' : 'Tour booking request',
        phone: fullPhone,
        language,
        project_type: language === 'ru' ? 'Экскурсия по готовому объекту' : 'Completed project tour',
      });

      if (error) throw error;

      toast.success(
        language === 'ru' 
          ? 'Спасибо! Мы свяжемся с вами для подтверждения.' 
          : 'Thank you! We will contact you to confirm.'
      );
      setPhone('');
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error(
        language === 'ru' 
          ? 'Ошибка отправки. Попробуйте снова.' 
          : 'Submission error. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/room-cinematic.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl"
        >
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-white mb-12 leading-tight tracking-tight">
            {language === 'ru' 
              ? 'Запишитесь на экскурсию по готовому объекту' 
              : 'Book a tour of a completed project'}
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Phone Input with Country Selector */}
            <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full overflow-hidden border border-white/20">
              {/* Country Code Selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className="flex items-center gap-2 px-4 py-4 text-white hover:bg-white/10 transition-colors"
                >
                  <span className="text-xl">
                    {countryCodes.find(c => c.code === countryCode)?.flag || '🇰🇿'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-white/60" />
                </button>
                
                {showCountryDropdown && (
                  <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-xl shadow-xl z-20 overflow-hidden min-w-[140px]">
                    {countryCodes.map((country, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setCountryCode(country.code);
                          setShowCountryDropdown(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-3 hover:bg-muted transition-colors text-left"
                      >
                        <span className="text-xl">{country.flag}</span>
                        <span className="text-sm text-foreground">{country.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Phone Number */}
              <div className="flex-1 flex items-center">
                <span className="text-white/80 font-medium">{countryCode}</span>
                <Input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="(000) 000-00-00"
                  className="flex-1 bg-transparent border-0 text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={!agreed || !phone || isSubmitting}
                className="rounded-full px-8 py-6 text-base font-medium"
              >
                {isSubmitting 
                  ? (language === 'ru' ? 'Отправка...' : 'Sending...') 
                  : (language === 'ru' ? 'Записаться' : 'Book')}
              </Button>
            </div>

            {/* Privacy Agreement */}
            <div className="flex items-start gap-3">
              <Checkbox 
                id="privacy-agreement" 
                checked={agreed} 
                onCheckedChange={(checked) => setAgreed(checked as boolean)}
                className="mt-0.5 border-white/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label 
                htmlFor="privacy-agreement" 
                className="text-sm text-white/70 leading-relaxed cursor-pointer"
              >
                {language === 'ru' ? (
                  <>
                    Я согласен(на) на обработку персональных данных в соответствии с{' '}
                    <Link to="/privacy" className="text-white underline underline-offset-2 hover:text-primary transition-colors">
                      политикой конфиденциальности
                    </Link>.
                  </>
                ) : (
                  <>
                    I agree to the processing of personal data in accordance with the{' '}
                    <Link to="/privacy" className="text-white underline underline-offset-2 hover:text-primary transition-colors">
                      privacy policy
                    </Link>.
                  </>
                )}
              </label>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoBookingSection;
