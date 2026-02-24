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

// Warm apartment images
import warmApartmentHero from '@/assets/warm-apartment/hero.jpg';

// Soft modern apartment images
import softModernBedroom from '@/assets/soft-modern/bedroom-1.jpg';

// Soft modern v2 apartment images
import softModernV2Living from '@/assets/soft-modern-v2/living-kitchen-2.jpg';

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'soft-modern-v2',
    slug: 'soft-modern-apartment-v2',
    title: {
      ru: 'Мягкая современная квартира',
      en: 'Soft Modern Apartment',
    },
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
    title: {
      ru: 'Светлая современная квартира',
      en: 'Light Modern Apartment',
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
    id: 'luxury-lobby',
    slug: 'luxury-lobby',
    title: {
      ru: 'Премиальное лобби жилого комплекса',
      en: 'Premium Residential Lobby',
    },
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
];

export const getProjectBySlug = (slug: string): PortfolioProject | undefined => {
  return portfolioProjects.find(p => p.slug === slug);
};

export const getProjectsByCategory = (category: ProjectCategory): PortfolioProject[] => {
  return portfolioProjects.filter(p => p.category === category);
};
