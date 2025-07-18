import { useRef, useEffect, useState, useCallback } from 'react';

interface AutoScrollCardsProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

const AutoScrollCards: React.FC<AutoScrollCardsProps> = ({ 
  children, 
  speed = 1, 
  className = '' 
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const animate = useCallback(() => {
    if (!scrollRef.current || isDragging) return;
    
    // On mobile, don't pause for hover - only for touch interaction
    if (!isMobile && isPaused) return;

    const container = scrollRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    if (container.scrollLeft >= maxScroll) {
      container.scrollLeft = 0;
    } else {
      container.scrollLeft += speed;
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [speed, isDragging, isPaused, isMobile]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
    
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - (scrollRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2; // Adjust drag sensitivity
    const newScrollLeft = scrollLeft - walk;
    
    // Ensure we don't scroll beyond bounds
    const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    scrollRef.current.scrollLeft = Math.max(0, Math.min(newScrollLeft, maxScroll));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
    }
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMobile) {
      // Only pause temporarily while actively touching
      setIsDragging(true);
      setStartX(e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0));
      setScrollLeft(scrollRef.current?.scrollLeft || 0);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current || !isMobile) return;
    
    e.preventDefault(); // Prevent page scrolling
    const x = e.touches[0].pageX - (scrollRef.current.offsetLeft || 0);
    const walk = (x - startX) * 1.5; // Reduce sensitivity for smoother touch
    const newScrollLeft = scrollLeft - walk;
    
    const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    scrollRef.current.scrollLeft = Math.max(0, Math.min(newScrollLeft, maxScroll));
  };

  const handleTouchEnd = () => {
    if (isMobile) {
      setIsDragging(false);
      // Auto-scroll resumes immediately since we don't use isPaused for mobile
    }
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => !isMobile && setIsPaused(true)}
      onMouseLeave={() => !isMobile && setIsPaused(false)}
    >
      <div 
        className="overflow-hidden relative"
        style={{ 
          maskImage: 'linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)'
        }}
      >
        <div
          ref={scrollRef}
          className={`flex gap-6 overflow-x-hidden cursor-grab select-none ${className}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {/* Duplicate children for seamless loop */}
          {children}
          {children}
        </div>
      </div>
      
      {/* Hide scrollbar completely */}
      <style dangerouslySetInnerHTML={{
        __html: `
        div::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
};

export default AutoScrollCards;