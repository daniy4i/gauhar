import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/BackToTop';
import SEO from '@/components/SEO';
import PageTransition from '@/components/layout/PageTransition';
import BlurImage from '@/components/BlurImage';
import ImageLightbox from '@/components/ImageLightbox';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// Import all project images
import livingKitchen1 from '@/assets/soft-modern-v2/living-kitchen-1.jpg';
import livingKitchen2 from '@/assets/soft-modern-v2/living-kitchen-2.jpg';
import storage1 from '@/assets/soft-modern-v2/storage-1.jpg';
import entry1 from '@/assets/soft-modern-v2/entry-1.jpg';
import workspace1 from '@/assets/soft-modern-v2/workspace-1.jpg';
import bathroom1 from '@/assets/soft-modern-v2/bathroom-1.jpg';
import bathroom2 from '@/assets/soft-modern-v2/bathroom-2.jpg';
import bathroom3 from '@/assets/soft-modern-v2/bathroom-3.jpg';
import bedroom1 from '@/assets/soft-modern-v2/bedroom-1.jpg';
import bedroom2 from '@/assets/soft-modern-v2/bedroom-2.jpg';

// Section data structure
const sections = [
{
  id: 'living',
  label: { ru: 'Гостиная', en: 'Living' },
  images: [
  { src: livingKitchen1, caption: { ru: 'Открытая гостиная зона с кухонным островом', en: 'Open-plan living area with integrated kitchen island' } },
  { src: livingKitchen2, caption: { ru: 'Мягкие текстуры в сочетании со структурными формами', en: 'Soft textures balanced with structured forms' } }]

},
{
  id: 'storage',
  label: { ru: 'Хранение', en: 'Storage' },
  images: [
  { src: storage1, caption: { ru: 'Встроенный шкаф с минималистичной отделкой', en: 'Built-in wardrobe with minimalist detailing' } }]

},
{
  id: 'entry',
  label: { ru: 'Прихожая', en: 'Entry' },
  images: [
  { src: entry1, caption: { ru: 'Входная зона с текстурированными панелями', en: 'Entry area with textured wall panels' } }]

},
{
  id: 'workspace',
  label: { ru: 'Кабинет', en: 'Workspace' },
  images: [
  { src: workspace1, caption: { ru: 'Компактное рабочее пространство в интерьере', en: 'Compact workspace integrated into the interior' } }]

},
{
  id: 'bathroom',
  label: { ru: 'Ванная', en: 'Bathroom' },
  images: [
  { src: bathroom1, caption: { ru: 'Современная ванная с текстурами терраццо', en: 'Modern bathroom with terrazzo textures' } },
  { src: bathroom2, caption: { ru: 'Функциональная планировка с акцентным освещением', en: 'Functional layout with refined lighting accents' } },
  { src: bathroom3, caption: { ru: 'Чистая геометрия в сочетании с тёплыми деталями', en: 'Clean geometry combined with warm details' } }]

},
{
  id: 'bedroom',
  label: { ru: 'Спальня', en: 'Bedroom' },
  images: [
  { src: bedroom1, caption: { ru: 'Спальня для отдыха и баланса', en: 'Bedroom designed for rest and balance' } },
  { src: bedroom2, caption: { ru: 'Мягкий текстиль и тёплые акценты освещения', en: 'Soft textiles and warm lighting accents' } }]

}];


// Flatten all images for lightbox
const allImages = sections.flatMap((section) => section.images);

const SoftModernApartmentV2 = () => {
  const { language } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('living');
  const sectionRefs = useRef<{[key: string]: HTMLElement | null;}>({});

  const projectInfo = {
    title: {
      en: 'Soft Modern Apartment',
      ru: 'Мягкая современная квартира'
    },
    description: {
      en: 'This interior project is a contemporary residential space designed with a focus on softness, balance, and everyday functionality. The concept blends muted color accents with warm wood finishes, textured surfaces, and carefully selected lighting to create a calm yet expressive environment.',
      ru: 'Этот интерьерный проект — современное жилое пространство, спроектированное с акцентом на мягкость, баланс и повседневную функциональность. Концепция сочетает приглушённые цветовые акценты с тёплой отделкой из дерева, текстурированными поверхностями и тщательно подобранным освещением.'
    },
    location: {
      en: 'Almaty',
      ru: 'Алматы'
    },
    area: 72
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = sectionRefs.current[section.id];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const openLightbox = (globalIndex: number) => {
    setCurrentImageIndex(globalIndex);
    setLightboxOpen(true);
  };

  // Get global index for an image
  const getGlobalIndex = (sectionIndex: number, imageIndex: number): number => {
    let index = 0;
    for (let i = 0; i < sectionIndex; i++) {
      index += sections[i].images.length;
    }
    return index + imageIndex;
  };

  return (
    <PageTransition>
      <SEO
        title={`${projectInfo.title[language]} | Gauhar Sultanova`}
        description={projectInfo.description[language]}
        url="https://gauhar.lovable.app/residential/soft-modern-apartment-v2" />

      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-end" style={{ backgroundColor: '#F5F3F0' }}>
        <div className="absolute inset-0">
          <BlurImage
            src={livingKitchen2}
            alt={projectInfo.title[language]}
            className="w-full h-full object-cover"
            priority />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pb-20 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}>

            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-sm tracking-wide">

              <ArrowLeft className="w-4 h-4" />
              {language === 'ru' ? 'Назад к портфолио' : 'Back to Portfolio'}
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-light text-white mb-4">
              {projectInfo.title[language]}
            </h1>
            <div className="items-center gap-6 text-white/80 text-sm tracking-wide flex-row flex">
              <span>{projectInfo.location[language]}</span>
              <span className="w-1 h-1 bg-white/50 rounded-full" />
              <span>{projectInfo.area} {language === 'ru' ? 'м²' : 'sq.m'}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20" style={{ backgroundColor: '#F5F3F0' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl">

          <p className="text-lg md:text-xl leading-relaxed text-muted">
            {projectInfo.description[language]}
          </p>
        </motion.div>
      </section>

      {/* Gallery Sections */}
      <div style={{ backgroundColor: '#F5F3F0' }} className="pb-32">
        {sections.map((section, sectionIndex) =>
        <section
          key={section.id}
          id={section.id}
          ref={(el) => sectionRefs.current[section.id] = el}
          className="px-4 md:px-8 lg:px-12 py-12 md:py-20">

            {/* Section Title */}
            <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm tracking-[0.2em] uppercase mb-8 md:mb-12 text-muted">

              {section.label[language]}
            </motion.h2>

            {/* Images Grid */}
            <div className={`grid gap-6 md:gap-8 ${
          section.images.length === 1 ?
          'grid-cols-1' :
          section.images.length === 2 ?
          'grid-cols-1 md:grid-cols-2' :
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`
          }>
              {section.images.map((image, imageIndex) => {
              const globalIndex = getGlobalIndex(sectionIndex, imageIndex);
              const isFullWidth = section.images.length === 1 || section.images.length === 3 && imageIndex === 0;

              return (
                <motion.div
                  key={imageIndex}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7, delay: imageIndex * 0.1 }}
                  className={`group cursor-zoom-in ${isFullWidth && section.images.length === 3 ? 'md:col-span-2 lg:col-span-3' : ''}`}
                  onClick={() => openLightbox(globalIndex)}>

                    <div className="relative overflow-hidden bg-muted/10">
                      <BlurImage
                      src={image.src}
                      alt={image.caption[language]}
                      className={`w-full ${isFullWidth ? 'aspect-[16/9]' : 'aspect-[4/5]'} object-cover transition-all duration-700 ease-out group-hover:scale-105`} />

                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                    </div>
                    <p className="mt-4 text-sm tracking-wide text-muted">
                      {image.caption[language]}
                    </p>
                  </motion.div>);

            })}
            </div>
          </section>
        )}
      </div>

      {/* Floating Section Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">

        <div className="flex items-center gap-1 px-2 py-2 bg-background/90 backdrop-blur-md border border-border/50 rounded-full shadow-lg">
          {sections.map((section) =>
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`px-3 md:px-4 py-2 text-xs md:text-sm tracking-wide transition-all duration-300 rounded-full whitespace-nowrap ${
            activeSection === section.id ?
            'bg-foreground text-background' :
            'text-foreground/60 hover:text-foreground hover:bg-muted/50'}`
            }>

              {section.label[language]}
            </button>
          )}
        </div>
      </motion.nav>

      {/* Image Lightbox */}
      <ImageLightbox
        images={allImages.map((img) => img.src)}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setCurrentImageIndex((prev) => (prev + 1) % allImages.length)}
        onPrev={() => setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)} />


      <Footer />
      <BackToTop />
    </PageTransition>);

};

export default SoftModernApartmentV2;