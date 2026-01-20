import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/lib/i18n';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import WhatsAppButton from '@/components/WhatsAppButton';
import SEO from '@/components/SEO';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import InstagramFeed from '@/components/InstagramFeed';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import { Button } from '@/components/ui/button';
import BlurImage from '@/components/BlurImage';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import { portfolioProjects } from '@/data/portfolioData';
import heroImage from '@/assets/hero-interior.jpg';

const Index = () => {
  const { language, t } = useLanguage();
  const featuredProjects = portfolioProjects.slice(0, 6);
  
  // Parallax effect for hero
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

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
      <ScrollProgress />
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero with Parallax Background */}
        <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
          {/* Parallax Background Image */}
          <motion.div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
            style={{ 
              backgroundImage: `url(${heroImage})`,
              y: heroY,
            }}
          />
          {/* Cinematic Vignette */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.4) 100%)'
          }} />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50" />
          {/* Noise Texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none noise-texture" />
          
          <motion.div className="container mx-auto px-6 text-center relative z-10" style={{ opacity: heroOpacity }}>
            <motion.span 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} 
              className="text-sm tracking-[0.3em] text-white/70 uppercase mb-4 block font-light"
            >
              {language === 'ru' ? 'Дизайнер интерьеров · Алматы' : 'Interior Designer · Almaty'}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
              className="text-5xl md:text-7xl lg:text-8xl font-light mb-6 tracking-tight text-white"
            >
              {t.hero.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} 
              className="text-lg text-white/80 max-w-2xl mx-auto mb-10 font-light"
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
              <Button asChild size="lg" className="bg-white/95 text-black hover:bg-white font-medium tracking-wide shadow-lg">
                <Link to="/contact">{t.hero.cta.request}</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-white/40 !text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/60 font-medium tracking-wide"
              >
                <Link to="/portfolio">{t.hero.cta.portfolio}</Link>
              </Button>
              <WhatsAppButton size="lg" />
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            onClick={scrollToPortfolio}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors cursor-pointer group"
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
        <section id="portfolio" className="py-24 bg-muted/30 relative">
          {/* Section divider */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          {/* Noise Texture */}
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none noise-texture" />
          
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
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
                  initial={{ opacity: 0, y: 40 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-50px" }} 
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                >
                  <Link to={`/portfolio/${project.slug}`} className="group block">
                    <div className="aspect-[4/3] overflow-hidden bg-muted shadow-elegant relative">
                      {/* BlurImage with loading effect */}
                      <BlurImage 
                        src={project.thumbnail} 
                        alt={project.title[language]} 
                        className="w-full h-full transition-transform duration-700 ease-smooth group-hover:scale-105" 
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                      {/* Depth shadow on hover */}
                      <div className="absolute inset-0 shadow-[inset_0_-60px_40px_-40px_rgba(0,0,0,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    {/* Info with slide-up animation */}
                    <div className="mt-5 relative overflow-hidden">
                      <motion.div
                        initial={false}
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-lg font-medium transition-colors duration-300 group-hover:text-muted-foreground">
                          {project.title[language]}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 transition-all duration-300 group-hover:text-muted-foreground/70">
                          {project.area && `${project.area} м² · `}{project.location?.[language]}
                        </p>
                      </motion.div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center mt-16"
            >
              <Button asChild variant="outline" size="lg">
                <Link to="/portfolio" className="group">
                  {language === 'ru' ? 'Все проекты' : 'All Projects'} 
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
          
          {/* Section divider */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </section>

        {/* Services */}
        <section id="services" className="py-24 relative bg-background">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
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
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="bg-card border border-border p-8 shadow-soft hover:shadow-elegant transition-shadow duration-500"
              >
                <h3 className="text-2xl font-medium mb-2">{t.services.packages.turnkey.title}</h3>
                <div className="text-3xl font-light mb-6">
                  {t.services.packages.turnkey.price} 
                  <span className="text-base text-muted-foreground ml-1">{t.services.packages.turnkey.priceUnit}</span>
                </div>
                <ul className="space-y-3">
                  {t.services.packages.turnkey.includes.map((item, i) => (
                    <motion.li 
                      key={i} 
                      className="flex gap-3 text-sm text-muted-foreground"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 30 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="bg-primary text-primary-foreground p-8 shadow-architectural hover:shadow-[0_30px_60px_-15px_hsl(var(--primary)/0.4)] transition-shadow duration-500"
              >
                <h3 className="text-2xl font-medium mb-2">{t.services.packages.supervision.title}</h3>
                <div className="text-3xl font-light mb-6">
                  {t.services.packages.supervision.price} 
                  <span className="text-base text-primary-foreground/70 ml-1">{t.services.packages.supervision.priceUnit}</span>
                </div>
                <ul className="space-y-3">
                  {t.services.packages.supervision.includes.map((item, i) => (
                    <motion.li 
                      key={i} 
                      className="flex gap-3 text-sm text-primary-foreground/90"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center mt-12"
            >
              <Button asChild size="lg">
                <Link to="/services" className="group">
                  {t.common.learnMore}
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
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
        <section id="contact" className="py-24 bg-primary text-primary-foreground text-center relative overflow-hidden">
          {/* Noise Texture */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none noise-texture" />
          <div className="container mx-auto px-6 relative z-10">
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
        <BackToTop />
      </div>
    </PageTransition>
  );
};

export default Index;
