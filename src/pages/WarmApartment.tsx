import { useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import SEO from '@/components/SEO';
import BlurImage from '@/components/BlurImage';
import ImageLightbox from '@/components/ImageLightbox';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// Import images
import hero from '@/assets/warm-apartment/hero.jpg';
import bedroomDetail from '@/assets/warm-apartment/bedroom-detail.jpg';
import powderRoom from '@/assets/warm-apartment/powder-room.jpg';
import kitchenDetail from '@/assets/warm-apartment/kitchen-detail.jpg';
import staircase from '@/assets/warm-apartment/staircase.jpg';
import ceramics from '@/assets/warm-apartment/ceramics.jpg';
import readingNook from '@/assets/warm-apartment/reading-nook.jpg';
import bedroom from '@/assets/warm-apartment/bedroom.jpg';
import bathroom from '@/assets/warm-apartment/bathroom.jpg';

// All gallery images in curated order
const galleryImages = [
  hero,
  readingNook,
  kitchenDetail,
  staircase,
  bedroomDetail,
  bedroom,
  bathroom,
  powderRoom,
  ceramics,
];

// Parallax image component
const ParallaxImage = ({ 
  image, 
  alt, 
  priority,
  onClick 
}: { 
  image: string; 
  alt: string; 
  priority?: boolean;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <div 
      ref={ref} 
      className="relative overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      <motion.div style={{ y }} className="w-full">
        <BlurImage
          src={image}
          alt={alt}
          className="w-full aspect-[3/2] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          priority={priority}
        />
      </motion.div>
      {/* Subtle hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
    </div>
  );
};

const WarmApartment = () => {
  const { language } = useLanguage();
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const title = language === 'en' 
    ? 'Minimal Warm Apartment' 
    : 'Тёплый минималистичный интерьер';
  
  const description = language === 'en'
    ? 'This residential interior explores warm minimalism through natural wood, soft neutral tones, and sculptural details. The space balances functionality with calm architectural rhythm, using custom cabinetry, textured surfaces, and carefully curated lighting to create a quiet, timeless atmosphere.'
    : 'Этот жилой интерьер исследует тёплый минимализм через натуральное дерево, мягкие нейтральные тона и скульптурные детали. Пространство балансирует функциональность с архитектурным ритмом, используя индивидуальную мебель, текстурированные поверхности и тщательно подобранное освещение для создания спокойной, вневременной атмосферы.';

  const projectInfo = {
    area: '185',
    location: language === 'en' ? 'Almaty' : 'Алматы',
    category: language === 'en' ? 'Residential' : 'Жилой',
    style: language === 'en' ? 'Warm Minimalism' : 'Тёплый минимализм',
  };

  return (
    <PageTransition>
      <SEO 
        title={title}
        description={description}
        url="/residential/warm-apartment"
      />
      
      <Navigation />
      
      {/* Soft beige background */}
      <main className="min-h-screen bg-[#F5F3F0]">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 md:px-12 lg:px-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link 
                to="/portfolio" 
                className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-800 transition-colors mb-12 group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span className="text-sm tracking-wide uppercase">
                  {language === 'en' ? 'Back to Portfolio' : 'Назад к портфолио'}
                </span>
              </Link>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-neutral-900 mb-8"
            >
              {title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-3xl mb-12"
            >
              {description}
            </motion.p>

            {/* Project Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-8 text-sm text-neutral-500 border-t border-neutral-300 pt-8"
            >
              <div>
                <span className="block text-neutral-400 uppercase tracking-wider text-xs mb-1">
                  {language === 'en' ? 'Area' : 'Площадь'}
                </span>
                <span className="text-neutral-800">{projectInfo.area} м²</span>
              </div>
              <div>
                <span className="block text-neutral-400 uppercase tracking-wider text-xs mb-1">
                  {language === 'en' ? 'Location' : 'Локация'}
                </span>
                <span className="text-neutral-800">{projectInfo.location}</span>
              </div>
              <div>
                <span className="block text-neutral-400 uppercase tracking-wider text-xs mb-1">
                  {language === 'en' ? 'Category' : 'Категория'}
                </span>
                <span className="text-neutral-800">{projectInfo.category}</span>
              </div>
              <div>
                <span className="block text-neutral-400 uppercase tracking-wider text-xs mb-1">
                  {language === 'en' ? 'Style' : 'Стиль'}
                </span>
                <span className="text-neutral-800">{projectInfo.style}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="px-6 md:px-12 lg:px-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-7xl mx-auto"
          >
            <ParallaxImage
              image={hero}
              alt={title}
              priority
              onClick={() => openLightbox(0)}
            />
          </motion.div>
        </section>

        {/* Gallery Grid */}
        <section className="px-6 md:px-12 lg:px-20 pb-24">
          <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
            {galleryImages.slice(1).map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
              >
                <ParallaxImage
                  image={image}
                  alt={`${title} - ${index + 2}`}
                  onClick={() => openLightbox(index + 1)}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-neutral-900">
          <div className="container mx-auto px-6 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-light mb-6 text-white tracking-tight"
            >
              {language === 'en' ? 'Ready to create your space?' : 'Готовы создать своё пространство?'}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <Link 
                to="/contact"
                className="inline-block px-8 py-4 bg-white text-neutral-900 text-sm tracking-wider uppercase hover:bg-neutral-100 transition-colors"
              >
                {language === 'en' ? 'Get in Touch' : 'Связаться'}
              </Link>
            </motion.div>
          </div>
        </section>

        <div className="bg-[#F5F3F0]">
          <Footer />
        </div>
      </main>
      
      {/* Image Lightbox */}
      <ImageLightbox
        images={galleryImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
        altText={title}
      />
    </PageTransition>
  );
};

export default WarmApartment;
