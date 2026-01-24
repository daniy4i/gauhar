import { motion } from 'framer-motion';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import SEO from '@/components/SEO';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { GraduationCap, Heart, Award } from 'lucide-react';
import BlurImage from '@/components/BlurImage';

// Portrait images
import portrait1 from '@/assets/about/gauhar-portrait-1.jpg';
import portrait2 from '@/assets/about/gauhar-portrait-2.jpg';
import portrait3 from '@/assets/about/gauhar-portrait-3.jpg';

const About = () => {
  const { t, language } = useLanguage();

  return (
    <PageTransition>
      <SEO 
        title={language === 'ru' ? 'О себе' : 'About Me'}
        description={language === 'ru' 
          ? 'Гаухар Сергазина — дипломированный дизайнер интерьеров. Образование: КазГАСА и Central Saint Martins, Лондон.'
          : 'Gauhar Sergazina — certified interior designer. Education: KazGASA and Central Saint Martins, London.'}
        url="https://gauhar.lovable.app/about"
      />
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm tracking-[0.2em] text-muted-foreground uppercase mb-4 block"
              >
                {t.about.title}
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight"
              >
                {language === 'ru' ? 'Гаухар Сергазина' : 'Gauhar Sergazina'}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg text-muted-foreground mt-6"
              >
                {t.about.subtitle}
              </motion.p>
            </div>
          </div>
        </section>

        {/* Portrait Gallery Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="aspect-[3/4] overflow-hidden rounded-xl"
                >
                  <BlurImage
                    src={portrait1}
                    alt="Gauhar Sergazina - Interior Designer"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="aspect-[3/4] overflow-hidden rounded-xl"
                >
                  <BlurImage
                    src={portrait2}
                    alt="Gauhar Sergazina Portrait"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="aspect-[3/4] overflow-hidden rounded-xl"
                >
                  <BlurImage
                    src={portrait3}
                    alt="Gauhar Sergazina Professional"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Bio Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto space-y-8">
              {t.about.bio.map((paragraph, index) => (
                <motion.p 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-lg text-muted-foreground leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>
        </section>

        {/* Info Cards */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="bg-card border border-border p-8 rounded-2xl hover:border-primary/30 transition-colors duration-200"
              >
                <GraduationCap className="w-8 h-8 text-primary mb-6" />
                <h3 className="font-medium text-lg mb-4">{t.about.education.title}</h3>
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
                transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="bg-card border border-border p-8 rounded-2xl hover:border-primary/30 transition-colors duration-200"
              >
                <Award className="w-8 h-8 text-primary mb-6" />
                <h3 className="font-medium text-lg mb-4">{language === 'ru' ? 'Опыт' : 'Experience'}</h3>
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
                transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="bg-card border border-border p-8 rounded-2xl hover:border-primary/30 transition-colors duration-200"
              >
                <Heart className="w-8 h-8 text-primary mb-6" />
                <h3 className="font-medium text-lg mb-4">{t.about.approach.title}</h3>
                <p className="text-sm text-muted-foreground">{t.about.approach.text}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-[hsl(240,6%,6%)] text-white text-center">
          <div className="container mx-auto px-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl font-normal mb-10 tracking-tight"
            >
              {language === 'ru' ? 'Готовы начать проект?' : 'Ready to start a project?'}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Button asChild size="lg">
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