'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Users, Star } from 'lucide-react';

export default function TourCard({ tour, index = 0 }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -8,
        duration: 0.15,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        duration: 0.15,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [index]);

  const discountPercent = Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100);

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <Image
          src={tour.image}
          alt={tour.name}
          fill
          className="object-cover"
        />
        {discountPercent > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            -{discountPercent}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-semibold">
            {tour.category}
          </span>
          <div className="flex items-center gap-1">
            <Star size={14} className="text-orange-500 fill-orange-500" />
            <span className="text-xs font-semibold">{tour.rating}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
          {tour.name}
        </h3>

        <p className="text-gray-600 text-sm mb-5 line-clamp-2">
          {tour.description}
        </p>

        {/* Tour Details */}
        <div className="space-y-3 mb-6 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-orange-500" />
            <span>{tour.groupSize} people</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            {tour.originalPrice > tour.price && (
              <p className="text-xs text-gray-400 line-through">${tour.originalPrice}</p>
            )}
            <p className="text-xl font-bold text-orange-600">${tour.price}</p>
          </div>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors">
            Book
          </button>
        </div>
      </div>
    </div>
  );
}
