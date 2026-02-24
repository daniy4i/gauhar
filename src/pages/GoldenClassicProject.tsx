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

import livingRoom from '@/assets/portfolio/family-living-1.jpg';
import diningRoom from '@/assets/portfolio/family-living-2.jpg';
import hallway from '@/assets/portfolio/family-living-3.jpg';
import masterBedroom from '@/assets/portfolio/bedroom-1.jpg';
import bathroom from '@/assets/portfolio/bedroom-2.jpg';
import girlBedroom from '@/assets/portfolio/classic-hint-2.jpg';
import girlDaybed from '@/assets/portfolio/contrast-living-1.jpg';
import pianoNook from '@/assets/portfolio/contrast-living-2.jpg';
import boyLibrary from '@/assets/portfolio/fireplace-living-1.jpg';
import boyStudy from '@/assets/portfolio/fireplace-living-2.jpg';
import bathTub from '@/assets/portfolio/laconic-living-1.jpg';
import bathVanity from '@/assets/portfolio/laconic-living-2.jpg';
import tvCorner from '@/assets/portfolio/minimalist-wood-1.jpg';
import livingTv from '@/assets/portfolio/minimalist-wood-2.jpg';
import seatingNook from '@/assets/portfolio/minimalist-wood-3.jpg';
import marbleShower from '@/assets/portfolio/marble-1.jpg';
import boyBedroom from '@/assets/portfolio/marble-2.jpg';
import masterBath from '@/assets/portfolio/marble-3.jpg';

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
    title: { en: 'Living & Dining', ru: 'Гостиная и столовая' },
    navLabel: { en: 'Living', ru: 'Гостиная' },
    caption: {
      en: 'The living area is anchored by a sculpted cream sofa set against oak wall paneling and brass chandeliers. The formal dining room continues the golden thread — a statement chandelier crowns a table set for eight, bathed in light through sheer floor-to-ceiling curtains.',
      ru: 'Гостиная зона построена вокруг скульптурного кремового дивана на фоне дубовых стеновых панелей и латунных люстр. Парадная столовая продолжает золотую нить — акцентная люстра венчает стол на восемь персон, залитый светом сквозь лёгкие шторы от пола до потолка.'
    },
    images: [livingRoom, livingTv, diningRoom, seatingNook, hallway]
  },
  {
    id: 'master',
    title: { en: 'Master Suite', ru: 'Главная спальня' },
    navLabel: { en: 'Master', ru: 'Спальня' },
    caption: {
      en: 'The master bedroom radiates understated luxury — a patterned gold headboard wall, capiz shell ceiling light, and tonal cream bedding create a serene retreat. The en-suite vanity features an arched mosaic mirror flanked by crystal lanterns above backlit marble.',
      ru: 'Главная спальня излучает сдержанную роскошь — стена с золотым узором за изголовьем, потолочный светильник из перламутровых ракушек и тональное кремовое бельё создают умиротворённое пространство. Ванная украшена арочным мозаичным зеркалом в обрамлении хрустальных фонарей над подсвеченным мрамором.'
    },
    images: [masterBedroom, bathroom, masterBath, bathTub, bathVanity, marbleShower]
  },
  {
    id: 'girl',
    title: { en: "Daughter's Room", ru: 'Комната дочери' },
    navLabel: { en: 'Daughter', ru: 'Дочь' },
    caption: {
      en: 'A blossom-printed wallpaper transforms the room into a storybook garden. A canopied white bed, a bay window daybed with pink Roman shades, and a whimsical city-facade piano alcove give the space both fantasy and function.',
      ru: 'Обои с цветущими ветвями превращают комнату в сказочный сад. Белая кровать с балдахином, диван у эркерного окна с розовыми римскими шторами и причудливая фортепианная ниша в виде городских фасадов наполняют пространство фантазией и функциональностью.'
    },
    images: [girlBedroom, girlDaybed, pianoNook]
  },
  {
    id: 'boy',
    title: { en: "Son's Room & Study", ru: 'Комната сына и кабинет' },
    navLabel: { en: 'Son', ru: 'Сын' },
    caption: {
      en: 'Deep navy walls with geometric wood trim and backlit bookshelves frame a reading lounge anchored by an aquarium. The adjacent study features a wraparound oak desk with mustard curtains, blending focus with warmth.',
      ru: 'Глубокие тёмно-синие стены с геометрическим деревянным молдингом и подсвеченные книжные полки обрамляют зону чтения с аквариумом. Смежный кабинет оснащён угловым дубовым столом с горчичными шторами, соединяя сосредоточенность с уютом.'
    },
    images: [boyLibrary, boyStudy, boyBedroom, tvCorner]
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

const GoldenClassicProject = () => {
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

  const title = language === 'en' ? 'Golden Classic Family Home' : 'Классический семейный дом в золотых тонах';
  const intro = language === 'en'
    ? 'A spacious family residence where neo-classical elegance meets lived-in comfort. Oak paneling, brass fixtures, and a golden cream palette weave through formal entertaining spaces, private retreats, and imaginative children\'s rooms — each tailored to its inhabitant.'
    : 'Просторная семейная резиденция, где неоклассическая элегантность встречается с домашним уютом. Дубовые панели, латунная фурнитура и золотисто-кремовая палитра пронизывают парадные пространства, приватные зоны и творческие детские комнаты — каждая из которых создана для своего обитателя.';

  return (
    <PageTransition>
      <SEO title={title} description={intro} url="/residential/golden-classic" />
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
                <span className="block text-foreground font-medium">220 м²</span>
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
                <motion.div layoutId="activeGoldenSection" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
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

export default GoldenClassicProject;
