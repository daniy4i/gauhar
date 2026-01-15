import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
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
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', city: '', projectType: '', area: '', budget: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || (!formData.phone.trim() && !formData.email.trim())) {
      toast({ title: language === 'ru' ? 'Ошибка' : 'Error', description: language === 'ru' ? 'Заполните имя и контакт' : 'Fill name and contact', variant: 'destructive' });
      return;
    }
    setIsSubmitting(true);
    const subject = encodeURIComponent(language === 'ru' ? `Заявка от ${formData.name}` : `Request from ${formData.name}`);
    const body = encodeURIComponent(`${formData.name}\n${formData.phone}\n${formData.email}\n${formData.city}\n${formData.projectType}\n${formData.area}м²\n${formData.budget}\n\n${formData.message}`);
    window.location.href = `mailto:gauhars@mail.ru?subject=${subject}&body=${body}`;
    setIsSubmitting(false);
    toast({ title: language === 'ru' ? 'Успешно!' : 'Success!', description: t.contact.form.success });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-light mb-4">{t.contact.title}</h1>
          <p className="text-muted-foreground">{t.contact.subtitle}</p>
        </div>
      </motion.section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-12">
            <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3 space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input placeholder={t.contact.form.namePlaceholder} value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))} required />
                <Input placeholder={t.contact.form.phonePlaceholder} value={formData.phone} onChange={e => setFormData(p => ({...p, phone: e.target.value}))} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input type="email" placeholder={t.contact.form.emailPlaceholder} value={formData.email} onChange={e => setFormData(p => ({...p, email: e.target.value}))} />
                <Input placeholder={t.contact.form.cityPlaceholder} value={formData.city} onChange={e => setFormData(p => ({...p, city: e.target.value}))} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Select onValueChange={v => setFormData(p => ({...p, projectType: v}))}><SelectTrigger><SelectValue placeholder={t.contact.form.projectTypePlaceholder} /></SelectTrigger><SelectContent>{t.contact.form.projectTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select>
                <Input type="number" placeholder={t.contact.form.areaPlaceholder} value={formData.area} onChange={e => setFormData(p => ({...p, area: e.target.value}))} />
              </div>
              <Select onValueChange={v => setFormData(p => ({...p, budget: v}))}><SelectTrigger><SelectValue placeholder={t.contact.form.budgetPlaceholder} /></SelectTrigger><SelectContent>{t.contact.form.budgetRanges.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent></Select>
              <Textarea placeholder={t.contact.form.messagePlaceholder} value={formData.message} onChange={e => setFormData(p => ({...p, message: e.target.value}))} rows={4} />
              <Button type="submit" size="lg" disabled={isSubmitting}><Send className="w-4 h-4 mr-2" />{isSubmitting ? t.contact.form.sending : t.contact.form.submit}</Button>
            </motion.form>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 space-y-6">
              <a href={getWhatsAppUrl(language)} target="_blank" rel="noopener noreferrer" className="block bg-green-500 text-white p-6 rounded-sm">
                <MessageCircle className="w-8 h-8 mb-3" />
                <h3 className="font-medium mb-1">{t.contact.whatsappCard.title}</h3>
                <p className="text-white/80 text-sm mb-3">{t.contact.whatsappCard.subtitle}</p>
                <span className="text-lg font-medium">+7 777 211 2211</span>
              </a>
              <div className="space-y-4">
                <div className="flex gap-3"><Mail className="w-5 h-5 text-muted-foreground" /><a href="mailto:gauhars@mail.ru">gauhars@mail.ru</a></div>
                <div className="flex gap-3"><Phone className="w-5 h-5 text-muted-foreground" /><a href="tel:+77772112211">+7 777 211 2211</a></div>
                <div className="flex gap-3"><MapPin className="w-5 h-5 text-muted-foreground" /><span>{language === 'ru' ? 'г. Алматы, ул. Хаджимукана, 49' : 'Almaty, Khadzhimukan St, 49'}</span></div>
              </div>
              <div className="flex gap-3">
                <a href="https://instagram.com/gauhar_sergazina" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="https://youtube.com/@sergazina_gauhar" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"><Youtube className="w-5 h-5" /></a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
