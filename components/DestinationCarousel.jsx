'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export default function DestinationCarousel({ destinations }) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);
  const mouseStartRef = useRef(0);
  const dragRef = useRef(false);
  const scrollStartRef = useRef(0);
  const velocityRef = useRef(0);
  const lastClientXRef = useRef(0);
  const lastTimeRef = useRef(0);
  
  // Create infinite carousel by duplicating destinations
  const infiniteDestinations = [...destinations, ...destinations, ...destinations];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const checkScroll = () => {
      // Always allow scrolling in both directions for infinite carousel
      setCanScrollLeft(true);
      setCanScrollRight(true);
      
      // Seamless loop: when reaching end, jump to middle section to continue infinitely
      const maxScroll = container.scrollWidth - container.clientWidth;
      const scrollThreshold = maxScroll * 0.65; // Jump at 65% of scroll
      
      if (container.scrollLeft > scrollThreshold) {
        // Jump back to start position without animation
        container.scrollLeft = container.scrollLeft - (maxScroll / 3);
      }
    };

    checkScroll();
    container.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      container.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  // Initialize scroll position to middle for infinite scrolling
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setTimeout(() => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      container.scrollLeft = maxScroll / 3;
    }, 100);
  }, []);

  // Mouse wheel scroll handler
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      if (e.deltaX !== 0 || Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        const scrollAmount = 400;
        const direction = e.deltaY > 0 ? 'right' : 'left';
        
        gsap.to(container, {
          scrollLeft:
            direction === 'left'
              ? container.scrollLeft - scrollAmount
              : container.scrollLeft + scrollAmount,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  // Touch/swipe handlers
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleTouchStart = (e) => {
      touchStartRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      touchEndRef.current = e.changedTouches[0].clientX;
      handleSwipe();
    };

    const handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartRef.current - touchEndRef.current;

      if (Math.abs(diff) > swipeThreshold) {
        const scrollAmount = 400;
        if (diff > 0) {
          // Swipe left - scroll right
          gsap.to(container, {
            scrollLeft: container.scrollLeft + scrollAmount,
            duration: 0.6,
            ease: 'power2.inOut',
          });
        } else {
          // Swipe right - scroll left
          gsap.to(container, {
            scrollLeft: container.scrollLeft - scrollAmount,
            duration: 0.6,
            ease: 'power2.inOut',
          });
        }
      }
    };

    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Mouse drag scroll handler
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleMouseDown = (e) => {
      dragRef.current = true;
      mouseStartRef.current = e.clientX;
      lastClientXRef.current = e.clientX;
      scrollStartRef.current = container.scrollLeft;
      lastTimeRef.current = Date.now();
      velocityRef.current = 0;
      container.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
      if (!dragRef.current) return;
      
      const currentTime = Date.now();
      const timeDelta = Math.max(currentTime - lastTimeRef.current, 1);
      const diff = e.clientX - mouseStartRef.current;
      const currentClientX = e.clientX;
      const pixelDelta = lastClientXRef.current - currentClientX;
      
      // Calculate velocity (pixels per millisecond)
      velocityRef.current = pixelDelta / timeDelta;
      
      container.scrollLeft = scrollStartRef.current - diff;
      lastClientXRef.current = currentClientX;
      lastTimeRef.current = currentTime;
    };

    const handleMouseUp = () => {
      if (!dragRef.current) return;
      dragRef.current = false;
      container.style.cursor = 'grab';
      
      // Apply inertia scrolling
      const velocity = velocityRef.current;
      if (Math.abs(velocity) > 0.1) {
        const inertiaDistance = velocity * 600; // momentum distance
        gsap.to(container, {
          scrollLeft: container.scrollLeft + inertiaDistance,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    };

    container.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 400;
    gsap.to(container, {
      scrollLeft:
        direction === 'left'
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  return (
    <div className="w-full">
      {/* Header with title and CTA */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">Our Destination</p>
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight max-w-2xl">
            Your Journey to the Perfect Destination Begins Here
          </h2>
        </div>
        <Link
          href="/destinations"
          className="flex items-center gap-2 px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300 whitespace-nowrap"
        >
          See All Destination
          <ArrowRight size={20} />
        </Link>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth-x pb-6 cursor-grab active:cursor-grabbing select-none"
        >
          {infiniteDestinations.map((destination, idx) => (
            <div key={`${destination.id}-${Math.floor(idx / destinations.length)}`} className="flex-shrink-0 w-80">
              <Link href={`/destinations/${destination.slug}`}>
                <div className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer">
                  {/* Image */}
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Content at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {destination.name}
                    </h3>
                    <p className="text-white/90 font-semibold">
                      ${destination.minPrice} / per person
                    </p>
                  </div>

                  {/* Number indicator */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center font-semibold text-gray-900">
                    {(idx % destinations.length) + 1}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex gap-4 justify-center mt-8">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
