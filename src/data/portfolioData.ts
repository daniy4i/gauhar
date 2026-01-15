export type ProjectCategory = 'apartment' | 'house' | 'commercial';
export type ProjectStyle = 'modern' | 'classic' | 'minimalist' | 'loft' | 'luxury' | 'eclectic';

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
  brief: {
    ru: string;
    en: string;
  };
  category: ProjectCategory;
  styles: ProjectStyle[];
  area?: number; // in m²
  year?: number;
  location?: {
    ru: string;
    en: string;
  };
  featured: boolean;
  thumbnail: string;
  images: string[];
}

// Placeholder images - replace with actual project images
const placeholderImages = {
  living1: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop',
  living2: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
  living3: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop',
  bedroom1: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
  bedroom2: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&h=800&fit=crop',
  kitchen1: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=1200&h=800&fit=crop',
  kitchen2: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop',
  office1: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop',
  restaurant1: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop',
  loft1: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&h=800&fit=crop',
  house1: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop',
  marble1: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=800&fit=crop',
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
      ru: 'Уютная гостиная для большой семьи, сочетающая классические и современные элементы',
      en: 'Cozy living room for a large family, combining classic and modern elements',
    },
    brief: {
      ru: 'Заказчик хотел создать пространство для семейных встреч, которое было бы одновременно элегантным и комфортным. Мы объединили классические линии с современной функциональностью.',
      en: 'The client wanted to create a space for family gatherings that would be both elegant and comfortable. We combined classic lines with modern functionality.',
    },
    category: 'apartment',
    styles: ['classic', 'modern'],
    area: 40,
    year: 2023,
    location: { ru: 'Алматы', en: 'Almaty' },
    featured: true,
    thumbnail: placeholderImages.living1,
    images: [placeholderImages.living1, placeholderImages.living2, placeholderImages.living3],
  },
  {
    id: '2',
    slug: 'minimalism-and-wood',
    title: {
      ru: 'Минимализм и дерево',
      en: 'Minimalism and Wood',
    },
    description: {
      ru: 'Современное пространство с акцентом на натуральные материалы и чистые линии',
      en: 'Modern space with emphasis on natural materials and clean lines',
    },
    brief: {
      ru: 'Проект демонстрирует, как минимализм может быть теплым и уютным благодаря использованию натурального дерева и продуманному освещению.',
      en: 'The project demonstrates how minimalism can be warm and cozy through the use of natural wood and thoughtful lighting.',
    },
    category: 'apartment',
    styles: ['minimalist', 'modern'],
    area: 85,
    year: 2023,
    location: { ru: 'Алматы', en: 'Almaty' },
    featured: true,
    thumbnail: placeholderImages.living2,
    images: [placeholderImages.living2, placeholderImages.living1, placeholderImages.kitchen1],
  },
  {
    id: '3',
    slug: 'restaurant-ayalla',
    title: {
      ru: 'Ресторанный комплекс Ayalla',
      en: 'Ayalla Restaurant Complex',
    },
    description: {
      ru: 'Роскошный ресторанный комплекс с уникальной атмосферой',
      en: 'Luxurious restaurant complex with a unique atmosphere',
    },
    brief: {
      ru: 'Создание атмосферного пространства для премиального ресторана, объединяющего традиционные казахские мотивы с современным дизайном.',
      en: 'Creating an atmospheric space for a premium restaurant, combining traditional Kazakh motifs with modern design.',
    },
    category: 'commercial',
    styles: ['luxury', 'eclectic'],
    area: 350,
    year: 2022,
    location: { ru: 'Алматы', en: 'Almaty' },
    featured: true,
    thumbnail: placeholderImages.restaurant1,
    images: [placeholderImages.restaurant1, placeholderImages.office1],
  },
  {
    id: '4',
    slug: 'loft-country-house',
    title: {
      ru: 'Загородный дом в стиле лофт',
      en: 'Loft Country House',
    },
    description: {
      ru: 'Просторный загородный дом с индустриальными акцентами',
      en: 'Spacious country house with industrial accents',
    },
    brief: {
      ru: 'Загородная резиденция, где индустриальный стиль лофт гармонично сочетается с уютом загородной жизни.',
      en: 'A country residence where industrial loft style harmoniously combines with the comfort of country living.',
    },
    category: 'house',
    styles: ['loft', 'modern'],
    area: 280,
    year: 2023,
    location: { ru: 'Алматинская область', en: 'Almaty Region' },
    featured: true,
    thumbnail: placeholderImages.loft1,
    images: [placeholderImages.loft1, placeholderImages.house1, placeholderImages.living3],
  },
  {
    id: '5',
    slug: 'luxurious-bedroom',
    title: {
      ru: 'Роскошная спальня',
      en: 'Luxurious Bedroom',
    },
    description: {
      ru: 'Элегантная спальня с использованием премиальных материалов',
      en: 'Elegant bedroom using premium materials',
    },
    brief: {
      ru: 'Спальня мечты с панорамными окнами, мягким освещением и отделкой из натуральных материалов высшего качества.',
      en: 'A dream bedroom with panoramic windows, soft lighting, and finishes from the highest quality natural materials.',
    },
    category: 'apartment',
    styles: ['luxury', 'classic'],
    area: 35,
    year: 2023,
    location: { ru: 'Алматы', en: 'Almaty' },
    featured: true,
    thumbnail: placeholderImages.bedroom1,
    images: [placeholderImages.bedroom1, placeholderImages.bedroom2],
  },
  {
    id: '6',
    slug: 'marble-tale',
    title: {
      ru: 'Мраморная сказка',
      en: 'Marble Tale',
    },
    description: {
      ru: 'Ванная комната с использованием натурального мрамора',
      en: 'Bathroom featuring natural marble',
    },
    brief: {
      ru: 'Роскошная ванная комната, где мрамор становится главным героем пространства, создавая атмосферу спа-салона.',
      en: 'A luxurious bathroom where marble becomes the main character of the space, creating a spa-like atmosphere.',
    },
    category: 'apartment',
    styles: ['luxury'],
    area: 18,
    year: 2022,
    location: { ru: 'Алматы', en: 'Almaty' },
    featured: true,
    thumbnail: placeholderImages.marble1,
    images: [placeholderImages.marble1],
  },
  {
    id: '7',
    slug: 'nature-office',
    title: {
      ru: 'Природа в офисе',
      en: 'Nature in the Office',
    },
    description: {
      ru: 'Офисное пространство с биофильным дизайном',
      en: 'Office space with biophilic design',
    },
    brief: {
      ru: 'Современный офис, где живые растения, натуральные материалы и много света создают продуктивную и здоровую рабочую среду.',
      en: 'A modern office where living plants, natural materials, and plenty of light create a productive and healthy work environment.',
    },
    category: 'commercial',
    styles: ['modern', 'minimalist'],
    area: 120,
    year: 2023,
    location: { ru: 'Алматы', en: 'Almaty' },
    featured: false,
    thumbnail: placeholderImages.office1,
    images: [placeholderImages.office1],
  },
  {
    id: '8',
    slug: 'laconic-kitchen',
    title: {
      ru: 'Лаконичная кухня',
      en: 'Laconic Kitchen',
    },
    description: {
      ru: 'Минималистичная кухня с максимальной функциональностью',
      en: 'Minimalist kitchen with maximum functionality',
    },
    brief: {
      ru: 'Кухня, где каждый элемент продуман до мелочей — от скрытых систем хранения до встроенной техники.',
      en: 'A kitchen where every element is thought out to the smallest detail — from hidden storage systems to built-in appliances.',
    },
    category: 'apartment',
    styles: ['minimalist', 'modern'],
    area: 22,
    year: 2023,
    location: { ru: 'Алматы', en: 'Almaty' },
    featured: false,
    thumbnail: placeholderImages.kitchen1,
    images: [placeholderImages.kitchen1, placeholderImages.kitchen2],
  },
  {
    id: '9',
    slug: 'yellow-accents',
    title: {
      ru: 'Желтые акценты',
      en: 'Yellow Accents',
    },
    description: {
      ru: 'Яркий интерьер с солнечными акцентами',
      en: 'Bright interior with sunny accents',
    },
    brief: {
      ru: 'Проект демонстрирует, как правильно расставленные цветовые акценты могут преобразить нейтральное пространство.',
      en: 'The project demonstrates how properly placed color accents can transform a neutral space.',
    },
    category: 'apartment',
    styles: ['modern', 'eclectic'],
    area: 75,
    year: 2022,
    location: { ru: 'Алматы', en: 'Almaty' },
    featured: false,
    thumbnail: placeholderImages.living3,
    images: [placeholderImages.living3, placeholderImages.living1],
  },
];

export const getProjectBySlug = (slug: string): PortfolioProject | undefined => {
  return portfolioProjects.find(p => p.slug === slug);
};

export const getFeaturedProjects = (): PortfolioProject[] => {
  return portfolioProjects.filter(p => p.featured);
};

export const getProjectsByCategory = (category: ProjectCategory): PortfolioProject[] => {
  return portfolioProjects.filter(p => p.category === category);
};
