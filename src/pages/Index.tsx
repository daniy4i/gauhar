import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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
import { ArrowLeft, ArrowRight, Check, ChevronDown } from 'lucide-react';
import { portfolioProjects } from '@/data/portfolioData';
import HeroVideo from '@/components/HeroVideo';
import VideoBookingSection from '@/components/VideoBookingSection';
import aboutBgImage from '@/assets/about/gauhar-bg.jpg';

const Index = () => {
  const { language, t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [videoReady, setVideoReady] = useState(false);
  
  // Pagination settings
  const projectsPerPage = 4;
  const totalPages = Math.ceil(portfolioProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const featuredProjects = portfolioProjects.slice(startIndex, startIndex + projectsPerPage);
  
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to portfolio section
      const element = document.getElementById('portfolio');
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };
  
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

        {/* About Section - With dimmed background portrait */}
        <section id="about" className="py-32 relative overflow-hidden">
          {/* Background Image with dimmed overlay */}
          <div className="absolute inset-0">
            <img 
              src={aboutBgImage} 
              alt="" 
              className="w-full h-full object-cover object-top opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
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

        {/* Featured Projects - 2-column layout like hot-walls.ru */}
        <section id="portfolio" className="py-24 bg-[hsl(240,6%,6%)]">
          <div className="container mx-auto px-0">
            {/* Section header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-16 px-6"
            >
              <span className="text-[11px] tracking-[0.2em] text-white/40 uppercase mb-4 block">
                {language === 'ru' ? 'Избранное' : 'Featured'}
              </span>
              <h2 className="text-4xl md:text-5xl font-normal tracking-tight text-white">
                {t.portfolio.subtitle}
              </h2>
            </motion.div>
            
            {/* Projects Grid - 2 columns, edge-to-edge with fade animation */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentPage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="grid md:grid-cols-2"
              >
                {featuredProjects.map((project, i) => (
                  <motion.div 
                    key={project.id} 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link to={`/portfolio/${project.slug}`} className="group block relative">
                      {/* Image - Full width, tall aspect ratio */}
                      <div className="aspect-[4/3] overflow-hidden bg-[hsl(240,5%,8%)] relative">
                        <BlurImage 
                          src={project.thumbnail} 
                          alt={project.title[language]} 
                          className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105" 
                        />
                        {/* Subtle hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                      </div>
                      
                      {/* Project Info - Below image, minimal */}
                      <div className="px-6 py-8 bg-[hsl(240,6%,6%)]">
                        <h3 className="text-xl md:text-2xl font-normal tracking-tight text-white uppercase mb-3 transition-colors duration-200 group-hover:text-white/70">
                          {project.title[language]}
                        </h3>
                        <p className="text-sm text-white/40">
                          {project.location?.[language]}, {project.area} m²
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
            
            {/* Pagination */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center justify-center gap-4 mt-12"
            >
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="mr-2 text-white/40 hover:text-white/70 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-200 ${
                    currentPage === page
                      ? 'border border-white/30 text-white'
                      : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="ml-2 text-white/40 hover:text-white/70 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-center mt-12 px-6"
            >
              <Button asChild variant="outline" size="lg" className="border-white/20 !text-white hover:bg-white/5 hover:border-white/40 rounded-full px-8">
                <Link to="/portfolio" className="group">
                  {language === 'ru' ? 'Все проекты' : 'All Projects'} 
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Services - With video background */}
        <section id="services" className="py-32 relative overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/videos/blender-modeling.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/70" />
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-16"
            >
              <span className="text-sm tracking-[0.2em] text-white/60 uppercase mb-4 block">
                {language === 'ru' ? 'Услуги' : 'Services'}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white">
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
              <Button asChild size="lg" className="bg-white text-background hover:bg-white/90">
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