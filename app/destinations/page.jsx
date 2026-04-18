'use client';

import { useState } from 'react';
import FilterSidebar from '@/components/FilterSidebar';
import DestinationCard from '@/components/DestinationCard';
import { destinations } from '@/lib/data';

export default function DestinationsPage() {
  const [filteredDestinations, setFilteredDestinations] = useState(destinations);

  const handleFilter = (filters) => {
    let filtered = destinations;

    if (filters.region) {
      filtered = filtered.filter(dest => dest.region === filters.region);
    }

    if (filters.budget) {
      filtered = filtered.filter(dest => dest.budget === filters.budget);
    }

    if (filters.duration) {
      filtered = filtered.filter(dest => dest.duration === filters.duration);
    }

    setFilteredDestinations(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          Explore Destinations
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          Discover {destinations.length} amazing destinations around the world
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
            {filteredDestinations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDestinations.map((dest, idx) => (
                  <DestinationCard key={dest.id} destination={dest} index={idx} />
                ))}
              </div>
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-2xl text-gray-600 font-semibold">No destinations found</p>
                <p className="text-gray-500 mt-2">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
