'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { MapPin, Menu, X } from 'lucide-react';

export default function Navbar() {
  const navRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
        gsap.to(navRef.current, {
          backgroundColor: 'rgba(11, 31, 58, 0.95)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          duration: 0.3,
        });
      } else {
        setIsScrolled(false);
        gsap.to(navRef.current, {
          backgroundColor: 'rgba(11, 31, 58, 0.8)',
          boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
          duration: 0.3,
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Destinations', href: '/destinations' },
    { label: 'Tours', href: '/tours' },
    { label: 'Activities', href: '/activities' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50 w-full bg-navy-800 backdrop-blur-md transition-all duration-300"
      style={{ backgroundColor: 'rgba(11, 31, 58, 0.8)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-linear-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
              <MapPin size={24} className="text-white" />
            </div>
            <span className="text-white font-bold text-xl hidden sm:inline">
              MileStep<span className="text-orange-500">Travel</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-orange-500 transition-colors duration-300 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button + Mobile Menu */}
          <div className="flex items-center gap-4">
            <button className="hidden sm:block px-6 py-2 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
              Book Now
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white hover:text-orange-500 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-gray-700">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-gray-300 hover:text-orange-500 px-4 py-2 rounded transition-colors duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
