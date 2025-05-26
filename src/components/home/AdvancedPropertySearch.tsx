'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from 'next/navigation';
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  HomeIcon,
  CurrencyDollarIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { MdOutlineBed, MdOutlineShower} from "react-icons/md";

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Search form interface
interface SearchFilters {
  location: string;
  propertyType: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
}

// Dropdown options data
const locationOptions = [
  { value: '', label: 'Select Location' },
  { value: 'addis-ababa-bole', label: 'Addis Ababa - Bole' },
  { value: 'addis-ababa-kazanchis', label: 'Addis Ababa - Kazanchis' },
  { value: 'addis-ababa-piassa', label: 'Addis Ababa - Piassa' },
  { value: 'addis-ababa-merkato', label: 'Addis Ababa - Merkato' },
  { value: 'bahir-dar', label: 'Bahir Dar' },
  { value: 'hawassa', label: 'Hawassa' },
  { value: 'mekelle', label: 'Mekelle' }
];

const propertyTypeOptions = [
  { value: '', label: 'Property Type' },
  { value: 'house', label: 'House' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'land', label: 'Land' },
  { value: 'commercial', label: 'Commercial' }
];

const priceRanges = [
  { value: '', label: 'Any Price' },
  { value: '0-100000', label: 'Under $100,000' },
  { value: '100000-300000', label: '$100,000 - $300,000' },
  { value: '300000-500000', label: '$300,000 - $500,000' },
  { value: '500000-1000000', label: '$500,000 - $1,000,000' },
  { value: '1000000+', label: 'Over $1,000,000' }
];

const roomOptions = [
  { value: '', label: 'Any' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5+', label: '5+' }
];

const AdvancedPropertySearch = () => {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fieldsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Search form state
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  // Handle input changes
  const handleInputChange = (field: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build query parameters
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    
    // Navigate to properties page with filters
    router.push(`/properties?${queryParams.toString()}`);
  };

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state - hide form fields
      if (fieldsRef.current) {
        gsap.set(fieldsRef.current.children, {
          opacity: 0,
          y: 30,
          scale: 0.95
        });
      }

      // Scroll trigger animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        onEnter: () => {
          setIsExpanded(true);
          
          // Animate container expansion
          gsap.to(formRef.current, {
            height: 'auto',
            duration: 0.8,
            ease: 'power3.out'
          });
          
          // Staggered field animations
          if (fieldsRef.current) {
            gsap.to(fieldsRef.current.children, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: 'back.out(1.7)',
              delay: 0.3
            });
          }
          
          // Search button animation
          if (buttonRef.current) {
            gsap.fromTo(buttonRef.current, 
              { opacity: 0, scale: 0.8 },
              { 
                opacity: 1, 
                scale: 1, 
                duration: 0.8, 
                ease: 'elastic.out(1, 0.5)',
                delay: 0.8
              }
            );
          }
        }
      });

      // Background animation
      gsap.to('.search-bg-element', {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none'
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Button hover animations
  const handleButtonHover = () => {
    gsap.to(buttonRef.current, {
      scale: 1.05,
      boxShadow: '0 10px 30px rgba(0, 95, 115, 0.3)',
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleButtonLeave = () => {
    gsap.to(buttonRef.current, {
      scale: 1,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-br from-alabaster via-white to-silver-mist/30 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="search-bg-element absolute top-10 right-10 w-64 h-64 bg-deep-teal/5 rounded-full blur-3xl" />
        <div className="search-bg-element absolute bottom-10 left-10 w-48 h-48 bg-royal-navy/5 rounded-full blur-3xl" style={{ animationDelay: '10s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-warm-sand/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-royal-navy mb-6">
            Find Your{' '}
            <span className="text-deep-teal relative">
              Perfect Home
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-deep-teal to-warm-sand rounded-full" />
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-gray max-w-2xl mx-auto font-montserrat leading-relaxed">
            Use our advanced search to discover properties that match your exact requirements.
          </p>
        </div>

        {/* Search Form */}
        <form 
          ref={formRef}
          onSubmit={handleSearch}
          className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-elegant border border-silver-mist/30 overflow-hidden"
        >
          {/* Form background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-deep-teal/5 via-transparent to-warm-sand/5 rounded-3xl" />
          
          {/* Search Fields Grid */}
          <div 
            ref={fieldsRef}
            className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8"
          >
            {/* Location Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-montserrat font-semibold text-royal-navy mb-2">
                <MapPinIcon className="w-4 h-4 mr-2 text-deep-teal" />
                Location
              </label>
              <div className="relative">
                <select
                  value={filters.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-silver-mist rounded-xl focus:ring-2 focus:ring-deep-teal focus:border-deep-teal transition-all duration-300 font-montserrat appearance-none cursor-pointer"
                >
                  {locationOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-gray pointer-events-none" />
              </div>
            </div>

            {/* Property Type Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-montserrat font-semibold text-royal-navy mb-2">
                <HomeIcon className="w-4 h-4 mr-2 text-deep-teal" />
                Property Type
              </label>
              <div className="relative">
                <select
                  value={filters.propertyType}
                  onChange={(e) => handleInputChange('propertyType', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-silver-mist rounded-xl focus:ring-2 focus:ring-deep-teal focus:border-deep-teal transition-all duration-300 font-montserrat appearance-none cursor-pointer"
                >
                  {propertyTypeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-gray pointer-events-none" />
              </div>
            </div>

            {/* Price Range Field */}
            <div className="space-y-2 md:col-span-2 lg:col-span-1">
              <label className="flex items-center text-sm font-montserrat font-semibold text-royal-navy mb-2">
                <CurrencyDollarIcon className="w-4 h-4 mr-2 text-deep-teal" />
                Price Range
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Min Price"
                  value={filters.minPrice}
                  onChange={(e) => handleInputChange('minPrice', e.target.value)}
                  className="px-4 py-3 bg-white border border-silver-mist rounded-xl focus:ring-2 focus:ring-deep-teal focus:border-deep-teal transition-all duration-300 font-montserrat"
                />
                <input
                  type="text"
                  placeholder="Max Price"
                  value={filters.maxPrice}
                  onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                  className="px-4 py-3 bg-white border border-silver-mist rounded-xl focus:ring-2 focus:ring-deep-teal focus:border-deep-teal transition-all duration-300 font-montserrat"
                />
              </div>
            </div>

            {/* Bedrooms Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-montserrat font-semibold text-royal-navy mb-2">
                <MdOutlineBed className="w-4 h-4 mr-2 text-deep-teal" />
                Bedrooms
              </label>
              <div className="relative">
                <select
                  value={filters.bedrooms}
                  onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-silver-mist rounded-xl focus:ring-2 focus:ring-deep-teal focus:border-deep-teal transition-all duration-300 font-montserrat appearance-none cursor-pointer"
                >
                  {roomOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-gray pointer-events-none" />
              </div>
            </div>

            {/* Bathrooms Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-montserrat font-semibold text-royal-navy mb-2">
                <MdOutlineShower className="w-4 h-4 mr-2 text-deep-teal" />
                Bathrooms
              </label>
              <div className="relative">
                <select
                  value={filters.bathrooms}
                  onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-silver-mist rounded-xl focus:ring-2 focus:ring-deep-teal focus:border-deep-teal transition-all duration-300 font-montserrat appearance-none cursor-pointer"
                >
                  {roomOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-gray pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex justify-center">
            <button
              ref={buttonRef}
              type="submit"
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              className="group relative px-12 py-4 bg-gradient-to-r from-deep-teal to-royal-navy text-white font-montserrat font-semibold rounded-2xl shadow-elegant hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Button background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-royal-navy to-deep-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Button content */}
              <div className="relative flex items-center space-x-3">
                <MagnifyingGlassIcon className="w-5 h-5" />
                <span className="text-lg">Search Properties</span>
              </div>
              
              {/* Button glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-deep-teal to-royal-navy opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300" />
            </button>
          </div>
        </form>

        {/* Bottom decorative element */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-deep-teal rounded-full animate-pulse" />
            <div className="w-16 h-0.5 bg-gradient-to-r from-deep-teal to-warm-sand" />
            <div className="w-2 h-2 bg-warm-sand rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedPropertySearch;