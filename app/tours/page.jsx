'use client';

import { useState } from 'react';
import TourCard from '@/components/TourCard';
import FilterSidebar from '@/components/FilterSidebar';
import { tours } from '@/lib/data';

export default function ToursPage() {
  const [filteredTours, setFilteredTours] = useState(tours);

  const handleFilter = (filters) => {
    let filtered = tours;

    if (filters.region) {
      filtered = filtered.filter(t => {
        const tour = tours.find(tr => tr.id === t.id);
        return tour?.destinationName.includes(filters.region);
      });
    }

    if (filters.budget) {
      filtered = filtered.filter(t => {
        if (filters.budget === 'Budget') return t.price < 1500;
        if (filters.budget === 'Mid-Range') return t.price >= 1500 && t.price < 3000;
        if (filters.budget === 'Luxury') return t.price >= 3000;
        return true;
      });
    }

    setFilteredTours(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          Discover Tours
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          Explore {tours.length} amazing tours carefully curated for you
        </p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <FilterSidebar onFilter={handleFilter} />
          </div>

          {/* Grid */}
          <div className="lg:col-span-3">
            {filteredTours.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTours.map((tour, idx) => (
                  <TourCard key={tour.id} tour={tour} index={idx} />
                ))}
              </div>
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-2xl text-gray-600 font-semibold">No tours found</p>
                <p className="text-gray-500 mt-2">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
