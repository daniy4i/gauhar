import { useState } from 'react';
import { motion } from 'framer-motion';
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
import bedroom1 from '@/assets/soft-modern/bedroom-1.jpg';
import kitchenDining from '@/assets/soft-modern/kitchen-dining.jpg';
import living1 from '@/assets/soft-modern/living-1.jpg';
import living2 from '@/assets/soft-modern/living-2.jpg';
import bathroom1 from '@/assets/soft-modern/bathroom-1.jpg';
import bedroom2 from '@/assets/soft-modern/bedroom-2.jpg';
import bedroom3 from '@/assets/soft-modern/bedroom-3.jpg';
import hallway from '@/assets/soft-modern/hallway.jpg';
import bathroom2 from '@/assets/soft-modern/bathroom-2.jpg';
import kitchenOpen from '@/assets/soft-modern/kitchen-open.jpg';

// Gallery images with captions in order
const galleryImages = [{
  src: bedroom1,
  caption: {
    en: 'Soft modern bedroom with neutral tones',
    ru: 'Мягкая современная спальня в нейтральных тонах'
  }
}, {
  src: kitchenDining,
  caption: {
    en: 'Minimalist kitchen and dining area',
    ru: 'Минималистичная кухня и столовая'
  }
}, {
  src: living1,
  caption: {
    en: 'Living space with natural light and warm textures',
    ru: 'Гостиная с естественным светом и тёплыми текстурами'
  }
}, {
  src: living2,
  caption: {
    en: 'Open living area with contemporary details',
    ru: 'Открытая гостиная с современными деталями'
  }
}, {
  src: bathroom1,
  caption: {
    en: 'Functional bathroom with clean detailing',
    ru: 'Функциональная ванная с чистыми деталями'
  }
}, {
  src: bedroom2,
  caption: {
    en: 'Master bedroom with integrated workspace',
    ru: 'Главная спальня со встроенной рабочей зоной'
  }
}, {
  src: bedroom3,
  caption: {
    en: 'Bedroom with soft textiles and warm wood',
    ru: 'Спальня с мягким текстилем и тёплым деревом'
  }
}, {
  src: hallway,
  caption: {
    en: 'Hallway with decorative shelving and natural light',
    ru: 'Прихожая с декоративными полками и естественным светом'
  }
}, {
  src: bathroom2,
  caption: {
    en: 'Modern bathroom with patterned floor tiles',
    ru: 'Современная ванная с узорчатым полом'
  }
}, {
  src: kitchenOpen,
  caption: {
    en: 'Open kitchen with abundant natural light',
    ru: 'Открытая кухня с обилием естественного света'
  }
}];
const SoftModernApartment = () => {
  const {
    language
  } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };
  const projectInfo = {
    title: {
      en: 'Soft Modern Apartment',
      ru: 'Мягкая современная квартира'
    },
    description: {
      en: 'This residential interior project explores a calm, modern aesthetic built around light, balance, and everyday comfort. Neutral tones, warm wood textures, and soft textiles create a cohesive atmosphere that feels both contemporary and lived-in. Clean lines are paired with subtle decorative accents to keep the space visually light while remaining functional. Each room was designed to maximize natural light, maintain visual continuity, and support a relaxed daily rhythm without unnecessary complexity.',
      ru: 'Этот жилой интерьер исследует спокойную современную эстетику, построенную вокруг света, баланса и повседневного комфорта. Нейтральные тона, тёплые текстуры дерева и мягкий текстиль создают целостную атмосферу, которая одновременно современна и уютна. Чистые линии сочетаются с тонкими декоративными акцентами, сохраняя пространство визуально лёгким и функциональным.'
    },
    location: {
      en: 'Almaty',
      ru: 'Алматы'
    },
    area: 95
  };
  return <PageTransition>
      <SEO title={`${projectInfo.title[language]} | Gauhar Sultanova`} description={projectInfo.description[language]} url="https://gauhar.lovable.app/residential/soft-modern-apartment" />
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-end" style={{
      backgroundColor: '#F5F3F0'
    }}>
        <div className="absolute inset-0">
          <BlurImage src={bedroom1} alt={projectInfo.title[language]} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pb-16 md:pb-24">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }}>
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-sm tracking-wide">
              <ArrowLeft className="w-4 h-4" />
              {language === 'ru' ? 'Назад к портфолио' : 'Back to Portfolio'}
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4">
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
      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 border-muted-foreground bg-popover text-primary-foreground" style={{
      backgroundColor: '#F5F3F0'
    }}>
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.8
      }} className="max-w-3xl">
          <p className="text-lg md:text-xl leading-relaxed text-muted">
            {projectInfo.description[language]}
          </p>
        </motion.div>
      </section>

      {/* Masonry Gallery */}
      <section className="px-4 md:px-8 lg:px-12 pb-20 md:pb-32" style={{
      backgroundColor: '#F5F3F0'
    }}>
        <div className="columns-1 md:columns-2 gap-6 md:gap-8 lg:gap-10 space-y-6 md:space-y-8 lg:space-y-10">
          {galleryImages.map((image, index) => {
          // Create visual variety with different aspect ratios
          const aspectRatios = [
          'aspect-[4/5]', // Portrait tall
          'aspect-[3/2]', // Landscape wide
          'aspect-[4/3]', // Standard
          'aspect-[1/1]', // Square
          'aspect-[3/4]', // Portrait
          'aspect-[16/10]', // Cinematic
          'aspect-[4/5]', // Portrait tall
          'aspect-[3/2]', // Landscape wide
          'aspect-[5/4]', // Slightly portrait
          'aspect-[3/2]' // Landscape wide
          ];
          const aspectClass = aspectRatios[index % aspectRatios.length];

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index % 4 * 0.1 }}
              className="group cursor-zoom-in break-inside-avoid mb-6 md:mb-8 lg:mb-10 transition-transform duration-500 ease-out hover:-translate-y-2"
              onClick={() => openLightbox(index)}>

              <div className="relative overflow-hidden bg-muted/10 shadow-md transition-shadow duration-500 ease-out group-hover:shadow-2xl">
                  <BlurImage
                  src={image.src}
                  alt={image.caption[language]}
                  className={`w-full ${aspectClass} object-cover transition-all duration-500 ease-out group-hover:scale-110`} />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>
                <p className="mt-4 text-sm tracking-wide text-muted">
                  {image.caption[language]}
                </p>
              </motion.div>);

        })}
        </div>
      </section>

      {/* Image Lightbox */}
      <ImageLightbox images={galleryImages.map((img) => img.src)} currentIndex={currentImageIndex} isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} onNext={() => setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)} onPrev={() => setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)} />

      <Footer />
      <BackToTop />
    </PageTransition>;
};
export default SoftModernApartment;