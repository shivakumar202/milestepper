'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { team } from '@/lib/data';
import { Heart, Globe, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  useEffect(() => {
    const cards = document.querySelectorAll('.team-card');
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
        y: 50,
        duration: 0.6,
        delay: idx * 0.1,
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 sm:h-[500px] bg-linear-to-r from-navy-800 to-navy-900 flex items-center justify-center">
        <div className="text-center text-white px-4 sm:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            About MileStepTravel
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Crafting unforgettable journeys since 2015
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Mission */}
            <div className="bg-linear-to-br from-orange-50 to-white rounded-2xl p-8 sm:p-12 border border-orange-200">
              <Heart className="text-orange-500 mb-4" size={40} />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                We believe travel is more than just visiting places; it's about creating memories, discovering cultures, and transforming lives. Our mission is to make premium travel experiences accessible to everyone, helping you explore the world with confidence, comfort, and joy.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-linear-to-br from-blue-50 to-white rounded-2xl p-8 sm:p-12 border border-blue-200">
              <Globe className="text-blue-500 mb-4" size={40} />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                To become the world's most trusted travel partner by connecting people with extraordinary destinations, creating meaningful experiences, and fostering a global community of adventurers, explorers, and dreamers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Our Core Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              These principles guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Authenticity',
                description: 'We create genuine connections between travelers and destinations',
              },
              {
                title: 'Excellence',
                description: 'We maintain highest standards in every aspect of our service',
              },
              {
                title: 'Sustainability',
                description: 'We respect and protect the destinations we help you explore',
              },
              {
                title: 'Innovation',
                description: 'We continuously improve our services and travel experiences',
              },
              {
                title: 'Integrity',
                description: 'We operate with transparency and honesty in all dealings',
              },
              {
                title: 'Community',
                description: 'We empower local communities and support sustainable tourism',
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-6 h-6 bg-orange-500 rounded-full" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Passionate travel experts dedicated to your journey
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.id} className="team-card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden bg-gray-200">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-orange-500 font-semibold text-sm mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 sm:py-32 bg-linear-to-r from-navy-800 to-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center text-white">
            <div>
              <p className="text-4xl sm:text-5xl font-bold text-orange-500 mb-2">50K+</p>
              <p className="text-gray-300 text-lg">Happy Travelers</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-bold text-orange-500 mb-2">150+</p>
              <p className="text-gray-300 text-lg">Destinations</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-bold text-orange-500 mb-2">200+</p>
              <p className="text-gray-300 text-lg">Unique Tours</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-bold text-orange-500 mb-2">9 YRS</p>
              <p className="text-gray-300 text-lg">Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 sm:py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
            Our Story
          </h2>
          <div className="bg-white rounded-xl p-10 sm:p-16 shadow-md">
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              MileStepTravel was born from a simple yet powerful idea: travel should be accessible, authentic, and transformative for everyone. Founded in 2015 by a group of passionate adventurers and travel enthusiasts, we started with a vision to bridge the gap between travelers and the world's most extraordinary destinations.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              What began as a small team of five has grown into a dynamic organization of travel experts, local guides, and dedicated professionals across multiple continents. Today, we're proud to have helped over 50,000 travelers create unforgettable memories while supporting local communities and promoting sustainable tourism.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Every tour, every activity, and every experience we offer is carefully curated to ensure you don't just visit a destination—you become part of its story. We believe that travel has the power to change perspectives, build empathy, and create global citizens. That's why we're committed to not just moving you around the world, but opening your heart to it.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Join Us on a Journey
          </h2>
          <p className="text-gray-600 mb-10 text-lg max-w-2xl mx-auto">
            Discover how MileStepTravel can transform your travel dreams into reality
          </p>
          <a
            href="/destinations"
            className="inline-block px-8 py-4 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 text-lg"
          >
            Explore Destinations
          </a>
        </div>
      </section>
    </div>
  );
}
