'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MapPinIcon,
  HomeIcon,
  CurrencyDollarIcon,
  FunnelIcon,
  XMarkIcon,
  ChevronDownIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { MdOutlineBed, MdOutlineShower } from "react-icons/md";

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Filter interfaces
interface FilterState {
  location: string;
  propertyType: string;
  priceMin: string;
  priceMax: string;
  bedrooms: string;
  bathrooms: string;
  amenities: string[];
}

interface AdvancedFilterBarProps {
  onFiltersChange?: (filters: FilterState) => void;
  isSticky?: boolean;
  collapsible?: boolean;
}

const AdvancedFilterBar: React.FC<AdvancedFilterBarProps> = ({
  onFiltersChange,
  isSticky = true,
  collapsible = true
}) => {
  const [filters, setFilters] = useState<FilterState>({
    location: '',
    propertyType: '',
    priceMin: '',
    priceMax: '',
    bedrooms: '',
    bathrooms: '',
    amenities: []
  });


  const [isExpanded, setIsExpanded] = useState(true); // Change to true for initial visibility
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const filterBarRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  // Property type options
  const propertyTypes = [
    { value: 'buy', label: 'Buy', icon: '🏠' },
    { value: 'rent', label: 'Rent', icon: '🔑' },
    { value: 'commercial', label: 'Commercial', icon: '🏢' },
    { value: 'land', label: 'Land', icon: '🌍' }
  ];

  // Location options (mock data)
  const locations = [
    'Downtown', 'Westside', 'Eastside', 'Northside', 'Southside',
    'Marina District', 'Financial District', 'Arts Quarter'
  ];

  // Amenities options
  const amenitiesOptions = [
    'Pool', 'Parking', 'Garden', 'Security', 'Gym', 'Balcony',
    'Air Conditioning', 'Fireplace', 'Walk-in Closet', 'Laundry'
  ];

  // Number options for bedrooms/bathrooms
  const numberOptions = ['1', '2', '3', '4', '5+'];


  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Auto-expand on desktop, keep user preference on mobile
      if (!mobile) {
        setIsExpanded(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // GSAP Sticky and Scroll Animations - FIXED
  useEffect(() => {
    if (!isSticky || !stickyRef.current || isMobile) return; // Don't apply on mobile

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: stickyRef.current,
        start: 'top top',
        end: '+=50vh', // Reduced distance
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          if (collapsible && !isMobile) { // Only on desktop
            const progress = self.progress;
            setIsCollapsed(progress > 0.5); // Higher threshold
          }
        },
        onRefresh: () => {
          // Reset state on refresh
          if (!isMobile) {
            setIsCollapsed(false);
          }
        }
      });
    }, stickyRef);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh(); // Ensure cleanup
    };
  }, [isSticky, collapsible, isMobile]);

  // Handle filter changes
  const handleFilterChange = (key: keyof FilterState, value: string | string[]) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  // Handle amenity toggle
  const toggleAmenity = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    handleFilterChange('amenities', newAmenities);
  };

  // Reset filters
  const resetFilters = () => {
    const emptyFilters: FilterState = {
      location: '',
      propertyType: '',
      priceMin: '',
      priceMax: '',
      bedrooms: '',
      bathrooms: '',
      amenities: []
    };
    setFilters(emptyFilters);
    onFiltersChange?.(emptyFilters);
  };

  // Format currency input
  const formatCurrency = (value: string) => {
    const number = value.replace(/[^\d]/g, '');
    return number ? `$${parseInt(number).toLocaleString()}` : '';
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    },
    collapsed: {
      height: 60,
      transition: { duration: 0.3 }
    },
    expanded: {
      height: 'auto',
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 1, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const mobileToggleVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div
      ref={stickyRef}
      className="w-full bg-gradient-to-r from-white via-alabaster/50 to-white backdrop-blur-md border-b border-silver-mist/50 z-30 relative overflow-hidden"
      id="property-filters"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-deep-teal/10 via-transparent to-royal-navy/10" />
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-warm-sand/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-soft-sage/20 rounded-full blur-2xl" />
      </div>

      <motion.div
        ref={filterBarRef}
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Enhanced Mobile Toggle Button */}
        {isMobile && (
          <motion.div
            className="py-6 flex items-center justify-between"
            variants={mobileToggleVariants}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-deep-teal to-royal-navy rounded-2xl flex items-center justify-center">
                <FunnelIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-playfair font-bold text-charcoal text-lg block">
                  Smart Filters
                </span>
                <span className="font-montserrat text-sm text-slate-gray">
                  Find your perfect property
                </span>
              </div>
              {Object.values(filters).some(v => Array.isArray(v) ? v.length > 0 : v !== '') && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-gradient-to-r from-terracotta to-gold-leaf text-white text-xs px-3 py-1.5 rounded-full font-montserrat font-semibold flex items-center gap-1"
                >
                  <SparklesIcon className="w-3 h-3" />
                  Active
                </motion.div>
              )}
            </div>
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-deep-teal to-royal-navy text-white rounded-2xl font-montserrat font-semibold shadow-lg"
              whileHover={{ scale: 1.02, boxShadow: '0 10px 25px rgba(0, 95, 115, 0.3)' }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{isExpanded ? 'Hide' : 'Show'} Filters</span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <ChevronDownIcon className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </motion.div>
        )}

        {/* Filter Content - FIXED */}
        <AnimatePresence mode="wait">
          {(!isMobile || isExpanded) && (
            <motion.div
              key="filter-content"
              className="overflow-hidden" // Important for clipping content during animation
              initial={{ opacity: 0, y: -20 }} // Start transparent and slightly above
              animate={{ opacity: 1, y: 0 }}    // Fade in and move to original position
              exit={{ opacity: 0, y: -20 }}     // Fade out and move slightly above
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="py-0"> {/* Content wrapper */}
                <div className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 sm:gap-6 lg:gap-8">
                  {/* Enhanced Location Filter */}
                  <motion.div className="space-y-3 w-full" variants={itemVariants}>
                    <label className="block text-sm font-montserrat font-semibold text-charcoal flex items-center gap-2">
                      <div className="w-8 h-8 bg-deep-teal/10 rounded-lg flex items-center justify-center">
                        <MapPinIcon className="w-4 h-4 text-deep-teal" />
                      </div>
                      Location
                    </label>
                    <div className="relative">
                      <select
                        value={filters.location}
                        onChange={(e) => handleFilterChange('location', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-silver-mist rounded-xl focus:ring-2 focus:ring-deep-teal focus:border-deep-teal transition-all duration-300 font-montserrat bg-white hover:border-deep-teal/50 appearance-none cursor-pointer"
                      >
                        <option value="">All Locations</option>
                        {locations.map(location => (
                          <option key={location} value={location}>{location}</option>
                        ))}
                      </select>
                      <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-gray pointer-events-none" />
                      {filters.location && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-deep-teal rounded-full flex items-center justify-center"
                        >
                          <CheckIcon className="w-3 h-3 text-white" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>

                  {/* Enhanced Property Type Filter */}
                  <motion.div className="space-y-3" variants={itemVariants}>
                    <label className="block text-sm font-montserrat font-semibold text-charcoal flex items-center gap-2">
                      <div className="w-8 h-8 bg-royal-navy/10 rounded-lg flex items-center justify-center">
                        <HomeIcon className="w-4 h-4 text-royal-navy" />
                      </div>
                      Property Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {propertyTypes.map(type => (
                        <motion.button
                          key={type.value}
                          onClick={() => handleFilterChange('propertyType',
                            filters.propertyType === type.value ? '' : type.value
                          )}
                          className={`relative px-3 py-2.5 text-sm rounded-xl font-montserrat font-semibold transition-all duration-300 border-2 ${filters.propertyType === type.value
                              ? 'bg-gradient-to-r from-royal-navy to-deep-teal text-white border-royal-navy shadow-lg'
                              : 'bg-white text-charcoal border-silver-mist hover:border-royal-navy/50 hover:bg-royal-navy/5'
                            }`}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="text-base mr-2">{type.icon}</span>
                          {type.label}
                          {filters.propertyType === type.value && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1 -right-1 w-5 h-5 bg-terracotta rounded-full flex items-center justify-center"
                            >
                              <CheckIcon className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Enhanced Price Range */}
                  <motion.div className="space-y-3 md:col-span-2" variants={itemVariants}>
                    <label className="block text-sm font-montserrat font-semibold text-charcoal flex items-center gap-2">
                      <div className="w-8 h-8 bg-gold-leaf/10 rounded-lg flex items-center justify-center">
                        <CurrencyDollarIcon className="w-4 h-4 text-gold-leaf" />
                      </div>
                      Price Range
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-gray font-montserrat text-sm">$</span>
                        <input
                          type="text"
                          placeholder="Min Price"
                          value={filters.priceMin}
                          onChange={(e) => {
                            const formatted = formatCurrency(e.target.value);
                            handleFilterChange('priceMin', formatted);
                          }}
                          className="w-full pl-8 pr-4 py-3 border-2 border-silver-mist rounded-xl focus:ring-2 focus:ring-gold-leaf focus:border-gold-leaf transition-all duration-300 font-montserrat text-sm bg-white hover:border-gold-leaf/50"
                        />
                        {filters.priceMin && (
                          <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            onClick={() => handleFilterChange('priceMin', '')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-slate-gray/20 rounded-full flex items-center justify-center hover:bg-slate-gray/40 transition-colors"
                          >
                            <XMarkIcon className="w-3 h-3 text-slate-gray" />
                          </motion.button>
                        )}
                      </div>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-gray font-montserrat text-sm">$</span>
                        <input
                          type="text"
                          placeholder="Max Price"
                          value={filters.priceMax}
                          onChange={(e) => {
                            const formatted = formatCurrency(e.target.value);
                            handleFilterChange('priceMax', formatted);
                          }}
                          className="w-full pl-8 pr-4 py-3 border-2 border-silver-mist rounded-xl focus:ring-2 focus:ring-gold-leaf focus:border-gold-leaf transition-all duration-300 font-montserrat text-sm bg-white hover:border-gold-leaf/50"
                        />
                        {filters.priceMax && (
                          <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            onClick={() => handleFilterChange('priceMax', '')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-slate-gray/20 rounded-full flex items-center justify-center hover:bg-slate-gray/40 transition-colors"
                          >
                            <XMarkIcon className="w-3 h-3 text-slate-gray" />
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* Enhanced Bedrooms & Bathrooms */}
                  <motion.div
                    className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0"
                    variants={itemVariants}
                  >
                    {/* Bedrooms */}
                    <div className="space-y-4">
                      <label className="flex items-center gap-3 font-montserrat font-semibold text-charcoal text-sm">
                        <div className="w-10 h-10 bg-soft-sage/10 rounded-xl flex items-center justify-center">
                          <MdOutlineBed className="w-5 h-5 text-soft-sage" />
                        </div>
                        <span>Bedrooms</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                        {['Any', '1+', '2+', '3+', '4+', '5+'].map((option, index) => (
                          <motion.button
                            key={option}
                            onClick={() => handleFilterChange('bedrooms', index === 0 ? '' : option.replace('+', ''))}
                            className={`relative py-3 px-4 text-sm rounded-xl font-montserrat font-semibold transition-all duration-300 border-2 min-h-[48px] flex items-center justify-center ${(index === 0 && !filters.bedrooms) || filters.bedrooms === option.replace('+', '')
                                ? 'bg-gradient-to-r from-soft-sage to-deep-teal text-white border-soft-sage shadow-lg'
                                : 'bg-white text-charcoal border-silver-mist hover:border-soft-sage/50 hover:bg-soft-sage/5'
                              }`}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span>{option}</span>
                            {((index === 0 && !filters.bedrooms) || filters.bedrooms === option.replace('+', '')) && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1 w-5 h-5 bg-deep-teal rounded-full flex items-center justify-center"
                              >
                                <CheckIcon className="w-3 h-3 text-white" />
                              </motion.div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Bathrooms */}
                    <div className="space-y-4">
                      <label className="flex items-center gap-3 font-montserrat font-semibold text-charcoal text-sm">
                        <div className="w-10 h-10 bg-terracotta/10 rounded-xl flex items-center justify-center">
                          <MdOutlineShower className="w-5 h-5 text-terracotta" />
                        </div>
                        <span>Bathrooms</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                        {['Any', '1+', '2+', '3+', '4+'].map((option, index) => (
                          <motion.button
                            key={option}
                            onClick={() => handleFilterChange('bathrooms', index === 0 ? '' : option.replace('+', ''))}
                            className={`relative py-3 px-4 text-sm rounded-xl font-montserrat font-semibold transition-all duration-300 border-2 min-h-[48px] flex items-center justify-center ${(index === 0 && !filters.bathrooms) || filters.bathrooms === option.replace('+', '')
                                ? 'bg-gradient-to-r from-terracotta to-gold-leaf text-white border-terracotta shadow-lg'
                                : 'bg-white text-charcoal border-silver-mist hover:border-terracotta/50 hover:bg-terracotta/5'
                              }`}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span>{option}</span>
                            {((index === 0 && !filters.bathrooms) || filters.bathrooms === option.replace('+', '')) && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1 w-5 h-5 bg-gold-leaf rounded-full flex items-center justify-center"
                              >
                                <CheckIcon className="w-3 h-3 text-white" />
                              </motion.div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Enhanced Amenities */}
                  <motion.div
                    className="md:col-span-full space-y-4"
                    variants={itemVariants}
                  >
                    <label className="block font-montserrat font-semibold text-charcoal text-sm flex items-center gap-2">
                      <div className="w-8 h-8 bg-warm-sand/10 rounded-lg flex items-center justify-center">
                        <AdjustmentsHorizontalIcon className="w-4 h-4 text-warm-sand" />
                      </div>
                      Amenities & Features
                      {filters.amenities.length > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-warm-sand text-royal-navy text-xs px-2 py-1 rounded-full font-bold"
                        >
                          {filters.amenities.length} selected
                        </motion.span>
                      )}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {amenitiesOptions.map(amenity => (
                        <motion.button
                          key={amenity}
                          onClick={() => toggleAmenity(amenity)}
                          className={`relative px-4 py-3 rounded-xl text-sm font-montserrat font-semibold transition-all duration-300 border-2 ${filters.amenities.includes(amenity)
                              ? 'bg-gradient-to-r from-warm-sand to-gold-leaf text-royal-navy border-warm-sand shadow-lg'
                              : 'bg-white text-charcoal border-silver-mist hover:border-warm-sand/50 hover:bg-warm-sand/5'
                            }`}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {amenity}
                          {filters.amenities.includes(amenity) && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-deep-teal rounded-full flex items-center justify-center"
                            >
                              <CheckIcon className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
              {/* Enhanced Action Buttons */}
              <motion.div
                className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
                variants={itemVariants}
              >
                <motion.button
                  onClick={() => {
                    // Apply filters logic here
                    console.log('Applying filters:', filters);
                  }}
                  className="group relative px-10 py-4 bg-gradient-to-r from-deep-teal via-royal-navy to-deep-teal text-white font-montserrat font-bold rounded-2xl shadow-2xl overflow-hidden"
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    boxShadow: '0 20px 40px rgba(0, 95, 115, 0.4)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                  <div className="relative flex items-center gap-3">
                    <MagnifyingGlassIcon className="w-5 h-5" />
                    <span>Search Properties</span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      →
                    </motion.div>
                  </div>
                </motion.button>

                <motion.button
                  onClick={resetFilters}
                  className="group px-8 py-4 border-2 border-slate-gray/30 text-slate-gray font-montserrat font-semibold rounded-2xl hover:border-deep-teal hover:text-deep-teal hover:bg-deep-teal/5 transition-all duration-300 backdrop-blur-sm"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-2">
                    <XMarkIcon className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                    Clear All
                  </div>
                </motion.button>

                {/* Filter Summary */}
                {Object.values(filters).some(v => Array.isArray(v) ? v.length > 0 : v !== '') && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 px-4 py-2 bg-warm-sand/20 rounded-full border border-warm-sand/30"
                  >
                    <SparklesIcon className="w-4 h-4 text-warm-sand" />
                    <span className="font-montserrat text-sm text-charcoal">
                      {Object.values(filters).filter(v => Array.isArray(v) ? v.length > 0 : v !== '').length} filters active
                    </span>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AdvancedFilterBar;