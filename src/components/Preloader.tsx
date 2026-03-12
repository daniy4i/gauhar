import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    const handleLoad = () => {
      setTimeout(() => setIsLoading(false), 2000);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            filter: 'blur(12px)',
            scale: 1.02,
          }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-[#0A0A0B] flex items-center justify-center"
        >
          {/* Noise texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none noise-texture" />
          
          {/* Soft vignette */}
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{
              background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.5) 100%)'
            }}
          />

          <div className="relative text-center">
            {/* Subtitle */}
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: 30, opacity: 0, filter: 'blur(6px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="block text-[10px] tracking-[0.5em] text-white/40 uppercase mb-5"
              >
                Interior Designer
              </motion.span>
            </div>

            {/* Name */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 40, opacity: 0, filter: 'blur(10px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white"
              >
                Gauhar Sergazina
              </motion.h1>
            </div>

            {/* Thin line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.4 }}
              transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-12 h-px bg-white mx-auto mt-8 origin-center"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
