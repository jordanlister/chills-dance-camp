import { useRef, useEffect, useState } from 'react';

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
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent);
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      
      setIsMobile(isMobileUA || isTouchDevice || isSmallScreen);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-scroll logic using setInterval for better mobile compatibility
  useEffect(() => {
    if (isDragging || (!isMobile && isPaused)) return;

    const startAutoScroll = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        if (!scrollRef.current || isDragging || (!isMobile && isPaused)) return;

        const container = scrollRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        // Debug info (remove in production)
        console.log('Auto-scroll debug:', {
          scrollLeft: container.scrollLeft,
          maxScroll,
          clientWidth: container.clientWidth,
          scrollWidth: container.scrollWidth,
          isMobile,
          isDragging,
          isPaused
        });

        if (maxScroll <= 0) {
          // Not enough content to scroll
          return;
        }

        if (container.scrollLeft >= maxScroll - 1) {
          // Reset to start for seamless loop
          container.scrollLeft = 0;
        } else {
          // Increment scroll position
          container.scrollLeft += speed;
        }
      }, 16); // ~60fps
    };

    startAutoScroll();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isDragging, isPaused, isMobile, speed]);

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    
    // Store touch start position for manual scrolling
    const touch = e.touches[0];
    const startX = touch.pageX - (scrollRef.current?.offsetLeft || 0);
    const startScrollLeft = scrollRef.current?.scrollLeft || 0;
    
    // Store these values for touch move
    if (scrollRef.current) {
      scrollRef.current.dataset.startX = startX.toString();
      scrollRef.current.dataset.startScrollLeft = startScrollLeft.toString();
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    
    e.preventDefault();
    
    const touch = e.touches[0];
    const currentX = touch.pageX - (scrollRef.current.offsetLeft || 0);
    const startX = parseFloat(scrollRef.current.dataset.startX || '0');
    const startScrollLeft = parseFloat(scrollRef.current.dataset.startScrollLeft || '0');
    
    const deltaX = currentX - startX;
    const newScrollLeft = startScrollLeft - deltaX;
    
    const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    scrollRef.current.scrollLeft = Math.max(0, Math.min(newScrollLeft, maxScroll));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    // Clean up dataset
    if (scrollRef.current) {
      delete scrollRef.current.dataset.startX;
      delete scrollRef.current.dataset.startScrollLeft;
    }
  };

  // Mouse events for desktop
  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsPaused(false);
    }
  };

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
          className={`flex gap-6 overflow-x-auto scrollbar-hide ${className}`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
        >
          {/* Duplicate children for seamless infinite scroll */}
          {children}
          {children}
        </div>
      </div>
      
      {/* Hide scrollbar completely */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `
      }} />
    </div>
  );
};

export default AutoScrollCards;