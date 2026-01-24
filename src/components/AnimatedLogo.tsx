import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AnimatedLogo = () => {
  const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08 + 0.3,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  const name = "GAUHAR";

  return (
    <Link 
      to="/" 
      className="text-xs font-medium tracking-[0.3em] hover:opacity-70 transition-opacity duration-200"
    >
      <span className="inline-flex overflow-hidden">
        {name.split('').map((letter, i) => (
          <motion.span
            key={`logo-${i}`}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={letterVariants}
            className="inline-block"
          >
            {letter}
          </motion.span>
        ))}
      </span>
    </Link>
  );
};

export default AnimatedLogo;
