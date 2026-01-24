import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import SEO from '@/components/SEO';
import BlurImage from '@/components/BlurImage';
import { useLanguage } from '@/lib/i18n/LanguageContext';

// Import images
import cafeBar from '@/assets/commercial/cafe-bar.jpg';
import cafeSeating from '@/assets/commercial/cafe-seating.jpg';
import cafeSeating2 from '@/assets/commercial/cafe-seating-2.jpg';
import playArea from '@/assets/commercial/play-area.jpg';
import playArea2 from '@/assets/commercial/play-area-2.jpg';
import activityRoom from '@/assets/commercial/activity-room.jpg';
import activityRoom2 from '@/assets/commercial/activity-room-2.jpg';
import fitnessCycling from '@/assets/commercial/fitness-cycling.jpg';
import fitnessCycling2 from '@/assets/commercial/fitness-cycling-2.jpg';
import fitnessWeights from '@/assets/commercial/fitness-weights.jpg';
import fitnessWeights2 from '@/assets/commercial/fitness-weights-2.jpg';
import wellnessPool from '@/assets/commercial/wellness-pool.jpg';
import wellnessPool2 from '@/assets/commercial/wellness-pool-2.jpg';

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
    images: [cafeBar, cafeSeating, cafeSeating2]
  },
  {
    id: 'play-area',
    title: { en: 'Children\'s Play Area', ru: 'Детская игровая зона' },
    navLabel: { en: 'Play Area', ru: 'Игровая' },
    caption: {
      en: 'The play area is conceived as an immersive environment where scale, color, and natural motifs encourage imagination, movement, and interaction.',
      ru: 'Игровая зона задумана как иммерсивная среда, где масштаб, цвет и природные мотивы стимулируют воображение, движение и взаимодействие.'
    },
    images: [playArea, playArea2]
  },
  {
    id: 'activity-room',
    title: { en: 'Kids Activity Room', ru: 'Детская комната для занятий' },
    navLabel: { en: 'Activity Room', ru: 'Занятия' },
    caption: {
      en: 'A dedicated activity room designed for learning and creativity, featuring tactile materials, playful geometry, and flexible zones for group and individual play.',
      ru: 'Специальная комната для занятий, разработанная для обучения и творчества, с тактильными материалами, игривой геометрией и гибкими зонами для групповых и индивидуальных игр.'
    },
    images: [activityRoom, activityRoom2]
  },
  {
    id: 'fitness',
    title: { en: 'Fitness Studio', ru: 'Фитнес-студия' },
    navLabel: { en: 'Fitness', ru: 'Фитнес' },
    caption: {
      en: 'The fitness studio emphasizes focus and energy through strong graphic elements, controlled lighting, and a disciplined spatial layout.',
      ru: 'Фитнес-студия делает акцент на сосредоточенности и энергии через выразительные графические элементы, контролируемое освещение и дисциплинированную пространственную планировку.'
    },
    images: [fitnessCycling, fitnessCycling2, fitnessWeights, fitnessWeights2]
  },
  {
    id: 'pool',
    title: { en: 'Wellness Pool', ru: 'Велнес-бассейн' },
    navLabel: { en: 'Pool', ru: 'Бассейн' },
    caption: {
      en: 'The wellness area is designed as a calm architectural retreat, where light, water, and material symmetry create a serene and immersive experience.',
      ru: 'Велнес-зона спроектирована как спокойное архитектурное убежище, где свет, вода и симметрия материалов создают безмятежный и погружающий опыт.'
    },
    images: [wellnessPool, wellnessPool2]
  }
];

const CommercialProject = () => {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState('cafe');
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

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
                  key={imageIndex}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: imageIndex * 0.1 }}
                  className="px-6 md:px-12 lg:px-20"
                >
                  <div className="relative overflow-hidden">
                    <BlurImage
                      src={image}
                      alt={`${section.title[language]} - Image ${imageIndex + 1}`}
                      className="w-full aspect-[16/10] object-cover"
                      priority={sectionIndex === 0 && imageIndex === 0}
                    />
                  </div>
                  
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
          {sections.map((section, index) => (
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
    </PageTransition>
  );
};

export default CommercialProject;
