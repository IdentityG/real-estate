'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/utils/propertyFilters';
import {
  HeartIcon,
  ShareIcon,
  EyeIcon,
  MapPinIcon,
  HomeIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ChartBarIcon,
  Squares2X2Icon,
  ListBulletIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface PropertyGridProps {
  properties: Property[];
  loading?: boolean;
  onPropertySelect?: (property: Property) => void;
  onFavoriteToggle?: (propertyId: number) => void;
  onVirtualTourOpen?: (property: Property) => void;
  onComparisonToggle?: (property: Property) => void;
  onPropertyDetailsOpen?: (property: Property) => void;
  selectedForComparison?: Property[];
  favorites?: number[];
}

type ViewMode = 'grid' | 'list';
type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'size-desc';

const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  loading = false,
  onPropertySelect,
  onFavoriteToggle,
  onVirtualTourOpen,
  onComparisonToggle,
  onPropertyDetailsOpen,
  selectedForComparison = [],
  favorites = []
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [sortedProperties, setSortedProperties] = useState<Property[]>(properties);
  const [hoveredProperty, setHoveredProperty] = useState<number | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  // Sort properties
  useEffect(() => {
    const sorted = [...properties].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
          return (b.yearBuilt || 0) - (a.yearBuilt || 0);
        case 'size-desc':
          return b.sqft - a.sqft;
        case 'featured':
        default:
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.price - a.price;
      }
    });
    setSortedProperties(sorted);
  }, [properties, sortBy]);

  // GSAP Animations
  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Property cards animation
      gsap.fromTo('.property-grid-card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [loading, sortedProperties, viewMode]);

  const formatPrice = (price: number, propertyType: string) => {
    if (propertyType === 'rent') {
      return `$${price.toLocaleString()}/month`;
    }
    return `$${price.toLocaleString()}`;
  };

  const getPropertyTypeIcon = (type: string) => {
    const icons = {
      'buy': '🏠',
      'rent': '🔑',
      'commercial': '🏢',
      'land': '🌍'
    };
    return icons[type as keyof typeof icons] || '🏠';
  };

  const getPropertyTypeColor = (type: string) => {
    const colors = {
      'buy': 'bg-deep-teal',
      'rent': 'bg-royal-navy',
      'commercial': 'bg-gold-leaf',
      'land': 'bg-soft-sage'
    };
    return colors[type as keyof typeof colors] || 'bg-deep-teal';
  };

  const handleFavoriteToggle = (e: React.MouseEvent, propertyId: number) => {
    e.preventDefault();
    e.stopPropagation();
    onFavoriteToggle?.(propertyId);
  };

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    onPropertySelect?.(property);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  if (loading) {
    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-elegant overflow-hidden animate-pulse">
                <div className="h-64 bg-silver-mist" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-silver-mist rounded w-3/4" />
                  <div className="h-4 bg-silver-mist rounded w-1/2" />
                  <div className="h-6 bg-silver-mist rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-alabaster via-white to-silver-mist/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Controls */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12"
        >
          <div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-royal-navy mb-4">
              Property Listings
            </h2>
            <p className="font-montserrat text-lg text-slate-gray">
              {sortedProperties.length} properties found
            </p>
          </div>

          {/* View Controls */}
          <div className="flex items-center gap-4 mt-6 lg:mt-0">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-white border border-silver-mist rounded-xl px-4 py-3 pr-10 font-montserrat text-sm focus:ring-2 focus:ring-deep-teal focus:border-transparent"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="size-desc">Largest First</option>
              </select>
              <AdjustmentsHorizontalIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-gray pointer-events-none" />
            </div>

            {/* View Mode Toggle */}
            <div className="bg-white rounded-xl border border-silver-mist p-1 flex">
              <motion.button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-deep-teal text-white'
                    : 'text-slate-gray hover:text-deep-teal'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Squares2X2Icon className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-deep-teal text-white'
                    : 'text-slate-gray hover:text-deep-teal'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ListBulletIcon className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Property Grid/List */}
        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'space-y-6'
          }
        >
          <AnimatePresence mode="wait">
            {sortedProperties.map((property, index) => (
              <motion.div
                key={property.id}
                variants={cardVariants}
                layout
                className={`property-grid-card group cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white rounded-2xl shadow-elegant overflow-hidden hover:shadow-2xl transition-all duration-500'
                    : 'bg-white rounded-2xl shadow-elegant overflow-hidden hover:shadow-xl transition-all duration-300 flex'
                }`}
                whileHover={{ y: viewMode === 'grid' ? -8 : -2, scale: viewMode === 'grid' ? 1.02 : 1.01 }}
                onHoverStart={() => setHoveredProperty(property.id)}
                onHoverEnd={() => setHoveredProperty(null)}
                onClick={() => handlePropertyClick(property)}
              >
                {/* Property Image */}
                <div className={`relative overflow-hidden ${
                  viewMode === 'grid' ? 'h-64' : 'w-80 h-48 flex-shrink-0'
                }`}>
                  <Image
                    src={property.images[0]}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Property Type Badge */}
                  <div className={`absolute top-4 left-4 ${getPropertyTypeColor(property.propertyType)} text-white px-3 py-1 rounded-full text-xs font-montserrat font-medium flex items-center gap-1`}>
                    <span>{getPropertyTypeIcon(property.propertyType)}</span>
                    <span className="capitalize">{property.propertyType}</span>
                  </div>

                  {/* Featured Badge */}
                  {property.featured && (
                    <div className="absolute top-4 right-4 bg-terracotta text-white px-3 py-1 rounded-full text-xs font-montserrat font-medium">
                      Featured
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      onClick={(e) => handleFavoriteToggle(e, property.id)}
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-gray hover:text-terracotta transition-colors duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {favorites.includes(property.id) ? (
                        <HeartSolidIcon className="w-5 h-5 text-terracotta" />
                      ) : (
                        <HeartIcon className="w-5 h-5" />
                      )}
                    </motion.button>
                    
                    <motion.button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onComparisonToggle?.(property);
                      }}
                      className={`w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors duration-200 ${
                        selectedForComparison.find(p => p.id === property.id)
                          ? 'text-deep-teal bg-deep-teal/20'
                          : 'text-slate-gray hover:text-deep-teal'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </motion.button>
                    
                    <motion.button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Handle share
                      }}
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-gray hover:text-deep-teal transition-colors duration-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ShareIcon className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Action Buttons Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-3">
                      <motion.button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onVirtualTourOpen?.(property);
                        }}
                        className="bg-white/90 backdrop-blur-sm text-deep-teal px-4 py-2 rounded-xl font-montserrat font-semibold flex items-center gap-2 hover:bg-white transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <EyeIcon className="w-4 h-4" />
                        Virtual Tour
                      </motion.button>
                      
                      <motion.button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onPropertyDetailsOpen?.(property);
                        }}
                        className="bg-deep-teal/90 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-montserrat font-semibold flex items-center gap-2 hover:bg-deep-teal transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <EyeIcon className="w-4 h-4" />
                        Quick View
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Property Details */}
                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-playfair text-xl font-semibold text-charcoal mb-2 group-hover:text-deep-teal transition-colors duration-300">
                        {property.title}
                      </h3>
                      <div className="flex items-center text-slate-gray mb-3">
                        <MapPinIcon className="w-4 h-4 mr-2" />
                        <span className="font-montserrat text-sm">{property.location}</span>
                      </div>
                    </div>
                    
                    {viewMode === 'grid' && (
                      <div className="text-right">
                        <div className="font-playfair text-2xl font-bold text-deep-teal">
                          {formatPrice(property.price, property.propertyType)}
                        </div>
                        {property.sqft > 0 && (
                          <div className="text-sm text-slate-gray font-montserrat">
                            ${Math.round(property.price / property.sqft)}/sq ft
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Property Stats */}
                  {property.sqft > 0 && (
                    <div className="flex items-center gap-6 mb-4 text-sm font-montserrat text-slate-gray">
                      {property.bedrooms > 0 && (
                        <div className="flex items-center gap-1">
                          <HomeIcon className="w-4 h-4" />
                          <span>{property.bedrooms} bed</span>
                        </div>
                      )}
                      {property.bathrooms > 0 && (
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
                          </svg>
                          <span>{property.bathrooms} bath</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <ChartBarIcon className="w-4 h-4" />
                        <span>{property.sqft.toLocaleString()} sq ft</span>
                      </div>
                    </div>
                  )}

                  {/* List View Price */}
                  {viewMode === 'list' && (
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-playfair text-2xl font-bold text-deep-teal">
                        {formatPrice(property.price, property.propertyType)}
                      </div>
                      {property.sqft > 0 && (
                        <div className="text-sm text-slate-gray font-montserrat">
                          ${Math.round(property.price / property.sqft)}/sq ft
                        </div>
                      )}
                    </div>
                  )}

                  {/* Description */}
                  <p className="font-montserrat text-slate-gray text-sm mb-4 line-clamp-2">
                    {property.description}
                  </p>

                  {/* Amenities Preview */}
                  {property.amenities.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {property.amenities.slice(0, 3).map((amenity, idx) => (
                          <span key={idx} className="bg-warm-sand/20 text-deep-teal px-2 py-1 rounded-full text-xs font-montserrat">
                            {amenity}
                          </span>
                        ))}
                        {property.amenities.length > 3 && (
                          <span className="text-slate-gray text-xs px-2 py-1 font-montserrat">
                            +{property.amenities.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Additional Info */}
                  <div className="flex items-center justify-between text-xs font-montserrat text-slate-gray border-t border-silver-mist pt-4">
                    <div className="flex items-center gap-4">
                      {property.yearBuilt && (
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3" />
                          <span>Built {property.yearBuilt}</span>
                        </div>
                      )}
                      {/*<div className="flex items-center gap-1">
                        <CurrencyDollarIcon className="w-3 h-3" />
                        <span>ID: {property.id}</span>
                      </div>*/}
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onPropertyDetailsOpen?.(property);
                        }}
                        className="text-deep-teal hover:text-royal-navy font-semibold text-sm"
                      >
                        Quick View
                      </button>
                      <span className="text-slate-gray">•</span>
                      <Link
                        href={`/properties/${property.id}`}
                        className="text-deep-teal hover:text-royal-navy font-semibold text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Full Details →
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {sortedProperties.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-warm-sand/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <HomeIcon className="w-12 h-12 text-slate-gray" />
            </div>
            <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-4">
              No Properties Found
            </h3>
            <p className="font-montserrat text-slate-gray max-w-md mx-auto">
              Try adjusting your search criteria or browse all available properties.
            </p>
          </motion.div>
        )}

        {/* Comparison Status */}
        {selectedForComparison.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 left-6 bg-deep-teal text-white px-4 py-2 rounded-full shadow-lg z-40"
          >
            <span className="font-montserrat text-sm">
              {selectedForComparison.length} properties selected for comparison
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PropertyGrid;