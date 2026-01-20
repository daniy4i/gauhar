import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';
import { portfolioProjects, ProjectCategory } from '@/data/portfolioData';

const PortfolioGallery = () => {
  const { language, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | ProjectCategory>('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filters: { key: 'all' | ProjectCategory; label: { ru: string; en: string } }[] = [
    { key: 'all', label: { ru: 'Все проекты', en: 'All Projects' } },
    { key: 'residential', label: { ru: 'Жилые', en: 'Residential' } },
    { key: 'commercial', label: { ru: 'Коммерческие', en: 'Commercial' } },
  ];

  const filteredProjects = activeFilter === 'all'
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === activeFilter);

  // Curated layout pattern: large, medium, medium, large...
  const getProjectLayout = (index: number) => {
    const pattern = index % 4;
    if (pattern === 0 || pattern === 3) return 'large';
    return 'medium';
  };

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-16 md:mb-24"
        >
          <span className="text-minimal text-muted-foreground block mb-4">
            {t.portfolio.title}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-architectural mb-6">
            {language === 'ru' ? 'Избранные работы' : 'Selected Works'}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {language === 'ru'
              ? 'Каждый проект — это история о функциональности, эстетике и индивидуальном подходе к пространству'
              : 'Each project tells a story of functionality, aesthetics, and individualized approach to space'}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-6 md:gap-10 mb-16 md:mb-20"
        >
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`text-sm md:text-base transition-all duration-500 relative group pb-2 ${
                activeFilter === filter.key
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {filter.label[language]}
              <span
                className={`absolute bottom-0 left-0 h-px bg-foreground transition-all duration-500 ${
                  activeFilter === filter.key ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </button>
          ))}
        </motion.div>

        {/* Projects Grid - Editorial Layout */}
        <div className="space-y-20 md:space-y-32">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => {
              const layout = getProjectLayout(index);
              const isLarge = layout === 'large';
              const isEven = index % 2 === 0;

              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`grid gap-8 md:gap-12 items-end ${
                    isLarge
                      ? 'md:grid-cols-1'
                      : isEven
                      ? 'md:grid-cols-[1.2fr_1fr]'
                      : 'md:grid-cols-[1fr_1.2fr]'
                  }`}
                >
                  {/* Image */}
                  <Link
                    to={`/portfolio/${project.slug}`}
                    className={`block relative overflow-hidden group ${
                      !isLarge && !isEven ? 'md:order-2' : ''
                    }`}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <div
                      className={`relative overflow-hidden ${
                        isLarge ? 'aspect-[16/9]' : 'aspect-[4/3]'
                      }`}
                    >
                      <motion.img
                        src={project.thumbnail}
                        alt={project.title[language]}
                        className="w-full h-full object-cover"
                        initial={false}
                        animate={{
                          scale: hoveredProject === project.id ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        loading="lazy"
                      />
                      
                      {/* Elegant Overlay */}
                      <motion.div
                        className="absolute inset-0 bg-foreground/10"
                        initial={false}
                        animate={{
                          opacity: hoveredProject === project.id ? 1 : 0,
                        }}
                        transition={{ duration: 0.5 }}
                      />

                      {/* View Project Indicator */}
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
                  </Link>

                  {/* Info */}
                  <div
                    className={`space-y-4 md:space-y-6 ${
                      !isLarge && !isEven ? 'md:order-1 md:text-right' : ''
                    } ${isLarge ? 'md:max-w-2xl' : ''}`}
                  >
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{project.area} м²</span>
                      <span className="w-px h-3 bg-border" />
                      <span>{project.location[language]}</span>
                    </div>

                    <Link
                      to={`/portfolio/${project.slug}`}
                      className="block group/title"
                    >
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-architectural transition-colors duration-500 group-hover/title:text-muted-foreground">
                        {project.title[language]}
                      </h3>
                    </Link>

                    <p className="text-muted-foreground leading-relaxed max-w-xl">
                      {project.description[language]}
                    </p>

                    <Link
                      to={`/portfolio/${project.slug}`}
                      className="inline-flex items-center text-sm text-foreground hover:text-muted-foreground transition-colors duration-300 group/link pt-2"
                    >
                      <span className="relative">
                        {t.portfolio.viewProject}
                        <span className="absolute bottom-0 left-0 w-full h-px bg-current scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-left" />
                      </span>
                      <svg
                        className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/link:translate-x-1"
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
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default PortfolioGallery;
