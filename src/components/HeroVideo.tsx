import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import heroImage from '@/assets/hero-interior.jpg';

interface HeroVideoProps {
  children: React.ReactNode;
  heroY: any;
}

const HeroVideo = ({ children, heroY }: HeroVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showVideo, setShowVideo] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Check for reduced motion preference and low power mode
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isLowPower = 'connection' in navigator && 
      (navigator as any).connection?.saveData === true;
    
    // Disable video on reduced motion, low power, or mobile with slow connection
    if (prefersReducedMotion || isLowPower) {
      setShowVideo(false);
    }
    
    // On mobile, still try to show video but handle failures gracefully
    if (isMobile && videoRef.current) {
      videoRef.current.play().catch(() => {
        setShowVideo(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Fallback Image (always present for no layout shift) */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          y: heroY,
        }}
      />
      
      {/* Video Background */}
      {showVideo && (
        <motion.div 
          className="absolute inset-0 scale-110"
          style={{ y: heroY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={heroImage}
            preload="auto"
            onLoadedData={handleVideoLoad}
            onCanPlay={handleVideoLoad}
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
        </motion.div>
      )}
      
      {/* Cinematic Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />
      
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, transparent 30%, rgba(0,0,0,0.5) 100%)'
      }} />
      
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none noise-texture" />
      
      {/* Content */}
      {children}
      
      {/* Video Controls - Unobtrusive */}
      {showVideo && isLoaded && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="absolute bottom-8 right-8 z-20 flex gap-2"
        >
          <button
            onClick={togglePlay}
            className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 rounded-full"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 ml-0.5" />
            )}
          </button>
          <button
            onClick={toggleMute}
            className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 rounded-full"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default HeroVideo;
