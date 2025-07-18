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

  const animate = useCallback(() => {
    if (!scrollRef.current || isDragging) return;

    const container = scrollRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    if (container.scrollLeft >= maxScroll) {
      container.scrollLeft = 0;
    } else {
      container.scrollLeft += speed;
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [speed, isDragging]);

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
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    
    const x = e.touches[0].pageX - (scrollRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    const newScrollLeft = scrollLeft - walk;
    
    const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    scrollRef.current.scrollLeft = Math.max(0, Math.min(newScrollLeft, maxScroll));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative">
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