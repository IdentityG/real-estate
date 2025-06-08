'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/utils/propertyFilters';

interface PropertyMapViewProps {
  properties: Property[];
  filteredProperties: Property[];
  onPropertySelect?: (property: Property) => void;
}

interface PropertyCoordinates {
  id: number;
  x: number;
  y: number;
}

const PropertyMapView: React.FC<PropertyMapViewProps> = ({ properties, filteredProperties }) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'satellite'>('map');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<HTMLDivElement[]>([]);

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

  const markerVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      scale: 1.2,
      transition: { duration: 0.2 }
    }
  };

  const infoCardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  // GSAP animations
  useEffect(() => {
    if (mapRef.current) {
      gsap.fromTo(mapRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    markersRef.current.forEach((marker, index) => {
      if (marker) {
        gsap.fromTo(marker,
          { scale: 0, rotation: -180 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "back.out(1.7)"
          }
        );
      }
    });
  }, [filteredProperties]);

  // Generate property coordinates based on Addis Ababa locations
  const getPropertyCoordinates = (property: Property): PropertyCoordinates => {
    // Base coordinates for different areas in Addis Ababa
    const addisAbabaAreas = {
      'Bole': { baseX: 45, baseY: 35 },
      'Kazanchis': { baseX: 40, baseY: 40 },
      'Piassa': { baseX: 35, baseY: 45 },
      'Merkato': { baseX: 30, baseY: 50 },
      'CMC': { baseX: 50, baseY: 30 },
      'Gerji': { baseX: 55, baseY: 25 },
      'Sarbet': { baseX: 25, baseY: 55 },
      'Megenagna': { baseX: 60, baseY: 40 },
      'Lebu': { baseX: 20, baseY: 35 },
      'Ayat': { baseX: 65, baseY: 60 }
    };

    // Get area from property location or use random
    const locationKey = Object.keys(addisAbabaAreas).find(area => 
      property.location.toLowerCase().includes(area.toLowerCase())
    ) || Object.keys(addisAbabaAreas)[property.id % Object.keys(addisAbabaAreas).length];
    
    const baseCoords = addisAbabaAreas[locationKey as keyof typeof addisAbabaAreas];
    
    // Add some randomness for realistic distribution
    const randomOffsetX = (Math.sin(property.id * 2.5) * 8) + (Math.cos(property.id * 1.7) * 5);
    const randomOffsetY = (Math.cos(property.id * 3.1) * 8) + (Math.sin(property.id * 2.3) * 5);
    
    return {
      id: property.id,
      x: Math.max(5, Math.min(95, baseCoords.baseX + randomOffsetX)),
      y: Math.max(5, Math.min(95, baseCoords.baseY + randomOffsetY))
    };
  };

  const propertyCoordinates = filteredProperties.map(getPropertyCoordinates);

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };

  const getPropertyTypeColor = (type: string) => {
    const colors = {
      'House': 'bg-blue-500',
      'Apartment': 'bg-green-500',
      'Condo': 'bg-purple-500',
      'Townhouse': 'bg-orange-500',
      'Villa': 'bg-red-500',
      'Commercial': 'bg-yellow-500'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-500';
  };

  const getPropertyTypeIcon = (type: string) => {
    const icons = {
      'House': '🏠',
      'Apartment': '🏢',
      'Condo': '🏘️',
      'Townhouse': '🏡',
      'Villa': '🏰',
      'Commercial': '🏬'
    };
    return icons[type as keyof typeof icons] || '🏠';
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Addis Ababa Map...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.section
      className="py-16 bg-gradient-to-br from-gray-50 to-blue-50"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Properties in Addis Ababa
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore premium real estate opportunities across Ethiopia's vibrant capital city
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          ref={mapRef}
          className="relative bg-white rounded-2xl shadow-2xl overflow-hidden"
          style={{ height: '600px' }}
        >
          {/* Map Background */}
          <div 
            className="absolute inset-0 transition-all duration-500"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {viewMode === 'map' ? (
              <Image
                src="https://tile.openstreetmap.org/10/614/393.png"
                alt="Addis Ababa Map"
                fill
                className="object-cover"
                style={{ 
                  filter: 'sepia(10%) saturate(120%) brightness(105%)',
                  transform: 'scale(4)'
                }}
              />
            ) : (
              <Image
                src="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/10/393/614"
                alt="Addis Ababa Satellite"
                fill
                className="object-cover"
                style={{ transform: 'scale(4)' }}
              />
            )}
          </div>

          {/* Property Markers */}
          <div className="absolute inset-0">
            {propertyCoordinates.map((coord, index) => {
              const property = filteredProperties.find(p => p.id === coord.id);
              if (!property) return null;

              return (
                <motion.div
                  key={property.id}
                  ref={(el) => {
                    if (el) markersRef.current[index] = el;
                  }}
                  className="absolute cursor-pointer group"
                  style={{
                    left: `${coord.x}%`,
                    top: `${coord.y}%`,
                    transform: 'translate(-50%, -100%)'
                  }}
                  variants={markerVariants}
                  whileHover="hover"
                  onClick={() => handlePropertySelect(property)}
                >
                  {/* Enhanced 3D Pin */}
                  <div className="relative">
                    {/* Pin Shadow */}
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-black/20 rounded-full blur-sm"></div>
                    
                    {/* Main Pin */}
                    <div className={`relative w-8 h-10 ${getPropertyTypeColor(property.propertyType)} rounded-t-full rounded-b-none shadow-lg transform transition-all duration-200 group-hover:scale-110`}>
                      {/* Pin Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-t-full"></div>
                      
                      {/* Pin Icon */}
                      <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold">
                        {getPropertyTypeIcon(property.propertyType)}
                      </div>
                      
                      {/* Pin Point */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-current rounded-full"></div>
                    </div>

                    {/* Featured Badge */}
                    {property.featured && (
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-xs">⭐</span>
                      </div>
                    )}

                    {/* Price Tag */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-md shadow-md border opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      <span className="text-xs font-semibold text-gray-800">
                        {formatPrice(property.price)}
                      </span>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-white"></div>
                    </div>

                    {/* Pulse Effect */}
                    <div className="absolute inset-0 rounded-t-full animate-ping opacity-20 bg-current"></div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Selected Property Info Card */}
          <AnimatePresence>
            {selectedProperty && (
              <motion.div
                className="absolute top-4 left-4 bg-white rounded-xl shadow-2xl p-6 max-w-sm z-10 border"
                variants={infoCardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Property Image */}
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={selectedProperty.images[0]}
                    alt={selectedProperty.title}
                    fill
                    className="object-cover"
                  />
                  {/* Property Type Badge */}
                  <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-semibold text-white ${getPropertyTypeColor(selectedProperty.propertyType)}`}>
                    {selectedProperty.propertyType}
                  </div>
                  {/* Featured Badge */}
                  {selectedProperty.featured && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                      Featured
                    </div>
                  )}
                </div>

                {/* Property Details */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                    {selectedProperty.title}
                  </h3>
                  
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{selectedProperty.location}</span>
                  </div>

                  <div className="text-2xl font-bold text-blue-600">
                    {formatPrice(selectedProperty.price)}
                  </div>

                  {/* Property Stats */}
                  <div className="grid grid-cols-3 gap-4 py-3 border-t border-gray-100">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">{selectedProperty.bedrooms}</div>
                      <div className="text-xs text-gray-500">Bedrooms</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">{selectedProperty.bathrooms}</div>
                      <div className="text-xs text-gray-500">Bathrooms</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">{selectedProperty.sqft.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Sq Ft</div>
                    </div>
                  </div>

                  {/* Amenities Preview */}
                  {selectedProperty.amenities && selectedProperty.amenities.length > 0 && (
                    <div className="border-t border-gray-100 pt-3">
                      <div className="text-sm font-semibold text-gray-700 mb-2">Key Amenities</div>
                      <div className="flex flex-wrap gap-1">
                        {selectedProperty.amenities.slice(0, 3).map((amenity, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                            {amenity}
                          </span>
                        ))}
                        {selectedProperty.amenities.length > 3 && (
                          <span className="text-gray-500 text-xs px-2 py-1">
                            +{selectedProperty.amenities.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-3">
                    <Link
                      href={`/properties/${selectedProperty.id}`}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-center text-sm font-semibold hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </Link>
                    <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">
                      Save
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {/* View Mode Toggle */}
            <div className="bg-white rounded-lg shadow-lg p-1 flex">
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'map'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Map
              </button>
              <button
                onClick={() => setViewMode('satellite')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'satellite'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Satellite
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="bg-white rounded-lg shadow-lg p-1 flex flex-col">
              <button
                onClick={handleZoomIn}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                disabled={zoomLevel >= 2}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <button
                onClick={handleZoomOut}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                disabled={zoomLevel <= 0.5}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Close Selected Property */}
          {selectedProperty && (
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute top-4 left-[22rem] bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-20"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Map Attribution */}
          <div className="absolute bottom-2 right-2 bg-white/80 px-2 py-1 rounded text-xs text-gray-600">
            © OpenStreetMap contributors
          </div>
        </motion.div>

        {/* Enhanced Legend */}
        <motion.div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Types</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { type: 'House', icon: '🏠', color: 'bg-blue-500' },
              { type: 'Apartment', icon: '🏢', color: 'bg-green-500' },
              { type: 'Condo', icon: '🏘️', color: 'bg-purple-500' },
              { type: 'Townhouse', icon: '🏡', color: 'bg-orange-500' },
              { type: 'Villa', icon: '🏰', color: 'bg-red-500' },
              { type: 'Commercial', icon: '🏬', color: 'bg-yellow-500' }
            ].map((item) => (
              <div key={item.type} className="flex items-center space-x-3">
                <div className={`w-6 h-8 ${item.color} rounded-t-full flex items-center justify-center text-white text-sm shadow-md`}>
                  {item.icon}
                </div>
                <span className="text-sm font-medium text-gray-700">{item.type}</span>
              </div>
            ))}
          </div>
          
          {/* Additional Legend Items */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-xs">⭐</span>
                  </div>
                  <span>Featured Property</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-blue-500 rounded-full animate-ping opacity-50"></div>
                  <span>Interactive Marker</span>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                Click on any marker to view property details
              </div>
            </div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-100 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-green-100 rounded-full opacity-50 animate-pulse delay-1000"></div>
      </div>
    </motion.section>
  );
};

export default PropertyMapView;