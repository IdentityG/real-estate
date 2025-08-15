'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Property } from '@/utils/propertyFilters';
import {
  HomeIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  KeyIcon,
  GlobeAltIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { IoIosTrendingUp, IoIosTrendingDown  } from "react-icons/io";

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface PropertyStatsDashboardProps {
  properties: Property[];
  filteredProperties: Property[];
}

interface MarketStats {
  totalProperties: number;
  averagePrice: number;
  priceRange: { min: number; max: number };
  averageSize: number;
  propertyTypes: { [key: string]: number };
  locations: { [key: string]: number };
  pricePerSqft: number;
  newListings: number;
  featuredCount: number;
}

const PropertyStatsDashboard: React.FC<PropertyStatsDashboardProps> = ({
  properties,
  filteredProperties
}) => {
  const [stats, setStats] = useState<MarketStats | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'year'>('month');
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({});
  
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Calculate market statistics
  useEffect(() => {
    if (filteredProperties.length === 0) return;

    const calculateStats = (): MarketStats => {
      const prices = filteredProperties.map(p => p.price);
      const sizes = filteredProperties.filter(p => p.sqft > 0).map(p => p.sqft);
      
      // Property types count
      const propertyTypes: { [key: string]: number } = {};
      filteredProperties.forEach(p => {
        propertyTypes[p.propertyType] = (propertyTypes[p.propertyType] || 0) + 1;
      });

      // Locations count
      const locations: { [key: string]: number } = {};
      filteredProperties.forEach(p => {
        locations[p.location] = (locations[p.location] || 0) + 1;
      });

      // Calculate averages
      const averagePrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
      const averageSize = sizes.length > 0 ? sizes.reduce((sum, size) => sum + size, 0) / sizes.length : 0;
      const pricePerSqft = averageSize > 0 ? averagePrice / averageSize : 0;

      return {
        totalProperties: filteredProperties.length,
        averagePrice,
        priceRange: {
          min: Math.min(...prices),
          max: Math.max(...prices)
        },
        averageSize,
        propertyTypes,
        locations,
        pricePerSqft,
        newListings: filteredProperties.filter(p => p.yearBuilt && p.yearBuilt >= 2022).length,
        featuredCount: filteredProperties.filter(p => p.featured).length
      };
    };

    setStats(calculateStats());
  }, [filteredProperties]);

  // GSAP Animations
  useEffect(() => {
    if (!isInView || !stats) return;

    const ctx = gsap.context(() => {
      // Stats cards animation
      gsap.fromTo('.stats-card',
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Animate numbers
      const animateNumber = (element: HTMLElement, finalValue: number, duration: number = 2) => {
        gsap.fromTo(element, 
          { textContent: 0 },
          {
            textContent: finalValue,
            duration,
            ease: 'power2.out',
            snap: { textContent: 1 },
            onUpdate: function() {
              const value = Math.round(this.targets()[0].textContent);
              setAnimatedValues(prev => ({
                ...prev,
                [element.dataset.stat || '']: value
              }));
            }
          }
        );
      };

      // Animate all stat numbers
      document.querySelectorAll('.animated-number').forEach((element, index) => {
        const finalValue = parseFloat(element.getAttribute('data-value') || '0');
        setTimeout(() => {
          animateNumber(element as HTMLElement, finalValue);
        }, index * 200);
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [isInView, stats]);

  if (!stats) {
    return (
      <div className="py-16 bg-gradient-to-br from-alabaster to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-silver-mist rounded w-1/3 mx-auto mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-elegant">
                  <div className="h-12 bg-silver-mist rounded-full w-12 mb-4" />
                  <div className="h-8 bg-silver-mist rounded w-3/4 mb-2" />
                  <div className="h-4 bg-silver-mist rounded w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    }
    return `$${price.toLocaleString()}`;
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const getPropertyTypeIcon = (type: string) => {
    const icons = {
      'buy': HomeIcon,
      'rent': KeyIcon,
      'commercial': BuildingOfficeIcon,
      'land': GlobeAltIcon
    };
    return icons[type as keyof typeof icons] || HomeIcon;
  };

  const getPropertyTypeColor = (type: string) => {
    const colors = {
      'buy': 'from-deep-teal to-royal-navy',
      'rent': 'from-royal-navy to-deep-teal',
      'commercial': 'from-gold-leaf to-warm-sand',
      'land': 'from-soft-sage to-deep-teal'
    };
    return colors[type as keyof typeof colors] || 'from-deep-teal to-royal-navy';
  };

  // Main stats data
  const mainStats = [
    {
      id: 'total',
      title: 'Total Properties',
      value: stats.totalProperties,
      icon: HomeIcon,
      color: 'from-deep-teal to-royal-navy',
      change: '+12%',
      trend: 'up'
    },
    {
      id: 'average-price',
      title: 'Average Price',
      value: stats.averagePrice,
      icon: CurrencyDollarIcon,
      color: 'from-gold-leaf to-warm-sand',
      change: '+5.2%',
      trend: 'up',
      format: 'price'
    },
    {
      id: 'price-per-sqft',
      title: 'Price per Sq Ft',
      value: Math.round(stats.pricePerSqft),
      icon: ChartBarIcon,
      color: 'from-soft-sage to-deep-teal',
      change: '+3.1%',
      trend: 'up',
      format: 'currency'
    },
    {
      id: 'average-size',
      title: 'Average Size',
      value: Math.round(stats.averageSize),
      icon: HomeIcon,
      color: 'from-terracotta to-gold-leaf',
      change: '-1.5%',
      trend: 'down',
      suffix: ' sq ft'
    }
  ];

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
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-deep-teal/10 text-deep-teal font-montserrat font-semibold text-sm rounded-full mb-6">
            Market Insights
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-royal-navy mb-6 leading-tight">
            Property Market{' '}
            <span className="text-deep-teal relative">
              Analytics
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-deep-teal to-warm-sand rounded-full" />
            </span>
          </h2>
          <p className="font-montserrat text-lg md:text-xl text-slate-gray max-w-3xl mx-auto leading-relaxed">
            Real-time market data and insights for informed property decisions.
          </p>
        </motion.div>

        {/* Timeframe Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white rounded-2xl p-2 shadow-elegant border border-silver-mist">
            {(['week', 'month', 'year'] as const).map((timeframe) => (
              <motion.button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`relative px-6 py-3 rounded-xl font-montserrat font-semibold text-sm transition-all duration-300 ${
                  selectedTimeframe === timeframe
                    ? 'text-white'
                    : 'text-slate-gray hover:text-deep-teal'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {selectedTimeframe === timeframe && (
                  <motion.div
                    layoutId="activeTimeframe"
                    className="absolute inset-0 bg-gradient-to-r from-deep-teal to-royal-navy rounded-xl"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 capitalize">{timeframe}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Main Stats Grid */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {mainStats.map((stat, index) => {
            const IconComponent = stat.icon;
            const TrendIcon = stat.trend === 'up' ? IoIosTrendingUp : IoIosTrendingDown ;
            
            return (
              <motion.div
                key={stat.id}
                className="stats-card group bg-white rounded-3xl p-8 shadow-elegant hover:shadow-2xl transition-all duration-500 border border-silver-mist/50"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Value */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span 
                      className="animated-number font-playfair text-3xl md:text-4xl font-bold text-charcoal"
                      data-value={stat.value}
                      data-stat={stat.id}
                    >
                      0
                    </span>
                    {stat.format === 'price' && <span className="font-playfair text-3xl font-bold text-charcoal">$</span>}
                    {stat.format === 'currency' && <span className="font-montserrat text-lg text-slate-gray">$</span>}
                    {stat.suffix && <span className="font-montserrat text-lg text-slate-gray">{stat.suffix}</span>}
                  </div>
                  <h3 className="font-montserrat font-semibold text-slate-gray mt-2">
                    {stat.title}
                  </h3>
                </div>

                {/* Trend */}
                <div className={`flex items-center gap-2 text-sm font-montserrat ${
                  stat.trend === 'up' ? 'text-success' : 'text-terracotta'
                }`}>
                  <TrendIcon className="w-4 h-4" />
                  <span>{stat.change}</span>
                  <span className="text-slate-gray">vs last {selectedTimeframe}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Property Types Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          {/* Property Types */}
          <div className="bg-white rounded-3xl p-8 shadow-elegant border border-silver-mist/50">
            <h3 className="font-playfair text-2xl font-bold text-charcoal mb-6 flex items-center gap-3">
              <BuildingOfficeIcon className="w-6 h-6 text-deep-teal" />
              Property Types
            </h3>
            <div className="space-y-4">
              {Object.entries(stats.propertyTypes).map(([type, count]) => {
                const IconComponent = getPropertyTypeIcon(type);
                const percentage = (count / stats.totalProperties) * 100;
                
                return (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${getPropertyTypeColor(type)} rounded-xl flex items-center justify-center`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-montserrat font-semibold text-charcoal capitalize">
                          {type === 'buy' ? 'For Sale' : type === 'rent' ? 'For Rent' : type}
                        </div>
                        <div className="text-sm text-slate-gray">{count} properties</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-montserrat font-bold text-deep-teal">
                        {percentage.toFixed(1)}%
                      </div>
                      <div className="w-20 h-2 bg-silver-mist rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${getPropertyTypeColor(type)} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Locations */}
          <div className="bg-white rounded-3xl p-8 shadow-elegant border border-silver-mist/50">
            <h3 className="font-playfair text-2xl font-bold text-charcoal mb-6 flex items-center gap-3">
              <MapPinIcon className="w-6 h-6 text-deep-teal" />
              Popular Locations
            </h3>
            <div className="space-y-4">
              {Object.entries(stats.locations)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 5)
                .map(([location, count], index) => {
                  const percentage = (count / stats.totalProperties) * 100;
                  
                  return (
                    <div key={location} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-deep-teal/10 rounded-full flex items-center justify-center">
                          <span className="font-montserrat font-bold text-deep-teal text-sm">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <div className="font-montserrat font-semibold text-charcoal">
                            {location}
                          </div>
                          <div className="text-sm text-slate-gray">{count} properties</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-montserrat font-bold text-deep-teal">
                          {percentage.toFixed(1)}%
                        </div>
                        <div className="w-16 h-2 bg-silver-mist rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-deep-teal to-royal-navy rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </motion.div>

        {/* Additional Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="bg-gradient-to-r from-deep-teal to-royal-navy rounded-3xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <CalendarIcon className="w-8 h-8 text-warm-sand" />
              <div>
                <div className="font-playfair text-3xl font-bold">
                  {stats.newListings}
                </div>
                <div className="font-montserrat text-warm-sand/90">New Listings</div>
              </div>
            </div>
            <p className="font-montserrat text-sm text-warm-sand/80">
              Properties added in the last 30 days
            </p>
          </div>

          <div className="bg-gradient-to-r from-gold-leaf to-warm-sand rounded-3xl p-8 text-royal-navy">
            <div className="flex items-center gap-4 mb-4">
              <IoIosTrendingUp className="w-8 h-8" />
              <div>
                <div className="font-playfair text-3xl font-bold">
                  {formatPrice(stats.priceRange.min)} - {formatPrice(stats.priceRange.max)}
                </div>
                <div className="font-montserrat opacity-80">Price Range</div>
              </div>
            </div>
            <p className="font-montserrat text-sm opacity-70">
              Current market price spectrum
            </p>
          </div>

          <div className="bg-gradient-to-r from-soft-sage to-deep-teal rounded-3xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <HomeIcon className="w-8 h-8 text-warm-sand" />
              <div>
                <div className="font-playfair text-3xl font-bold">
                  {stats.featuredCount}
                </div>
                <div className="font-montserrat text-warm-sand/90">Featured</div>
              </div>
            </div>
            <p className="font-montserrat text-sm text-warm-sand/80">
              Premium highlighted properties
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PropertyStatsDashboard;