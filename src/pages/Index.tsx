import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { getFeaturedProjects } from '@/data/portfolioData';

const Index = () => {
  const { language, t } = useLanguage();
  const featuredProjects = getFeaturedProjects().slice(0, 6);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[image:var(--gradient-warm)] opacity-50" />
          <div className="container mx-auto px-6 text-center relative z-10">
            <motion.span 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} 
              className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-4 block font-light"
            >
              {language === 'ru' ? 'Дизайнер интерьеров · Алматы' : 'Interior Designer · Almaty'}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
              className="text-5xl md:text-7xl lg:text-8xl font-light mb-6 tracking-tight"
            >
              {t.hero.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} 
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 font-light"
            >
              {language === 'ru' 
                ? 'Создаю уникальные интерьеры, которые отражают вашу индивидуальность' 
                : 'Creating unique interiors that reflect your individuality'}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} 
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg">
                <Link to="/contact">{t.hero.cta.request}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/portfolio">{t.hero.cta.portfolio}</Link>
              </Button>
              <WhatsAppButton size="lg" variant="default" />
            </motion.div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-16"
            >
              <span className="text-sm tracking-[0.2em] text-muted-foreground uppercase mb-3 block">
                {language === 'ru' ? 'Избранное' : 'Featured'}
              </span>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight">{t.portfolio.subtitle}</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, i) => (
                <motion.div 
                  key={project.id} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link to={`/portfolio/${project.slug}`} className="group block">
                    <div className="aspect-[4/3] overflow-hidden bg-muted shadow-elegant">
                      <img 
                        src={project.thumbnail} 
                        alt={project.title[language]} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                      />
                    </div>
                    <h3 className="mt-5 text-lg font-medium group-hover:text-muted-foreground transition-colors duration-300">
                      {project.title[language]}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {project.area && `${project.area} м² · `}{project.location?.[language]}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.div 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center mt-16"
            >
              <Button asChild variant="outline" size="lg">
                <Link to="/portfolio">
                  {language === 'ru' ? 'Все проекты' : 'All Projects'} 
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Services */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-16"
            >
              <span className="text-sm tracking-[0.2em] text-muted-foreground uppercase mb-3 block">
                {language === 'ru' ? 'Услуги' : 'Services'}
              </span>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight">
                {language === 'ru' ? 'Что мы предлагаем' : 'What We Offer'}
              </h2>
            </motion.div>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -30 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="bg-card border border-border p-8 shadow-soft"
              >
                <h3 className="text-2xl font-medium mb-2">{t.services.packages.turnkey.title}</h3>
                <div className="text-3xl font-light mb-6">
                  {t.services.packages.turnkey.price} 
                  <span className="text-base text-muted-foreground ml-1">{t.services.packages.turnkey.priceUnit}</span>
                </div>
                <ul className="space-y-3">
                  {t.services.packages.turnkey.includes.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 30 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="bg-primary text-primary-foreground p-8 shadow-architectural"
              >
                <h3 className="text-2xl font-medium mb-2">{t.services.packages.supervision.title}</h3>
                <div className="text-3xl font-light mb-6">
                  {t.services.packages.supervision.price} 
                  <span className="text-base text-primary-foreground/70 ml-1">{t.services.packages.supervision.priceUnit}</span>
                </div>
                <ul className="space-y-3">
                  {t.services.packages.supervision.includes.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-primary-foreground/90">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center mt-12"
            >
              <Button asChild size="lg">
                <Link to="/services">{t.common.learnMore}</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-primary text-primary-foreground text-center">
          <div className="container mx-auto px-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-4xl font-light mb-8"
            >
              {language === 'ru' ? 'Готовы создать интерьер мечты?' : 'Ready to create your dream interior?'}
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild variant="secondary" size="lg">
                <Link to="/contact">{t.hero.cta.request}</Link>
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

export default Index;
