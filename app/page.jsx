'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import HeroSlider from '@/components/HeroSlider';
import SearchBar from '@/components/SearchBar';
import CategoryCarousel from '@/components/CategoryCarousel';
import DestinationCard from '@/components/DestinationCard';
import DestinationCarousel from '@/components/DestinationCarousel';
import TourCard from '@/components/TourCard';
import ActivityCard from '@/components/ActivityCard';
import TestimonialSlider from '@/components/TestimonialSlider';
import SectionWrapper from '@/components/SectionWrapper';
import { destinations, tours, activities, testimonials } from '@/lib/data';
import { Star, MapPin, Users, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const whyChooseRef = useRef(null);
  const [tourTab, setTourTab] = useState('all');
  const [activityTab, setActivityTab] = useState('all');

  useEffect(() => {
    // Animate "Why Choose Us" cards on scroll
    const cards = document.querySelectorAll('.why-card');
    cards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          end: 'top 30%',
          scrub: false,
          once: true,
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        delay: index * 0.1,
      });
    });
  }, []);

  // Get unique destinations for tabs
  const getUniqueTabs = () => {
    const uniqueDestinations = Array.from(
      new Map(tours.map(tour => [tour.destinationId, tour.destinationName])).values()
    );
    return [{ id: 'all', name: 'All Destinations' }, ...uniqueDestinations.map(dest => ({ id: dest, name: dest }))];
  };

  // Filter tours based on selected tab
  const getFilteredTours = () => {
    if (tourTab === 'all') {
      return tours.slice(0, 4);
    } else {
      return tours.filter(tour => tour.destinationName === tourTab).slice(0, 4);
    }
  };

  // Get unique activity categories for tabs
  const getUniqueActivityCategories = () => {
    const uniqueCategories = Array.from(new Set(activities.map(activity => activity.category)));
    return [{ id: 'all', name: 'All Activities' }, ...uniqueCategories.map(cat => ({ id: cat, name: cat }))];
  };

  // Filter activities based on selected tab
  const getFilteredActivities = () => {
    if (activityTab === 'all') {
      return activities.slice(0, 4);
    } else {
      return activities.filter(activity => activity.category === activityTab).slice(0, 4);
    }
  };

  const heroSlides = [
    {
      title: 'Discover Paradise',
      description: 'Explore the world\'s most breathtaking destinations with us',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
      cta: 'Start Exploring',
    },
    {
      title: 'Unforgettable Adventures',
      description: 'Create memories that will last a lifetime',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80',
      cta: 'Book Now',
    },
    {
      title: 'Luxury Escapes',
      description: 'Experience world-class destinations and accommodations',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=80',
      cta: 'Learn More',
    },
  ];

  const whyChooseData = [
    {
      icon: Award,
      title: 'Expert Guides',
      description: 'Local experts curating authentic experiences',
    },
    {
      icon: MapPin,
      title: 'Best Destinations',
      description: 'Hand-picked locations worldwide',
    },
    {
      icon: Star,
      title: 'Premium Service',
      description: '5-star rated customer satisfaction',
    },
    {
      icon: Users,
      title: 'Personal Support',
      description: '24/7 dedicated travel assistance',
    },
  ];

  return (
    <>
      {/* Hero Slider */}
      <div className=" bg-amber-600 ">
        <HeroSlider slides={heroSlides} />
      </div>

      {/* Categories Section */}
      <SectionWrapper className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              We Are Here To Help You Explore The World
            </h3>
            <p className="text-gray-600 mb-10">
              Discover your perfect travel experience
            </p>
            <CategoryCarousel />
          </div>
        </div>
      </SectionWrapper>

      {/* Popular Destinations Carousel */}
      <SectionWrapper className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DestinationCarousel destinations={destinations.slice(0, 6)} />
        </div>
      </SectionWrapper>

      {/* About Section */}
      <SectionWrapper className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <p className="text-sm font-medium text-gray-500 mb-4">Explore About Us</p>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Where Every Journey Begins with You
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Journey through beautiful routes and scenic locations in nature's natural surroundings.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                At Triply, we believe travel should be simple, inspiring, and unforgettable. We create thoughtfully planned journeys that help you discover destinations in the most meaningful way—without the stress. From breathtaking landscapes to unique local experiences, our team focuses on quality, comfort, and authenticity.
              </p>
              <a
                href="/about"
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300 group"
              >
                <span>Start your trip</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>

            {/* Right Images */}
            <div className="order-1 lg:order-2">
              <div className="grid grid-cols-1 gap-6">
                {/* Top Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-lg h-64 sm:h-80">
                  <img
                    src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80&fit=crop"
                    alt="Hot air balloons over scenic landscape"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl" />
                  <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-lg">
                    <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.5 1.5H5.75A2.25 2.25 0 003.5 3.75v12.5A2.25 2.25 0 005.75 18.5h8.5a2.25 2.25 0 002.25-2.25V9" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    </svg>
                    <span className="text-sm font-semibold text-gray-900">See real moments from our journeys</span>
                  </div>
                </div>

                {/* Bottom Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-lg h-64 sm:h-80">
                  <img
                    src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80&fit=crop"
                    alt="Aerial view of beach and coastline"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Why Choose Us */}
      <SectionWrapper className="bg-white" ref={whyChooseRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Why Choose MileStepTravel?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best travel experiences with exceptional service
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseData.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="why-card bg-white rounded-xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                    <Icon size={32} className="text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </SectionWrapper>

      {/* Trending Tours */}
      <SectionWrapper className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
              Trending Tours
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-12">
              Check out our most popular tours booked by travelers like you
            </p>

            {/* Tour Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {getUniqueTabs().map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setTourTab(tab.id)}
                  className={`px-6 sm:px-8 py-3 font-semibold rounded-full transition-all duration-300 whitespace-nowrap ${
                    tourTab === tab.id
                      ? 'bg-orange-500 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-900 border-2 border-gray-200 hover:border-orange-500'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {getFilteredTours().map((tour, idx) => (
              <TourCard key={tour.id} tour={tour} index={idx} />
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/tours"
              className="inline-block px-8 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300"
            >
              Explore All Tours
            </a>
          </div>
        </div>
      </SectionWrapper>

      {/* Activities Preview */}
      <SectionWrapper className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
              Popular Activities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-12">
              From thrilling adventures to relaxing experiences, find the perfect activity
            </p>

            {/* Activity Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {getUniqueActivityCategories().map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivityTab(tab.id)}
                  className={`px-6 sm:px-8 py-3 font-semibold rounded-full transition-all duration-300 whitespace-nowrap ${
                    activityTab === tab.id
                      ? 'bg-orange-500 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-900 border-2 border-gray-200 hover:border-orange-500'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {getFilteredActivities().map((activity, idx) => (
              <ActivityCard key={activity.id} activity={activity} index={idx} />
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/activities"
              className="inline-block px-8 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300"
            >
              View All Activities
            </a>
          </div>
        </div>
      </SectionWrapper>

      {/* Testimonials */}
      <SectionWrapper className="bg-linear-to-r from-navy-800 to-navy-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              What Our Travelers Say
            </h2>
            <p className="text-gray-300">
              Real experiences from our amazing customers
            </p>
          </div>

          <TestimonialSlider testimonials={testimonials} />
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Ready to Explore the World?
          </h2>
          <p className="text-gray-600 mb-10 text-lg max-w-2xl mx-auto">
            Join thousands of travelers who have discovered amazing destinations with us
          </p>
          <a
            href="/destinations"
            className="inline-block px-8 py-4 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 text-lg"
          >
            Start Your Adventure
          </a>
        </div>
      </SectionWrapper>
    </>
  );
}

