'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { DollarSign } from 'lucide-react';

export default function ActivityCard({ activity, index = 0 }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      const img = card.querySelector('img');
      if (img) {
        gsap.to(img, {
          scale: 1.1,
          duration: 0.15,
        });
      }
      gsap.to(card, {
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
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
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
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

  const difficultyColors = {
    Easy: 'bg-green-100 text-green-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    Hard: 'bg-red-100 text-red-700',
  };

  return (
    <div
      ref={cardRef}
      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <Image
          src={activity.image}
          alt={activity.name}
          fill
          className="object-cover transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-semibold">
            {activity.category}
          </span>
          <span className={`text-xs font-semibold px-2 py-1 rounded ${difficultyColors[activity.difficulty]}`}>
            {activity.difficulty}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-3">
          {activity.name}
        </h3>

        <p className="text-gray-600 text-sm mb-5 line-clamp-2">
          {activity.description}
        </p>

        {/* Details */}
        <div className="space-y-3 mb-5 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-orange-500" />
            <span className="font-semibold">${activity.price}</span>
          </div>
        </div>

        {/* Destinations */}
        <div className="mb-5">
          <p className="text-xs text-gray-500 mb-2">Available at:</p>
          <div className="flex flex-wrap gap-1">
            {activity.destinations.slice(0, 2).map((dest) => (
              <span key={dest} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {dest}
              </span>
            ))}
            {activity.destinations.length > 2 && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                +{activity.destinations.length - 2}
              </span>
            )}
          </div>
        </div>

        <button className="w-full px-4 py-2 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-300">
          Book Now
        </button>
      </div>
    </div>
  );
}
