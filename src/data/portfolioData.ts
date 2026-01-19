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

// Real project images - warm, elegant interior design photos
const projectImages = {
  // Family Living Room - warm classic-modern mix
  familyLiving1: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&h=800&fit=crop',
  familyLiving2: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=800&fit=crop',
  familyLiving3: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop',
  
  // Minimalism and Wood
  minimalistWood1: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&h=800&fit=crop',
  minimalistWood2: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop',
  minimalistWood3: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1200&h=800&fit=crop',
  
  // Restaurant Ayalla - elegant dining
  restaurant1: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1200&h=800&fit=crop',
  restaurant2: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&h=800&fit=crop',
  restaurant3: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop',
  
  // Loft Country House
  loft1: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
  loft2: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&h=800&fit=crop',
  loft3: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=800&fit=crop',
  
  // Luxurious Bedroom
  bedroom1: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&h=800&fit=crop',
  bedroom2: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&h=800&fit=crop',
  
  // Marble Bathroom
  marble1: 'https://images.unsplash.com/photo-1600566752734-72834a191a3b?w=1200&h=800&fit=crop',
  marble2: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=800&fit=crop',
  
  // Office
  office1: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop',
  office2: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1200&h=800&fit=crop',
  
  // Kitchen
  kitchen1: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop',
  kitchen2: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=1200&h=800&fit=crop',
  
  // Yellow Accents
  yellow1: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1200&h=800&fit=crop',
  yellow2: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1200&h=800&fit=crop',
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
    thumbnail: projectImages.bedroom1,
    images: [projectImages.bedroom1, projectImages.bedroom2],
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
    thumbnail: projectImages.marble1,
    images: [projectImages.marble1, projectImages.marble2],
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
    thumbnail: projectImages.office1,
    images: [projectImages.office1, projectImages.office2],
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
    thumbnail: projectImages.kitchen1,
    images: [projectImages.kitchen1, projectImages.kitchen2],
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
    thumbnail: projectImages.yellow1,
    images: [projectImages.yellow1, projectImages.yellow2],
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
