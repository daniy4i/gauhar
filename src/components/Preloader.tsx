import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [phase, setPhase] = useState<'logo' | 'reveal' | 'done'>('logo');

  useEffect(() => {
    // Phase 1: Show logo animation
    const logoTimer = setTimeout(() => {
      setPhase('reveal');
    }, 1800);

    // Phase 2: Curtain reveal
    const revealTimer = setTimeout(() => {
      setPhase('done');
      setIsLoading(false);
    }, 3000);

    // Also check if page is fully loaded
    const handleLoad = () => {
      setTimeout(() => {
        if (phase === 'logo') setPhase('reveal');
        setTimeout(() => {
          setPhase('done');
          setIsLoading(false);
        }, 1200);
      }, 1500);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(revealTimer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-[#0A0A0B]" />
          
          {/* Noise texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none noise-texture" />

          {/* Radial glow behind logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ delay: 0.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(211 100% 50% / 0.3) 0%, transparent 70%)',
            }}
          />

          {/* Content */}
          <div className="relative text-center z-10">
            {/* Animated glowing ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mb-10 relative w-20 h-20"
            >
              {/* Outer glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, transparent, hsl(211 100% 50% / 0.6), transparent, hsl(211 100% 50% / 0.3), transparent)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
              />
              {/* Inner dark circle */}
              <div className="absolute inset-[2px] rounded-full bg-[#0A0A0B]" />
              {/* Center dot */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="w-2 h-2 rounded-full bg-[hsl(211,100%,50%)]" />
              </motion.div>
            </motion.div>

            {/* Subtitle */}
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="block text-[10px] tracking-[0.5em] text-white/40 uppercase mb-5"
              >
                Interior Designer
              </motion.span>
            </div>

            {/* Name - letter by letter */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white"
              >
                {'Gauhar Sergazina'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    transition={{ 
                      delay: 0.7 + i * 0.04, 
                      duration: 0.5, 
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    className="inline-block"
                    style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.h1>
            </div>

            {/* Animated line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-16 h-px mx-auto mt-8 origin-center"
              style={{
                background: 'linear-gradient(90deg, transparent, hsl(211 100% 50% / 0.6), transparent)',
              }}
            />

            {/* Loading dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="mt-10 flex items-center justify-center gap-1.5"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 rounded-full bg-white/30"
                  animate={{ 
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{ 
                    duration: 1.2, 
                    repeat: Infinity, 
                    delay: i * 0.2,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Curtain reveal - two panels sliding apart */}
          {phase === 'reveal' && (
            <>
              <motion.div
                className="absolute top-0 left-0 w-1/2 h-full bg-[#0A0A0B] z-20"
                initial={{ x: 0 }}
                animate={{ x: '-100%' }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              />
              <motion.div
                className="absolute top-0 right-0 w-1/2 h-full bg-[#0A0A0B] z-20"
                initial={{ x: 0 }}
                animate={{ x: '100%' }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
