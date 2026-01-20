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

// Original images from gauharsergazina.kz
const originalImages = {
  // Family Living Room
  familyLiving1: 'https://gauharsergazina.kz/images/1.jpg',
  familyLiving2: 'https://gauharsergazina.kz/images/2.jpg',
  familyLiving3: 'https://gauharsergazina.kz/images/3.jpg',
  
  // Restaurant Ayalla
  restaurant1: 'https://gauharsergazina.kz/images/4.jpg',
  restaurant2: 'https://gauharsergazina.kz/images/5.jpg',
  restaurant3: 'https://gauharsergazina.kz/images/6.jpg',
  
  // Loft Country House
  loft1: 'https://gauharsergazina.kz/images/7.jpg',
  loft2: 'https://gauharsergazina.kz/images/8.jpg',
  loft3: 'https://gauharsergazina.kz/images/122.jpg',
  
  // Minimalism and Wood
  minimalistWood1: 'https://gauharsergazina.kz/images/9.jpg',
  minimalistWood2: 'https://gauharsergazina.kz/images/10.jpg',
  minimalistWood3: 'https://gauharsergazina.kz/images/11.jpg',
  
  // Luxurious Bedroom
  bedroom1: 'https://gauharsergazina.kz/images/83.jpg',
  bedroom2: 'https://gauharsergazina.kz/images/104.jpg',
  
  // Marble Tale
  marble1: 'https://gauharsergazina.kz/images/123.jpg',
  marble2: 'https://gauharsergazina.kz/images/132.jpg',
  marble3: 'https://gauharsergazina.kz/images/14.jpg',
  
  // Additional projects from original site
  laconicLiving1: 'https://gauharsergazina.kz/images/15.jpg',
  laconicLiving2: 'https://gauharsergazina.kz/images/16.jpg',
  
  tastefulLiving1: 'https://gauharsergazina.kz/images/17.jpg',
  tastefulLiving2: 'https://gauharsergazina.kz/images/18.jpg',
  
  leatherLiving1: 'https://gauharsergazina.kz/images/19.jpg',
  leatherLiving2: 'https://gauharsergazina.kz/images/20.jpg',
  
  classicHint1: 'https://gauharsergazina.kz/images/21.jpg',
  classicHint2: 'https://gauharsergazina.kz/images/22.jpg',
  
  fireplaceLiving1: 'https://gauharsergazina.kz/images/23.jpg',
  fireplaceLiving2: 'https://gauharsergazina.kz/images/24.jpg',
  
  contrastLiving1: 'https://gauharsergazina.kz/images/25.jpg',
  contrastLiving2: 'https://gauharsergazina.kz/images/26.jpg',
  
  natureLiving1: 'https://gauharsergazina.kz/images/27.jpg',
  natureLiving2: 'https://gauharsergazina.kz/images/28.jpg',
};

export const portfolioProjects: PortfolioProject[] = [
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
    thumbnail: originalImages.familyLiving1,
    images: [originalImages.familyLiving1, originalImages.familyLiving2, originalImages.familyLiving3],
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
    thumbnail: originalImages.restaurant1,
    images: [originalImages.restaurant1, originalImages.restaurant2, originalImages.restaurant3],
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
    thumbnail: originalImages.loft1,
    images: [originalImages.loft1, originalImages.loft2, originalImages.loft3],
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
    thumbnail: originalImages.minimalistWood1,
    images: [originalImages.minimalistWood1, originalImages.minimalistWood2, originalImages.minimalistWood3],
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
    thumbnail: originalImages.bedroom1,
    images: [originalImages.bedroom1, originalImages.bedroom2],
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
    thumbnail: originalImages.marble1,
    images: [originalImages.marble1, originalImages.marble2, originalImages.marble3],
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
    thumbnail: originalImages.laconicLiving1,
    images: [originalImages.laconicLiving1, originalImages.laconicLiving2],
  },
  {
    id: '8',
    slug: 'tasteful-living-room',
    title: {
      ru: 'Гостиная со вкусом',
      en: 'Tasteful Living Room',
    },
    description: {
      ru: 'Стильный дизайн интерьера загородного дома в пригороде Алматы. Минималистичный дизайн, мягкое цветовое решение интерьера, дополняют сдержанные оттенки мебели.',
      en: 'Stylish interior design of a country house in Almaty suburbs. Minimalist design with soft color palette complemented by restrained furniture tones.',
    },
    category: 'residential',
    area: 120,
    location: { ru: 'Алматинская область', en: 'Almaty Region' },
    thumbnail: originalImages.tastefulLiving1,
    images: [originalImages.tastefulLiving1, originalImages.tastefulLiving2],
  },
  {
    id: '9',
    slug: 'leather-living-room',
    title: {
      ru: 'Кожаная гостиная',
      en: 'Leather Living Room',
    },
    description: {
      ru: 'В проекте используется множество эксклюзивных покрытий, например авторские стеновые панели обтянутые кожей с белой прострочкой и металлическими вставками.',
      en: 'The project uses many exclusive finishes, including custom wall panels covered in leather with white stitching and metal inserts.',
    },
    category: 'residential',
    area: 55,
    location: { ru: 'Алматы', en: 'Almaty' },
    thumbnail: originalImages.leatherLiving1,
    images: [originalImages.leatherLiving1, originalImages.leatherLiving2],
  },
  {
    id: '10',
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
    thumbnail: originalImages.classicHint1,
    images: [originalImages.classicHint1, originalImages.classicHint2],
  },
  {
    id: '11',
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
    thumbnail: originalImages.fireplaceLiving1,
    images: [originalImages.fireplaceLiving1, originalImages.fireplaceLiving2],
  },
  {
    id: '12',
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
    thumbnail: originalImages.contrastLiving1,
    images: [originalImages.contrastLiving1, originalImages.contrastLiving2],
  },
  {
    id: '13',
    slug: 'nature-in-living-room',
    title: {
      ru: 'Природа в гостиной',
      en: 'Nature in Living Room',
    },
    description: {
      ru: 'Лаконичный сдержанный стиль, подчеркивающий настроение и выдержанность хозяев. Кабинет в загородном доме с видом на задний двор.',
      en: 'Laconic restrained style emphasizing the mood and composure of the owners. Home office in a country house with a view of the backyard.',
    },
    category: 'residential',
    area: 35,
    location: { ru: 'Алматинская область', en: 'Almaty Region' },
    thumbnail: originalImages.natureLiving1,
    images: [originalImages.natureLiving1, originalImages.natureLiving2],
  },
];

export const getProjectBySlug = (slug: string): PortfolioProject | undefined => {
  return portfolioProjects.find(p => p.slug === slug);
};

export const getProjectsByCategory = (category: ProjectCategory): PortfolioProject[] => {
  return portfolioProjects.filter(p => p.category === category);
};
