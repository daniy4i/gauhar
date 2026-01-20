import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Minimum display time for the preloader
    const minLoadTime = setTimeout(() => {
      setIsLoading(false);
    }, 2200);

    // Also check if page is fully loaded
    const handleLoad = () => {
      setTimeout(() => setIsLoading(false), 1800);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearTimeout(minLoadTime);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-[#0E0E0F] flex items-center justify-center"
        >
          {/* Noise texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none noise-texture" />
          
          {/* Vignette */}
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{
              background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.4) 100%)'
            }}
          />

          <div className="relative text-center">
            {/* Decorative line top */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-12 h-px bg-[#7A1E24] mx-auto mb-8 origin-center"
            />

            {/* Name animation */}
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="block text-sm tracking-[0.4em] text-[#B6B1A9] uppercase mb-4"
              >
                Interior Designer
              </motion.span>
            </div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-[#F2EFEA]"
              >
                Gauhar Sergazina
              </motion.h1>
            </div>

            {/* Decorative line bottom */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-12 h-px bg-[#7A1E24] mx-auto mt-8 origin-center"
            />

            {/* Loading indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="mt-12"
            >
              <motion.div
                className="w-8 h-px bg-[#B6B1A9]/50 mx-auto"
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  repeatDelay: 0.2
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
