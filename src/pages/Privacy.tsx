import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import SEO from '@/components/SEO';

const Privacy = () => {
  const { language } = useLanguage();

  const content = {
    ru: {
      title: 'Политика конфиденциальности',
      lastUpdated: 'Последнее обновление: 24 января 2026 г.',
      sections: [
        {
          title: '1. Общие положения',
          content: `Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта gauharsergazina.kz (далее — «Сайт»), принадлежащего студии дизайна интерьера Gauhar Sergazina (далее — «Компания»).

Используя Сайт, вы соглашаетесь с условиями данной Политики конфиденциальности. Если вы не согласны с условиями Политики, пожалуйста, не используйте Сайт.`
        },
        {
          title: '2. Какие данные мы собираем',
          content: `Мы можем собирать следующие персональные данные:

• Имя и фамилия
• Номер телефона
• Адрес электронной почты
• Город проживания
• Информация о проекте (тип, площадь, бюджет)
• IP-адрес и данные о браузере
• Файлы cookie и данные аналитики

Мы не собираем конфиденциальные данные, такие как данные банковских карт, паспортные данные или медицинскую информацию.`
        },
        {
          title: '3. Цели обработки данных',
          content: `Мы используем ваши персональные данные для следующих целей:

• Обработка заявок и запросов на консультацию
• Связь с вами по телефону, email или мессенджерам
• Предоставление информации об услугах и проектах
• Улучшение качества обслуживания и работы Сайта
• Аналитика посещаемости и поведения пользователей
• Выполнение требований законодательства`
        },
        {
          title: '4. Правовые основания обработки',
          content: `Обработка персональных данных осуществляется на следующих правовых основаниях:

• Согласие субъекта персональных данных
• Исполнение договора или принятие мер по заключению договора
• Законные интересы Компании (при условии соблюдения прав субъекта)`
        },
        {
          title: '5. Защита данных',
          content: `Мы принимаем необходимые организационные и технические меры для защиты ваших персональных данных:

• Шифрование данных при передаче (SSL/TLS)
• Ограничение доступа к персональным данным
• Регулярное обновление систем безопасности
• Обучение персонала правилам работы с данными

Мы не передаём ваши данные третьим лицам без вашего согласия, за исключением случаев, предусмотренных законодательством.`
        },
        {
          title: '6. Хранение данных',
          content: `Персональные данные хранятся в течение срока, необходимого для достижения целей обработки, но не более 5 лет с момента последнего взаимодействия.

По истечении срока хранения или по вашему запросу данные будут удалены или обезличены.`
        },
        {
          title: '7. Ваши права',
          content: `Вы имеете право:

• Получить информацию о ваших персональных данных
• Требовать исправления неточных данных
• Требовать удаления ваших данных
• Отозвать согласие на обработку данных
• Подать жалобу в уполномоченный орган

Для реализации ваших прав свяжитесь с нами по email: gauhars@mail.ru`
        },
        {
          title: '8. Файлы cookie',
          content: `Сайт использует файлы cookie для:

• Обеспечения корректной работы Сайта
• Запоминания ваших предпочтений (язык, тема)
• Сбора аналитических данных о посещаемости

Вы можете отключить cookie в настройках браузера, однако это может повлиять на функциональность Сайта.`
        },
        {
          title: '9. Изменения политики',
          content: `Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. Актуальная версия всегда доступна на данной странице.

Продолжая использовать Сайт после внесения изменений, вы соглашаетесь с обновлённой Политикой.`
        },
        {
          title: '10. Контакты',
          content: `По вопросам, связанным с обработкой персональных данных, вы можете связаться с нами:

Email: gauhars@mail.ru
Телефон: +7 777 211 2211
Адрес: г. Алматы, ул. Аль-Фараби, 77/8`
        }
      ]
    },
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: January 24, 2026',
      sections: [
        {
          title: '1. Introduction',
          content: `This Privacy Policy outlines how personal data of users of gauharsergazina.kz (the "Website") is processed and protected by Gauhar Sergazina Interior Design Studio (the "Company").

By using the Website, you agree to the terms of this Privacy Policy. If you do not agree with the Policy terms, please do not use the Website.`
        },
        {
          title: '2. Data We Collect',
          content: `We may collect the following personal data:

• First and last name
• Phone number
• Email address
• City of residence
• Project information (type, area, budget)
• IP address and browser data
• Cookies and analytics data

We do not collect sensitive data such as bank card details, passport information, or medical records.`
        },
        {
          title: '3. Purposes of Data Processing',
          content: `We use your personal data for the following purposes:

• Processing inquiries and consultation requests
• Contacting you via phone, email, or messengers
• Providing information about services and projects
• Improving service quality and Website functionality
• Analyzing traffic and user behavior
• Compliance with legal requirements`
        },
        {
          title: '4. Legal Basis for Processing',
          content: `Personal data processing is carried out on the following legal grounds:

• Consent of the data subject
• Performance of a contract or taking steps to enter into a contract
• Legitimate interests of the Company (subject to the rights of the data subject)`
        },
        {
          title: '5. Data Protection',
          content: `We take necessary organizational and technical measures to protect your personal data:

• Data encryption during transmission (SSL/TLS)
• Restricted access to personal data
• Regular security system updates
• Staff training on data handling procedures

We do not share your data with third parties without your consent, except as required by law.`
        },
        {
          title: '6. Data Retention',
          content: `Personal data is stored for the period necessary to achieve processing purposes, but no longer than 5 years from the last interaction.

Upon expiration of the retention period or at your request, data will be deleted or anonymized.`
        },
        {
          title: '7. Your Rights',
          content: `You have the right to:

• Obtain information about your personal data
• Request correction of inaccurate data
• Request deletion of your data
• Withdraw consent to data processing
• File a complaint with the supervisory authority

To exercise your rights, contact us at: gauhars@mail.ru`
        },
        {
          title: '8. Cookies',
          content: `The Website uses cookies for:

• Ensuring proper Website functionality
• Remembering your preferences (language, theme)
• Collecting analytical data on traffic

You can disable cookies in your browser settings, however this may affect Website functionality.`
        },
        {
          title: '9. Policy Changes',
          content: `We reserve the right to make changes to this Privacy Policy. The current version is always available on this page.

By continuing to use the Website after changes are made, you agree to the updated Policy.`
        },
        {
          title: '10. Contact',
          content: `For questions related to personal data processing, you can contact us:

Email: gauhars@mail.ru
Phone: +7 777 211 2211
Address: Al-Farabi str. 77/8, Almaty, Kazakhstan`
        }
      ]
    }
  };

  const t = content[language];

  return (
    <PageTransition>
      <SEO 
        title={t.title}
        description={language === 'ru' 
          ? 'Политика конфиденциальности студии дизайна интерьера Gauhar Sergazina' 
          : 'Privacy Policy of Gauhar Sergazina Interior Design Studio'
        }
      />
      <Navigation />
      
      <main className="min-h-screen bg-background pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
              {t.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t.lastUpdated}
            </p>
          </motion.div>

          {/* Content Sections */}
          <div className="space-y-10">
            {t.sections.map((section, index) => (
              <motion.section
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.1 + index * 0.05,
                  ease: [0.16, 1, 0.3, 1] 
                }}
              >
                <h2 className="text-lg font-medium text-foreground mb-4">
                  {section.title}
                </h2>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm">
                  {section.content}
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </PageTransition>
  );
};

export default Privacy;
