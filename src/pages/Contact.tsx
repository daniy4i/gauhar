import { useState } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import SEO from '@/components/SEO';
import { useLanguage, contactInfo } from '@/lib/i18n';
import { getWhatsAppUrl } from '@/lib/i18n/translations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { MessageCircle, Mail, Phone, MapPin, Instagram, Youtube, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Validation schema
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  phone: z.string().trim().max(50, "Phone too long").optional(),
  email: z.string().trim().email("Invalid email").max(255, "Email too long").optional().or(z.literal('')),
  city: z.string().trim().max(100, "City too long").optional(),
  projectType: z.string().max(100).optional(),
  area: z.string().max(50).optional(),
  budget: z.string().max(100).optional(),
  message: z.string().trim().max(2000, "Message too long").optional(),
}).refine(data => data.phone || data.email, {
  message: "Phone or email is required",
  path: ["phone"],
});

const Contact = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
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
    setErrors({});
    
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast({ 
        title: language === 'ru' ? 'Ошибка' : 'Error', 
        description: language === 'ru' ? 'Проверьте правильность заполнения формы' : 'Please check the form fields', 
        variant: 'destructive' 
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          phone: formData.phone || undefined,
          email: formData.email || undefined,
          city: formData.city || undefined,
          projectType: formData.projectType || undefined,
          area: formData.area || undefined,
          budget: formData.budget || undefined,
          message: formData.message || undefined,
          language,
        },
      });

      if (error) throw error;

      toast({ 
        title: language === 'ru' ? 'Успешно!' : 'Success!', 
        description: t.contact.form.success 
      });
      
      setFormData({ name: '', phone: '', email: '', city: '', projectType: '', area: '', budget: '', message: '' });
    } catch (error: any) {
      console.error('Form submission error:', error);
      toast({ 
        title: language === 'ru' ? 'Ошибка' : 'Error', 
        description: language === 'ru' ? 'Не удалось отправить заявку. Попробуйте позже.' : 'Failed to submit. Please try again.', 
        variant: 'destructive' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <SEO 
        title={language === 'ru' ? 'Контакты' : 'Contact'}
        description={language === 'ru' 
          ? 'Свяжитесь с дизайнером интерьера Гаухар Сергазиной. WhatsApp: +7 777 211 2211. Алматы, ул. Хаджимукана 49.'
          : 'Contact interior designer Gauhar Sergazina. WhatsApp: +7 777 211 2211. Almaty, Khadzhimukan St 49.'}
        url="https://gauhar.lovable.app/contact"
      />
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-6 text-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm tracking-[0.2em] text-muted-foreground uppercase mb-4 block"
            >
              {language === 'ru' ? 'Контакты' : 'Contact'}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight"
            >
              {t.contact.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-muted-foreground mt-4"
            >
              {t.contact.subtitle}
            </motion.p>
          </div>
        </section>

        {/* Form & Contact Info */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-12">
              {/* Contact Form */}
              <motion.form 
                onSubmit={handleSubmit} 
                initial={{ opacity: 0, x: -30 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-3 space-y-6"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Input 
                      placeholder={t.contact.form.namePlaceholder} 
                      value={formData.name} 
                      onChange={e => setFormData(p => ({...p, name: e.target.value}))} 
                      required 
                      className={`bg-card border-border rounded-xl h-12 ${errors.name ? 'border-destructive' : ''}`}
                    />
                    {errors.name && <span className="text-destructive text-xs mt-1">{errors.name}</span>}
                  </div>
                  <div>
                    <Input 
                      placeholder={t.contact.form.phonePlaceholder} 
                      value={formData.phone} 
                      onChange={e => setFormData(p => ({...p, phone: e.target.value}))}
                      className={`bg-card border-border rounded-xl h-12 ${errors.phone ? 'border-destructive' : ''}`}
                    />
                    {errors.phone && <span className="text-destructive text-xs mt-1">{errors.phone}</span>}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Input 
                      type="email" 
                      placeholder={t.contact.form.emailPlaceholder} 
                      value={formData.email} 
                      onChange={e => setFormData(p => ({...p, email: e.target.value}))}
                      className={`bg-card border-border rounded-xl h-12 ${errors.email ? 'border-destructive' : ''}`}
                    />
                    {errors.email && <span className="text-destructive text-xs mt-1">{errors.email}</span>}
                  </div>
                  <Input 
                    placeholder={t.contact.form.cityPlaceholder} 
                    value={formData.city} 
                    onChange={e => setFormData(p => ({...p, city: e.target.value}))}
                    className="bg-card border-border rounded-xl h-12"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Select onValueChange={v => setFormData(p => ({...p, projectType: v}))}>
                    <SelectTrigger className="bg-card border-border rounded-xl h-12">
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
                    className="bg-card border-border rounded-xl h-12"
                  />
                </div>
                <Select onValueChange={v => setFormData(p => ({...p, budget: v}))}>
                  <SelectTrigger className="bg-card border-border rounded-xl h-12">
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
                  className="bg-card border-border rounded-xl"
                />
                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? t.contact.form.sending : t.contact.form.submit}
                </Button>
              </motion.form>

              {/* Contact Info */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-2 space-y-6"
              >
                {/* WhatsApp Card */}
                <a 
                  href={getWhatsAppUrl(language)} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block bg-primary text-white p-6 rounded-2xl hover:bg-[hsl(211,100%,55%)] hover:shadow-[0_0_30px_hsl(211,100%,50%/0.4)] transition-all duration-200"
                >
                  <MessageCircle className="w-8 h-8 mb-4" />
                  <h3 className="font-semibold text-lg mb-1">{t.contact.whatsappCard.title}</h3>
                  <p className="text-white/70 text-sm mb-4">{t.contact.whatsappCard.subtitle}</p>
                  <span className="text-xl font-semibold">{contactInfo.phone}</span>
                </a>
                
                {/* Contact Details Card */}
                <div className="bg-card border border-border p-6 rounded-2xl space-y-4">
                  <div className="flex gap-3 items-start">
                    <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <a href={`mailto:${contactInfo.email}`} className="hover:text-primary transition-colors duration-200">
                      {contactInfo.email}
                    </a>
                  </div>
                  <div className="flex gap-3 items-start">
                    <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="hover:text-primary transition-colors duration-200">
                      {contactInfo.phone}
                    </a>
                  </div>
                  <div className="flex gap-3 items-start">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <span className="text-muted-foreground">
                      {contactInfo.address[language]}
                    </span>
                  </div>
                </div>
                
                {/* Social Icons */}
                <div className="flex gap-3">
                  <a 
                    href={contactInfo.instagramUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a 
                    href={contactInfo.youtubeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
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