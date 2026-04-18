'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function FilterSidebar({ onFilter }) {
  const [filters, setFilters] = useState({
    region: '',
    budget: '',
    duration: '',
  });

  const [expanded, setExpanded] = useState({
    region: true,
    budget: true,
    duration: true,
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter?.(newFilters);
  };

  const toggleExpand = (key) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const regions = ['Southeast Asia', 'East Asia', 'Europe', 'South Asia', 'Middle East', 'North America'];
  const budgets = ['Budget', 'Mid-Range', 'Luxury'];
  const durations = ['1-3 days', '4-6 days', '7-10 days', '11-14 days', '14+ days'];

  const FilterGroup = ({ title, key, options }) => (
    <div className="border-b border-gray-200">
      <button
        onClick={() => toggleExpand(key)}
        className="w-full py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <ChevronDown
          size={20}
          className={`text-gray-600 transition-transform ${expanded[key] ? 'rotate-180' : ''}`}
        />
      </button>

      {expanded[key] && (
        <div className="pb-4 space-y-3">
          {options.map(option => (
            <label key={option} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters[key] === option}
                onChange={(e) => handleFilterChange(key, e.target.checked ? option : '')}
                className="w-4 h-4 text-orange-500 rounded cursor-pointer"
              />
              <span className="text-gray-700 group-hover:text-orange-500 transition-colors">
                {option}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <aside className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-24">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Filters</h2>

      <FilterGroup title="Region" key="region" options={regions} />
      <FilterGroup title="Budget" key="budget" options={budgets} />
      <FilterGroup title="Duration" key="duration" options={durations} />

      {/* Clear Filters */}
      {(filters.region || filters.budget || filters.duration) && (
        <button
          onClick={() => {
            setFilters({ region: '', budget: '', duration: '' });
            onFilter?.({ region: '', budget: '', duration: '' });
          }}
          className="w-full mt-6 py-2 text-orange-600 font-semibold hover:bg-orange-50 rounded transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </aside>
  );
}
