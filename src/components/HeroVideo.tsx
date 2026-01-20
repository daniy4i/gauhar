import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import heroImage from '@/assets/hero-interior.jpg';

interface HeroVideoProps {
  children: React.ReactNode;
  heroY: any;
  onVideoReady?: () => void;
}

const HeroVideo = ({ children, heroY, onVideoReady }: HeroVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showVideo, setShowVideo] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const kenBurnsControls = useAnimation();

  // Ken Burns zoom effect - slow cinematic zoom
  useEffect(() => {
    if (isLoaded && isPlaying) {
      kenBurnsControls.start({
        scale: [1, 1.08],
        transition: {
          duration: 20,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'reverse',
        },
      });
    } else {
      kenBurnsControls.stop();
    }
  }, [isLoaded, isPlaying, kenBurnsControls]);

  // Check for reduced motion preference and low power mode
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLowPower = 'connection' in navigator && 
      (navigator as any).connection?.saveData === true;
    
    // Disable video on reduced motion or low power
    if (prefersReducedMotion || isLowPower) {
      setShowVideo(false);
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
    onVideoReady?.();
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Fallback Image (always present for no layout shift) */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          y: heroY,
          scale: 1.1,
        }}
      />
      
      {/* Video Background with Ken Burns Effect */}
      {showVideo && (
        <motion.div 
          className="absolute inset-0"
          style={{ y: heroY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <motion.div
            className="w-full h-full"
            animate={kenBurnsControls}
            initial={{ scale: 1 }}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover scale-110"
              autoPlay
              muted
              loop
              playsInline
              poster={heroImage}
              preload="auto"
              onLoadedData={handleVideoLoad}
              onCanPlay={handleVideoLoad}
            >
              {/* WebM for better compression (provide hero-video.webm) */}
              <source src="/videos/hero-video.webm" type="video/webm" />
              {/* MP4 fallback */}
              <source src="/videos/hero-video.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </motion.div>
      )}
      
      {/* Cinematic Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />
      
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, transparent 30%, rgba(0,0,0,0.5) 100%)'
      }} />
      
      {/* Film grain effect */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none noise-texture mix-blend-overlay" />
      
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
