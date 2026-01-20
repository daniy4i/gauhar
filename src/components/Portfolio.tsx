import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';
import { portfolioProjects } from '@/data/portfolioData';
import BlurImage from '@/components/BlurImage';

const Portfolio = () => {
  const { language, t } = useLanguage();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  // Show only first 4 projects on homepage
  const featuredProjects = portfolioProjects.slice(0, 4);

  return (
    <section id="work" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-16 md:mb-20"
        >
          <span className="text-minimal text-muted-foreground block mb-4">
            {t.portfolio.title}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-architectural mb-6">
            {language === 'ru' ? 'Избранные работы' : 'Selected Works'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {t.portfolio.subtitle}
          </p>
        </motion.div>

        {/* Projects Grid - Curated Layout */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={index === 0 ? 'md:col-span-2' : ''}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <Link to={`/portfolio/${project.slug}`} className="block group">
                {/* Image */}
                <div
                  className={`relative overflow-hidden mb-6 ${
                    index === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'
                  }`}
                >
                  <motion.div
                    className="w-full h-full"
                    initial={false}
                    animate={{
                      scale: hoveredProject === project.id ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <BlurImage
                      src={project.thumbnail}
                      alt={project.title[language]}
                      className="w-full h-full portfolio-image"
                      priority={index === 0}
                      sizes={index === 0 ? '(max-width: 768px) 100vw, 90vw' : '(max-width: 768px) 100vw, 50vw'}
                    />
                  </motion.div>

                  {/* Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-foreground/10 pointer-events-none"
                    initial={false}
                    animate={{
                      opacity: hoveredProject === project.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* View indicator */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={false}
                    animate={{
                      opacity: hoveredProject === project.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-background bg-foreground/90 backdrop-blur-sm px-6 py-3 text-sm tracking-wide">
                      {t.portfolio.viewProject}
                    </span>
                  </motion.div>
                </div>

                {/* Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{project.area} м²</span>
                    <span className="w-px h-3 bg-border" />
                    <span>{project.location[language]}</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-light text-architectural transition-colors duration-500 group-hover:text-muted-foreground">
                    {project.title[language]}
                  </h3>

                  {index === 0 && (
                    <p className="text-muted-foreground leading-relaxed max-w-2xl">
                      {project.description[language]}
                    </p>
                  )}
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link
            to="/portfolio"
            className="inline-flex items-center text-foreground hover:text-muted-foreground transition-colors group"
          >
            <span className="relative text-lg">
              {language === 'ru' ? 'Смотреть все проекты' : 'View All Projects'}
              <span className="absolute bottom-0 left-0 w-full h-px bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </span>
            <svg
              className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
