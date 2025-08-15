'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Property } from '@/utils/propertyFilters';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  HeartIcon,
  ShareIcon,
  MapPinIcon,
  HomeIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  CalendarIcon,
  StarIcon,
  CheckCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const PropertyDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const loadProperty = async () => {
      try {
        const response = await fetch('/data/properties.json');
        const data = await response.json();
        const foundProperty = data.properties.find((p: Property) => p.id === parseInt(params.id as string));
        
        if (!foundProperty) {
          notFound();
          return;
        }
        
        setProperty(foundProperty);
      } catch (error) {
        console.error('Error loading property:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadProperty();
    }
  }, [params.id]);

  const handleFavoriteToggle = (propertyId: number) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const nextImage = () => {
    if (property) {
      setCurrentImageIndex((prev) => 
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (property) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    }
  };

  const formatPrice = (price: number, propertyType: string) => {
    if (propertyType === 'rent') {
      return `$${price.toLocaleString()}/month`;
    }
    return `$${price.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-deep-teal"></div>
      </div>
    );
  }

  if (!property) {
    notFound();
    return null;
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-silver-mist sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="w-10 h-10 bg-alabaster rounded-full flex items-center justify-center text-slate-gray hover:text-deep-teal transition-colors duration-200"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </button>
              <div>
                <h1 className="font-playfair text-2xl font-bold text-charcoal">
                  {property.title}
                </h1>
                <div className="flex items-center text-slate-gray">
                  <MapPinIcon className="w-4 h-4 mr-1" />
                  <span className="font-montserrat text-sm">{property.location}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleFavoriteToggle(property.id)}
                className="w-12 h-12 bg-alabaster rounded-full flex items-center justify-center text-slate-gray hover:text-terracotta transition-colors duration-200"
              >
                {favorites.includes(property.id) ? (
                  <HeartSolidIcon className="w-6 h-6 text-terracotta" />
                ) : (
                  <HeartIcon className="w-6 h-6" />
                )}
              </button>
              
              <button className="w-12 h-12 bg-alabaster rounded-full flex items-center justify-center text-slate-gray hover:text-deep-teal transition-colors duration-200">
                <ShareIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <Image
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                
                {/* Navigation Arrows */}
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-charcoal hover:bg-white transition-colors duration-200"
                    >
                      <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                    
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-charcoal hover:bg-white transition-colors duration-200"
                    >
                      <ChevronRightIcon className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 bg-midnight/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-montserrat">
                  {currentImageIndex + 1} / {property.images.length}
                </div>

                {/* Virtual Tour Button */}
                <button className="absolute bottom-4 right-4 bg-deep-teal text-white px-4 py-2 rounded-xl font-montserrat font-semibold flex items-center gap-2 hover:bg-deep-teal/90 transition-colors duration-200">
                  <EyeIcon className="w-4 h-4" />
                  Virtual Tour
                </button>
              </div>

              {/* Thumbnail Strip */}
              {property.images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 ${
                        index === currentImageIndex ? 'ring-2 ring-deep-teal' : ''
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${property.title} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Description */}
            <div className="bg-white rounded-2xl p-6 shadow-elegant">
              <h2 className="font-playfair text-2xl font-bold text-charcoal mb-4">
                Description
              </h2>
              <p className="font-montserrat text-slate-gray leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Property Features */}
            <div className="bg-white rounded-2xl p-6 shadow-elegant">
              <h2 className="font-playfair text-2xl font-bold text-charcoal mb-6">
                Features & Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-warm-sand/10 rounded-lg">
                    <CheckCircleIcon className="w-5 h-5 text-deep-teal flex-shrink-0" />
                    <span className="font-montserrat text-charcoal">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Property Info */}
          <div className="space-y-6">
            {/* Price and Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-elegant">
              <div className="text-center mb-6">
                <div className="font-playfair text-4xl font-bold text-deep-teal mb-2">
                  {formatPrice(property.price, property.propertyType)}
                </div>
                {property.sqft > 0 && (
                  <div className="text-slate-gray font-montserrat">
                    ${Math.round(property.price / property.sqft)}/sq ft
                  </div>
                )}
              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
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

              {/* Contact Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-deep-teal to-royal-navy text-white py-4 px-6 rounded-xl font-montserrat font-semibold hover:from-royal-navy hover:to-deep-teal transition-all duration-300 flex items-center justify-center gap-2">
                  <PhoneIcon className="w-5 h-5" />
                  Call Agent
                </button>
                
                <button className="w-full bg-warm-sand text-royal-navy py-4 px-6 rounded-xl font-montserrat font-semibold hover:bg-gold-leaf transition-colors duration-300 flex items-center justify-center gap-2">
                  <EnvelopeIcon className="w-5 h-5" />
                  Send Message
                </button>
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-2xl p-6 shadow-elegant">
              <h3 className="font-playfair text-xl font-bold text-charcoal mb-4">
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
                  <div className="flex justify-between py-2 border-b border-silver-mist">
                    <span className="font-montserrat text-slate-gray">Square Feet</span>
                    <span className="font-montserrat font-semibold text-charcoal">
                      {property.sqft.toLocaleString()} sq ft
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
                
                <div className="flex justify-between py-2">
                  <span className="font-montserrat text-slate-gray">Property ID</span>
                  <span className="font-montserrat font-semibold text-charcoal">
                    {property.id}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PropertyDetailPage;