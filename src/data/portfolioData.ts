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

// Commercial project images
import cafeBar from '@/assets/commercial/cafe-bar.jpg';
import lobbyMainHall from '@/assets/lobby/main-hall.jpg';
import officeReception from '@/assets/office/reception.jpg';

// Warm apartment images
import warmApartmentHero from '@/assets/warm-apartment/hero.jpg';

// Soft modern apartment images
import softModernBedroom from '@/assets/soft-modern/bedroom-1.jpg';

// Soft modern v2 apartment images
import softModernV2Living from '@/assets/soft-modern-v2/living-kitchen-2.jpg';
import classicWarmthLiving from '@/assets/classic-warmth/living-wide.jpg';
import goldenClassicLiving from '@/assets/portfolio/family-living-1.jpg';
import organicLoftLiving from '@/assets/portfolio/loft-1.jpg';
import floorPlanThumb from '@/assets/floorplans/plan-1.jpg';
export const portfolioProjects: PortfolioProject[] = [
  // === RESIDENTIAL ===
  {
    id: 'warm-apt',
    slug: 'warm-apartment',
    title: { ru: 'Тёплый минималистичный интерьер', en: 'Minimal Warm Apartment' },
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
    id: 'golden-classic',
    slug: 'golden-classic',
    title: { ru: 'Классический семейный дом в золотых тонах', en: 'Golden Classic Family Home' },
    description: {
      ru: 'Просторная семейная резиденция в неоклассическом стиле с дубовыми панелями, латунной фурнитурой и золотисто-кремовой палитрой. Парадные зоны, приватные пространства и творческие детские комнаты.',
      en: 'A spacious neo-classical family residence with oak paneling, brass fixtures, and a golden cream palette. Formal spaces, private retreats, and imaginative children\'s rooms.',
    },
    category: 'residential',
    area: 220,
    location: { ru: 'Алматы', en: 'Almaty' },
    thumbnail: goldenClassicLiving,
    images: [goldenClassicLiving],
    externalLink: '/residential/golden-classic',
  },
  {
    id: 'organic-loft',
    slug: 'organic-loft',
    title: { ru: 'Органический лофт-таунхаус', en: 'Organic Loft Townhouse' },
    description: {
      ru: 'Двухуровневый таунхаус с парящей стальной лестницей, рукотворными гипсовыми панно и ротанговыми деталями. Ремесленное тепло встречает индустриальную структуру.',
      en: 'A two-level townhouse with a floating steel staircase, hand-sculpted plaster panels, and woven rattan details. Artisan warmth meets industrial structure.',
    },
    category: 'residential',
    area: 160,
    location: { ru: 'Алматы', en: 'Almaty' },
    thumbnail: organicLoftLiving,
    images: [organicLoftLiving],
    externalLink: '/residential/organic-loft',
  },
  {
    id: 'classic-warmth',
    slug: 'classic-warmth',
    title: { ru: 'Квартира в тёплой классике', en: 'Classic Warmth Apartment' },
    description: {
      ru: 'Жилой концепт, соединяющий классическую теплоту с современной смелостью. Геометрические панели, LED-подсветка и палитра ореха, угля и коралла создают дом продуманного комфорта.',
      en: 'A residential concept blending classical warmth with contemporary boldness. Geometric wood paneling, ambient LED accents, and a palette of walnut, charcoal, and coral shape a home of quiet drama.',
    },
    category: 'residential',
    area: 110,
    location: { ru: 'Алматы', en: 'Almaty' },
    thumbnail: classicWarmthLiving,
    images: [classicWarmthLiving],
    externalLink: '/residential/classic-warmth',
  },
  {
    id: 'soft-modern-v2',
    slug: 'soft-modern-apartment-v2',
    title: { ru: 'Мягкая современная квартира', en: 'Soft Modern Apartment' },
    description: {
      ru: 'Современное жилое пространство, спроектированное с акцентом на мягкость, баланс и повседневную функциональность.',
      en: 'A contemporary residential space designed with a focus on softness, balance, and everyday functionality.',
    },
    category: 'residential',
    area: 72,
    location: { ru: 'Алматы', en: 'Almaty' },
    thumbnail: softModernV2Living,
    images: [softModernV2Living],
    externalLink: '/residential/soft-modern-apartment-v2',
  },
  {
    id: 'soft-modern',
    slug: 'soft-modern-apartment',
    title: { ru: 'Светлая современная квартира', en: 'Light Modern Apartment' },
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
    id: 'floor-plans',
    slug: 'floor-plans',
    title: { ru: 'Архитектурные планировки', en: 'Architectural Floor Plans' },
    description: {
      ru: 'Коллекция рукописных планировок от компактных квартир до просторных резиденций. Каждая планировка балансирует циркуляцию, свет и функциональное зонирование.',
      en: 'A collection of hand-illustrated floor plans from compact apartments to expansive residences. Each layout balances circulation, light, and functional zoning.',
    },
    category: 'residential',
    area: 160,
    location: { ru: 'Алматы', en: 'Almaty' },
    thumbnail: floorPlanThumb,
    images: [floorPlanThumb],
    externalLink: '/residential/floor-plans',
  },
  // === COMMERCIAL ===
  {
    id: '0',
    slug: 'entertainment-center',
    title: { ru: 'Семейный развлекательный и велнес-центр', en: 'Family Entertainment & Wellness Center' },
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
    id: 'luxury-lobby',
    slug: 'luxury-lobby',
    title: { ru: 'Премиальное лобби жилого комплекса', en: 'Premium Residential Lobby' },
    description: {
      ru: 'Интерьер лобби, возвышающий повседневный опыт возвращения домой. Тёмный орех, мрамор и бронза создают ощущение тихой роскоши с первого шага.',
      en: 'A lobby interior that elevates the everyday experience of arriving home. Dark walnut, marble, and bronze establish a sense of quiet luxury from the first step inside.',
    },
    category: 'commercial',
    area: 320,
    location: { ru: 'Алматы', en: 'Almaty' },
    thumbnail: lobbyMainHall,
    images: [lobbyMainHall],
    externalLink: '/commercial/luxury-lobby',
  },
  {
    id: 'corporate-office',
    slug: 'corporate-office',
    title: { ru: 'Бутиковый корпоративный офис', en: 'Boutique Corporate Office' },
    description: {
      ru: 'Корпоративный интерьер, заменяющий холодную формальность подобранной теплотой. Ореховые панели, стеклянные перегородки и арт-детали формируют рабочее пространство с характером.',
      en: 'A corporate interior that replaces cold formality with curated warmth. Walnut paneling, glass partitions, and art-led detailing shape a workspace with character.',
    },
    category: 'commercial',
    area: 250,
    location: { ru: 'Алматы', en: 'Almaty' },
    thumbnail: officeReception,
    images: [officeReception],
    externalLink: '/commercial/corporate-office',
  },
];

export const getProjectBySlug = (slug: string): PortfolioProject | undefined => {
  return portfolioProjects.find(p => p.slug === slug);
};

export const getProjectsByCategory = (category: ProjectCategory): PortfolioProject[] => {
  return portfolioProjects.filter(p => p.category === category);
};
