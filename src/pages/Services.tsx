import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Check, Star } from 'lucide-react';

const Services = () => {
  const { t, language } = useLanguage();

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm tracking-[0.2em] text-muted-foreground uppercase mb-3 block"
              >
                {t.services.title}
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-6xl lg:text-7xl font-light mt-4 mb-6 tracking-tight"
              >
                {t.services.subtitle}
              </motion.h1>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Turnkey Package */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-card border border-border p-8 shadow-soft"
                >
                  <div className="mb-6">
                    <h3 className="text-2xl font-medium mb-2">{t.services.packages.turnkey.title}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-light">{t.services.packages.turnkey.price}</span>
                      <span className="text-muted-foreground">{t.services.packages.turnkey.priceUnit}</span>
                    </div>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {t.services.packages.turnkey.includes.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full" size="lg">
                    <Link to="/contact">{t.services.cta}</Link>
                  </Button>
                </motion.div>

                {/* Supervision Package */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-primary text-primary-foreground p-8 shadow-architectural relative overflow-hidden"
                >
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1 bg-primary-foreground/20 px-3 py-1 text-xs">
                      <Star className="w-3 h-3" />
                      {language === 'ru' ? 'Популярный' : 'Popular'}
                    </span>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-2xl font-medium mb-2">{t.services.packages.supervision.title}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-light">{t.services.packages.supervision.price}</span>
                      <span className="text-primary-foreground/70">{t.services.packages.supervision.priceUnit}</span>
                    </div>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {t.services.packages.supervision.includes.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <span className="text-primary-foreground/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="secondary" className="w-full" size="lg">
                    <Link to="/contact">{t.services.cta}</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Plans */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-light mb-4">{t.services.technicalPlans.title}</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {language === 'ru' 
                    ? 'Полный пакет технической документации для безупречной реализации вашего проекта'
                    : 'Complete package of technical documentation for flawless implementation of your project'}
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {t.services.technicalPlans.items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-3 bg-muted/50 p-4"
                  >
                    <div className="w-8 h-8 bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-primary">{index + 1}</span>
                    </div>
                    <span className="text-sm">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-light mb-4">{t.services.faq.title}</h2>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Accordion type="single" collapsible className="space-y-4">
                  {t.services.faq.items.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`item-${index}`}
                      className="bg-card border border-border px-6"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-6">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-6">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-6 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-4xl font-light mb-6"
            >
              {language === 'ru' 
                ? 'Готовы обсудить ваш проект?' 
                : 'Ready to discuss your project?'}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-primary-foreground/80 mb-8 max-w-xl mx-auto"
            >
              {language === 'ru'
                ? 'Свяжитесь со мной для бесплатной консультации и обсуждения деталей.'
                : 'Contact me for a free consultation and to discuss the details.'}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild variant="secondary" size="lg">
                <Link to="/contact">{t.services.cta}</Link>
              </Button>
              <WhatsAppButton 
                variant="outline" 
                size="lg" 
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" 
              />
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Services;
