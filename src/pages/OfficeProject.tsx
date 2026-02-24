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

import reception from '@/assets/office/reception.jpg';
import loungeArt from '@/assets/office/lounge-art.jpg';
import greenWall from '@/assets/office/green-wall.jpg';
import executiveDesk from '@/assets/office/executive-desk.jpg';
import executiveWide from '@/assets/office/executive-wide.jpg';
import glassCorridor from '@/assets/office/glass-corridor.jpg';
import workspaceArt from '@/assets/office/workspace-art.jpg';
import designDesk from '@/assets/office/design-desk.jpg';
import kitchenette from '@/assets/office/kitchenette.jpg';
import openWorkspace from '@/assets/office/open-workspace.jpg';
import executiveDetail from '@/assets/office/executive-detail.jpg';
import executiveCredenza from '@/assets/office/executive-credenza.jpg';
import glassHall from '@/assets/office/glass-hall.jpg';
import loungeSconce from '@/assets/office/lounge-sconce.jpg';
import artDetail from '@/assets/office/art-detail.jpg';
import breakArea from '@/assets/office/break-area.jpg';

interface Section {
  id: string;
  title: { en: string; ru: string };
  navLabel: { en: string; ru: string };
  caption: { en: string; ru: string };
  images: string[];
}

const sections: Section[] = [
  {
    id: 'reception',
    title: { en: 'Reception & Brand Identity', ru: 'Ресепшн и бренд' },
    navLabel: { en: 'Reception', ru: 'Ресепшн' },
    caption: {
      en: 'The entry point is framed by walnut slatted panels, crystal accent lighting, and curated decorative objects — establishing brand presence with warmth rather than formality.',
      ru: 'Входная зона обрамлена реечными панелями из ореха, хрустальными светильниками и декоративными объектами — формируя присутствие бренда через теплоту, а не формальность.'
    },
    images: [reception, loungeArt, greenWall, loungeSconce]
  },
  {
    id: 'executive',
    title: { en: 'Executive Office', ru: 'Кабинет руководителя' },
    navLabel: { en: 'Executive', ru: 'Кабинет' },
    caption: {
      en: 'The private office is anchored by a solid walnut desk and textured plaster walls. Brass geometric sculptures and a marble table lamp introduce depth without competing with the architecture.',
      ru: 'Приватный кабинет построен вокруг массивного орехового стола и стен с фактурной штукатуркой. Латунные геометрические скульптуры и мраморная лампа добавляют глубину, не конкурируя с архитектурой.'
    },
    images: [executiveWide, executiveDesk, executiveDetail, executiveCredenza]
  },
  {
    id: 'workspaces',
    title: { en: 'Open Workspaces', ru: 'Открытые рабочие зоны' },
    navLabel: { en: 'Workspaces', ru: 'Зоны' },
    caption: {
      en: 'Glass-partitioned offices preserve natural light while maintaining acoustic privacy. Each station is composed with curated art, emerald-toned lamps, and warm wood floors that soften the corporate tone.',
      ru: 'Стеклянные перегородки сохраняют естественный свет, обеспечивая акустическую приватность. Каждое рабочее место дополнено подобранным искусством, лампами изумрудных тонов и тёплым деревянным полом.'
    },
    images: [glassCorridor, glassHall, openWorkspace, workspaceArt, artDetail, designDesk]
  },
  {
    id: 'amenities',
    title: { en: 'Kitchenette & Details', ru: 'Кухня и детали' },
    navLabel: { en: 'Details', ru: 'Детали' },
    caption: {
      en: 'The kitchenette area pairs dark marble countertops with light ash cabinetry and Roman shades — practical utility elevated through considered material selection.',
      ru: 'Зона кухни сочетает тёмные мраморные столешницы со светлыми шкафами из ясеня и римскими шторами — утилитарность, возвышенная через продуманный выбор материалов.'
    },
    images: [kitchenette, breakArea]
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

const OfficeProject = () => {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState('reception');
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

  const title = language === 'en' ? 'Boutique Corporate Office' : 'Бутиковый корпоративный офис';
  const intro = language === 'en'
    ? 'A corporate interior that replaces cold formality with curated warmth. Walnut paneling, glass partitions, and art-led detailing create a workspace where brand identity and architectural intention converge.'
    : 'Корпоративный интерьер, заменяющий холодную формальность подобранной теплотой. Ореховые панели, стеклянные перегородки и арт-детали создают пространство, где бренд и архитектурный замысел сходятся воедино.';

  return (
    <PageTransition>
      <SEO title={title} description={intro} url="/commercial/corporate-office" />
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
                <motion.div layoutId="activeOfficeSection" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
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

export default OfficeProject;
