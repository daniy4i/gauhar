import { motion } from 'framer-motion';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import SEO from '@/components/SEO';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { GraduationCap, Heart, Award } from 'lucide-react';

const About = () => {
  const { t, language } = useLanguage();

  return (
    <PageTransition>
      <SEO 
        title={language === 'ru' ? 'О себе' : 'About Me'}
        description={language === 'ru' 
          ? 'Гаухар Сергазина — дипломированный дизайнер интерьеров. Образование: КазГАСА и Central Saint Martins, Лондон.'
          : 'Gauhar Sergazina — certified interior designer. Education: KazGASA and Central Saint Martins, London.'}
        url="https://pure-architect-space-01.lovable.app/about"
      />
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm tracking-[0.2em] text-muted-foreground uppercase mb-3 block"
              >
                {t.about.title}
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-6xl font-light mt-4 mb-6 tracking-tight"
              >
                {language === 'ru' ? 'Гаухар Сергазина' : 'Gauhar Sergazina'}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg text-muted-foreground font-light"
              >
                {t.about.subtitle}
              </motion.p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {t.about.bio.map((paragraph, index) => (
                <motion.p 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-lg text-muted-foreground leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="bg-card border border-border p-8 shadow-soft"
              >
                <GraduationCap className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-medium mb-3">{t.about.education.title}</h3>
                <div className="space-y-2">
                  {t.about.education.items.map((item, i) => (
                    <p key={i} className="text-sm text-muted-foreground">{item}</p>
                  ))}
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="bg-card border border-border p-8 shadow-soft"
              >
                <Award className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-medium mb-3">{language === 'ru' ? 'Опыт' : 'Experience'}</h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'ru' 
                    ? 'Более 10 лет в дизайне интерьеров. Участие в международных и местных мероприятиях по дизайну.' 
                    : 'Over 10 years in interior design. Participation in international and local design events.'}
                </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="bg-card border border-border p-8 shadow-soft"
              >
                <Heart className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-medium mb-3">{t.about.approach.title}</h3>
                <p className="text-sm text-muted-foreground">{t.about.approach.text}</p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-primary text-primary-foreground text-center">
          <div className="container mx-auto px-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-4xl font-light mb-8"
            >
              {language === 'ru' ? 'Готовы начать проект?' : 'Ready to start a project?'}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Button asChild variant="secondary" size="lg">
                <Link to="/contact">{t.common.getInTouch}</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default About;
