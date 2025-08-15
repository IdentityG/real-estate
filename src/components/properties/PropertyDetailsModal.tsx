'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/utils/propertyFilters';
import {
  XMarkIcon,
  HeartIcon,
  ShareIcon,
  MapPinIcon,
  HomeIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ChartBarIcon,
  PhotoIcon,
  PlayIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin();
}

interface PropertyDetailsModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onFavoriteToggle?: (propertyId: number) => void;
  favorites?: number[];
}

const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  property,
  isOpen,
  onClose,
  onFavoriteToggle,
  favorites = []
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'amenities' | 'location'>('overview');
  
  const modalRef = useRef<HTMLDivElement>(null);
  const imageGalleryRef = useRef<HTMLDivElement>(null);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
      setActiveTab('overview');
      setShowVirtualTour(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // GSAP Animations
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const ctx = gsap.context(() => {
      // Modal entrance animation
      gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.9, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );

      // Image gallery animation
      gsap.fromTo('.modal-image',
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out', delay: 0.2 }
      );

      // Content stagger animation
      gsap.fromTo('.modal-content-item',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.3 }
      );
    }, modalRef);

    return () => ctx.revert();
  }, [isOpen, property]);

  if (!property) return null;

  const formatPrice = (price: number, propertyType: string) => {
    if (propertyType === 'rent') {
      return `$${price.toLocaleString()}/month`;
    }
    return `$${price.toLocaleString()}`;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleFavoriteToggle = () => {
    onFavoriteToggle?.(property.id);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: property.description,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 50,
      transition: {
        duration: 0.3,
        ease: 'easeIn'
      }
    }
  };

  const tabVariants = {
    inactive: { opacity: 0.7, y: 0 },
    active: { opacity: 1, y: -2 }
  };

  return (
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
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            className="relative bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-deep-teal to-royal-navy text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h2 className="modal-content-item font-playfair text-2xl md:text-3xl font-bold mb-2">
                    {property.title}
                  </h2>
                  <div className="modal-content-item flex items-center text-warm-sand/90">
                    <MapPinIcon className="w-5 h-5 mr-2" />
                    <span className="font-montserrat">{property.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {/* Action Buttons */}
                  <motion.button
                    onClick={handleFavoriteToggle}
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {favorites.includes(property.id) ? (
                      <HeartSolidIcon className="w-6 h-6 text-terracotta" />
                    ) : (
                      <HeartIcon className="w-6 h-6" />
                    )}
                  </motion.button>
                  
                  <motion.button
                    onClick={handleShare}
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ShareIcon className="w-6 h-6" />
                  </motion.button>
                  
                  <motion.button
                    onClick={onClose}
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </motion.button>
                </div>
              </div>

              {/* Price */}
              <div className="modal-content-item mt-4">
                <div className="font-playfair text-3xl md:text-4xl font-bold text-warm-sand">
                  {formatPrice(property.price, property.propertyType)}
                </div>
                {property.sqft > 0 && (
                  <div className="text-warm-sand/80 font-montserrat">
                    ${Math.round(property.price / property.sqft)}/sq ft
                  </div>
                )}
              </div>
            </div>

            <div className="flex h-[calc(90vh-200px)]">
              {/* Image Gallery */}
              <div className="w-1/2 relative">
                <div ref={imageGalleryRef} className="relative h-full">
                  <Image
                    src={property.images[currentImageIndex]}
                    alt={property.title}
                    fill
                    className="modal-image object-cover"
                  />
                  
                  {/* Image Navigation */}
                  {property.images.length > 1 && (
                    <>
                      <motion.button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-charcoal hover:bg-white transition-colors duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ChevronLeftIcon className="w-6 h-6" />
                      </motion.button>
                      
                      <motion.button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-charcoal hover:bg-white transition-colors duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ChevronRightIcon className="w-6 h-6" />
                      </motion.button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-4 bg-midnight/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-montserrat">
                    {currentImageIndex + 1} / {property.images.length}
                  </div>

                  {/* Virtual Tour Button */}
                  <motion.button
                    onClick={() => setShowVirtualTour(true)}
                    className="absolute bottom-4 right-4 bg-deep-teal text-white px-4 py-2 rounded-xl font-montserrat font-semibold flex items-center gap-2 hover:bg-deep-teal/90 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <PlayIcon className="w-4 h-4" />
                    Virtual Tour
                  </motion.button>
                </div>

                {/* Image Thumbnails */}
                {property.images.length > 1 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-midnight/80 to-transparent p-4">
                    <div className="flex gap-2 overflow-x-auto">
                      {property.images.map((image, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 ${
                            index === currentImageIndex ? 'ring-2 ring-warm-sand' : ''
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Image
                            src={image}
                            alt={`${property.title} ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Content Panel */}
              <div className="w-1/2 flex flex-col">
                {/* Tab Navigation */}
                <div className="border-b border-silver-mist">
                  <div className="flex">
                    {[
                      { id: 'overview', label: 'Overview' },
                      { id: 'details', label: 'Details' },
                      { id: 'amenities', label: 'Amenities' },
                      { id: 'location', label: 'Location' }
                    ].map((tab) => (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-6 py-4 font-montserrat font-semibold text-sm transition-all duration-200 ${
                          activeTab === tab.id
                            ? 'text-deep-teal border-b-2 border-deep-teal'
                            : 'text-slate-gray hover:text-deep-teal'
                        }`}
                        variants={tabVariants}
                        animate={activeTab === tab.id ? 'active' : 'inactive'}
                      >
                        {tab.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        {/* Property Stats */}
                        <div className="grid grid-cols-3 gap-4">
                          {property.bedrooms > 0 && (
                            <div className="text-center p-4 bg-warm-sand/10 rounded-xl">
                              <HomeIcon className="w-8 h-8 text-deep-teal mx-auto mb-2" />
                              <div className="font-playfair text-2xl font-bold text-charcoal">
                                {property.bedrooms}
                              </div>
                              <div className="text-sm text-slate-gray font-montserrat">Bedrooms</div>
                            </div>
                          )}
                          
                          {property.bathrooms > 0 && (
                            <div className="text-center p-4 bg-warm-sand/10 rounded-xl">
                              <svg className="w-8 h-8 text-deep-teal mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
                              </svg>
                              <div className="font-playfair text-2xl font-bold text-charcoal">
                                {property.bathrooms}
                              </div>
                              <div className="text-sm text-slate-gray font-montserrat">Bathrooms</div>
                            </div>
                          )}
                          
                          {property.sqft > 0 && (
                            <div className="text-center p-4 bg-warm-sand/10 rounded-xl">
                              <ChartBarIcon className="w-8 h-8 text-deep-teal mx-auto mb-2" />
                              <div className="font-playfair text-2xl font-bold text-charcoal">
                                {property.sqft.toLocaleString()}
                              </div>
                              <div className="text-sm text-slate-gray font-montserrat">Sq Ft</div>
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        <div>
                          <h3 className="font-playfair text-xl font-semibold text-charcoal mb-3">
                            Description
                          </h3>
                          <p className="font-montserrat text-slate-gray leading-relaxed">
                            {property.description}
                          </p>
                        </div>

                        {/* Key Features */}
                        <div>
                          <h3 className="font-playfair text-xl font-semibold text-charcoal mb-3">
                            Key Features
                          </h3>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center gap-2">
                              <StarIcon className="w-4 h-4 text-deep-teal" />
                              <span className="font-montserrat text-sm text-slate-gray">
                                {property.propertyType === 'rent' ? 'For Rent' : 'For Sale'}
                              </span>
                            </div>
                            {property.yearBuilt && (
                              <div className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4 text-deep-teal" />
                                <span className="font-montserrat text-sm text-slate-gray">
                                  Built in {property.yearBuilt}
                                </span>
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <CurrencyDollarIcon className="w-4 h-4 text-deep-teal" />
                              <span className="font-montserrat text-sm text-slate-gray">
                                Property ID: {property.id}
                              </span>
                            </div>
                            {property.featured && (
                              <div className="flex items-center gap-2">
                                <StarIcon className="w-4 h-4 text-terracotta" />
                                <span className="font-montserrat text-sm text-slate-gray">
                                  Featured Property
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'details' && (
                      <motion.div
                        key="details"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <h3 className="font-playfair text-xl font-semibold text-charcoal mb-4">
                          Property Details
                        </h3>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between py-2 border-b border-silver-mist">
                            <span className="font-montserrat text-slate-gray">Property Type</span>
                            <span className="font-montserrat font-semibold text-charcoal capitalize">
                              {property.propertyType}
                            </span>
                          </div>
                          
                          <div className="flex justify-between py-2 border-b border-silver-mist">
                            <span className="font-montserrat text-slate-gray">Price</span>
                            <span className="font-montserrat font-semibold text-charcoal">
                              {formatPrice(property.price, property.propertyType)}
                            </span>
                          </div>
                          
                          {property.sqft > 0 && (
                            <>
                              <div className="flex justify-between py-2 border-b border-silver-mist">
                                <span className="font-montserrat text-slate-gray">Square Feet</span>
                                <span className="font-montserrat font-semibold text-charcoal">
                                  {property.sqft.toLocaleString()} sq ft
                                </span>
                              </div>
                              
                              <div className="flex justify-between py-2 border-b border-silver-mist">
                                <span className="font-montserrat text-slate-gray">Price per Sq Ft</span>
                                <span className="font-montserrat font-semibold text-charcoal">
                                  ${Math.round(property.price / property.sqft)}
                                </span>
                              </div>
                            </>
                          )}
                          
                          {property.bedrooms > 0 && (
                            <div className="flex justify-between py-2 border-b border-silver-mist">
                              <span className="font-montserrat text-slate-gray">Bedrooms</span>
                              <span className="font-montserrat font-semibold text-charcoal">
                                {property.bedrooms}
                              </span>
                            </div>
                          )}
                          
                          {property.bathrooms > 0 && (
                            <div className="flex justify-between py-2 border-b border-silver-mist">
                              <span className="font-montserrat text-slate-gray">Bathrooms</span>
                              <span className="font-montserrat font-semibold text-charcoal">
                                {property.bathrooms}
                              </span>
                            </div>
                          )}
                          
                          {property.yearBuilt && (
                            <div className="flex justify-between py-2 border-b border-silver-mist">
                              <span className="font-montserrat text-slate-gray">Year Built</span>
                              <span className="font-montserrat font-semibold text-charcoal">
                                {property.yearBuilt}
                              </span>
                            </div>
                          )}
                          
                          <div className="flex justify-between py-2 border-b border-silver-mist">
                            <span className="font-montserrat text-slate-gray">Address</span>
                            <span className="font-montserrat font-semibold text-charcoal">
                              {property.address}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'amenities' && (
                      <motion.div
                        key="amenities"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <h3 className="font-playfair text-xl font-semibold text-charcoal mb-4">
                          Amenities & Features
                        </h3>
                        
                        <div className="grid grid-cols-2 gap-3">
                          {property.amenities.map((amenity, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-warm-sand/10 rounded-lg">
                              <div className="w-2 h-2 bg-deep-teal rounded-full" />
                              <span className="font-montserrat text-charcoal">{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'location' && (
                      <motion.div
                        key="location"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <h3 className="font-playfair text-xl font-semibold text-charcoal mb-4">
                          Location & Neighborhood
                        </h3>
                        
                        <div className="space-y-4">
                          <div className="p-4 bg-warm-sand/10 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                              <MapPinIcon className="w-5 h-5 text-deep-teal" />
                              <span className="font-montserrat font-semibold text-charcoal">Address</span>
                            </div>
                            <p className="font-montserrat text-slate-gray">{property.address}</p>
                          </div>
                          
                          <div className="p-4 bg-warm-sand/10 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                              <HomeIcon className="w-5 h-5 text-deep-teal" />
                              <span className="font-montserrat font-semibold text-charcoal">Neighborhood</span>
                            </div>
                            <p className="font-montserrat text-slate-gray">{property.location}</p>
                          </div>
                          
                          {/* Placeholder for map */}
                          <div className="h-48 bg-silver-mist rounded-xl flex items-center justify-center">
                            <div className="text-center">
                              <MapPinIcon className="w-12 h-12 text-slate-gray mx-auto mb-2" />
                              <p className="font-montserrat text-slate-gray">Interactive Map</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Action Footer */}
                <div className="border-t border-silver-mist p-6">
                  <div className="flex gap-4">
                    <Link
                      href={`/properties/${property.id}`}
                      className="flex-1 bg-gradient-to-r from-deep-teal to-royal-navy text-white py-3 px-6 rounded-xl font-montserrat font-semibold text-center hover:from-royal-navy hover:to-deep-teal transition-all duration-300"
                    >
                      View Full Details
                    </Link>
                    
                    <motion.button
                      className="bg-warm-sand text-royal-navy py-3 px-6 rounded-xl font-montserrat font-semibold flex items-center gap-2 hover:bg-gold-leaf transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <PhoneIcon className="w-5 h-5" />
                      Contact Agent
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PropertyDetailsModal;