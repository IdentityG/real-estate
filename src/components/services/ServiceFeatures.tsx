'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  CheckCircleIcon,
  ShieldCheckIcon,
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  StarIcon,
  BuildingOfficeIcon,
  HomeIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  stats: {
    value: string;
    label: string;
  };
}

interface ServiceComparison {
  feature: string;
  basic: boolean;
  standard: boolean;
  premium: boolean;
}

const keyFeatures: Feature[] = [
  {
    id: 'market-expertise',
    title: 'Local Market Expertise',
    description: 'Deep understanding of Ethiopian real estate market dynamics, regulations, and opportunities.',
    icon: MapPinIcon,
    color: 'deep-teal',
    stats: { value: '15+', label: 'Years Experience' }
  },
  {
    id: 'legal-compliance',
    title: 'Legal Compliance',
    description: 'Full compliance with Ethiopian real estate laws and regulations for secure transactions.',
    icon: ShieldCheckIcon,
    color: 'royal-navy',
    stats: { value: '100%', label: 'Compliance Rate' }
  },
  {
    id: 'fast-service',
    title: 'Fast Turnaround',
    description: 'Efficient processes and dedicated teams ensure quick property transactions.',
    icon: ClockIcon,
    color: 'gold-leaf',
    stats: { value: '21', label: 'Avg. Days to Close' }
  },
  {
    id: 'client-support',
    title: '24/7 Client Support',
    description: 'Round-the-clock support from our experienced real estate professionals.',
    icon: UserGroupIcon,
    color: 'soft-sage',
    stats: { value: '24/7', label: 'Support Available' }
  },
  {
    id: 'market-analysis',
    title: 'Advanced Analytics',
    description: 'Data-driven market analysis and property valuation using latest technology.',
    icon: ChartBarIcon,
    color: 'terracotta',
    stats: { value: '95%', label: 'Accuracy Rate' }
  },
  {
    id: 'documentation',
    title: 'Complete Documentation',
    description: 'Comprehensive legal documentation and paperwork handling for all transactions.',
    icon: DocumentTextIcon,
    color: 'warm-sand',
    stats: { value: '2,500+', label: 'Documents Processed' }
  }
];

const serviceComparison: ServiceComparison[] = [
  { feature: 'Initial Consultation', basic: true, standard: true, premium: true },
  { feature: 'Market Analysis', basic: true, standard: true, premium: true },
  { feature: 'Property Valuation', basic: true, standard: true, premium: true },
  { feature: 'Dedicated Agent', basic: false, standard: true, premium: true },
  { feature: 'Professional Marketing', basic: false, standard: true, premium: true },
  { feature: 'Negotiation Support', basic: false, standard: true, premium: true },
  { feature: 'Legal Documentation', basic: false, standard: true, premium: true },
  { feature: 'Photography & Tours', basic: false, standard: true, premium: true },
  { feature: 'Premium Marketing', basic: false, standard: false, premium: true },
  { feature: 'International Network', basic: false, standard: false, premium: true },
  { feature: 'Luxury Specialists', basic: false, standard: false, premium: true },
  { feature: 'Concierge Service', basic: false, standard: false, premium: true },
  { feature: 'Post-Sale Support', basic: false, standard: true, premium: true },
  { feature: 'Priority Scheduling', basic: false, standard: false, premium: true }
];

const ServiceFeatures = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'features' | 'comparison'>('features');
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // GSAP Animations
  useEffect(() => {
    if (!isInView) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Features animation
      gsap.fromTo('.feature-card',
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Comparison table animation
      gsap.fromTo('.comparison-row',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: comparisonRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Floating elements
      gsap.to('.features-float', {
        y: -20,
        rotation: 5,
        duration: 4,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.8
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-br from-white via-alabaster to-silver-mist/20 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="features-float absolute top-20 left-10 w-32 h-32 bg-deep-teal/5 rounded-full blur-2xl" />
        <div className="features-float absolute bottom-20 right-10 w-48 h-48 bg-gold-leaf/10 rounded-full blur-3xl" />
        <div className="features-float absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-royal-navy/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-deep-teal/10 text-deep-teal font-montserrat font-semibold text-sm rounded-full mb-6">
            Why Choose Mekiya
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-royal-navy mb-6 leading-tight">
            Service{' '}
            <span className="text-deep-teal relative">
              Excellence
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-deep-teal to-warm-sand rounded-full" />
            </span>
          </h2>
          <p className="font-montserrat text-lg md:text-xl text-slate-gray max-w-3xl mx-auto leading-relaxed">
            Discover what sets Mekiya Real Estate apart in Ethiopia's competitive real estate market.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-elegant">
            <div className="flex">
              <motion.button
                onClick={() => setActiveTab('features')}
                className={`relative px-6 py-3 rounded-xl font-montserrat font-semibold text-sm transition-all duration-300 ${
                  activeTab === 'features'
                    ? 'text-white'
                    : 'text-slate-gray hover:text-deep-teal'
                }`}
              >
                Key Features
                {activeTab === 'features' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-deep-teal to-royal-navy rounded-xl"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Key Features</span>
              </motion.button>
              
              <motion.button
                onClick={() => setActiveTab('comparison')}
                className={`relative px-6 py-3 rounded-xl font-montserrat font-semibold text-sm transition-all duration-300 ${
                  activeTab === 'comparison'
                    ? 'text-white'
                    : 'text-slate-gray hover:text-deep-teal'
                }`}
              >
                Service Comparison
                {activeTab === 'comparison' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-deep-teal to-royal-navy rounded-xl"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Service Comparison</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="relative">
          {activeTab === 'features' && (
            <motion.div
              ref={featuresRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {keyFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={feature.id}
                    className="feature-card group bg-white rounded-3xl p-8 shadow-elegant hover:shadow-2xl transition-all duration-500"
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    {/* Feature Icon */}
                    <div className={`w-16 h-16 bg-${feature.color}/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-${feature.color}/20 transition-all duration-300`}>
                      <IconComponent className={`w-8 h-8 text-${feature.color}`} />
                    </div>

                    {/* Feature Content */}
                    <h3 className="font-playfair text-xl font-semibold text-charcoal mb-4 group-hover:text-deep-teal transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="font-montserrat text-slate-gray mb-6 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Feature Stats */}
                    <div className={`bg-${feature.color}/5 rounded-xl p-4 border border-${feature.color}/20`}>
                      <div className={`text-2xl font-playfair font-bold text-${feature.color} mb-1`}>
                        {feature.stats.value}
                      </div>
                      <div className="text-sm font-montserrat text-slate-gray">
                        {feature.stats.label}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {activeTab === 'comparison' && (
            <motion.div
              ref={comparisonRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-elegant overflow-hidden"
            >
              {/* Table Header */}
              <div className="bg-gradient-to-r from-deep-teal to-royal-navy text-white p-6">
                <div className="grid grid-cols-4 gap-4">
                  <div className="font-playfair text-lg font-semibold">
                    Service Features
                  </div>
                  <div className="text-center">
                    <div className="font-montserrat font-semibold mb-1">Basic</div>
                    <div className="text-sm text-warm-sand/80">Free Consultation</div>
                  </div>
                  <div className="text-center">
                    <div className="font-montserrat font-semibold mb-1">Standard</div>
                    <div className="text-sm text-warm-sand/80">2.5% Commission</div>
                  </div>
                  <div className="text-center">
                    <div className="font-montserrat font-semibold mb-1">Premium</div>
                    <div className="text-sm text-warm-sand/80">3.5% Commission</div>
                  </div>
                </div>
              </div>

              {/* Table Body */}
              <div className="p-6">
                {serviceComparison.map((item, index) => (
                  <div
                    key={index}
                    className={`comparison-row grid grid-cols-4 gap-4 py-4 border-b border-silver-mist last:border-b-0 ${
                      index % 2 === 0 ? 'bg-alabaster/30' : 'bg-white'
                    }`}
                  >
                    <div className="font-montserrat text-charcoal font-medium">
                      {item.feature}
                    </div>
                    <div className="text-center">
                      {item.basic ? (
                        <CheckCircleIcon className="w-6 h-6 text-success mx-auto" />
                      ) : (
                        <div className="w-6 h-6 bg-slate-gray/20 rounded-full mx-auto" />
                      )}
                    </div>
                    <div className="text-center">
                      {item.standard ? (
                        <CheckCircleIcon className="w-6 h-6 text-success mx-auto" />
                      ) : (
                        <div className="w-6 h-6 bg-slate-gray/20 rounded-full mx-auto" />
                      )}
                    </div>
                    <div className="text-center">
                      {item.premium ? (
                        <CheckCircleIcon className="w-6 h-6 text-success mx-auto" />
                      ) : (
                        <div className="w-6 h-6 bg-slate-gray/20 rounded-full mx-auto" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Table Footer */}
              <div className="bg-alabaster/50 p-6 border-t border-silver-mist">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-soft-sage/20 text-soft-sage font-montserrat font-semibold py-3 px-6 rounded-xl border border-soft-sage/30 hover:bg-soft-sage/30 transition-all duration-300"
                  >
                    Schedule Basic Consultation
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-deep-teal to-royal-navy text-white font-montserrat font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Choose Standard Service
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-gold-leaf to-warm-sand text-royal-navy font-montserrat font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Get Premium Service
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
        >
          {[
            { icon: HomeIcon, value: '2,500+', label: 'Properties Sold' },
            { icon: UserGroupIcon, value: '98%', label: 'Client Satisfaction' },
            { icon: ClockIcon, value: '21', label: 'Avg. Days to Close' },
            { icon: GlobeAltIcon, value: '12+', label: 'Ethiopian Cities' }
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-deep-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-deep-teal" />
                </div>
                <div className="font-playfair text-3xl font-bold text-royal-navy mb-2">
                  {stat.value}
                </div>
                <div className="font-montserrat text-slate-gray">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceFeatures;