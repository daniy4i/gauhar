import { useState, useEffect, useCallback, RefObject } from 'react';

interface TiltValues {
  rotateX: number;
  rotateY: number;
  x: number;
  y: number;
}

export const useMouseTilt = (
  ref: RefObject<HTMLElement>,
  options: { strength?: number; perspective?: number } = {}
) => {
  const { strength = 10, perspective = 1000 } = options;
  const [tilt, setTilt] = useState<TiltValues>({ rotateX: 0, rotateY: 0, x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance from center (normalized -1 to 1)
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);

      // Invert Y for natural tilt feel
      setTilt({
        rotateX: -y * strength,
        rotateY: x * strength,
        x: x * 20,
        y: y * 20,
      });
    },
    [ref, strength]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setTilt({ rotateX: 0, rotateY: 0, x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return { tilt, isHovering, perspective };
};
