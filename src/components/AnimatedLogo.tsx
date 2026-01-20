import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AnimatedLogo = () => {
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05 + 0.3,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  const firstName = "Gauhar";
  const lastName = "Sergazina";

  return (
    <Link 
      to="/" 
      className="text-lg md:text-xl font-light tracking-wide hover:opacity-70 transition-opacity group"
    >
      <span className="inline-flex overflow-hidden">
        {firstName.split('').map((letter, i) => (
          <motion.span
            key={`first-${i}`}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={letterVariants}
            className="font-medium inline-block"
          >
            {letter}
          </motion.span>
        ))}
      </span>
      <span className="text-muted-foreground ml-1 inline-flex overflow-hidden">
        {lastName.split('').map((letter, i) => (
          <motion.span
            key={`last-${i}`}
            custom={i + firstName.length}
            initial="hidden"
            animate="visible"
            variants={letterVariants}
            className="inline-block"
          >
            {letter}
          </motion.span>
        ))}
      </span>
      {/* Accent underline on hover */}
      <motion.div
        className="h-[1px] bg-accent origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </Link>
  );
};

export default AnimatedLogo;
