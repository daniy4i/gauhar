export type Language = 'ru' | 'en';

export interface TranslationStrings {
  // Navigation
  nav: {
    home: string;
    about: string;
    portfolio: string;
    services: string;
    contact: string;
    whatsapp: string;
  };
  // Hero
  hero: {
    title: string;
    subtitle: string;
    cta: {
      request: string;
      portfolio: string;
      whatsapp: string;
    };
  };
  // About
  about: {
    title: string;
    subtitle: string;
    bio: string[];
    education: {
      title: string;
      items: string[];
    };
    approach: {
      title: string;
      text: string;
    };
  };
  // Services
  services: {
    title: string;
    subtitle: string;
    packages: {
      turnkey: {
        title: string;
        price: string;
        priceUnit: string;
        includes: string[];
      };
      supervision: {
        title: string;
        price: string;
        priceUnit: string;
        includes: string[];
      };
    };
    technicalPlans: {
      title: string;
      items: string[];
    };
    faq: {
      title: string;
      items: { question: string; answer: string }[];
    };
    cta: string;
  };
  // Portfolio
  portfolio: {
    title: string;
    subtitle: string;
    filters: {
      all: string;
      apartment: string;
      house: string;
      commercial: string;
    };
    projectCta: string;
    viewProject: string;
    area: string;
    requestSimilar: string;
  };
  // Contact
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      namePlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      city: string;
      cityPlaceholder: string;
      projectType: string;
      projectTypePlaceholder: string;
      projectTypes: string[];
      area: string;
      areaPlaceholder: string;
      budget: string;
      budgetPlaceholder: string;
      budgetRanges: string[];
      message: string;
      messagePlaceholder: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
    };
    whatsappCard: {
      title: string;
      subtitle: string;
      button: string;
    };
    info: {
      email: string;
      phone: string;
      address: string;
      socials: string;
    };
  };
  // Footer
  footer: {
    rights: string;
    designer: string;
    privacy: string;
    offer: string;
  };
  // Common
  common: {
    learnMore: string;
    getInTouch: string;
    backToHome: string;
    loading: string;
  };
  // WhatsApp
  whatsapp: {
    defaultMessage: string;
  };
}

export const translations: Record<Language, TranslationStrings> = {
  ru: {
    nav: {
      home: 'Главная',
      about: 'О себе',
      portfolio: 'Портфолио',
      services: 'Услуги',
      contact: 'Контакты',
      whatsapp: 'WhatsApp',
    },
    hero: {
      title: 'Гаухар Сергазина',
      subtitle: 'Дизайнер интерьеров · Алматы',
      cta: {
        request: 'Заказать проект',
        portfolio: 'Смотреть работы',
        whatsapp: 'WhatsApp',
      },
    },
    about: {
      title: 'О себе',
      subtitle: 'Дизайн интерьеров с душой и профессионализмом',
      bio: [
        'Меня зовут Гаухар Сергазина. Я дипломированный дизайнер интерьеров, окончила Казахскую архитектурно-строительную академию и прошла обучение в престижном Central Saint Martins в Лондоне.',
        'Моя страсть к дизайну находит отражение в каждом проекте, который я создаю. От первых эскизов до авторского надзора за всеми этапами ремонта и отделки — я сопровождаю вас на всем пути превращения вашего пространства в стильное и функциональное произведение искусства.',
        'Участие в международных и местных мероприятиях по дизайну интерьера позволяет мне постоянно обновлять и расширять свои знания, воплощая в жизнь самые современные и креативные идеи.',
        'Каждый проект, над которым я работаю, — это гармоничное сочетание практичности, уюта и красоты, созданное специально для вас.',
      ],
      education: {
        title: 'Образование',
        items: [
          'Казахская архитектурно-строительная академия',
          'Central Saint Martins, Лондон',
        ],
      },
      approach: {
        title: 'Мой подход',
        text: 'Буду рада помочь вам сделать ваш интерьер мечты реальностью!',
      },
    },
    services: {
      title: 'Услуги',
      subtitle: 'Полный спектр услуг по дизайну интерьера',
      packages: {
        turnkey: {
          title: 'Проект под ключ',
          price: '$100',
          priceUnit: 'за м²',
          includes: [
            'Альбом с техническими планами',
            '3D визуализация',
            'Полная комплектация мебелью и оборудованием',
          ],
        },
        supervision: {
          title: 'Проект с авторским надзором',
          price: '$130',
          priceUnit: 'за м²',
          includes: [
            'Альбом с техническими планами',
            '3D визуализация',
            'Полная комплектация мебелью и оборудованием',
            'Ведение авторского надзора',
          ],
        },
      },
      technicalPlans: {
        title: 'Технические планы включают',
        items: [
          'Снятие замеров помещения',
          'План монтажа и демонтажа перегородок',
          'План планировки',
          'План расстановки мебели',
          'План пола',
          'План потолка',
          'План расположения светильников',
          'План выключателей и розеток',
          'Развертки стен',
          'План раскладки керамогранита',
          'План теплых полов',
          'План слаботочных систем',
          'План кондиционирования и вентиляции',
          'Схемы встроенной мебели',
        ],
      },
      faq: {
        title: 'Часто задаваемые вопросы',
        items: [
          {
            question: 'Сколько времени занимает разработка дизайн-проекта?',
            answer: 'Сроки зависят от сложности и площади объекта. В среднем проект занимает от 4 до 8 недель.',
          },
          {
            question: 'Работаете ли вы с объектами за пределами Алматы?',
            answer: 'Да, я работаю с клиентами по всему Казахстану и за рубежом. Современные технологии позволяют вести проекты удаленно.',
          },
          {
            question: 'Что входит в авторский надзор?',
            answer: 'Авторский надзор включает регулярные визиты на объект, контроль качества выполнения работ, консультации для строителей и решение возникающих вопросов.',
          },
          {
            question: 'Можно ли заказать только визуализацию?',
            answer: 'Я предлагаю комплексные решения, но готова обсудить индивидуальные условия в зависимости от ваших потребностей.',
          },
        ],
      },
      cta: 'Заказать консультацию',
    },
    portfolio: {
      title: 'Портфолио',
      subtitle: 'Избранные проекты интерьерного дизайна',
      filters: {
        all: 'Все',
        apartment: 'Квартиры',
        house: 'Дома',
        commercial: 'Коммерческие',
      },
      projectCta: 'Заказать похожий проект',
      viewProject: 'Смотреть проект',
      area: 'Площадь',
      requestSimilar: 'Заказать похожий проект',
    },
    contact: {
      title: 'Контакты',
      subtitle: 'Свяжитесь со мной для обсуждения вашего проекта',
      form: {
        name: 'Имя',
        namePlaceholder: 'Ваше имя',
        phone: 'Телефон / WhatsApp',
        phonePlaceholder: '+7 (___) ___-__-__',
        email: 'Email',
        emailPlaceholder: 'your@email.com',
        city: 'Город',
        cityPlaceholder: 'Ваш город',
        projectType: 'Тип объекта',
        projectTypePlaceholder: 'Выберите тип',
        projectTypes: ['Квартира', 'Дом', 'Офис', 'Ресторан/Кафе', 'Другое'],
        area: 'Площадь (м²)',
        areaPlaceholder: 'Примерная площадь',
        budget: 'Бюджет',
        budgetPlaceholder: 'Выберите бюджет',
        budgetRanges: ['До $10,000', '$10,000 - $30,000', '$30,000 - $50,000', '$50,000 - $100,000', 'Более $100,000'],
        message: 'Сообщение',
        messagePlaceholder: 'Расскажите о вашем проекте...',
        submit: 'Отправить заявку',
        sending: 'Отправка...',
        success: 'Спасибо! Ваша заявка отправлена. Я свяжусь с вами в ближайшее время.',
        error: 'Произошла ошибка. Пожалуйста, попробуйте снова или свяжитесь через WhatsApp.',
      },
      whatsappCard: {
        title: 'Быстрая связь через WhatsApp',
        subtitle: 'Напишите напрямую для быстрого ответа',
        button: 'Написать в WhatsApp',
      },
      info: {
        email: 'Электронная почта',
        phone: 'Телефон',
        address: 'Адрес',
        socials: 'Социальные сети',
      },
    },
    footer: {
      rights: '© 2024 Гаухар Сергазина. Все права защищены.',
      designer: 'Дизайнер интерьеров · Алматы',
      privacy: 'Политика конфиденциальности',
      offer: 'Публичная оферта',
    },
    common: {
      learnMore: 'Узнать больше',
      getInTouch: 'Связаться',
      backToHome: 'На главную',
      loading: 'Загрузка...',
    },
    whatsapp: {
      defaultMessage: 'Здравствуйте, Гаухар! Хочу обсудить дизайн-проект. Можете подсказать следующий шаг?',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      portfolio: 'Portfolio',
      services: 'Services',
      contact: 'Contact',
      whatsapp: 'WhatsApp',
    },
    hero: {
      title: 'Gauhar Sergazina',
      subtitle: 'Interior Designer · Almaty',
      cta: {
        request: 'Request a Project',
        portfolio: 'View Portfolio',
        whatsapp: 'WhatsApp',
      },
    },
    about: {
      title: 'About Me',
      subtitle: 'Interior design with soul and professionalism',
      bio: [
        'My name is Gauhar Sergazina. I am a certified interior designer. I graduated from the Kazakh Leading Academy of Architecture and Civil Engineering and studied at the prestigious Central Saint Martins in London.',
        'My passion for design is reflected in every project I create. From the initial sketches to supervising all stages of renovation and finishing — I accompany you throughout the entire journey of transforming your space into a stylish and functional work of art.',
        'Participation in international and local interior design events allows me to constantly update and expand my knowledge, bringing to life the most modern and creative ideas.',
        'Every project I work on is a harmonious combination of practicality, comfort, and beauty, created especially for you.',
      ],
      education: {
        title: 'Education',
        items: [
          'Kazakh Leading Academy of Architecture and Civil Engineering',
          'Central Saint Martins, London',
        ],
      },
      approach: {
        title: 'My Approach',
        text: 'I would be happy to help you make your dream interior a reality!',
      },
    },
    services: {
      title: 'Services',
      subtitle: 'Full range of interior design services',
      packages: {
        turnkey: {
          title: 'Full Design Project',
          price: '$100',
          priceUnit: 'per m²',
          includes: [
            'Technical drawings album',
            '3D visualization',
            'Complete furniture and equipment specification',
          ],
        },
        supervision: {
          title: 'Project with Author Supervision',
          price: '$130',
          priceUnit: 'per m²',
          includes: [
            'Technical drawings album',
            '3D visualization',
            'Complete furniture and equipment specification',
            'Author supervision throughout construction',
          ],
        },
      },
      technicalPlans: {
        title: 'Technical Plans Include',
        items: [
          'Space measurements',
          'Demolition and construction plan',
          'Layout plan',
          'Furniture arrangement plan',
          'Floor plan',
          'Ceiling plan',
          'Lighting plan',
          'Switches and outlets plan',
          'Wall elevations',
          'Tile layout plan',
          'Underfloor heating plan',
          'Low-voltage systems plan',
          'HVAC and ventilation plan',
          'Built-in furniture schemes',
        ],
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            question: 'How long does it take to develop a design project?',
            answer: 'Timelines depend on the complexity and area of the project. On average, a project takes 4 to 8 weeks.',
          },
          {
            question: 'Do you work with projects outside Almaty?',
            answer: 'Yes, I work with clients throughout Kazakhstan and abroad. Modern technology allows me to manage projects remotely.',
          },
          {
            question: 'What is included in author supervision?',
            answer: 'Author supervision includes regular site visits, quality control of work execution, consultations for builders, and resolving any issues that arise.',
          },
          {
            question: 'Can I order only visualization?',
            answer: 'I offer comprehensive solutions, but I am ready to discuss individual terms depending on your needs.',
          },
        ],
      },
      cta: 'Book a Consultation',
    },
    portfolio: {
      title: 'Portfolio',
      subtitle: 'Selected interior design projects',
      filters: {
        all: 'All',
        apartment: 'Apartments',
        house: 'Houses',
        commercial: 'Commercial',
      },
      projectCta: 'Request Similar Project',
      viewProject: 'View Project',
      area: 'Area',
      requestSimilar: 'Request Similar Project',
    },
    contact: {
      title: 'Contact',
      subtitle: 'Get in touch to discuss your project',
      form: {
        name: 'Name',
        namePlaceholder: 'Your name',
        phone: 'Phone / WhatsApp',
        phonePlaceholder: '+7 (___) ___-__-__',
        email: 'Email',
        emailPlaceholder: 'your@email.com',
        city: 'City',
        cityPlaceholder: 'Your city',
        projectType: 'Project Type',
        projectTypePlaceholder: 'Select type',
        projectTypes: ['Apartment', 'House', 'Office', 'Restaurant/Cafe', 'Other'],
        area: 'Area (m²)',
        areaPlaceholder: 'Approximate area',
        budget: 'Budget',
        budgetPlaceholder: 'Select budget',
        budgetRanges: ['Under $10,000', '$10,000 - $30,000', '$30,000 - $50,000', '$50,000 - $100,000', 'Over $100,000'],
        message: 'Message',
        messagePlaceholder: 'Tell us about your project...',
        submit: 'Send Request',
        sending: 'Sending...',
        success: 'Thank you! Your request has been sent. I will contact you soon.',
        error: 'An error occurred. Please try again or contact via WhatsApp.',
      },
      whatsappCard: {
        title: 'Quick Contact via WhatsApp',
        subtitle: 'Message directly for a fast response',
        button: 'Message on WhatsApp',
      },
      info: {
        email: 'Email',
        phone: 'Phone',
        address: 'Address',
        socials: 'Social Media',
      },
    },
    footer: {
      rights: '© 2024 Gauhar Sergazina. All rights reserved.',
      designer: 'Interior Designer · Almaty',
      privacy: 'Privacy Policy',
      offer: 'Public Offer',
    },
    common: {
      learnMore: 'Learn More',
      getInTouch: 'Get in Touch',
      backToHome: 'Back to Home',
      loading: 'Loading...',
    },
    whatsapp: {
      defaultMessage: "Hi Gauhar! I'd like to discuss an interior design project. What's the best next step?",
    },
  },
};

// Contact information (same for both languages)
export const contactInfo = {
  phone: '+7 777 211 2211',
  whatsappNumber: '77772112211',
  email: 'gauhars@mail.ru',
  address: {
    ru: 'РК, г. Алматы, ул. Хаджимукана, 49',
    en: 'Khadzhimukan St. 49, Almaty, Kazakhstan',
  },
  instagram: 'gauhar_sergazina',
  instagramUrl: 'https://www.instagram.com/gauhar_sergazina/',
  youtube: '@sergazina_gauhar',
  youtubeUrl: 'https://www.youtube.com/@sergazina_gauhar',
};

export const getWhatsAppUrl = (lang: Language, customMessage?: string) => {
  const message = customMessage || translations[lang].whatsapp.defaultMessage;
  return `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(message)}`;
};
