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

import entryHall from '@/assets/jade-lobby/entry-hall.jpg';
import seatingArea from '@/assets/jade-lobby/seating-area.jpg';
import seatingDetail from '@/assets/jade-lobby/seating-detail.jpg';
import armchairCorner from '@/assets/jade-lobby/armchair-corner.jpg';
import corridorWide from '@/assets/jade-lobby/corridor-wide.jpg';
import galleryWall from '@/assets/jade-lobby/gallery-wall.jpg';

interface Section {
  id: string;
  title: { en: string; ru: string };
  navLabel: { en: string; ru: string };
  caption: { en: string; ru: string };
  images: string[];
}

const sections: Section[] = [
  {
    id: 'entry',
    title: { en: 'Entry Hall', ru: 'Входной холл' },
    navLabel: { en: 'Entry', ru: 'Вход' },
    caption: {
      en: 'The entry hall establishes the building\'s identity with double-height ceilings, jade-green venetian plaster walls framed by gold leaf moldings, and polished marble floors inlaid with onyx and amber stone borders. A monstera in a bronze vessel and a velvet window bench soften the grandeur into something livable.',
      ru: 'Входной холл задаёт идентичность здания двойной высотой потолков, стенами из нефритово-зелёной венецианской штукатурки в обрамлении золотых молдингов и полированными мраморными полами с ониксовыми и янтарными каменными бордюрами. Монстера в бронзовом кашпо и бархатная скамья у окна смягчают парадность до обжитого уюта.'
    },
    images: [entryHall]
  },
  {
    id: 'lounge',
    title: { en: 'Lounge & Seating', ru: 'Лаунж и зона отдыха' },
    navLabel: { en: 'Lounge', ru: 'Лаунж' },
    caption: {
      en: 'The lounge anchors the lobby\'s social heart — sculpted ice-blue velvet armchairs with dark wood frames are paired with amber glass vases and gold-legged side tables. Full-height mirrors behind jade panels multiply the space, while a curated seascape painting and a ceramic greyhound sculpture add personality without clutter.',
      ru: 'Лаунж — социальное сердце лобби. Скульптурные кресла из ледяного голубого бархата с тёмными деревянными рамами соседствуют с вазами из янтарного стекла и столиками на золотых ножках. Зеркала в полный рост за нефритовыми панелями умножают пространство, а пейзажная картина и керамическая скульптура борзой добавляют характер без суеты.'
    },
    images: [seatingArea, seatingDetail, armchairCorner]
  },
  {
    id: 'gallery',
    title: { en: 'Gallery & Corridor', ru: 'Галерея и коридор' },
    navLabel: { en: 'Gallery', ru: 'Галерея' },
    caption: {
      en: 'The corridor unfolds as a curated gallery — textured plaster walls with brass-strip paneling frame contemporary oil paintings and white orchid arrangements on gold console tables. Amber onyx door surrounds and black marble baseboards create a chromatic rhythm that guides residents through the space with quiet theatrical precision.',
      ru: 'Коридор разворачивается как кураторская галерея — текстурные штукатурные стены с латунным стрип-панелированием обрамляют современные картины маслом и белые орхидеи на золотых консолях. Обрамления дверей из янтарного оникса и цоколь из чёрного мрамора создают хроматический ритм, проводящий жильцов сквозь пространство с тихой театральной точностью.'
    },
    images: [corridorWide, galleryWall]
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

const JadeLobbyProject = () => {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState('entry');
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

  const title = language === 'en' ? 'Jade Art Deco Lobby' : 'Лобби в стиле арт-деко «Нефрит»';
  const intro = language === 'en'
    ? 'A residential lobby that channels the glamour of art deco through a contemporary lens. Jade-green venetian plaster, amber onyx door frames, gold-leaf moldings, and ice-blue velvet furnishings compose an entrance hall where every arrival feels like an occasion — polished, theatrical, and unapologetically opulent.'
    : 'Лобби жилого комплекса, преломляющее гламур арт-деко через современную оптику. Нефритово-зелёная венецианская штукатурка, рамы дверей из янтарного оникса, золотые молдинги и мебель из ледяного голубого бархата создают входной холл, где каждое прибытие ощущается как событие — отполированное, театральное и откровенно роскошное.';

  return (
    <PageTransition>
      <SEO title={title} description={intro} url="/commercial/jade-lobby" />
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
              {language === 'en' ? 'Commercial Project' : 'Коммерческий проект'}
            </motion.span>
            
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-8">
              {title}
            </motion.h1>
            
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              {intro}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex gap-8 mt-8 text-sm text-muted-foreground">
              <div>
                <span className="block text-foreground font-medium">180 м²</span>
                <span>{language === 'en' ? 'Total Area' : 'Общая площадь'}</span>
              </div>
              <div>
                <span className="block text-foreground font-medium">{language === 'en' ? 'Almaty' : 'Алматы'}</span>
                <span>{language === 'en' ? 'Location' : 'Локация'}</span>
              </div>
              <div>
                <span className="block text-foreground font-medium">{language === 'en' ? 'Commercial' : 'Коммерческий'}</span>
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
                <motion.div layoutId="activeJadeSection" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
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

export default JadeLobbyProject;
