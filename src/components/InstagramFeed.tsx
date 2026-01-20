import { motion } from 'framer-motion';
import { useLanguage, contactInfo } from '@/lib/i18n';
import { Instagram, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Static Instagram posts for showcase (replace with real API integration if needed)
const instagramPosts = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&h=400&fit=crop',
    likes: 234,
    alt: 'Modern living room interior design'
  },
  {
    id: '2', 
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=400&fit=crop',
    likes: 189,
    alt: 'Elegant bedroom design'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=400&fit=crop',
    likes: 312,
    alt: 'Contemporary kitchen interior'
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop',
    likes: 156,
    alt: 'Minimalist dining area'
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=400&h=400&fit=crop',
    likes: 278,
    alt: 'Luxurious bathroom design'
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=400&fit=crop',
    likes: 201,
    alt: 'Stylish home office'
  },
];

const InstagramFeed = () => {
  const { language } = useLanguage();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <span className="text-sm tracking-[0.2em] text-muted-foreground uppercase mb-3 block">
            {language === 'ru' ? 'Подписывайтесь' : 'Follow Along'}
          </span>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
            {language === 'ru' ? 'Instagram' : 'Instagram'}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {language === 'ru' 
              ? 'Следите за новыми проектами и вдохновением в моем Instagram'
              : 'Follow along for new projects and design inspiration'}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href={contactInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group relative aspect-square overflow-hidden bg-muted"
            >
              <img 
                src={post.image} 
                alt={post.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="w-8 h-8 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mt-10"
        >
          <Button asChild variant="outline" size="lg">
            <a 
              href={contactInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-4 h-4 mr-2" />
              @{contactInfo.instagram}
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramFeed;
