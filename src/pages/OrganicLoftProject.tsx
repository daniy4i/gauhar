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

import livingStairs from '@/assets/portfolio/loft-1.jpg';
import entryBench from '@/assets/portfolio/loft-2.jpg';
import livingOpen from '@/assets/portfolio/loft-3.jpg';
import staircaseTv from '@/assets/portfolio/loft-staircase-tv.jpg';
import readingNook from '@/assets/portfolio/loft-reading-nook.jpg';
import kitchenWide from '@/assets/portfolio/restaurant-1.jpg';
import kitchenDetail from '@/assets/portfolio/restaurant-2.jpg';
import kitchenShelves from '@/assets/portfolio/loft-kitchen-shelves.jpg';
import glassPartition from '@/assets/portfolio/loft-glass-partition.jpg';
import ceramics from '@/assets/portfolio/loft-ceramics.jpg';
import bathroomVanity from '@/assets/portfolio/restaurant-3.jpg';
import guestWc from '@/assets/portfolio/laconic-living-1.jpg';
import pinkBath from '@/assets/portfolio/loft-pink-bath.jpg';
import guestWcPlaster from '@/assets/portfolio/loft-guest-wc.jpg';
import girlBedroom from '@/assets/portfolio/laconic-living-2.jpg';
import girlBedDetail from '@/assets/portfolio/loft-girl-bed.jpg';
import boyBedroom from '@/assets/portfolio/minimalist-wood-1.jpg';
import boysRoom from '@/assets/portfolio/loft-boys-room.jpg';
import studyDesk from '@/assets/portfolio/minimalist-wood-2.jpg';
import designer from '@/assets/portfolio/loft-designer.jpg';

interface Section {
  id: string;
  title: { en: string; ru: string };
  navLabel: { en: string; ru: string };
  caption: { en: string; ru: string };
  images: string[];
}

const sections: Section[] = [
  {
    id: 'living',
    title: { en: 'Living & Entry', ru: 'Гостиная и прихожая' },
    navLabel: { en: 'Living', ru: 'Гостиная' },
    caption: {
      en: 'A double-height living room unfolds beneath a floating steel-and-oak staircase. A hammered black coffee table, linen sofas, and hand-sculpted bas-relief panels ground the space in tactile craft. The entry bench and plaster art set the tone from the first step.',
      ru: 'Двусветная гостиная разворачивается под парящей лестницей из стали и дуба. Кованый чёрный кофейный стол, льняные диваны и рукотворные барельефные панно наполняют пространство тактильным мастерством. Скамья в прихожей и гипсовый арт задают тон с первого шага.'
    },
    images: [livingStairs, entryBench, livingOpen, staircaseTv, readingNook]
  },
  {
    id: 'kitchen',
    title: { en: 'Kitchen & Dining', ru: 'Кухня и столовая' },
    navLabel: { en: 'Kitchen', ru: 'Кухня' },
    caption: {
      en: 'Seen through a black steel-framed glass partition, the kitchen pairs matte cream upper cabinets with warm oak lower panels. A woven rattan pendant hovers above a round dining table laid with ceramic plates and fresh flowers — organic yet refined.',
      ru: 'За чёрной стеклянной перегородкой в стальной раме кухня сочетает матовые кремовые верхние шкафы с тёплыми дубовыми нижними панелями. Плетёный ротанговый подвес парит над круглым обеденным столом с керамической посудой и свежими цветами — органично и утончённо.'
    },
    images: [glassPartition, kitchenWide, kitchenDetail, kitchenShelves, ceramics]
  },
  {
    id: 'bath',
    title: { en: 'Bathrooms', ru: 'Ванные комнаты' },
    navLabel: { en: 'Bath', ru: 'Ванные' },
    caption: {
      en: 'The main bathroom features an asymmetric organic-shaped mirror above an oak vanity with woven storage baskets and travertine pendants. A minimal guest WC in warm plaster tones completes the wet zone with quiet elegance.',
      ru: 'Главная ванная украшена асимметричным зеркалом органической формы над дубовой тумбой с плетёными корзинами и травертиновыми подвесами. Минималистичный гостевой санузел в тёплых штукатурных тонах завершает мокрую зону тихой элегантностью.'
    },
    images: [bathroomVanity, guestWc, pinkBath, guestWcPlaster]
  },
  {
    id: 'kids',
    title: { en: "Children's Rooms", ru: 'Детские комнаты' },
    navLabel: { en: 'Kids', ru: 'Детские' },
    caption: {
      en: "The daughter's room features a scalloped oak headboard with blush-pink arched wardrobes — playful yet timeless. The boys' room pairs twin oak-frame beds with an alabaster drum pendant and mountain-view study desk with cane-back chairs.",
      ru: 'Комната дочери украшена фигурным дубовым изголовьем и розовыми арочными шкафами — игриво, но вневременно. Комната мальчиков сочетает кровати в дубовых рамах с алебастровым подвесом и рабочим столом с видом на горы и стульями с ротанговой спинкой.'
    },
    images: [girlBedroom, girlBedDetail, boyBedroom, boysRoom, studyDesk, designer]
  }
];

const ParallaxImage = ({ 
  image, alt, priority, onClick 
}: { 
  image: string; alt: string; priority?: boolean; onClick: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <div ref={ref} className="relative overflow-hidden cursor-pointer group" onClick={onClick}>
      <motion.div style={{ y }} className="w-full">
        <BlurImage
          src={image}
          alt={alt}
          className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          priority={priority}
        />
      </motion.div>
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

const OrganicLoftProject = () => {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState('living');
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages = useMemo(() => sections.flatMap(s => s.images), []);

  const getGlobalIndex = (sectionIndex: number, imageIndex: number) => {
    let idx = 0;
    for (let i = 0; i < sectionIndex; i++) idx += sections[i].images.length;
    return idx + imageIndex;
  };

  const openLightbox = (si: number, ii: number) => {
    setCurrentImageIndex(getGlobalIndex(si, ii));
    setLightboxOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      for (const section of sections) {
        const el = sectionRefs.current[section.id];
        if (el && scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
          setActiveSection(section.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
    }
  };

  const title = language === 'en' ? 'Organic Loft Townhouse' : 'Органический лофт-таунхаус';
  const intro = language === 'en'
    ? 'A two-level townhouse where raw industrial structure meets artisan warmth. A floating steel staircase, hand-sculpted plaster panels, woven rattan, and mountain views through oak-framed windows create a home rooted in craft and nature.'
    : 'Двухуровневый таунхаус, где грубая индустриальная структура встречается с ремесленным теплом. Парящая стальная лестница, рукотворные гипсовые панно, плетёный ротанг и горные виды через дубовые окна создают дом, укоренённый в мастерстве и природе.';

  return (
    <PageTransition>
      <SEO title={title} description={intro} url="/residential/organic-loft" />
      <Navigation />
      
      <main className="bg-background min-h-screen pb-24">
        <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Link to="/portfolio" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group">
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span className="text-sm tracking-wide uppercase">
                  {language === 'en' ? 'Back to Portfolio' : 'Назад к портфолио'}
                </span>
              </Link>
            </motion.div>
            
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-sm tracking-[0.3em] text-muted-foreground uppercase block mb-6">
              {language === 'en' ? 'Residential Project' : 'Жилой проект'}
            </motion.span>
            
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-8">
              {title}
            </motion.h1>
            
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              {intro}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex gap-8 mt-8 text-sm text-muted-foreground">
              <div>
                <span className="block text-foreground font-medium">160 м²</span>
                <span>{language === 'en' ? 'Area' : 'Площадь'}</span>
              </div>
              <div>
                <span className="block text-foreground font-medium">{language === 'en' ? 'Almaty' : 'Алматы'}</span>
                <span>{language === 'en' ? 'Location' : 'Локация'}</span>
              </div>
              <div>
                <span className="block text-foreground font-medium">{language === 'en' ? 'Residential' : 'Жилой'}</span>
                <span>{language === 'en' ? 'Type' : 'Тип'}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {sections.map((section, sectionIndex) => (
          <section key={section.id} id={section.id} ref={(el) => (sectionRefs.current[section.id] = el)} className="py-16 md:py-24">
            <div className="px-6 md:px-12 lg:px-20 mb-12">
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                {section.title[language]}
              </motion.h2>
            </div>
            <div className="space-y-6 md:space-y-10">
              {section.images.map((image, imageIndex) => (
                <motion.div key={`${section.id}-${imageIndex}`} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: imageIndex * 0.1 }} className="px-6 md:px-12 lg:px-20">
                  <ParallaxImage image={image} alt={`${section.title[language]} - ${imageIndex + 1}`} priority={sectionIndex === 0 && imageIndex === 0} onClick={() => openLightbox(sectionIndex, imageIndex)} />
                  {imageIndex === 0 && (
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl">
                      {section.caption[language]}
                    </motion.p>
                  )}
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-border/50">
        <div className="flex items-center justify-center gap-1 md:gap-2 py-4 px-4">
          {sections.map((section) => (
            <button key={section.id} onClick={() => scrollToSection(section.id)} className={`relative px-3 md:px-5 py-2 text-xs md:text-sm tracking-wide transition-all duration-300 ${activeSection === section.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground/80'}`}>
              {section.navLabel[language]}
              {activeSection === section.id && (
                <motion.div layoutId="activeOrganicSection" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
              )}
            </button>
          ))}
        </div>
      </nav>

      <div className="pb-20"><Footer /></div>
      
      <ImageLightbox images={allImages} currentIndex={currentImageIndex} isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} onNext={() => setCurrentImageIndex(p => (p + 1) % allImages.length)} onPrev={() => setCurrentImageIndex(p => (p - 1 + allImages.length) % allImages.length)} altText={title} />
    </PageTransition>
  );
};

export default OrganicLoftProject;
