import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import WhatsAppButton from '@/components/WhatsAppButton';
import SEO from '@/components/SEO';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import InstagramFeed from '@/components/InstagramFeed';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import { getFeaturedProjects } from '@/data/portfolioData';
import heroImage from '@/assets/hero-interior.jpg';

const Index = () => {
  const { language, t } = useLanguage();
  const featuredProjects = getFeaturedProjects().slice(0, 6);

  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <PageTransition>
      <SEO />
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero with Background Image */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-foreground/40 dark:bg-foreground/60" />
          
          <div className="container mx-auto px-6 text-center relative z-10">
            <motion.span 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} 
              className="text-sm tracking-[0.3em] text-background/80 uppercase mb-4 block font-light"
            >
              {language === 'ru' ? 'Дизайнер интерьеров · Алматы' : 'Interior Designer · Almaty'}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
              className="text-5xl md:text-7xl lg:text-8xl font-light mb-6 tracking-tight text-background"
            >
              {t.hero.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} 
              className="text-lg text-background/80 max-w-2xl mx-auto mb-10 font-light"
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
              <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
                <Link to="/contact">{t.hero.cta.request}</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-background/50 text-background hover:bg-background/10"
              >
                <Link to="/portfolio">{t.hero.cta.portfolio}</Link>
              </Button>
              <WhatsAppButton size="lg" />
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            onClick={scrollToPortfolio}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-background/60 hover:text-background transition-colors cursor-pointer group"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs tracking-[0.2em] uppercase">
                {language === 'ru' ? 'Листать' : 'Scroll'}
              </span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </div>
          </motion.button>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.span 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-sm tracking-[0.2em] text-muted-foreground uppercase mb-3 block"
              >
                {language === 'ru' ? 'О себе' : 'About Me'}
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-4xl md:text-5xl font-light tracking-tight mb-8"
              >
                {language === 'ru' ? 'Гаухар Сергазина' : 'Gauhar Sergazina'}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-lg text-muted-foreground leading-relaxed mb-8"
              >
                {language === 'ru' 
                  ? 'Дипломированный дизайнер интерьеров, окончившая Казахскую архитектурно-строительную академию и прошедшая обучение в престижном Central Saint Martin в Лондоне. Моя страсть к дизайну находит отражение в каждом проекте.'
                  : 'A certified interior designer who graduated from the Kazakh Academy of Architecture and Construction and trained at the prestigious Central Saint Martin in London. My passion for design is reflected in every project.'}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <Button asChild variant="outline" size="lg">
                  <Link to="/about">
                    {language === 'ru' ? 'Узнать больше' : 'Learn More'} 
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section id="portfolio" className="py-24 bg-muted/30">
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
        <section id="services" className="py-24">
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

        {/* Testimonials */}
        <Testimonials />

        {/* FAQ Section */}
        <FAQ />

        {/* Instagram Feed */}
        <InstagramFeed />

        {/* CTA / Contact Section */}
        <section id="contact" className="py-24 bg-primary text-primary-foreground text-center">
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
