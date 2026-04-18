'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function TestimonialSlider({ testimonials }) {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [autoPlay, testimonials.length]);

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
    setAutoPlay(false);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setAutoPlay(false);
  };

  const testimonial = testimonials[current];

  return (
    <div className="relative bg-linear-to-r from-navy-800 to-navy-900 rounded-xl overflow-hidden p-8 sm:p-12">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full -mr-48 -mt-48" />

      <div className="relative z-10">
        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={20} className="text-orange-500 fill-orange-500" />
          ))}
        </div>

        {/* Quote */}
        <p className="text-white text-lg sm:text-2xl font-semibold mb-8 italic">
          "{testimonial.comment}"
        </p>

        {/* Author */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-14 h-14 rounded-full overflow-hidden">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-white font-semibold">{testimonial.name}</p>
            <p className="text-gray-300 text-sm">{testimonial.role}</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            className="p-2 rounded-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrent(i);
                  setAutoPlay(false);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-orange-500 w-8' : 'bg-gray-500'
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="p-2 rounded-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
