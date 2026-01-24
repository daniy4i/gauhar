import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import BackToTop from '@/components/BackToTop';
import BlurImage from '@/components/BlurImage';
import SEO from '@/components/SEO';
import { useLanguage } from '@/lib/i18n';
import { portfolioProjects, ProjectCategory } from '@/data/portfolioData';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Portfolio = () => {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | ProjectCategory>('all');

  const filters: { key: 'all' | ProjectCategory; label: string }[] = [
    { key: 'all', label: t.portfolio.filters.all },
    { key: 'residential', label: language === 'ru' ? 'Жилые' : 'Residential' },
    { key: 'commercial', label: t.portfolio.filters.commercial },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? portfolioProjects 
    : portfolioProjects.filter(p => p.category === activeFilter);

  return (
    <PageTransition>
      <SEO 
        title={language === 'ru' ? 'Портфолио' : 'Portfolio'}
        description={language === 'ru' 
          ? 'Портфолио проектов дизайна интерьера: квартиры, дома, рестораны. Более 50 реализованных проектов в Алматы.'
          : 'Interior design portfolio: apartments, houses, restaurants. Over 50 completed projects in Almaty.'}
        url="https://gauhar.lovable.app/portfolio"
      />
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section - Clean, minimal */}
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm tracking-[0.2em] text-muted-foreground uppercase mb-4 block"
              >
                {t.portfolio.title}
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight"
              >
                {t.portfolio.subtitle}
              </motion.h1>
            </div>
          </div>
        </section>

        {/* Filters - Pill-shaped buttons */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap justify-center gap-3"
            >
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeFilter === filter.key
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Projects Grid - Large images, calm hover */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div 
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link 
                      to={project.externalLink || `/portfolio/${project.slug}`}
                      className="group block"
                    >
                      <div className="relative overflow-hidden bg-muted aspect-[4/3] rounded-lg">
                        <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105">
                          <BlurImage 
                            src={project.thumbnail} 
                            alt={project.title[language]}
                            className="w-full h-full portfolio-image"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        {/* Calm hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <span className="inline-flex items-center text-white text-sm font-medium">
                            {t.portfolio.viewProject}
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </span>
                        </div>
                        {/* Featured badge for special projects */}
                        {project.externalLink && (
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                              {language === 'ru' ? 'Подробнее' : 'Featured'}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="mt-6">
                        <h3 className="text-xl font-medium transition-colors duration-200 group-hover:text-muted-foreground">
                          {project.title[language]}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                          {project.area && <span>{project.area} м²</span>}
                          {project.location && <span>{project.location[language]}</span>}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* CTA Section - Dark, spacious */}
        <section className="py-32 bg-[hsl(240,6%,6%)]">
          <div className="container mx-auto px-6 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl font-normal mb-6 text-white tracking-tight"
            >
              {language === 'ru' ? 'Понравился проект?' : 'Like what you see?'}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-white/60 mb-10 max-w-xl mx-auto text-lg"
            >
              {language === 'ru'
                ? 'Давайте обсудим, как я могу помочь создать интерьер вашей мечты.'
                : "Let's discuss how I can help create your dream interior."}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Button asChild size="lg">
                <Link to="/contact">{t.portfolio.projectCta}</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        <Footer />
        <BackToTop />
      </div>
    </PageTransition>
  );
};

export default Portfolio;