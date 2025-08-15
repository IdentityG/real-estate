'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/utils/propertyFilters';
import {
  SparklesIcon,
  HeartIcon,
  ShareIcon,
  EyeIcon,
  MapPinIcon,
  HomeIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  StarIcon,
  ArrowRightIcon,
  AdjustmentsHorizontalIcon,
  UserIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface PropertyRecommendationsProps {
  properties: Property[];
  currentProperty?: Property;
  userPreferences?: {
    priceRange: { min: number; max: number };
    propertyTypes: string[];
    locations: string[];
    bedrooms: number;
    amenities: string[];
  };
  onFavoriteToggle?: (propertyId: number) => void;
  favorites?: number[];
}

interface RecommendationReason {
  type: 'price' | 'location' | 'size' | 'amenities' | 'type';
  reason: string;
  score: number;
}

interface RecommendedProperty extends Property {
  matchScore: number;
  reasons: RecommendationReason[];
  category: 'similar' | 'trending' | 'budget' | 'luxury';
}

const PropertyRecommendations: React.FC<PropertyRecommendationsProps> = ({
  properties,
  currentProperty,
  userPreferences,
  onFavoriteToggle,
  favorites = []
}) => {
  const [recommendations, setRecommendations] = useState<RecommendedProperty[]>([]);
  const [activeCategory, setActiveCategory] = useState<'all' | 'similar' | 'trending' | 'budget' | 'luxury'>('all');
  const [isLoading, setIsLoading] = useState(true);
  
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Generate recommendations based on current property and user preferences
  useEffect(() => {
    const generateRecommendations = (): RecommendedProperty[] => {
      if (!properties.length) return [];

      const scored = properties
        .filter(p => p.id !== currentProperty?.id)
        .map(property => {
          const reasons: RecommendationReason[] = [];
          let score = 0;

          // Score based on current property similarity
          if (currentProperty) {
            // Location similarity
            if (property.location === currentProperty.location) {
              score += 30;
              reasons.push({
                type: 'location',
                reason: `Same area as ${currentProperty.title}`,
                score: 30
              });
            }

            // Price similarity (within 20%)
            const priceDiff = Math.abs(property.price - currentProperty.price) / currentProperty.price;
            if (priceDiff <= 0.2) {
              score += 25;
              reasons.push({
                type: 'price',
                reason: 'Similar price range',
                score: 25
              });
            }

            // Property type match
            if (property.propertyType === currentProperty.propertyType) {
              score += 20;
              reasons.push({
                type: 'type',
                reason: 'Same property type',
                score: 20
              });
            }

            // Size similarity (bedrooms)
            if (property.bedrooms === currentProperty.bedrooms) {
              score += 15;
              reasons.push({
                type: 'size',
                reason: `${property.bedrooms} bedrooms like current property`,
                score: 15
              });
            }

            // Amenities overlap
            const commonAmenities = property.amenities.filter(a => 
              currentProperty.amenities.includes(a)
            );
            if (commonAmenities.length > 0) {
              const amenityScore = Math.min(commonAmenities.length * 5, 20);
              score += amenityScore;
              reasons.push({
                type: 'amenities',
                reason: `${commonAmenities.length} shared amenities`,
                score: amenityScore
              });
            }
          }

          // Score based on user preferences
          if (userPreferences) {
            // Price range match
            if (property.price >= userPreferences.priceRange.min && 
                property.price <= userPreferences.priceRange.max) {
              score += 25;
              reasons.push({
                type: 'price',
                reason: 'Within your budget',
                score: 25
              });
            }

            // Property type preference
            if (userPreferences.propertyTypes.includes(property.propertyType)) {
              score += 20;
              reasons.push({
                type: 'type',
                reason: 'Matches your preferred type',
                score: 20
              });
            }

            // Location preference
            if (userPreferences.locations.includes(property.location)) {
              score += 20;
              reasons.push({
                type: 'location',
                reason: 'In your preferred area',
                score: 20
              });
            }

            // Bedroom preference
            if (property.bedrooms === userPreferences.bedrooms) {
              score += 15;
              reasons.push({
                type: 'size',
                reason: 'Perfect bedroom count',
                score: 15
              });
            }

            // Amenities preference
            const preferredAmenities = property.amenities.filter(a => 
              userPreferences.amenities.includes(a)
            );
            if (preferredAmenities.length > 0) {
              const amenityScore = Math.min(preferredAmenities.length * 3, 15);
              score += amenityScore;
              reasons.push({
                type: 'amenities',
                reason: `Has ${preferredAmenities.length} preferred amenities`,
                score: amenityScore
              });
            }
          }

          // Boost featured properties
          if (property.featured) {
            score += 10;
            reasons.push({
              type: 'type',
              reason: 'Featured property',
              score: 10
            });
          }

          // Determine category
          let category: RecommendedProperty['category'] = 'similar';
          if (property.price > 1500000) category = 'luxury';
          else if (property.price < 600000) category = 'budget';
          else if (property.featured || property.yearBuilt && property.yearBuilt >= 2022) category = 'trending';

          return {
            ...property,
            matchScore: score,
            reasons: reasons.sort((a, b) => b.score - a.score).slice(0, 3),
            category
          };
        })
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 12);

      return scored;
    };

    setIsLoading(true);
    setTimeout(() => {
      setRecommendations(generateRecommendations());
      setIsLoading(false);
    }, 1000);
  }, [properties, currentProperty, userPreferences]);

  // GSAP Animations
  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      // Cards animation
      gsap.fromTo('.recommendation-card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading, recommendations, activeCategory]);

  const filteredRecommendations = activeCategory === 'all' 
    ? recommendations 
    : recommendations.filter(r => r.category === activeCategory);

  const formatPrice = (price: number, propertyType: string) => {
    if (propertyType === 'rent') {
      return `${price.toLocaleString()}/month`;
    }
    return `${price.toLocaleString()}`;
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return 'text-success bg-success/10';
    if (score >= 60) return 'text-gold-leaf bg-gold-leaf/10';
    if (score >= 40) return 'text-deep-teal bg-deep-teal/10';
    return 'text-slate-gray bg-slate-gray/10';
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      'similar': SparklesIcon,
      'trending': StarIcon,
      'budget': CurrencyDollarIcon,
      'luxury': StarSolidIcon
    };
    return icons[category as keyof typeof icons] || SparklesIcon;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'similar': 'from-deep-teal to-royal-navy',
      'trending': 'from-terracotta to-gold-leaf',
      'budget': 'from-soft-sage to-deep-teal',
      'luxury': 'from-gold-leaf to-warm-sand'
    };
    return colors[category as keyof typeof colors] || 'from-deep-teal to-royal-navy';
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-alabaster via-white to-silver-mist/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-8 bg-silver-mist rounded w-1/3 mx-auto mb-4" />
              <div className="h-12 bg-silver-mist rounded w-2/3 mx-auto mb-4" />
              <div className="h-4 bg-silver-mist rounded w-1/2 mx-auto" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-elegant overflow-hidden animate-pulse">
                <div className="h-48 bg-silver-mist" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-silver-mist rounded w-3/4" />
                  <div className="h-4 bg-silver-mist rounded w-1/2" />
                  <div className="h-6 bg-silver-mist rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-alabaster via-white to-silver-mist/30 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-deep-teal/5 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gold-leaf/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-deep-teal/10 text-deep-teal font-montserrat font-semibold text-sm rounded-full mb-6">
            <SparklesIcon className="w-4 h-4 inline mr-2" />
            AI Recommendations
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-royal-navy mb-6 leading-tight">
            Properties You'll{' '}
            <span className="text-deep-teal relative">
              Love
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-deep-teal to-warm-sand rounded-full" />
            </span>
          </h2>
          <p className="font-montserrat text-lg md:text-xl text-slate-gray max-w-3xl mx-auto leading-relaxed">
            Discover properties tailored to your preferences using our intelligent recommendation system.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[
            { id: 'all', label: 'All Recommendations', icon: AdjustmentsHorizontalIcon },
            { id: 'similar', label: 'Similar Properties', icon: SparklesIcon },
            { id: 'trending', label: 'Trending', icon: StarIcon },
            { id: 'budget', label: 'Budget Friendly', icon: CurrencyDollarIcon },
            { id: 'luxury', label: 'Luxury', icon: StarSolidIcon }
          ].map((category) => {
            const IconComponent = category.icon;
            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id as any)}
                className={`relative px-6 py-3 rounded-full font-montserrat font-semibold text-sm transition-all duration-300 border-2 ${
                  activeCategory === category.id
                    ? 'bg-deep-teal text-white border-deep-teal shadow-lg'
                    : 'bg-white text-slate-gray border-silver-mist hover:border-deep-teal hover:text-deep-teal'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent className="w-4 h-4 inline mr-2" />
                {category.label}
                {activeCategory === category.id && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-deep-teal rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Recommendations Grid */}
        <div ref={cardsRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredRecommendations.map((property, index) => {
                const CategoryIcon = getCategoryIcon(property.category);
                
                return (
                  <motion.div
                    key={property.id}
                    className="recommendation-card group bg-white rounded-3xl shadow-elegant overflow-hidden hover:shadow-2xl transition-all duration-500 border border-silver-mist/50"
                    whileHover={{ y: -8, scale: 1.02 }}
                    layout
                  >
                    {/* Property Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={property.images[0]}
                        alt={property.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Category Badge */}
                      <div className={`absolute top-4 left-4 bg-gradient-to-r ${getCategoryColor(property.category)} text-white px-3 py-1 rounded-full text-xs font-montserrat font-medium flex items-center gap-1`}>
                        <CategoryIcon className="w-3 h-3" />
                        <span className="capitalize">{property.category}</span>
                      </div>

                      {/* Match Score */}
                      <div className={`absolute top-4 right-4 ${getMatchScoreColor(property.matchScore)} px-3 py-1 rounded-full text-xs font-montserrat font-bold`}>
                        {property.matchScore}% match
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <motion.button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onFavoriteToggle?.(property.id);
                          }}
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
                          }}
                          className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-gray hover:text-deep-teal transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ShareIcon className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Property Details */}
                    <div className="p-6">
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

                      {/* Recommendation Reasons */}
                      <div className="mb-4">
                        <div className="text-sm font-montserrat font-semibold text-charcoal mb-2">
                          Why we recommend this:
                        </div>
                        <div className="space-y-1">
                          {property.reasons.slice(0, 2).map((reason, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs font-montserrat text-slate-gray">
                              <div className="w-1.5 h-1.5 bg-deep-teal rounded-full flex-shrink-0" />
                              <span>{reason.reason}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* View Details Button */}
                      <Link href={`/properties/${property.id}`}>
                        <motion.button
                          className="w-full bg-gradient-to-r from-deep-teal to-royal-navy text-white py-3 px-6 rounded-xl font-montserrat font-semibold hover:from-royal-navy hover:to-deep-teal transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <EyeIcon className="w-4 h-4" />
                          <span>View Details</span>
                          <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* No Results */}
        {filteredRecommendations.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-warm-sand/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <SparklesIcon className="w-12 h-12 text-slate-gray" />
            </div>
            <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-4">
              No Recommendations Found
            </h3>
            <p className="font-montserrat text-slate-gray max-w-md mx-auto">
              Try adjusting your preferences or browse all available properties.
            </p>
          </motion.div>
        )}

        {/* Bottom CTA */}
        {filteredRecommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-deep-teal to-royal-navy rounded-3xl p-8 md:p-12 text-white">
              <h3 className="font-playfair text-2xl md:text-3xl font-bold mb-4">
                Want More Personalized Recommendations?
              </h3>
              <p className="font-montserrat text-lg mb-8 text-warm-sand/90 max-w-2xl mx-auto">
                Create an account to save your preferences and get better property matches.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(255, 255, 255, 0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-deep-teal font-montserrat font-semibold px-8 py-4 rounded-xl hover:bg-warm-sand hover:text-royal-navy transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <UserIcon className="w-5 h-5" />
                  Create Account
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border-2 border-white/50 hover:border-white text-white font-montserrat font-semibold px-8 py-4 rounded-xl backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <AdjustmentsHorizontalIcon className="w-5 h-5" />
                  Update Preferences
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PropertyRecommendations;