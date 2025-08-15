'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/utils/propertyFilters';

interface PropertyComparisonToolProps {
  properties: Property[];
  maxComparisons?: number;
  selectedProperties?: Property[];
  onSelectionChange?: (properties: Property[]) => void;
}

const PropertyComparisonTool: React.FC<PropertyComparisonToolProps> = ({ 
  properties, 
  maxComparisons = 3,
  selectedProperties: externalSelectedProperties = [],
  onSelectionChange
}) => {
  const [selectedProperties, setSelectedProperties] = useState<Property[]>(externalSelectedProperties);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      x: -100,
      transition: { duration: 0.3 }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  // Filter properties based on search
  useEffect(() => {
    const filtered = properties.filter(property =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProperties(filtered);
  }, [searchTerm, properties]);

  // Sync with external selected properties
  useEffect(() => {
    setSelectedProperties(externalSelectedProperties);
  }, [externalSelectedProperties]);

  const addToComparison = (property: Property) => {
    if (selectedProperties.length < maxComparisons && 
        !selectedProperties.find(p => p.id === property.id)) {
      const newSelection = [...selectedProperties, property];
      setSelectedProperties(newSelection);
      onSelectionChange?.(newSelection);
    }
  };

  const removeFromComparison = (propertyId: number) => {
    const newSelection = selectedProperties.filter(p => p.id !== propertyId);
    setSelectedProperties(newSelection);
    onSelectionChange?.(newSelection);
  };

  const clearComparison = () => {
    setSelectedProperties([]);
    onSelectionChange?.([]);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getComparisonMetrics = () => {
    if (selectedProperties.length < 2) return null;

    const metrics = {
      avgPrice: selectedProperties.reduce((sum, p) => sum + p.price, 0) / selectedProperties.length,
      avgSqft: selectedProperties.reduce((sum, p) => sum + p.sqft, 0) / selectedProperties.length,
      avgBedrooms: selectedProperties.reduce((sum, p) => sum + p.bedrooms, 0) / selectedProperties.length,
      priceRange: {
        min: Math.min(...selectedProperties.map(p => p.price)),
        max: Math.max(...selectedProperties.map(p => p.price))
      }
    };

    return metrics;
  };

  const comparisonMetrics = getComparisonMetrics();

  return (
    <>
      {/* Floating Comparison Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: selectedProperties.length > 0 ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          className="relative bg-gradient-to-r from-deep-teal to-royal-navy text-white p-4 rounded-full shadow-elegant hover:shadow-2xl transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          
          {/* Badge */}
          <div className="absolute -top-2 -right-2 bg-terracotta text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-montserrat font-bold">
            {selectedProperties.length}
          </div>
          
          {/* Pulse effect */}
          <div className="absolute inset-0 rounded-full bg-deep-teal animate-ping opacity-20"></div>
        </motion.button>
      </motion.div>

      {/* Comparison Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-midnight/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-deep-teal to-royal-navy text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-playfair font-bold">Property Comparison</h2>
                    <p className="text-silver-mist font-montserrat text-sm mt-1">
                      Compare up to {maxComparisons} properties side by side
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {selectedProperties.length > 1 && (
                      <button
                        onClick={clearComparison}
                        className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-montserrat text-sm transition-colors duration-200"
                      >
                        Clear All
                      </button>
                    )}
                    <button
                      onClick={() => setIsOpen(false)}
                      className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex h-[calc(90vh-120px)]">
                {/* Property Selection Sidebar */}
                <div className="w-80 bg-alabaster border-r border-silver-mist p-6 overflow-y-auto">
                  <div className="mb-6">
                    <h3 className="text-lg font-playfair font-semibold text-charcoal mb-3">
                      Add Properties
                    </h3>
                    
                    {/* Search */}
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search properties..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-silver-mist rounded-lg focus:ring-2 focus:ring-deep-teal focus:border-transparent font-montserrat text-sm"
                      />
                      <svg className="absolute left-3 top-2.5 w-4 h-4 text-slate-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>

                  {/* Property List */}
                  <div className="space-y-3">
                    {filteredProperties.slice(0, 10).map((property) => {
                      const isSelected = selectedProperties.find(p => p.id === property.id);
                      const canAdd = selectedProperties.length < maxComparisons;
                      
                      return (
                        <motion.div
                          key={property.id}
                          className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                            isSelected 
                              ? 'border-deep-teal bg-deep-teal/10' 
                              : canAdd 
                                ? 'border-silver-mist hover:border-deep-teal hover:bg-warm-sand/20' 
                                : 'border-silver-mist bg-gray-50 opacity-50 cursor-not-allowed'
                          }`}
                          onClick={() => !isSelected && canAdd && addToComparison(property)}
                          whileHover={canAdd && !isSelected ? { scale: 1.02 } : {}}
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                              <Image
                                src={property.images[0]}
                                alt={property.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-montserrat font-semibold text-sm text-charcoal truncate">
                                {property.title}
                              </h4>
                              <p className="text-xs text-slate-gray">{property.location}</p>
                              <p className="text-sm font-semibold text-deep-teal">
                                {formatPrice(property.price)}
                              </p>
                            </div>
                            {isSelected && (
                              <div className="text-deep-teal">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Comparison Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                  {selectedProperties.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-warm-sand/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-12 h-12 text-slate-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-playfair font-semibold text-charcoal mb-2">
                          Start Comparing Properties
                        </h3>
                        <p className="text-slate-gray font-montserrat">
                          Select properties from the sidebar to begin your comparison
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Comparison Metrics */}
                      {comparisonMetrics && (
                        <motion.div
                          className="bg-gradient-to-r from-warm-sand/20 to-soft-sage/20 rounded-xl p-6 border border-warm-sand/30"
                          variants={cardVariants}
                        >
                          <h3 className="text-lg font-playfair font-semibold text-charcoal mb-4">
                            Comparison Insights
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-deep-teal">
                                {formatPrice(comparisonMetrics.avgPrice)}
                              </div>
                              <div className="text-sm text-slate-gray font-montserrat">Avg Price</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-deep-teal">
                                {Math.round(comparisonMetrics.avgSqft).toLocaleString()}
                              </div>
                              <div className="text-sm text-slate-gray font-montserrat">Avg Sq Ft</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-deep-teal">
                                {formatPrice(comparisonMetrics.priceRange.min)} - {formatPrice(comparisonMetrics.priceRange.max)}
                              </div>
                              <div className="text-sm text-slate-gray font-montserrat">Price Range</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-deep-teal">
                                {Math.round(comparisonMetrics.avgBedrooms * 10) / 10}
                              </div>
                              <div className="text-sm text-slate-gray font-montserrat">Avg Bedrooms</div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Property Comparison Grid */}
                      <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${selectedProperties.length}, 1fr)` }}>
                        {selectedProperties.map((property, index) => (
                          <motion.div
                            key={property.id}
                            className="bg-white rounded-xl border border-silver-mist shadow-elegant overflow-hidden"
                            variants={cardVariants}
                            layout
                          >
                            {/* Property Image */}
                            <div className="relative h-48">
                              <Image
                                src={property.images[0]}
                                alt={property.title}
                                fill
                                className="object-cover"
                              />
                              <button
                                onClick={() => removeFromComparison(property.id)}
                                className="absolute top-3 right-3 bg-white/90 hover:bg-white text-charcoal p-1.5 rounded-full shadow-md transition-colors duration-200"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                              {property.featured && (
                                <div className="absolute top-3 left-3 bg-deep-teal text-white px-2 py-1 rounded-full text-xs font-montserrat font-medium">
                                  Featured
                                </div>
                              )}
                            </div>

                            {/* Property Details */}
                            <div className="p-6 space-y-4">
                              <div>
                                <h3 className="text-lg font-playfair font-bold text-charcoal mb-1">
                                  {property.title}
                                </h3>
                                <p className="text-sm text-slate-gray font-montserrat">
                                  {property.location}
                                </p>
                              </div>

                              <div className="text-2xl font-bold text-deep-teal">
                                {formatPrice(property.price)}
                              </div>

                              {/* Property Stats */}
                              <div className="grid grid-cols-3 gap-3 py-3 border-t border-silver-mist">
                                <div className="text-center">
                                  <div className="text-lg font-semibold text-charcoal">{property.bedrooms}</div>
                                  <div className="text-xs text-slate-gray font-montserrat">Bedrooms</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-lg font-semibold text-charcoal">{property.bathrooms}</div>
                                  <div className="text-xs text-slate-gray font-montserrat">Bathrooms</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-lg font-semibold text-charcoal">{property.sqft.toLocaleString()}</div>
                                  <div className="text-xs text-slate-gray font-montserrat">Sq Ft</div>
                                </div>
                              </div>

                              {/* Additional Details */}
                              <div className="space-y-2 text-sm font-montserrat">
                                <div className="flex justify-between">
                                  <span className="text-slate-gray">Type:</span>
                                  <span className="text-charcoal capitalize">{property.propertyType}</span>
                                </div>
                                {property.yearBuilt && (
                                  <div className="flex justify-between">
                                    <span className="text-slate-gray">Year Built:</span>
                                    <span className="text-charcoal">{property.yearBuilt}</span>
                                  </div>
                                )}
                                <div className="flex justify-between">
                                  <span className="text-slate-gray">Price/Sq Ft:</span>
                                  <span className="text-charcoal">
                                    ${Math.round(property.price / property.sqft)}
                                  </span>
                                </div>
                              </div>

                              {/* Amenities */}
                              {property.amenities.length > 0 && (
                                <div className="border-t border-silver-mist pt-3">
                                  <div className="text-sm font-semibold text-charcoal mb-2 font-montserrat">Amenities</div>
                                  <div className="flex flex-wrap gap-1">
                                    {property.amenities.slice(0, 4).map((amenity, idx) => (
                                      <span key={idx} className="bg-warm-sand/30 text-charcoal px-2 py-1 rounded-full text-xs font-montserrat">
                                        {amenity}
                                      </span>
                                    ))}
                                    {property.amenities.length > 4 && (
                                      <span className="text-slate-gray text-xs px-2 py-1 font-montserrat">
                                        +{property.amenities.length - 4} more
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Action Button */}
                              <Link
                                href={`/properties/${property.id}`}
                                className="block w-full bg-gradient-to-r from-deep-teal to-royal-navy text-white py-3 px-4 rounded-lg text-center font-montserrat font-semibold hover:from-royal-navy hover:to-deep-teal transition-all duration-300 transform hover:scale-105"
                              >
                                View Details
                              </Link>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PropertyComparisonTool;