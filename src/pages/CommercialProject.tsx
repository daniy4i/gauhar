import { useState, useEffect, useRef, useMemo } from 'react';
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
import cafeBar from '@/assets/commercial/cafe-bar.jpg';
import cafeSeating from '@/assets/commercial/cafe-seating.jpg';
import playArea from '@/assets/commercial/play-area.jpg';
import activityRoom from '@/assets/commercial/activity-room.jpg';
import fitnessCycling from '@/assets/commercial/fitness-cycling.jpg';
import fitnessWeights from '@/assets/commercial/fitness-weights.jpg';
import wellnessPool from '@/assets/commercial/wellness-pool.jpg';

interface Section {
  id: string;
  title: { en: string; ru: string };
  navLabel: { en: string; ru: string };
  caption: { en: string; ru: string };
  images: string[];
}

const sections: Section[] = [
  {
    id: 'cafe',
    title: { en: 'Café & Dessert Bar', ru: 'Кафе и десерт-бар' },
    navLabel: { en: 'Café', ru: 'Кафе' },
    caption: {
      en: 'The café space is designed as a warm social hub, combining natural wood textures, soft pastel tones, and curated lighting to create an inviting atmosphere for both adults and children.',
      ru: 'Кафе спроектировано как тёплое социальное пространство, сочетающее натуральные деревянные текстуры, мягкие пастельные тона и продуманное освещение, создавая приветливую атмосферу для взрослых и детей.'
    },
    images: [cafeBar, cafeSeating]
  },
  {
    id: 'play-area',
    title: { en: 'Children\'s Play Area', ru: 'Детская игровая зона' },
    navLabel: { en: 'Play Area', ru: 'Игровая' },
    caption: {
      en: 'The play area is conceived as an immersive environment where scale, color, and natural motifs encourage imagination, movement, and interaction.',
      ru: 'Игровая зона задумана как иммерсивная среда, где масштаб, цвет и природные мотивы стимулируют воображение, движение и взаимодействие.'
    },
    images: [playArea]
  },
  {
    id: 'activity-room',
    title: { en: 'Kids Activity Room', ru: 'Детская комната для занятий' },
    navLabel: { en: 'Activity Room', ru: 'Занятия' },
    caption: {
      en: 'A dedicated activity room designed for learning and creativity, featuring tactile materials, playful geometry, and flexible zones for group and individual play.',
      ru: 'Специальная комната для занятий, разработанная для обучения и творчества, с тактильными материалами, игривой геометрией и гибкими зонами для групповых и индивидуальных игр.'
    },
    images: [activityRoom]
  },
  {
    id: 'fitness',
    title: { en: 'Fitness Studio', ru: 'Фитнес-студия' },
    navLabel: { en: 'Fitness', ru: 'Фитнес' },
    caption: {
      en: 'The fitness studio emphasizes focus and energy through strong graphic elements, controlled lighting, and a disciplined spatial layout.',
      ru: 'Фитнес-студия делает акцент на сосредоточенности и энергии через выразительные графические элементы, контролируемое освещение и дисциплинированную пространственную планировку.'
    },
    images: [fitnessCycling, fitnessWeights]
  },
  {
    id: 'pool',
    title: { en: 'Wellness Pool', ru: 'Велнес-бассейн' },
    navLabel: { en: 'Pool', ru: 'Бассейн' },
    caption: {
      en: 'The wellness area is designed as a calm architectural retreat, where light, water, and material symmetry create a serene and immersive experience.',
      ru: 'Велнес-зона спроектирована как спокойное архитектурное убежище, где свет, вода и симметрия материалов создают безмятежный и погружающий опыт.'
    },
    images: [wellnessPool]
  }
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
  
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

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
          className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          priority={priority}
        />
      </motion.div>
      {/* Hover overlay with zoom icon hint */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/90 rounded-full p-3">
          <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const CommercialProject = () => {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState('cafe');
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Flatten all images for lightbox navigation
  const allImages = useMemo(() => {
    return sections.flatMap(section => section.images);
  }, []);
  
  // Calculate global image index from section and local image index
  const getGlobalIndex = (sectionIndex: number, imageIndex: number) => {
    let globalIndex = 0;
    for (let i = 0; i < sectionIndex; i++) {
      globalIndex += sections[i].images.length;
    }
    return globalIndex + imageIndex;
  };

  const openLightbox = (sectionIndex: number, imageIndex: number) => {
    setCurrentImageIndex(getGlobalIndex(sectionIndex, imageIndex));
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const title = language === 'en' 
    ? 'Family Entertainment & Wellness Center' 
    : 'Семейный развлекательный и велнес-центр';
  
  const intro = language === 'en'
    ? 'A multifunctional interior combining hospitality, wellness, and children\'s spaces into a cohesive environment. The project balances playful elements with architectural structure, creating distinct zones that remain visually and conceptually connected.'
    : 'Многофункциональный интерьер, объединяющий гостеприимство, велнес и детские пространства в единую среду. Проект балансирует игровые элементы с архитектурной структурой, создавая отдельные зоны, которые остаются визуально и концептуально связанными.';

  return (
    <PageTransition>
      <SEO 
        title={title}
        description={intro}
        url="/commercial/entertainment-center"
      />
      
      <Navigation />
      
      <main className="bg-background min-h-screen pb-24">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link 
                to="/portfolio" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span className="text-sm tracking-wide uppercase">
                  {language === 'en' ? 'Back to Portfolio' : 'Назад к портфолио'}
                </span>
              </Link>
            </motion.div>
            
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm tracking-[0.3em] text-muted-foreground uppercase block mb-6"
            >
              {language === 'en' ? 'Commercial Project' : 'Коммерческий проект'}
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-8"
            >
              {title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl"
            >
              {intro}
            </motion.p>
          </div>
        </section>

        {/* Project Sections */}
        {sections.map((section, sectionIndex) => (
          <section
            key={section.id}
            id={section.id}
            ref={(el) => (sectionRefs.current[section.id] = el)}
            className="py-16 md:py-24"
          >
            <div className="px-6 md:px-12 lg:px-20 mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground"
              >
                {section.title[language]}
              </motion.h2>
            </div>

            <div className="space-y-6 md:space-y-10">
              {section.images.map((image, imageIndex) => (
                <motion.div
                  key={`${section.id}-${imageIndex}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: imageIndex * 0.1 }}
                  className="px-6 md:px-12 lg:px-20"
                >
                  <ParallaxImage
                    image={image}
                    alt={`${section.title[language]} - Image ${imageIndex + 1}`}
                    priority={sectionIndex === 0 && imageIndex === 0}
                    onClick={() => openLightbox(sectionIndex, imageIndex)}
                  />
                  
                  {/* Caption under first image of each section */}
                  {imageIndex === 0 && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl"
                    >
                      {section.caption[language]}
                    </motion.p>
                  )}
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Fixed Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-border/50">
        <div className="flex items-center justify-center gap-1 md:gap-2 py-4 px-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`
                relative px-3 md:px-5 py-2 text-xs md:text-sm tracking-wide transition-all duration-300
                ${activeSection === section.id 
                  ? 'text-foreground' 
                  : 'text-muted-foreground hover:text-foreground/80'
                }
              `}
            >
              {section.navLabel[language]}
              {activeSection === section.id && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </nav>

      <div className="pb-20">
        <Footer />
      </div>
      
      {/* Image Lightbox */}
      <ImageLightbox
        images={allImages}
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

export default CommercialProject;
