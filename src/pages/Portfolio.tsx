import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import { useLanguage } from '@/lib/i18n';
import { portfolioProjects, ProjectCategory } from '@/data/portfolioData';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Portfolio = () => {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | ProjectCategory>('all');

  const filters: { key: 'all' | ProjectCategory; label: string }[] = [
    { key: 'all', label: t.portfolio.filters.all },
    { key: 'apartment', label: t.portfolio.filters.apartment },
    { key: 'house', label: t.portfolio.filters.house },
    { key: 'commercial', label: t.portfolio.filters.commercial },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? portfolioProjects 
    : portfolioProjects.filter(p => p.category === activeFilter);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm tracking-[0.2em] text-muted-foreground uppercase mb-3 block"
              >
                {t.portfolio.title}
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-6xl lg:text-7xl font-light mt-4 mb-6 tracking-tight"
              >
                {t.portfolio.subtitle}
              </motion.h1>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-border/50">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap justify-center gap-3"
            >
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-6 py-2.5 text-sm tracking-wide transition-all duration-300 ${
                    activeFilter === filter.key
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16">
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
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link 
                      to={`/portfolio/${project.slug}`}
                      className="group block"
                    >
                      <div className="relative overflow-hidden bg-muted aspect-[4/3] shadow-elegant">
                        <img 
                          src={project.thumbnail} 
                          alt={project.title[language]}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                          <span className="inline-flex items-center text-white text-sm font-medium">
                            {t.portfolio.viewProject}
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </span>
                        </div>
                      </div>
                      <div className="mt-5 space-y-2">
                        <h3 className="text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                          {project.title[language]}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {project.description[language]}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
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

        {/* CTA Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-4xl font-light mb-6"
            >
              {language === 'ru' ? 'Понравился проект?' : 'Like what you see?'}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-muted-foreground mb-8 max-w-xl mx-auto"
            >
              {language === 'ru'
                ? 'Давайте обсудим, как я могу помочь создать интерьер вашей мечты.'
                : "Let's discuss how I can help create your dream interior."}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Button asChild size="lg">
                <Link to="/contact">{t.portfolio.projectCta}</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Portfolio;
