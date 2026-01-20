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
}

// High-quality interior design images
const projectImages = {
  // Family Living Room - warm cozy space
  familyLiving1: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&h=1000&fit=crop&q=90',
  familyLiving2: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&h=1000&fit=crop&q=90',
  familyLiving3: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&h=1000&fit=crop&q=90',
  
  // Minimalism and Wood
  minimalistWood1: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1600&h=1000&fit=crop&q=90',
  minimalistWood2: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&h=1000&fit=crop&q=90',
  minimalistWood3: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1600&h=1000&fit=crop&q=90',
  
  // Restaurant Ayalla
  restaurant1: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1600&h=1000&fit=crop&q=90',
  restaurant2: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1600&h=1000&fit=crop&q=90',
  restaurant3: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&h=1000&fit=crop&q=90',
  
  // Loft Country House
  loft1: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&h=1000&fit=crop&q=90',
  loft2: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1600&h=1000&fit=crop&q=90',
  loft3: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&h=1000&fit=crop&q=90',
  
  // Luxurious Bedroom
  bedroom1: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1600&h=1000&fit=crop&q=90',
  bedroom2: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1600&h=1000&fit=crop&q=90',
  bedroom3: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&h=1000&fit=crop&q=90',
  
  // Marble Tale - marble bathroom/interior
  marble1: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1600&h=1000&fit=crop&q=90',
  marble2: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&h=1000&fit=crop&q=90',
  marble3: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=1600&h=1000&fit=crop&q=90',
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: '1',
    slug: 'family-living-room',
    title: {
      ru: 'Семейная гостиная',
      en: 'Family Living Room',
    },
    description: {
      ru: 'Уютная гостиная для семейной пары. Сбалансированные нейтральные тона, мягкие текстуры и продуманное зонирование создают атмосферу комфорта и гармонии.',
      en: 'Cozy living room designed for a family couple. Balanced neutral tones, soft textures, and practical zoning create comfort and harmony.',
    },
    category: 'residential',
    area: 40,
    location: { ru: 'Алматы', en: 'Almaty' },
    thumbnail: projectImages.familyLiving1,
    images: [projectImages.familyLiving1, projectImages.familyLiving2, projectImages.familyLiving3],
  },
  {
    id: '2',
    slug: 'minimalism-and-wood',
    title: {
      ru: 'Минимализм и дерево',
      en: 'Minimalism and Wood',
    },
    description: {
      ru: 'Жилой интерьер, основанный на принципах минимализма с теплыми деревянными акцентами. Чистые линии, натуральные материалы и спокойная атмосфера.',
      en: 'Residential interior based on minimalist principles with warm wooden accents. Clean lines, natural materials, and calm atmosphere.',
    },
    category: 'residential',
    area: 85,
    location: { ru: 'Алматы', en: 'Almaty' },
    thumbnail: projectImages.minimalistWood1,
    images: [projectImages.minimalistWood1, projectImages.minimalistWood2, projectImages.minimalistWood3],
  },
  {
    id: '3',
    slug: 'restaurant-ayalla',
    title: {
      ru: 'Ресторанный комплекс Ayalla',
      en: 'Ayalla Restaurant Complex',
    },
    description: {
      ru: 'Дизайн коммерческого ресторанного комплекса. Сочетание этнических элементов, зеленых акцентов, выразительного освещения и функционального зонирования для потока посетителей.',
      en: 'Commercial restaurant complex design. Combination of ethnic elements, green accents, expressive lighting, and functional zoning for public flow.',
    },
    category: 'commercial',
    area: 350,
    location: { ru: 'Алматы', en: 'Almaty' },
    thumbnail: projectImages.restaurant1,
    images: [projectImages.restaurant1, projectImages.restaurant2, projectImages.restaurant3],
  },
  {
    id: '4',
    slug: 'loft-country-house',
    title: {
      ru: 'Загородный дом в стиле лофт',
      en: 'Loft Country House',
    },
    description: {
      ru: 'Загородный дом в стиле лофт и хай-тек. Открытые пространства, индустриальные материалы, металлические конструкции и современная минималистичная отделка.',
      en: 'Country house in loft and hi-tech style. Open spaces, industrial materials, metal structures, and modern minimal detailing.',
    },
    category: 'residential',
    area: 280,
    location: { ru: 'Алматинская область', en: 'Almaty Region' },
    thumbnail: projectImages.loft1,
    images: [projectImages.loft1, projectImages.loft2, projectImages.loft3],
  },
  {
    id: '5',
    slug: 'luxurious-bedroom',
    title: {
      ru: 'Роскошная спальня',
      en: 'Luxurious Bedroom',
    },
    description: {
      ru: 'Интерьер спальни с роскошной, элегантной атмосферой. Мягкое освещение, премиальные материалы и спокойная цветовая палитра.',
      en: 'Bedroom interior with a luxurious, elegant atmosphere. Soft lighting, premium materials, and calm color palette.',
    },
    category: 'residential',
    area: 35,
    location: { ru: 'Алматы', en: 'Almaty' },
    thumbnail: projectImages.bedroom1,
    images: [projectImages.bedroom1, projectImages.bedroom2, projectImages.bedroom3],
  },
  {
    id: '6',
    slug: 'marble-tale',
    title: {
      ru: 'Мраморная сказка',
      en: 'Marble Tale',
    },
    description: {
      ru: 'Компактный интерьер с акцентом на мраморные текстуры, утонченную детализацию и визуальную легкость.',
      en: 'Compact interior emphasizing marble textures, refined detailing, and visual lightness.',
    },
    category: 'residential',
    area: 18,
    location: { ru: 'Алматы', en: 'Almaty' },
    thumbnail: projectImages.marble1,
    images: [projectImages.marble1, projectImages.marble2, projectImages.marble3],
  },
];

export const getProjectBySlug = (slug: string): PortfolioProject | undefined => {
  return portfolioProjects.find(p => p.slug === slug);
};

export const getProjectsByCategory = (category: ProjectCategory): PortfolioProject[] => {
  return portfolioProjects.filter(p => p.category === category);
};
