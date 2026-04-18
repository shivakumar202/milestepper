import Link from 'next/link';
import { MapPin, Mail, Phone, Heart, Star, Zap } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-linear-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <MapPin size={24} className="text-white" />
              </div>
              <span className="text-white font-bold text-lg">
                MileStep<span className="text-orange-500">Travel</span>
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Discover the world's most extraordinary destinations with our premium travel experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/destinations" className="hover:text-orange-500 transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/tours" className="hover:text-orange-500 transition-colors">
                  Tours
                </Link>
              </li>
              <li>
                <Link href="/activities" className="hover:text-orange-500 transition-colors">
                  Activities
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-500 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-orange-500 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-500 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-500 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-orange-500" />
                <a href="mailto:info@milesteptravel.com" className="hover:text-orange-500 transition-colors">
                  info@milesteptravel.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-orange-500" />
                <a href="tel:+1234567890" className="hover:text-orange-500 transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-orange-500" />
                <span>123 Travel St, World City</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex justify-center gap-6 mb-8">
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
              <Heart size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
              <Star size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
              <Zap size={20} />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-gray-500">
            <p>
              &copy; {currentYear} MileStepTravel. All rights reserved. | 
              <Link href="#" className="hover:text-orange-500 ml-2">
                Privacy Policy
              </Link>
              {' '} | 
              <Link href="#" className="hover:text-orange-500 ml-2">
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
