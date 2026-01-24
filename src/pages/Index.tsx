import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import WhatsAppButton from '@/components/WhatsAppButton';
import SEO from '@/components/SEO';
import BackToTop from '@/components/BackToTop';
import { Button } from '@/components/ui/button';
import BlurImage from '@/components/BlurImage';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import { portfolioProjects } from '@/data/portfolioData';
import HeroVideo from '@/components/HeroVideo';
import VideoBookingSection from '@/components/VideoBookingSection';

const Index = () => {
  const { language, t } = useLanguage();
  const featuredProjects = portfolioProjects.slice(0, 6);
  const [videoReady, setVideoReady] = useState(false);
  
  // Parallax effect for hero
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
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
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero - Full-width, edge-to-edge */}
        <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <HeroVideo heroY={useTransform(scrollYProgress, [0, 1], ["0%", "30%"])} onVideoReady={() => setVideoReady(true)}>
            <></>
          </HeroVideo>
          
          <motion.div 
            className="container mx-auto px-6 text-center relative z-10" 
            style={{ opacity: heroOpacity }}
          >
            {/* Subtitle - muted, tracking wide */}
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm tracking-[0.3em] text-white/60 uppercase mb-6 block font-normal"
            >
              {language === 'ru' ? 'Дизайнер интерьеров · Алматы' : 'Interior Designer · Almaty'}
            </motion.span>
            
            {/* Title - Large, confident, clean */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-normal mb-8 tracking-tight text-white"
            >
              {t.hero.title}
            </motion.h1>
            
            {/* Description - muted gray */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-white/70 max-w-2xl mx-auto mb-12 font-normal leading-relaxed"
            >
              {language === 'ru' 
                ? 'Создаю уникальные интерьеры, которые отражают вашу индивидуальность' 
                : 'Creating unique interiors that reflect your individuality'}
            </motion.p>
            
            {/* CTA buttons - Pill-shaped, electric blue primary */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button asChild size="lg">
                <Link to="/contact">{t.hero.cta.request}</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-white/30 !text-white bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/50"
              >
                <Link to="/portfolio">{t.hero.cta.portfolio}</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            onClick={scrollToPortfolio}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs tracking-[0.2em] uppercase font-normal">
                {language === 'ru' ? 'Листать' : 'Scroll'}
              </span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </div>
          </motion.button>
        </section>

        {/* About Section - Clean, spacious */}
        <section id="about" className="py-32 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.span 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm tracking-[0.2em] text-muted-foreground uppercase mb-6 block"
              >
                {language === 'ru' ? 'О себе' : 'About Me'}
              </motion.span>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-5xl lg:text-6xl font-normal mb-8 tracking-tight"
              >
                {language === 'ru' ? 'Гаухар Сергазина' : 'Gauhar Sergazina'}
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-3xl mx-auto"
              >
                {language === 'ru' 
                  ? 'Дипломированный дизайнер интерьеров, окончившая Казахскую архитектурно-строительную академию и прошедшая обучение в престижном Central Saint Martin в Лондоне. Моя страсть к дизайну находит отражение в каждом проекте.'
                  : 'A certified interior designer who graduated from the Kazakh Academy of Architecture and Construction and trained at the prestigious Central Saint Martin in London. My passion for design is reflected in every project.'}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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

        {/* Featured Projects - Grid-based, large images, edge-to-edge feel */}
        <section id="portfolio" className="py-32 bg-[hsl(240,6%,6%)]">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-16"
            >
              <span className="text-sm tracking-[0.2em] text-white/50 uppercase mb-4 block">
                {language === 'ru' ? 'Избранное' : 'Featured'}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white">
                {t.portfolio.subtitle}
              </h2>
            </motion.div>
            
            {/* Projects Grid - Large cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, i) => (
                <motion.div 
                  key={project.id} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-50px" }} 
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link to={`/portfolio/${project.slug}`} className="group block">
                    <div className="aspect-[4/3] overflow-hidden bg-[hsl(240,5%,12%)] relative">
                      <BlurImage 
                        src={project.thumbnail} 
                        alt={project.title[language]} 
                        className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105" 
                      />
                      {/* Subtle hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                    <div className="mt-5">
                      <h3 className="text-lg font-medium text-white transition-colors duration-200 group-hover:text-white/70">
                        {project.title[language]}
                      </h3>
                      <p className="text-sm text-white/50 mt-1">
                        {project.area && `${project.area} м² · `}{project.location?.[language]}
                      </p>
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
              <Button asChild variant="outline" size="lg" className="border-white/30 !text-white hover:bg-white/10 hover:border-white/50">
                <Link to="/portfolio" className="group">
                  {language === 'ru' ? 'Все проекты' : 'All Projects'} 
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Services - Clean cards, spacious */}
        <section id="services" className="py-32 bg-background">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-16"
            >
              <span className="text-sm tracking-[0.2em] text-muted-foreground uppercase mb-4 block">
                {language === 'ru' ? 'Услуги' : 'Services'}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight">
                {language === 'ru' ? 'Что мы предлагаем' : 'What We Offer'}
              </h2>
            </motion.div>
            
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
              {/* Turnkey Package */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="bg-card border border-border p-10 rounded-2xl hover:border-primary/30 transition-colors duration-200"
              >
                <h3 className="text-2xl font-medium mb-3">{t.services.packages.turnkey.title}</h3>
                <div className="text-4xl font-normal mb-8">
                  {t.services.packages.turnkey.price} 
                  <span className="text-lg text-muted-foreground ml-2">{t.services.packages.turnkey.priceUnit}</span>
                </div>
                <ul className="space-y-4">
                  {t.services.packages.turnkey.includes.map((item, i) => (
                    <li key={i} className="flex gap-3 text-muted-foreground">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              {/* Supervision Package - Featured */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="bg-primary text-primary-foreground p-10 rounded-2xl relative"
              >
                <div className="absolute top-6 right-6">
                  <span className="inline-flex items-center bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                    {language === 'ru' ? 'Популярный' : 'Popular'}
                  </span>
                </div>
                <h3 className="text-2xl font-medium mb-3">{t.services.packages.supervision.title}</h3>
                <div className="text-4xl font-normal mb-8">
                  {t.services.packages.supervision.price} 
                  <span className="text-lg text-primary-foreground/70 ml-2">{t.services.packages.supervision.priceUnit}</span>
                </div>
                <ul className="space-y-4">
                  {t.services.packages.supervision.includes.map((item, i) => (
                    <li key={i} className="flex gap-3 text-primary-foreground/90">
                      <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
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
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Video Booking Section */}
        <VideoBookingSection />

        <Footer />
        <BackToTop />
      </div>
    </PageTransition>
  );
};

export default Index;