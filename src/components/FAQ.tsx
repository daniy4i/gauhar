import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = () => {
  const { language, t } = useLanguage();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <section className="py-24 bg-muted/30 relative">
      {/* Subtle top border for section distinction */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-[0.2em] text-muted-foreground uppercase mb-3 block">
            {language === 'ru' ? 'FAQ' : 'FAQ'}
          </span>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">
            {t.services.faq.title}
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {t.services.faq.items.map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                variants={itemVariants}
              >
                <AccordionItem 
                  value={`item-${index}`}
                  className="bg-background border border-border rounded-lg px-6 shadow-soft hover:shadow-elegant transition-all duration-500 data-[state=open]:shadow-elegant group overflow-hidden"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6 group-hover:text-foreground transition-colors duration-300">
                    <span className="font-medium text-foreground pr-4">
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 animate-slide-up">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
      
      {/* Subtle bottom border for section distinction */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
};

export default FAQ;
