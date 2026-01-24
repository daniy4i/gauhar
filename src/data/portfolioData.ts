export type ProjectCategory = 'residential' | 'commercial';

export interface PortfolioProject {
  id: string;
  slug: string;
  title: {
    ru: string;
    en: string;
  };
  description: {
    ru: string;
    en: string;
  };
  category: ProjectCategory;
  area: number;
  location: {
    ru: string;
    en: string;
  };
  thumbnail: string;
  images: string[];
  externalLink?: string; // Optional external link for special project pages
}

// Local high-resolution images - imported for Vite optimization
import familyLiving1 from '@/assets/portfolio/family-living-1.jpg';
import familyLiving2 from '@/assets/portfolio/family-living-2.jpg';
import familyLiving3 from '@/assets/portfolio/family-living-3.jpg';
import restaurant1 from '@/assets/portfolio/restaurant-1.jpg';
import restaurant2 from '@/assets/portfolio/restaurant-2.jpg';
import restaurant3 from '@/assets/portfolio/restaurant-3.jpg';
import loft1 from '@/assets/portfolio/loft-1.jpg';
import loft2 from '@/assets/portfolio/loft-2.jpg';
import loft3 from '@/assets/portfolio/loft-3.jpg';
import minimalistWood1 from '@/assets/portfolio/minimalist-wood-1.jpg';
import minimalistWood2 from '@/assets/portfolio/minimalist-wood-2.jpg';
import minimalistWood3 from '@/assets/portfolio/minimalist-wood-3.jpg';
import bedroom1 from '@/assets/portfolio/bedroom-1.jpg';
import bedroom2 from '@/assets/portfolio/bedroom-2.jpg';
import marble1 from '@/assets/portfolio/marble-1.jpg';
import marble2 from '@/assets/portfolio/marble-2.jpg';
import marble3 from '@/assets/portfolio/marble-3.jpg';
import laconicLiving1 from '@/assets/portfolio/laconic-living-1.jpg';
import laconicLiving2 from '@/assets/portfolio/laconic-living-2.jpg';
import classicHint2 from '@/assets/portfolio/classic-hint-2.jpg';
import fireplaceLiving1 from '@/assets/portfolio/fireplace-living-1.jpg';
import fireplaceLiving2 from '@/assets/portfolio/fireplace-living-2.jpg';
import contrastLiving1 from '@/assets/portfolio/contrast-living-1.jpg';
import contrastLiving2 from '@/assets/portfolio/contrast-living-2.jpg';

// Commercial project images
import cafeBar from '@/assets/commercial/cafe-bar.jpg';

// Warm apartment images
import warmApartmentHero from '@/assets/warm-apartment/hero.jpg';

// Soft modern apartment images
import softModernBedroom from '@/assets/soft-modern/bedroom-1.jpg';

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'soft-modern',
    slug: 'soft-modern-apartment',
    title: {
      ru: 'Мягкая современная квартира',
      en: 'Soft Modern Apartment',
    },
    description: {
      ru: 'Жилой интерьер, исследующий спокойную современную эстетику, построенную вокруг света, баланса и повседневного комфорта.',
      en: 'A residential interior exploring a calm, modern aesthetic built around light, balance, and everyday comfort.',
    },
    category: 'residential',
    area: 95,
    location: { ru: 'Алматы', en: 'Almaty' },
    thumbnail: softModernBedroom,
    images: [softModernBedroom],
    externalLink: '/residential/soft-modern-apartment',
  },
  {
    id: 'warm-apt',
    slug: 'warm-apartment',
    title: {
      ru: 'Тёплый минималистичный интерьер',
      en: 'Minimal Warm Apartment',
    },
    description: {
      ru: 'Жилой интерьер в стиле тёплого минимализма с натуральным деревом, мягкими нейтральными тонами и скульптурными деталями. Пространство сочетает функциональность с архитектурным ритмом.',
      en: 'This residential interior explores warm minimalism through natural wood, soft neutral tones, and sculptural details. The space balances functionality with calm architectural rhythm.',
    },
    category: 'residential',
    area: 185,
    location: { ru: 'Алматы', en: 'Almaty' },
    thumbnail: warmApartmentHero,
    images: [warmApartmentHero],
    externalLink: '/residential/warm-apartment',
  },
  {
    id: '0',
    slug: 'entertainment-center',
    title: {
      ru: 'Семейный развлекательный и велнес-центр',
      en: 'Family Entertainment & Wellness Center',
    },
    description: {
      ru: 'Многофункциональный интерьер, объединяющий гостеприимство, велнес и детские пространства в единую среду. Проект балансирует игровые элементы с архитектурной структурой.',
      en: 'A multifunctional interior combining hospitality, wellness, and children\'s spaces into a cohesive environment. The project balances playful elements with architectural structure.',
    },
    category: 'commercial',
    area: 1200,
    location: { ru: 'Алматы', en: 'Almaty' },
    thumbnail: cafeBar,
    images: [cafeBar],
    externalLink: '/commercial/entertainment-center',
  },
  {
    id: '1',
    slug: 'family-living-room',
    title: {
      ru: 'Гостиная для семейной пары',
      en: 'Family Living Room',
    },
    description: {
      ru: 'Милая гостиная для семейной пары. Площадь гостиной 40 кв.м. Задача создать атмосферу уюта, воздушности и семейности. Смешение классики и модерна в дизайне по желанию заказчика.',
      en: 'Cozy living room designed for a family couple. 40 sq.m. The goal was to create an atmosphere of comfort, airiness, and family warmth. A blend of classic and modern design as requested by the client.',
    },
    category: 'residential',
    area: 40,
    location: { ru: 'Алматы', en: 'Almaty' },
    thumbnail: familyLiving1,
    images: [familyLiving1, familyLiving2, familyLiving3],
  },
  {
    id: '2',
    slug: 'restaurant-ayalla',
    title: {
      ru: 'Ресторанный комплекс Аяла',
      en: 'Ayalla Restaurant Complex',
    },
    description: {
      ru: 'Спокойные цвета с приятным зеленым акцентом в мягкой мебели. Сложный потолок в центре композиции. Этнические узоры на элементах декора создают настроение для делового разговора и приятного приема пищи.',
      en: 'Calm colors with pleasant green accents in upholstered furniture. Complex ceiling at the center of the composition. Ethnic patterns on decor elements create the mood for business conversations and pleasant dining.',
    },
    category: 'commercial',
    area: 350,
    location: { ru: 'Алматы', en: 'Almaty' },
    thumbnail: restaurant1,
    images: [restaurant1, restaurant2, restaurant3],
  },
  {
    id: '3',
    slug: 'loft-country-house',
    title: {
      ru: 'Загородный дом в стиле Лофт',
      en: 'Loft Country House',
    },
    description: {
      ru: 'Заказчик пожелал брутальный стиль. Смешанный hi-tech с любимым лофтом. Камин в центре композиции соединяет гостиную и кухонную зоны. Лестница, одновременно массивная и воздушная за счет стекла, ведет на второй этаж.',
      en: 'The client desired a brutal style. Mixed hi-tech with beloved loft. The fireplace at the center connects the living room and kitchen zones. The staircase, both massive and airy due to glass, leads to the second floor.',
    },
    category: 'residential',
    area: 280,
    location: { ru: 'Алматинская область', en: 'Almaty Region' },
    thumbnail: loft1,
    images: [loft1, loft2, loft3],
  },
  {
    id: '4',
    slug: 'minimalism-and-wood',
    title: {
      ru: 'Минимализм и дерево',
      en: 'Minimalism and Wood',
    },
    description: {
      ru: 'Перепланировка сложной по геометрии квартиры и разработка дизайн-проекта в современном стиле. Керамика идеально сочетается с текстурой дерева и создает контраст с гладкими поверхностями.',
      en: 'Renovation of a geometrically complex apartment with modern style design. Ceramics perfectly combined with wood texture creates contrast with smooth surfaces.',
    },
    category: 'residential',
    area: 85,
    location: { ru: 'Алматы', en: 'Almaty' },
    thumbnail: minimalistWood1,
    images: [minimalistWood1, minimalistWood2, minimalistWood3],
  },
  {
    id: '5',
    slug: 'luxurious-bedroom',
    title: {
      ru: 'Роскошная спальня',
      en: 'Luxurious Bedroom',
    },
    description: {
      ru: 'Богатый дизайн интерьера квартиры в стиле классика. Золото и теплая подсветка создают уют и роскошь.',
      en: 'Rich interior design of an apartment in classic style. Gold and warm lighting create comfort and luxury.',
    },
    category: 'residential',
    area: 35,
    location: { ru: 'Алматы', en: 'Almaty' },
    thumbnail: bedroom1,
    images: [bedroom1, bedroom2],
  },
  {
    id: '6',
    slug: 'marble-tale',
    title: {
      ru: 'Мраморная сказка',
      en: 'Marble Tale',
    },
    description: {
      ru: 'Сложный богатый пол из мрамора. Классическая мебель и необыкновенного глубокого цвета шторы.',
      en: 'Complex rich marble floor. Classic furniture and curtains of extraordinarily deep color.',
    },
    category: 'residential',
    area: 18,
    location: { ru: 'Алматы', en: 'Almaty' },
    thumbnail: marble1,
    images: [marble1, marble2, marble3],
  },
  {
    id: '7',
    slug: 'laconic-living-room',
    title: {
      ru: 'Лаконичная гостиная',
      en: 'Laconic Living Room',
    },
    description: {
      ru: 'Стильная и лаконичная гостиная подчеркивает безупречный вкус хозяев.',
      en: 'Stylish and laconic living room emphasizes the impeccable taste of the owners.',
    },
    category: 'residential',
    area: 45,
    location: { ru: 'Алматы', en: 'Almaty' },
    thumbnail: laconicLiving1,
    images: [laconicLiving1, laconicLiving2],
  },
  {
    id: '8',
    slug: 'hint-of-classic',
    title: {
      ru: 'Намек на классику',
      en: 'Hint of Classic',
    },
    description: {
      ru: 'Очень модное решение на сегодняшний день направление, современная мебель в интерьере который только намекает на классику.',
      en: 'A very fashionable direction today - modern furniture in an interior that only hints at classic style.',
    },
    category: 'residential',
    area: 65,
    location: { ru: 'Алматы', en: 'Almaty' },
    thumbnail: classicHint2,
    images: [classicHint2],
  },
  {
    id: '9',
    slug: 'fireplace-living-room',
    title: {
      ru: 'Гостиная с камином',
      en: 'Fireplace Living Room',
    },
    description: {
      ru: 'Много света, идеальная симметрия и обилие текстиля в сочетании с современными формами мебели. Плюшевый ковер и удобная софа перед кроватью.',
      en: 'Plenty of light, perfect symmetry, and abundance of textiles combined with modern furniture forms. Plush carpet and comfortable sofa in front of the bed.',
    },
    category: 'residential',
    area: 50,
    location: { ru: 'Алматы', en: 'Almaty' },
    thumbnail: fireplaceLiving1,
    images: [fireplaceLiving1, fireplaceLiving2],
  },
  {
    id: '10',
    slug: 'contrast-living-room',
    title: {
      ru: 'Гостиная контраст',
      en: 'Contrast Living Room',
    },
    description: {
      ru: 'Очень современное решение - оконный проем без портьер совмещает в себе простор и сдержанность. Тонкие линии в мебели и на стенах придают лаконичный, упорядоченный ритм.',
      en: 'Very modern solution - window opening without curtains combines spaciousness and restraint. Thin lines in furniture and on walls give a laconic, orderly rhythm.',
    },
    category: 'residential',
    area: 48,
    location: { ru: 'Алматы', en: 'Almaty' },
    thumbnail: contrastLiving1,
    images: [contrastLiving1, contrastLiving2],
  },
];

export const getProjectBySlug = (slug: string): PortfolioProject | undefined => {
  return portfolioProjects.find(p => p.slug === slug);
};

export const getProjectsByCategory = (category: ProjectCategory): PortfolioProject[] => {
  return portfolioProjects.filter(p => p.category === category);
};
