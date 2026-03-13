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

import reception from '@/assets/skyline-office/reception.jpg';
import openWorkspace from '@/assets/skyline-office/open-workspace.jpg';
import workspaceDetail from '@/assets/skyline-office/workspace-detail.jpg';
import executiveDesk from '@/assets/skyline-office/executive-desk.jpg';
import executiveLounge from '@/assets/skyline-office/executive-lounge.jpg';
import boardroom from '@/assets/skyline-office/boardroom.jpg';
import fireplaceLounge from '@/assets/skyline-office/fireplace-lounge.jpg';
import loungeNook from '@/assets/skyline-office/lounge-nook.jpg';
import rooftopTerrace from '@/assets/skyline-office/rooftop-terrace.jpg';

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
    title: { en: 'Reception & Entry', ru: 'Ресепшн и вход' },
    navLabel: { en: 'Reception', ru: 'Ресепшн' },
    caption: {
      en: 'The reception hall sets the project\'s visual signature — a sculptural landscape wall of layered stone and backlit onyx undulates behind a marble-clad desk with gold lattice detailing. The dramatic ceiling structure and art-textured carpeting reinforce a sense of arrival that transcends typical corporate spaces.',
      ru: 'Холл ресепшн задаёт визуальную подпись проекта — скульптурная стена из слоистого камня и подсвеченного оникса волнообразно простирается за мраморной стойкой с золотой решётчатой отделкой. Драматическая структура потолка и текстурный ковёр создают ощущение прибытия, выходящее за рамки типичного корпоративного пространства.'
    },
    images: [reception]
  },
  {
    id: 'workspace',
    title: { en: 'Open Workspace', ru: 'Открытое рабочее пространство' },
    navLabel: { en: 'Workspace', ru: 'Воркспейс' },
    caption: {
      en: 'The open-plan workspace rejects sterile uniformity in favour of curated energy — rose-toned steel framing, suspended linear lighting, and living green partitions create distinct work zones within a flowing floor plate. Expressive ink murals on the rear wall inject creative tension into an otherwise disciplined layout.',
      ru: 'Открытый воркспейс отвергает стерильное единообразие в пользу подобранной энергии — стальной каркас в розовых тонах, подвесное линейное освещение и живые зелёные перегородки создают отдельные рабочие зоны внутри единого пространства. Экспрессивные чернильные фрески на задней стене вносят творческое напряжение в дисциплинированную планировку.'
    },
    images: [openWorkspace, workspaceDetail]
  },
  {
    id: 'executive',
    title: { en: 'Executive Suite', ru: 'Кабинет руководителя' },
    navLabel: { en: 'Executive', ru: 'Кабинет' },
    caption: {
      en: 'The executive suite occupies the building\'s apex — a geodesic glass dome that frames panoramic mountain views. A walnut-and-gold desk anchors the space, while a sweeping curved sofa, marble fireplace wall, and woven-leather armchairs create a boardroom-lounge hybrid where decisions are made against an alpine horizon.',
      ru: 'Кабинет руководителя занимает вершину здания — геодезический стеклянный купол, обрамляющий панорамные виды на горы. Стол из ореха с золотом якорит пространство, а изогнутый диван, мраморная каминная стена и плетёные кожаные кресла создают гибрид переговорной и лаунжа, где решения принимаются на фоне альпийского горизонта.'
    },
    images: [executiveLounge, executiveDesk, fireplaceLounge, boardroom]
  },
  {
    id: 'lounge',
    title: { en: 'Lounge & Terrace', ru: 'Лаунж и терраса' },
    navLabel: { en: 'Terrace', ru: 'Терраса' },
    caption: {
      en: 'The creative lounge punctuates the floor with a bold crimson textile wall and a sculptural birch tree installation — a deliberate counterpoint to the muted corporate palette. Beyond, the rooftop terrace extends the workspace into open air with woven outdoor furniture and a panoramic view of Almaty\'s skyline against the Tien Shan mountains.',
      ru: 'Креативный лаунж акцентирует этаж смелой малиновой текстильной стеной и скульптурной инсталляцией берёзы — намеренный контрапункт к приглушённой корпоративной палитре. За ним терраса на крыше выводит рабочее пространство на открытый воздух с плетёной уличной мебелью и панорамным видом на горизонт Алматы на фоне Тянь-Шаня.'
    },
    images: [loungeNook, rooftopTerrace]
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

const SkylineOfficeProject = () => {
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

  const title = language === 'en' ? 'Skyline Corporate Hub' : 'Корпоративный хаб «Скайлайн»';
  const intro = language === 'en'
    ? 'A landmark corporate interior housed within a geodesic glass tower overlooking the Tien Shan mountains. The project weaves together sculptural reception halls, energized open workspaces, a panoramic executive suite beneath a glass dome, and a rooftop terrace — creating a workplace that functions as both stage and sanctuary.'
    : 'Знаковый корпоративный интерьер в геодезической стеклянной башне с видом на Тянь-Шань. Проект объединяет скульптурные холлы ресепшн, энергичные открытые воркспейсы, панорамный кабинет руководителя под стеклянным куполом и террасу на крыше — создавая рабочее пространство, одновременно служащее сценой и убежищем.';

  return (
    <PageTransition>
      <SEO title={title} description={intro} url="/commercial/skyline-office" />
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
                <span className="block text-foreground font-medium">850 м²</span>
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
                <motion.div layoutId="activeSkylineSection" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
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

export default SkylineOfficeProject;
