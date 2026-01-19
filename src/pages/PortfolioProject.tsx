import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import SEO from '@/components/SEO';
import { useLanguage } from '@/lib/i18n';
import { getProjectBySlug, portfolioProjects } from '@/data/portfolioData';
import { Button } from '@/components/ui/button';
import WhatsAppButton from '@/components/WhatsAppButton';
import { ArrowLeft, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';

const PortfolioProject = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  const currentIndex = portfolioProjects.findIndex(p => p.slug === slug);
  const prevProject = currentIndex > 0 ? portfolioProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < portfolioProjects.length - 1 ? portfolioProjects[currentIndex + 1] : null;

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <PageTransition>
      <SEO 
        title={project.title[language]}
        description={project.description[language]}
        image={project.thumbnail}
        url={`https://pure-architect-space-01.lovable.app/portfolio/${project.slug}`}
      />
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Image */}
        <section className="pt-24">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <Link 
                to="/portfolio" 
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === 'ru' ? 'Назад к портфолио' : 'Back to Portfolio'}
              </Link>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full aspect-[21/9] overflow-hidden cursor-pointer shadow-architectural"
            onClick={() => openLightbox(0)}
          >
            <img 
              src={project.images[0]} 
              alt={project.title[language]}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        </section>

        {/* Project Info */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="grid md:grid-cols-3 gap-12"
              >
                <div className="md:col-span-2">
                  <h1 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">
                    {project.title[language]}
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {project.brief[language]}
                  </p>
                </div>

                <div className="space-y-6">
                  {project.area && (
                    <div>
                      <span className="text-sm text-muted-foreground block mb-1">
                        {t.portfolio.area}
                      </span>
                      <span className="text-lg">{project.area} м²</span>
                    </div>
                  )}
                  {project.location && (
                    <div>
                      <span className="text-sm text-muted-foreground block mb-1">
                        {language === 'ru' ? 'Локация' : 'Location'}
                      </span>
                      <span className="text-lg">{project.location[language]}</span>
                    </div>
                  )}
                  {project.year && (
                    <div>
                      <span className="text-sm text-muted-foreground block mb-1">
                        {language === 'ru' ? 'Год' : 'Year'}
                      </span>
                      <span className="text-lg">{project.year}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-sm text-muted-foreground block mb-2">
                      {language === 'ru' ? 'Стиль' : 'Style'}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.styles.map((style) => (
                        <span 
                          key={style}
                          className="px-3 py-1 bg-muted text-sm"
                        >
                          {style}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Image Gallery */}
        {project.images.length > 1 && (
          <section className="py-8">
            <div className="container mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-4">
                {project.images.slice(1).map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="aspect-[4/3] overflow-hidden cursor-pointer shadow-elegant"
                    onClick={() => openLightbox(index + 1)}
                  >
                    <img 
                      src={image} 
                      alt={`${project.title[language]} - ${index + 2}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-4xl font-light mb-6"
            >
              {t.portfolio.requestSimilar}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-muted-foreground mb-8 max-w-xl mx-auto"
            >
              {language === 'ru'
                ? 'Хотите такой же стильный интерьер? Давайте обсудим ваш проект!'
                : 'Want a similarly stylish interior? Let\'s discuss your project!'}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg">
                <Link to="/contact">{t.contact.form.submit}</Link>
              </Button>
              <WhatsAppButton variant="outline" size="lg" />
            </motion.div>
          </div>
        </section>

        {/* Project Navigation */}
        <section className="py-12 border-t border-border/50">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center">
              {prevProject ? (
                <Link 
                  to={`/portfolio/${prevProject.slug}`}
                  className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <div className="text-left">
                    <span className="text-xs block">{language === 'ru' ? 'Предыдущий' : 'Previous'}</span>
                    <span className="text-sm font-medium text-foreground">{prevProject.title[language]}</span>
                  </div>
                </Link>
              ) : <div />}
              
              {nextProject ? (
                <Link 
                  to={`/portfolio/${nextProject.slug}`}
                  className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <div className="text-right">
                    <span className="text-xs block">{language === 'ru' ? 'Следующий' : 'Next'}</span>
                    <span className="text-sm font-medium text-foreground">{nextProject.title[language]}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : <div />}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center"
              onClick={closeLightbox}
            >
              <button 
                onClick={closeLightbox}
                className="absolute top-6 right-6 text-background/70 hover:text-background transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              
              <button 
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-6 text-background/70 hover:text-background transition-colors"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
              
              <motion.img
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                src={project.images[currentImageIndex]}
                alt={project.title[language]}
                className="max-w-[90vw] max-h-[90vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              
              <button 
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-6 text-background/70 hover:text-background transition-colors"
              >
                <ChevronRight className="w-10 h-10" />
              </button>
              
              <div className="absolute bottom-6 text-background/70 text-sm">
                {currentImageIndex + 1} / {project.images.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default PortfolioProject;
