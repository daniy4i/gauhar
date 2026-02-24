import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import SEO from '@/components/SEO';
import BlurImage from '@/components/BlurImage';
import ImageLightbox from '@/components/ImageLightbox';
import { useLanguage } from '@/lib/i18n/LanguageContext';

import plan1 from '@/assets/floorplans/plan-1.jpg';
import plan2 from '@/assets/floorplans/plan-2.jpg';
import plan3 from '@/assets/floorplans/plan-3.jpg';
import plan4 from '@/assets/floorplans/plan-4.jpg';
import plan5 from '@/assets/floorplans/plan-5.jpg';
import plan6 from '@/assets/floorplans/plan-6.jpg';
import plan7 from '@/assets/floorplans/plan-7.jpg';
import plan8 from '@/assets/floorplans/plan-8.jpg';
import plan9 from '@/assets/floorplans/plan-9.jpg';
import plan10 from '@/assets/floorplans/plan-10.jpg';

interface PlanItem {
  image: string;
  title: { en: string; ru: string };
  caption: { en: string; ru: string };
  area: string;
}

const plans: PlanItem[] = [
  {
    image: plan1,
    title: { en: '4-Room Family Apartment', ru: '4-комнатная семейная квартира' },
    caption: {
      en: 'An L-shaped layout with herringbone oak flooring, separating the social kitchen-dining zone from private bedrooms. A central corridor organizes circulation while maximizing natural light through corner windows.',
      ru: 'Г-образная планировка с дубовым паркетом ёлочкой, разделяющая социальную кухню-столовую от приватных спален. Центральный коридор организует циркуляцию, максимизируя естественный свет через угловые окна.'
    },
    area: '120 м²'
  },
  {
    image: plan4,
    title: { en: '4-Room Apartment — Variation B', ru: '4-комнатная квартира — Вариант Б' },
    caption: {
      en: 'A refined variation of the L-shaped plan with optimized wardrobe walls and an expanded master suite. The living room opens directly to the kitchen through a wide passage, creating fluid social space.',
      ru: 'Улучшенная вариация Г-образной планировки с оптимизированными шкафами и расширенной хозяйской спальней. Гостиная открывается к кухне через широкий проём, создавая текучее социальное пространство.'
    },
    area: '120 м²'
  },
  {
    image: plan5,
    title: { en: '4-Room Corner Apartment', ru: '4-комнатная угловая квартира' },
    caption: {
      en: 'A corner unit maximizing dual-aspect light. The kitchen-dining area wraps the far corner with panoramic exposure, while the living room and master bedroom occupy opposite wings for acoustic privacy.',
      ru: 'Угловая планировка с двусторонним освещением. Кухня-столовая занимает дальний угол с панорамным остеклением, а гостиная и хозяйская спальня расположены в противоположных крыльях для акустической приватности.'
    },
    area: '135 м²'
  },
  {
    image: plan6,
    title: { en: '4-Room Corner — Variation B', ru: '4-комнатная угловая — Вариант Б' },
    caption: {
      en: 'An alternative layout for the same corner footprint, repositioning the master bath to create a larger walk-in closet. The hallway features a built-in console and mirror wall for an elevated arrival sequence.',
      ru: 'Альтернативная планировка того же углового объёма с перемещением ванной для увеличения гардеробной. Прихожая с встроенной консолью и зеркальной стеной создаёт торжественный сценарий входа.'
    },
    area: '135 м²'
  },
  {
    image: plan9,
    title: { en: '4-Room Compact Apartment', ru: '4-комнатная компактная квартира' },
    caption: {
      en: 'A compact yet efficient layout that prioritizes storage walls and a generous combined living-kitchen zone. Each bedroom features built-in wardrobes, and the bathroom is cleverly split into wet and dry zones.',
      ru: 'Компактная, но эффективная планировка с приоритетом на системы хранения и просторную объединённую гостиную-кухню. Каждая спальня оснащена встроенными шкафами, а ванная разделена на мокрую и сухую зоны.'
    },
    area: '110 м²'
  },
  {
    image: plan3,
    title: { en: '3-Room Open-Plan Apartment', ru: '3-комнатная квартира свободной планировки' },
    caption: {
      en: 'A generous open-plan layout with a dramatic living-dining space anchored by a sculptural rug and statement chandelier. Wide-plank flooring runs throughout, connecting the social zone to two private bedroom suites.',
      ru: 'Просторная свободная планировка с драматичной гостиной-столовой, акцентированной скульптурным ковром и дизайнерской люстрой. Широкие доски пола объединяют социальную зону с двумя приватными спальными сьютами.'
    },
    area: '145 м²'
  },
  {
    image: plan8,
    title: { en: '3-Room Open-Plan — Variation B', ru: '3-комнатная свободная — Вариант Б' },
    caption: {
      en: 'A muted-palette revision of the open-plan concept, adding a defined home office nook beside the kitchen and repositioning the dining table for better window access and mountain views.',
      ru: 'Версия открытой планировки в приглушённой палитре с добавлением домашнего офиса рядом с кухней и перемещением обеденного стола для лучшего доступа к окну и горным видам.'
    },
    area: '145 м²'
  },
  {
    image: plan2,
    title: { en: '5-Room Two-Level Residence', ru: '5-комнатная двухуровневая резиденция' },
    caption: {
      en: 'A two-storey residence with a ground-floor social wing and upper-level private quarters. The staircase becomes a sculptural element, connecting the grand living room to four bedrooms, each with individual character.',
      ru: 'Двухэтажная резиденция с социальным крылом на первом этаже и приватными помещениями на втором. Лестница становится скульптурным элементом, соединяя парадную гостиную с четырьмя спальнями индивидуального характера.'
    },
    area: '240 м²'
  },
  {
    image: plan10,
    title: { en: '5-Room Residence — Variation B', ru: '5-комнатная резиденция — Вариант Б' },
    caption: {
      en: 'An evening-lit variation of the two-level residence with enhanced master suite and an integrated library wall along the central corridor. Warm accent lighting defines each zone.',
      ru: 'Вечерняя вариация двухуровневой резиденции с расширенной хозяйской спальней и интегрированной библиотечной стеной вдоль центрального коридора. Тёплое акцентное освещение определяет каждую зону.'
    },
    area: '240 м²'
  },
  {
    image: plan7,
    title: { en: 'Large Family Villa', ru: 'Большая семейная вилла' },
    caption: {
      en: 'An expansive multi-room villa with dramatic lighting design. The central hallway acts as a gallery spine, connecting a formal living room, family lounge, master suite, and three additional bedrooms. Each space is designed with bespoke furniture and curated art placement.',
      ru: 'Просторная многокомнатная вилла с драматичным световым дизайном. Центральная прихожая-галерея соединяет парадную гостиную, семейный лаунж, хозяйскую спальню и три дополнительные комнаты. Каждое пространство оснащено заказной мебелью и продуманным размещением искусства.'
    },
    area: '320 м²'
  },
];

const FloorPlansProject = () => {
  const { language } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages = useMemo(() => plans.map(p => p.image), []);

  const title = language === 'en' ? 'Architectural Floor Plans' : 'Архитектурные планировки';
  const intro = language === 'en'
    ? 'A curated collection of hand-illustrated floor plans showcasing our spatial planning philosophy. Each layout is crafted to balance circulation, natural light, and functional zoning — from compact apartments to expansive family residences.'
    : 'Подобранная коллекция рукописных планировок, демонстрирующих нашу философию пространственного планирования. Каждая планировка создана для баланса циркуляции, естественного света и функционального зонирования — от компактных квартир до просторных семейных резиденций.';

  return (
    <PageTransition>
      <SEO title={title} description={intro} url="/residential/floor-plans" />
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
              {language === 'en' ? 'Spatial Planning' : 'Пространственное планирование'}
            </motion.span>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-8">
              {title}
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              {intro}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex gap-8 mt-8 text-sm text-muted-foreground">
              <div>
                <span className="block text-foreground font-medium">10</span>
                <span>{language === 'en' ? 'Layouts' : 'Планировок'}</span>
              </div>
              <div>
                <span className="block text-foreground font-medium">110–320 м²</span>
                <span>{language === 'en' ? 'Area Range' : 'Диапазон площадей'}</span>
              </div>
              <div>
                <span className="block text-foreground font-medium">{language === 'en' ? 'Almaty' : 'Алматы'}</span>
                <span>{language === 'en' ? 'Location' : 'Локация'}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Plans Grid */}
        <section className="px-6 md:px-12 lg:px-20 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: (index % 2) * 0.15 }}
              >
                <div
                  className="relative overflow-hidden cursor-pointer group bg-muted/30 rounded-sm"
                  onClick={() => { setCurrentImageIndex(index); setLightboxOpen(true); }}
                >
                  <BlurImage
                    src={plan.image}
                    alt={plan.title[language]}
                    className="w-full aspect-[4/5] object-contain p-4 transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/90 rounded-full p-3">
                      <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{plan.title[language]}</h3>
                    <span className="text-sm text-muted-foreground">{plan.area}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{plan.caption[language]}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <ImageLightbox
        images={allImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setCurrentImageIndex(p => (p + 1) % allImages.length)}
        onPrev={() => setCurrentImageIndex(p => (p - 1 + allImages.length) % allImages.length)}
        altText={title}
      />
    </PageTransition>
  );
};

export default FloorPlansProject;
