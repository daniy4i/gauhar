import { useState, useRef, useEffect } from 'react';

interface BlurImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * High-quality image component with blur-up loading effect
 * Optimized for Retina/HiDPI displays with proper image rendering
 */
const BlurImage = ({ 
  src, 
  alt, 
  className = '', 
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}: BlurImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px', // Start loading before image enters viewport
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Preload high-priority images
  useEffect(() => {
    if (priority && src) {
      const img = new Image();
      img.src = src;
    }
  }, [priority, src]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Low-quality placeholder with gradient shimmer */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ease-out ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-muted" />
        <div 
          className="absolute inset-0 animate-shimmer"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, hsl(var(--muted-foreground) / 0.05) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
          }}
        />
      </div>
      
      {/* High-quality image with Retina optimization */}
      {isInView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          sizes={sizes}
          className={`w-full h-full transition-all duration-700 ease-out ${
            isLoaded 
              ? 'opacity-100 blur-0 scale-100' 
              : 'opacity-0 blur-sm scale-[1.02]'
          }`}
          style={{
            objectFit: 'cover',
            // Ensure crisp rendering on Retina displays
            imageRendering: 'auto',
            WebkitFontSmoothing: 'antialiased',
          }}
          onLoad={() => setIsLoaded(true)}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          draggable={false}
        />
      )}
    </div>
  );
};

export default BlurImage;
