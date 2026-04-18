'use client';

import { useState } from 'react';
import { Search, Calendar, MapPin, DollarSign } from 'lucide-react';

export default function SearchBar() {
  const [searchData, setSearchData] = useState({
    destination: '',
    date: '',
    budget: '',
  });

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search:', searchData);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-2"
    >
      {/* Destination */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 border-2 border-transparent hover:border-orange-300 transition-colors">
        <MapPin size={20} className="text-orange-500 shrink-0" />
        <input
          type="text"
          placeholder="Where to?"
          value={searchData.destination}
          onChange={(e) =>
            setSearchData({ ...searchData, destination: e.target.value })
          }
          className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-500"
        />
      </div>

      {/* Date */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 border-2 border-transparent hover:border-orange-300 transition-colors">
        <Calendar size={20} className="text-orange-500 shrink-0" />
        <input
          type="date"
          value={searchData.date}
          onChange={(e) =>
            setSearchData({ ...searchData, date: e.target.value })
          }
          className="w-full bg-transparent outline-none text-gray-900"
        />
      </div>

      {/* Budget */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 border-2 border-transparent hover:border-orange-300 transition-colors">
        <DollarSign size={20} className="text-orange-500 shrink-0" />
        <select
          value={searchData.budget}
          onChange={(e) =>
            setSearchData({ ...searchData, budget: e.target.value })
          }
          className="w-full bg-transparent outline-none text-gray-900"
        >
          <option value="">Budget</option>
          <option value="budget">Budget</option>
          <option value="mid">Mid-Range</option>
          <option value="luxury">Luxury</option>
        </select>
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="col-span-1 sm:col-span-2 lg:col-span-1 px-6 py-3 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 hover:scale-105"
      >
        <Search size={20} />
        <span>Search</span>
      </button>
    </form>
  );
}
