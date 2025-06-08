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
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import { MdOutlineBed } from "react-icons/md";

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
      className="w-full bg-white shadow-elegant border-b border-silver-mist z-30"
      id="property-filters"
    >
      <motion.div
        ref={filterBarRef}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Mobile Toggle Button */}
        {isMobile && (
          <motion.div 
            className="py-4 flex items-center justify-between"
            variants={mobileToggleVariants}
          >
            <div className="flex items-center gap-3">
              <FunnelIcon className="w-5 h-5 text-deep-teal" />
              <span className="font-montserrat font-semibold text-charcoal">
                Filters
              </span>
              {Object.values(filters).some(v => Array.isArray(v) ? v.length > 0 : v !== '') && (
                <span className="bg-deep-teal text-white text-xs px-2 py-1 rounded-full">
                  Active
                </span>
              )}
            </div>
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 px-4 py-2 bg-deep-teal text-white rounded-lg font-montserrat font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{isExpanded ? 'Hide' : 'Show'} Filters</span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDownIcon className="w-4 h-4" />
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
                <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 sm:gap-4 lg:gap-6">
                  {/* Location Filter */}
                  <motion.div className="space-y-2 w-full" variants={itemVariants}>
                    <label className="block text-sm font-montserrat font-medium text-charcoal">
                      <MapPinIcon className="w-4 h-4 inline mr-2 text-deep-teal" />
                      Location
                    </label>
                    <select
                      value={filters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                      className="w-full px-3 py-2 border border-silver-mist rounded-lg focus:ring-2 focus:ring-deep-teal focus:border-transparent transition-all duration-200 font-montserrat"
                    >
                      <option value="">Select Location</option>
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </motion.div>

                {/* Property Type Filter */}
                <motion.div className="space-y-2" variants={itemVariants}>
                  <label className="block text-sm font-montserrat font-medium text-charcoal">
                    <HomeIcon className="w-4 h-4 inline mr-2 text-deep-teal" />
                    Property Type
                  </label>
                  <div className="grid grid-cols-2 gap-1">
                    {propertyTypes.map(type => (
                      <motion.button
                        key={type.value}
                        onClick={() => handleFilterChange('propertyType', 
                          filters.propertyType === type.value ? '' : type.value
                        )}
                        className={`px-2 py-1.5 text-xs rounded-md font-montserrat font-medium transition-all duration-200 ${
                          filters.propertyType === type.value
                            ? 'bg-deep-teal text-white'
                            : 'bg-alabaster text-charcoal hover:bg-silver-mist'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="mr-1">{type.icon}</span>
                        {type.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Price Range */}
                <motion.div className="space-y-2 md:col-span-2" variants={itemVariants}>
                  <label className="block text-sm font-montserrat font-medium text-charcoal">
                    <CurrencyDollarIcon className="w-4 h-4 inline mr-2 text-deep-teal" />
                    Price Range
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Min Price"
                      value={filters.priceMin}
                      onChange={(e) => {
                        const formatted = formatCurrency(e.target.value);
                        handleFilterChange('priceMin', formatted);
                      }}
                      className="px-3 py-2 border border-silver-mist rounded-lg focus:ring-2 focus:ring-deep-teal focus:border-transparent transition-all duration-200 font-montserrat text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Max Price"
                      value={filters.priceMax}
                      onChange={(e) => {
                        const formatted = formatCurrency(e.target.value);
                        handleFilterChange('priceMax', formatted);
                      }}
                      className="px-3 py-2 border border-silver-mist rounded-lg focus:ring-2 focus:ring-deep-teal focus:border-transparent transition-all duration-200 font-montserrat text-sm"
                    />
                  </div>
                </motion.div>

                {/* Bedrooms & Bathrooms */}
                <motion.div 
                  className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 mb-6"
                  variants={itemVariants}
                >
                  {/* Bedrooms */}
                  <div className="space-y-2">
                    <label className="block font-montserrat font-medium text-charcoal text-sm">
                      <MdOutlineBed className="w-4 h-4 inline mr-2 text-deep-teal" />
                      Bedrooms
                    </label>
                    <select
                      value={filters.bedrooms}
                      onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                      className="w-full px-4 py-3 border border-silver-mist rounded-lg focus:ring-2 focus:ring-deep-teal focus:border-transparent font-montserrat"
                    >
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                      <option value="5">5+</option>
                    </select>
                  </div>
                
                  {/* Bathrooms */}
                  <div className="space-y-2">
                    <label className="block font-montserrat font-medium text-charcoal text-sm">
                      <svg className="w-4 h-4 inline mr-2 text-deep-teal" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
                      </svg>
                      Bathrooms
                    </label>
                    <select
                      value={filters.bathrooms}
                      onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                      className="w-full px-4 py-3 border border-silver-mist rounded-lg focus:ring-2 focus:ring-deep-teal focus:border-transparent font-montserrat"
                    >
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                    </select>
                  </div>
                </motion.div>

                {/* Amenities */}
                <motion.div 
                  className="mb-6 md:col-span-full"
                  variants={itemVariants}
                >
                  <label className="block font-montserrat font-medium text-charcoal text-sm mb-3">
                    <AdjustmentsHorizontalIcon className="w-4 h-4 inline mr-2 text-deep-teal" />
                    Amenities
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {amenitiesOptions.map(amenity => (
                      <motion.button
                        key={amenity}
                        onClick={() => toggleAmenity(amenity)}
                        className={`px-3 py-2 rounded-full text-xs font-montserrat font-medium transition-all duration-200 ${
                          filters.amenities.includes(amenity)
                            ? 'bg-deep-teal text-white shadow-md'
                            : 'bg-silver-mist text-slate-gray hover:bg-warm-sand'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {amenity}
                        {filters.amenities.includes(amenity) && (
                          <XMarkIcon className="w-3 h-3 inline ml-1" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>
              </div>
              {/* Action Buttons */}
              <motion.div 
                className="mt-6 flex flex-col sm:flex-row gap-3 justify-center"
                variants={itemVariants}
              >
                <motion.button
                  onClick={() => {
                    // Apply filters logic here
                    console.log('Applying filters:', filters);
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-deep-teal to-royal-navy text-white font-montserrat font-semibold rounded-lg shadow-elegant hover:shadow-2xl transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Apply Filters
                </motion.button>
                
                <motion.button
                  onClick={resetFilters}
                  className="px-6 py-3 border-2 border-deep-teal text-deep-teal font-montserrat font-semibold rounded-lg hover:bg-deep-teal hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Reset Filters
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AdvancedFilterBar;