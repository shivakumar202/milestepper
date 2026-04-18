'use client';

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import TourCard from '@/components/TourCard';
import ActivityCard from '@/components/ActivityCard';
import { destinations, tours, activities } from '@/lib/data';
import { MapPin, Calendar, DollarSign, Users, Star, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function DestinationDetail({ params }) {
  const { slug } = params;
  const destination = destinations.find(d => d.slug === slug);
  const relatedTours = tours.filter(t => t.destinationId === destination?.id);
  const relatedActivities = activities.filter(a => a.destinations.includes(destination?.name));
  const parallaxRef = useRef(null);

  useEffect(() => {
    if (!parallaxRef.current) return;

    gsap.to(parallaxRef.current, {
      scrollTrigger: {
        trigger: parallaxRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      y: -100,
      duration: 1,
    });
  }, []);

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Destination not found</h1>
          <Link href="/destinations" className="text-orange-500 hover:text-orange-600">
            Back to destinations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Parallax */}
      <div className="relative h-96 sm:h-[500px] overflow-hidden">
        <div ref={parallaxRef} className="absolute inset-0">
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/50 to-transparent" />
        </div>

        {/* Header */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-12">
          <Link href="/destinations" className="w-fit flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-white/30 transition-all">
            <ArrowLeft size={20} />
            <span>Back</span>
          </Link>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                {destination.region}
              </span>
              <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                <Star size={16} className="text-orange-400 fill-orange-400" />
                <span className="text-white font-semibold">{destination.rating}</span>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              {destination.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <section className="py-20 sm:py-32 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Overview</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-10">
                {destination.overview}
              </p>

              {/* Highlights */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {destination.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                      <span className="text-gray-900 font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              <div className="bg-linear-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign size={20} />
                  <p className="text-sm opacity-90">Price Range</p>
                </div>
                <p className="text-3xl font-bold">${destination.minPrice} - ${destination.maxPrice}</p>
              </div>

              <div className="bg-gray-100 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={20} className="text-gray-900" />
                  <p className="text-sm text-gray-600">Best Time</p>
                </div>
                <p className="text-lg font-bold text-gray-900">{destination.bestTime}</p>
              </div>

              <div className="bg-gray-100 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Users size={20} className="text-gray-900" />
                  <p className="text-sm text-gray-600">Difficulty</p>
                </div>
                <p className="text-lg font-bold text-gray-900">{destination.difficulty}</p>
              </div>

              <button className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Available Tours */}
      {relatedTours.length > 0 && (
        <section className="py-20 sm:py-32 bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-16">Tours in {destination.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedTours.map((tour, idx) => (
                <TourCard key={tour.id} tour={tour} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Activities */}
      {relatedActivities.length > 0 && (
        <section className="py-20 sm:py-32 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-16">Activities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedActivities.map((activity, idx) => (
                <ActivityCard key={activity.id} activity={activity} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Placeholder */}
      <section className="py-20 sm:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-16">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="relative h-48 bg-gray-300 rounded-lg overflow-hidden group cursor-pointer">
                <Image
                  src={`https://images.unsplash.com/photo-${i === 0 ? '1506905925346-21bda4d32df4' : i === 1 ? '1488646953014-85cb44e25828' : i === 2 ? '1511632765486-a01980e01a18' : i === 3 ? '1559827260-dc66d52bef19' : i === 4 ? '1537225228614-b8563e69e0e4' : i === 5 ? '1540959375944-7049f642e9d4' : i === 6 ? '1502602898657-3e91760cbb34' : '1612874742237-8f0b89e5bfae'}?w=400&q=80`}
                  alt={`Gallery ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 sm:py-32 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Location</h2>
          <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              src={`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(destination.name)}&key=AIzaSyDOifLa2F9r2Z3CFDxs0m3qnEJEWR5u1tc`}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-linear-to-r from-navy-800 to-navy-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to visit {destination.name}?
          </h2>
          <p className="text-gray-300 text-lg mb-10">
            Book your trip now and start your adventure
          </p>
          <button className="px-8 py-4 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 text-lg">
            Book Your Trip
          </button>
        </div>
      </section>
    </div>
  );
}
