import { motion } from 'framer-motion';

interface SectionDividerProps {
  variant?: 'gradient' | 'line' | 'fade';
  className?: string;
}

const SectionDivider = ({ variant = 'gradient', className = '' }: SectionDividerProps) => {
  if (variant === 'fade') {
    return (
      <div className={`relative h-24 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>
    );
  }

  if (variant === 'line') {
    return (
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`h-px bg-gradient-to-r from-transparent via-border to-transparent origin-center mx-6 ${className}`}
      />
    );
  }

  // gradient variant
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mx-6 ${className}`}
    />
  );
};

export default SectionDivider;
