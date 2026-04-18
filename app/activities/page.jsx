'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ActivityCard from '@/components/ActivityCard';
import { activities } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export default function ActivitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const containerRef = useRef(null);

  const categories = ['All', 'Adventure', 'Water Sports', 'Relaxation', 'Cultural', 'Culinary'];

  useEffect(() => {
    const cards = document.querySelectorAll('.activity-card');
    cards.forEach((card, idx) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          end: 'top 30%',
          scrub: false,
          once: true,
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: idx * 0.05,
      });
    });
  }, [selectedCategory]);

  const filteredActivities = selectedCategory === 'All'
    ? activities
    : activities.filter(a => a.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          Explore Activities
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          Choose from {activities.length} exciting activities around the world
        </p>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-wrap gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-white text-gray-900 hover:bg-orange-50 border-2 border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Activities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
        {filteredActivities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredActivities.map((activity, idx) => (
              <div key={activity.id} className="activity-card">
                <ActivityCard activity={activity} index={idx} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-600 font-semibold">No activities found</p>
          </div>
        )}
      </div>

      {/* Activity Stats */}
      <section className="py-20 sm:py-32 bg-linear-to-r from-navy-800 to-navy-900 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center text-white">
            <div>
              <p className="text-4xl sm:text-5xl font-bold text-orange-500 mb-2">
                {activities.length}+
              </p>
              <p className="text-gray-300 text-lg">Unique Activities</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-bold text-orange-500 mb-2">
                {new Set(activities.map(a => a.category)).size}
              </p>
              <p className="text-gray-300 text-lg">Activity Types</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-bold text-orange-500 mb-2">
                {new Set(activities.flatMap(a => a.destinations)).size}+
              </p>
              <p className="text-gray-300 text-lg">Destinations</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
