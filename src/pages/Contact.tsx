import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import SEO from '@/components/SEO';
import { useLanguage } from '@/lib/i18n';
import { getWhatsAppUrl } from '@/lib/i18n/translations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { MessageCircle, Mail, Phone, MapPin, Instagram, Youtube, Send } from 'lucide-react';

const Contact = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    email: '', 
    city: '', 
    projectType: '', 
    area: '', 
    budget: '', 
    message: '' 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || (!formData.phone.trim() && !formData.email.trim())) {
      toast({ 
        title: language === 'ru' ? 'Ошибка' : 'Error', 
        description: language === 'ru' ? 'Заполните имя и контакт' : 'Fill name and contact', 
        variant: 'destructive' 
      });
      return;
    }
    setIsSubmitting(true);
    const subject = encodeURIComponent(language === 'ru' ? `Заявка от ${formData.name}` : `Request from ${formData.name}`);
    const body = encodeURIComponent(
      `${language === 'ru' ? 'Имя' : 'Name'}: ${formData.name}\n` +
      `${language === 'ru' ? 'Телефон' : 'Phone'}: ${formData.phone}\n` +
      `Email: ${formData.email}\n` +
      `${language === 'ru' ? 'Город' : 'City'}: ${formData.city}\n` +
      `${language === 'ru' ? 'Тип проекта' : 'Project type'}: ${formData.projectType}\n` +
      `${language === 'ru' ? 'Площадь' : 'Area'}: ${formData.area} м²\n` +
      `${language === 'ru' ? 'Бюджет' : 'Budget'}: ${formData.budget}\n\n` +
      `${language === 'ru' ? 'Сообщение' : 'Message'}:\n${formData.message}`
    );
    window.location.href = `mailto:gauhars@mail.ru?subject=${subject}&body=${body}`;
    setIsSubmitting(false);
    toast({ 
      title: language === 'ru' ? 'Успешно!' : 'Success!', 
      description: t.contact.form.success 
    });
  };

  return (
    <PageTransition>
      <SEO 
        title={language === 'ru' ? 'Контакты' : 'Contact'}
        description={language === 'ru' 
          ? 'Свяжитесь с дизайнером интерьера Гаухар Сергазиной. WhatsApp: +7 777 211 2211. Алматы, ул. Хаджимукана 49.'
          : 'Contact interior designer Gauhar Sergazina. WhatsApp: +7 777 211 2211. Almaty, Khadzhimukan St 49.'}
        url="https://pure-architect-space-01.lovable.app/contact"
      />
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-6 text-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm tracking-[0.2em] text-muted-foreground uppercase mb-3 block"
            >
              {language === 'ru' ? 'Контакты' : 'Contact'}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl font-light mb-4 tracking-tight"
            >
              {t.contact.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-muted-foreground font-light"
            >
              {t.contact.subtitle}
            </motion.p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-12">
              <motion.form 
                onSubmit={handleSubmit} 
                initial={{ opacity: 0, x: -30 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-3 space-y-6"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input 
                    placeholder={t.contact.form.namePlaceholder} 
                    value={formData.name} 
                    onChange={e => setFormData(p => ({...p, name: e.target.value}))} 
                    required 
                    className="bg-card border-border"
                  />
                  <Input 
                    placeholder={t.contact.form.phonePlaceholder} 
                    value={formData.phone} 
                    onChange={e => setFormData(p => ({...p, phone: e.target.value}))}
                    className="bg-card border-border"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input 
                    type="email" 
                    placeholder={t.contact.form.emailPlaceholder} 
                    value={formData.email} 
                    onChange={e => setFormData(p => ({...p, email: e.target.value}))}
                    className="bg-card border-border"
                  />
                  <Input 
                    placeholder={t.contact.form.cityPlaceholder} 
                    value={formData.city} 
                    onChange={e => setFormData(p => ({...p, city: e.target.value}))}
                    className="bg-card border-border"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Select onValueChange={v => setFormData(p => ({...p, projectType: v}))}>
                    <SelectTrigger className="bg-card border-border">
                      <SelectValue placeholder={t.contact.form.projectTypePlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {t.contact.form.projectTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input 
                    type="number" 
                    placeholder={t.contact.form.areaPlaceholder} 
                    value={formData.area} 
                    onChange={e => setFormData(p => ({...p, area: e.target.value}))}
                    className="bg-card border-border"
                  />
                </div>
                <Select onValueChange={v => setFormData(p => ({...p, budget: v}))}>
                  <SelectTrigger className="bg-card border-border">
                    <SelectValue placeholder={t.contact.form.budgetPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {t.contact.form.budgetRanges.map(r => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea 
                  placeholder={t.contact.form.messagePlaceholder} 
                  value={formData.message} 
                  onChange={e => setFormData(p => ({...p, message: e.target.value}))} 
                  rows={4}
                  className="bg-card border-border"
                />
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? t.contact.form.sending : t.contact.form.submit}
                </Button>
              </motion.form>

              <motion.div 
                initial={{ opacity: 0, x: 30 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-2 space-y-6"
              >
                <a 
                  href={getWhatsAppUrl(language)} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block bg-[hsl(var(--whatsapp))] text-white p-6 shadow-elegant hover:shadow-architectural transition-shadow duration-300"
                >
                  <MessageCircle className="w-8 h-8 mb-3" />
                  <h3 className="font-medium mb-1">{t.contact.whatsappCard.title}</h3>
                  <p className="text-white/80 text-sm mb-3">{t.contact.whatsappCard.subtitle}</p>
                  <span className="text-lg font-medium">+7 777 211 2211</span>
                </a>
                
                <div className="bg-card border border-border p-6 space-y-4">
                  <div className="flex gap-3 items-start">
                    <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <a href="mailto:gauhars@mail.ru" className="hover:text-primary transition-colors">
                      gauhars@mail.ru
                    </a>
                  </div>
                  <div className="flex gap-3 items-start">
                    <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <a href="tel:+77772112211" className="hover:text-primary transition-colors">
                      +7 777 211 2211
                    </a>
                  </div>
                  <div className="flex gap-3 items-start">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <span className="text-muted-foreground">
                      {language === 'ru' ? 'г. Алматы, ул. Хаджимукана, 49' : 'Almaty, Khadzhimukan St, 49'}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <a 
                    href="https://instagram.com/gauhar_sergazina" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-12 h-12 bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://youtube.com/@sergazina_gauhar" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-12 h-12 bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Contact;
