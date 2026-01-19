import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: { ru: string; en: string };
  role: { ru: string; en: string };
  text: { ru: string; en: string };
  project?: { ru: string; en: string };
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: { ru: 'Алия К.', en: 'Aliya K.' },
    role: { ru: 'Владелица квартиры, 85 м²', en: 'Apartment Owner, 85 m²' },
    text: {
      ru: 'Гаухар превратила нашу квартиру в настоящий дом мечты. Каждая деталь продумана до мелочей. Особенно впечатлила работа со светом — пространство стало визуально больше и уютнее.',
      en: 'Gauhar transformed our apartment into a true dream home. Every detail was thought through. I was especially impressed by the work with lighting — the space became visually larger and cozier.',
    },
    project: { ru: 'Семейная гостиная', en: 'Family Living Room' },
    rating: 5,
  },
  {
    id: 2,
    name: { ru: 'Нурлан М.', en: 'Nurlan M.' },
    role: { ru: 'Владелец загородного дома', en: 'Country House Owner' },
    text: {
      ru: 'Выбрали Гаухар по рекомендации друзей. Результат превзошел все ожидания — современный лофт с теплом домашнего уюта. Авторский надзор был особенно ценен.',
      en: 'We chose Gauhar on friends\' recommendation. The result exceeded all expectations — a modern loft with the warmth of home comfort. The author\'s supervision was especially valuable.',
    },
    project: { ru: 'Загородный дом в стиле лофт', en: 'Loft Country House' },
    rating: 5,
  },
  {
    id: 3,
    name: { ru: 'Динара Т.', en: 'Dinara T.' },
    role: { ru: 'Ресторатор', en: 'Restaurateur' },
    text: {
      ru: 'Благодаря Гаухар наш ресторан получил уникальную атмосферу. Гости отмечают, как красиво и продуманно оформлено пространство. Рекомендую всем!',
      en: 'Thanks to Gauhar, our restaurant got a unique atmosphere. Guests note how beautifully and thoughtfully the space is designed. I recommend her to everyone!',
    },
    project: { ru: 'Ресторанный комплекс Ayalla', en: 'Ayalla Restaurant Complex' },
    rating: 5,
  },
  {
    id: 4,
    name: { ru: 'Асель и Марат С.', en: 'Assel & Marat S.' },
    role: { ru: 'Молодая семья', en: 'Young Family' },
    text: {
      ru: 'Работать с Гаухар — одно удовольствие. Она слушает, понимает и предлагает решения, о которых мы даже не думали. Теперь у нас самая красивая квартира в доме!',
      en: 'Working with Gauhar is a pleasure. She listens, understands, and offers solutions we hadn\'t even thought of. Now we have the most beautiful apartment in the building!',
    },
    rating: 5,
  },
];

const Testimonials = () => {
  const { language } = useLanguage();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-[0.2em] text-muted-foreground uppercase mb-3 block">
            {language === 'ru' ? 'Отзывы клиентов' : 'Client Testimonials'}
          </span>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">
            {language === 'ru' ? 'Что говорят клиенты' : 'What Clients Say'}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-card border border-border p-8 shadow-soft"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-muted-foreground/20" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Text */}
              <p className="text-muted-foreground leading-relaxed mb-6 italic">
                "{testimonial.text[language]}"
              </p>

              {/* Author */}
              <div className="border-t border-border pt-4">
                <div className="font-medium">{testimonial.name[language]}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role[language]}</div>
                {testimonial.project && (
                  <div className="text-xs text-primary mt-1">
                    {language === 'ru' ? 'Проект: ' : 'Project: '}{testimonial.project[language]}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Proof Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto"
        >
          <div>
            <div className="text-4xl md:text-5xl font-light text-primary mb-2">50+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">
              {language === 'ru' ? 'Проектов' : 'Projects'}
            </div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-light text-primary mb-2">8+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">
              {language === 'ru' ? 'Лет опыта' : 'Years Experience'}
            </div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-light text-primary mb-2">100%</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">
              {language === 'ru' ? 'Довольных клиентов' : 'Happy Clients'}
            </div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-light text-primary mb-2">5★</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">
              {language === 'ru' ? 'Средняя оценка' : 'Average Rating'}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
