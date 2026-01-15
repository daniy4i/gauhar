import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage, getWhatsAppUrl, contactInfo } from '@/lib/i18n';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, MessageCircle } from 'lucide-react';
import { getFeaturedProjects } from '@/data/portfolioData';

const Index = () => {
  const { language, t } = useLanguage();
  const featuredProjects = getFeaturedProjects().slice(0, 6);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&h=1080&fit=crop)',
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-4 tracking-tight">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 tracking-wide">
              {t.hero.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
                <Link to="/contact">
                  {t.hero.cta.request}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link to="/portfolio">
                  {t.hero.cta.portfolio}
                </Link>
              </Button>
              <WhatsAppButton size="lg" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light mb-4">{t.services.title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t.services.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Turnkey Package */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full hover:shadow-elegant transition-shadow">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-light mb-2">{t.services.packages.turnkey.title}</h3>
                  <div className="text-3xl font-medium mb-6">
                    {t.services.packages.turnkey.price}
                    <span className="text-base font-normal text-muted-foreground ml-1">
                      {t.services.packages.turnkey.priceUnit}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {t.services.packages.turnkey.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Supervision Package */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full hover:shadow-elegant transition-shadow border-primary">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-light mb-2">{t.services.packages.supervision.title}</h3>
                  <div className="text-3xl font-medium mb-6">
                    {t.services.packages.supervision.price}
                    <span className="text-base font-normal text-muted-foreground ml-1">
                      {t.services.packages.supervision.priceUnit}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {t.services.packages.supervision.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline">
              <Link to="/services">
                {t.common.learnMore}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light mb-4">{t.portfolio.title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t.portfolio.subtitle}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/portfolio/${project.slug}`} className="group block">
                  <div className="aspect-[4/3] overflow-hidden rounded-lg mb-4">
                    <img
                      src={project.thumbnail}
                      alt={project.title[language]}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-lg font-medium mb-1 group-hover:text-primary transition-colors">
                    {project.title[language]}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description[language]}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/portfolio">
                {t.portfolio.viewProject}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              {language === 'ru' ? 'Готовы начать проект?' : 'Ready to Start Your Project?'}
            </h2>
            <p className="text-muted-foreground mb-10 text-lg">
              {language === 'ru' 
                ? 'Свяжитесь со мной для обсуждения вашей идеи. Первая консультация бесплатно.'
                : 'Get in touch to discuss your idea. First consultation is free.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/contact">
                  {t.services.cta}
                </Link>
              </Button>
              <WhatsAppButton variant="outline" size="lg" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
