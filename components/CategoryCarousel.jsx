'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { Users, Zap, Waves, Mountain, Compass } from 'lucide-react'

export default function CategoryCards() {
  const categories = [
    { name: 'Sightseeing', icon: Compass, bg: 'bg-teal-100', color: 'text-teal-500' },
    { name: 'Adventure', icon: Zap, bg: 'bg-purple-100', color: 'text-purple-500' },
    { name: 'Beach', icon: Waves, bg: 'bg-blue-100', color: 'text-blue-500' },
    { name: 'Hill Station', icon: Mountain, bg: 'bg-amber-100', color: 'text-amber-500' },
    { name: 'Activity', icon: Users, bg: 'bg-cyan-100', color: 'text-cyan-500' },
  ]

  useEffect(() => {
    gsap.fromTo(
      '.cat-card',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.5 }
    )
  }, [])

  return (
    <div className="w-full px-4 md:px-10 ">
      <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar">

        {categories.map((cat, i) => {
          const Icon = cat.icon

          return (
            <div
              key={i}
              className="cat-card min-w-[180px] md:min-w-[220px] h-[140px] md:h-[160px] rounded-2xl bg-white shadow-sm flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Icon */}
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-3 ${cat.bg}`}>
                <Icon className={`${cat.color}`} size={28} />
              </div>

              {/* Title */}
              <p className="text-gray-800 font-semibold text-sm md:text-base">
                {cat.name}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}