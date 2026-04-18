'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Star, MapPin } from 'lucide-react';

export default function DestinationCard({ destination, index = 0 }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Instant animation on load
    gsap.from(card, {
      opacity: 0,
      y: 30,
      duration: 0.25,
      delay: index * 0.02,
    });

    // Hover animation
    const handleMouseEnter = () => {
      const img = card.querySelector('img');
      if (img) {
        gsap.to(img, {
          scale: 1.1,
          duration: 0.15,
        });
      }
      gsap.to(card, {
        y: -10,
        boxShadow: '0 20px 40px rgba(11, 31, 58, 0.3)',
        duration: 0.15,
      });
    };

    const handleMouseLeave = () => {
      const img = card.querySelector('img');
      if (img) {
        gsap.to(img, {
          scale: 1,
          duration: 0.15,
        });
      }
      gsap.to(card, {
        y: 0,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        duration: 0.15,
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [index]);

  return (
    <Link href={`/destinations/${destination.slug}`}>
      <div
        ref={cardRef}
        className=" relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden bg-gray-200">
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0  transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900">{destination.name}</h3>
            <div className="flex items-center gap-1 bg-orange-100 px-2 py-1 rounded">
              <Star size={16} className="text-orange-500 fill-orange-500" />
              <span className="text-sm font-semibold text-orange-600">{destination.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-gray-600 mb-3">
            <MapPin size={16} className="text-orange-500" />
            <span className="text-sm">{destination.region}</span>
          </div>

          <p className="text-gray-600 text-sm mb-6 line-clamp-2 flex-grow">
            {destination.shortDescription}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-gray-500">From</p>
              <p className="text-lg font-bold text-orange-600">${destination.minPrice}</p>
            </div>
            <button className="px-4 py-2 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-300">
              Explore
            </button>
          </div>

          {/* Reviews */}
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500">{destination.reviews} reviews</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
