import { motion } from 'framer-motion';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { GraduationCap, Heart, Award } from 'lucide-react';

const About = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="pt-32 pb-20 bg-gradient-to-b from-muted/50 to-background"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-light mt-4 mb-6"
            >
              {language === 'ru' ? 'Гаухар Сергазина' : 'Gauhar Sergazina'}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground"
            >
              {t.about.subtitle}
            </motion.p>
          </div>
        </div>
      </motion.section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {t.about.bio.map((paragraph, index) => (
              <motion.p 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-lg text-muted-foreground leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-background p-6 rounded-sm">
              <GraduationCap className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-medium mb-2">{t.about.education.title}</h3>
              {t.about.education.items.map((item, i) => <p key={i} className="text-sm text-muted-foreground">{item}</p>)}
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-background p-6 rounded-sm">
              <Award className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-medium mb-2">{language === 'ru' ? 'Опыт' : 'Experience'}</h3>
              <p className="text-sm text-muted-foreground">{language === 'ru' ? 'Более 10 лет в дизайне интерьеров' : 'Over 10 years in interior design'}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-background p-6 rounded-sm">
              <Heart className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-medium mb-2">{t.about.approach.title}</h3>
              <p className="text-sm text-muted-foreground">{t.about.approach.text}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-light mb-6">{language === 'ru' ? 'Готовы начать проект?' : 'Ready to start?'}</h2>
          <Button asChild variant="secondary" size="lg"><Link to="/contact">{t.common.getInTouch}</Link></Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
