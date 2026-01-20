import { useState, useCallback } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import SEO from '@/components/SEO';
import ImageLightbox from '@/components/ImageLightbox';
import { useLanguage } from '@/lib/i18n';
import { getProjectBySlug, portfolioProjects } from '@/data/portfolioData';
import { Button } from '@/components/ui/button';
import WhatsAppButton from '@/components/WhatsAppButton';
import BackToTop from '@/components/BackToTop';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const PortfolioProject = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const project = slug ? getProjectBySlug(slug) : undefined;

  const openLightbox = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    if (project) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }
  }, [project]);

  const prevImage = useCallback(() => {
    if (project) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  }, [project]);

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  const currentIndex = portfolioProjects.findIndex(p => p.slug === slug);
  const prevProject = currentIndex > 0 ? portfolioProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < portfolioProjects.length - 1 ? portfolioProjects[currentIndex + 1] : null;

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

        {/* Back Link */}
        <section className="pt-24 md:pt-28">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <Link
                to="/portfolio"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                {language === 'ru' ? 'Назад к портфолио' : 'Back to Portfolio'}
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Hero Image - Full Width */}
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
        >
          <div
            className="w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden cursor-pointer group"
            onClick={() => openLightbox(0)}
          >
            <img
              src={project.images[0]}
              alt={project.title[language]}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </motion.section>

        {/* Project Info */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="grid md:grid-cols-[2fr_1fr] gap-12 md:gap-20"
              >
                {/* Main Content */}
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-architectural mb-8">
                    {project.title[language]}
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    {project.description[language]}
                  </p>
                </div>

                {/* Project Details */}
                <div className="space-y-8 md:pt-4">
                  <div className="space-y-6">
                    <div>
                      <span className="text-minimal text-muted-foreground block mb-2">
                        {t.portfolio.area}
                      </span>
                      <span className="text-xl">{project.area} м²</span>
                    </div>

                    <div className="w-full h-px bg-border" />

                    <div>
                      <span className="text-minimal text-muted-foreground block mb-2">
                        {language === 'ru' ? 'Локация' : 'Location'}
                      </span>
                      <span className="text-xl">{project.location[language]}</span>
                    </div>

                    <div className="w-full h-px bg-border" />

                    <div>
                      <span className="text-minimal text-muted-foreground block mb-2">
                        {language === 'ru' ? 'Категория' : 'Category'}
                      </span>
                      <span className="text-xl capitalize">
                        {project.category === 'residential'
                          ? language === 'ru'
                            ? 'Жилой'
                            : 'Residential'
                          : language === 'ru'
                          ? 'Коммерческий'
                          : 'Commercial'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Image Gallery */}
        {project.images.length > 1 && (
          <section className="pb-24 md:pb-32">
            <div className="container mx-auto px-6 lg:px-12">
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                {project.images.slice(1).map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="aspect-[4/3] overflow-hidden cursor-pointer group"
                    onClick={() => openLightbox(index + 1)}
                  >
                    <img
                      src={image}
                      alt={`${project.title[language]} - ${index + 2}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-light text-architectural mb-6">
                {t.portfolio.requestSimilar}
              </h2>
              <p className="text-muted-foreground mb-10 text-lg">
                {language === 'ru'
                  ? 'Хотите такой же стильный интерьер? Давайте обсудим ваш проект!'
                  : "Want a similarly stylish interior? Let's discuss your project!"}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="px-8">
                  <Link to="/contact">{t.contact.form.submit}</Link>
                </Button>
                <WhatsAppButton variant="outline" size="lg" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Project Navigation */}
        <section className="py-12 md:py-16 border-t border-border/50">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="flex justify-between items-center">
              {prevProject ? (
                <Link
                  to={`/portfolio/${prevProject.slug}`}
                  className="group flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-2" />
                  <div className="text-left">
                    <span className="text-minimal block mb-1">
                      {language === 'ru' ? 'Предыдущий' : 'Previous'}
                    </span>
                    <span className="text-lg text-foreground font-light">
                      {prevProject.title[language]}
                    </span>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextProject ? (
                <Link
                  to={`/portfolio/${nextProject.slug}`}
                  className="group flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <div className="text-right">
                    <span className="text-minimal block mb-1">
                      {language === 'ru' ? 'Следующий' : 'Next'}
                    </span>
                    <span className="text-lg text-foreground font-light">
                      {nextProject.title[language]}
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        <ImageLightbox
          images={project.images}
          currentIndex={currentImageIndex}
          isOpen={lightboxOpen}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
          altText={project.title[language]}
        />

        <Footer />
        <BackToTop />
      </div>
    </PageTransition>
  );
};

export default PortfolioProject;
