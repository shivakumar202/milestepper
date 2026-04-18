'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function HeroSlider({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const imageRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(
      imageRef.current,
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1 }
    ).fromTo(
      contentRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.6'
    )
  }, [currentSlide])

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length)

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  const slide = slides[currentSlide]

  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">

      {/* Background */}
      <div ref={imageRef} className="absolute inset-0">
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A]/90 via-[#0B1F3A]/60 to-transparent" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex items-center px-6 md:px-16"
      >
        <div className="max-w-xl">
          <h1 className="text-2xl md:text-5xl font-bold text-white leading-tight mb-4">
            {slide.title}
          </h1>

          <p className="text-sm md:text-lg text-gray-300 mb-6">
            {slide.description}
          </p>

          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
            Book Now
          </button>
        </div>
      </div>

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-orange-500 text-white p-2 rounded-full backdrop-blur transition"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-orange-500 text-white p-2 rounded-full backdrop-blur transition"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-2 rounded-full transition-all ${
              i === currentSlide
                ? 'w-6 bg-orange-500'
                : 'w-2 bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}