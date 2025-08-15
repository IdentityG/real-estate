'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  CheckCircleIcon,
  XMarkIcon,
  StarIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ClockIcon,
  UserGroupIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  popular: boolean;
  features: {
    included: string[];
    excluded: string[];
  };
  color: string;
  gradient: string;
  icon: React.ComponentType<any>;
  buttonText: string;
  additionalInfo: string;
}

const pricingTiers: PricingTier[] = [
  {
    id: 'basic',
    name: 'Basic Consultation',
    description: 'Perfect for first-time buyers and sellers seeking professional guidance.',
    price: 'Free',
    period: 'Initial Meeting',
    popular: false,
    features: {
      included: [
        'Initial property consultation',
        'Market overview and trends',
        'Basic property valuation',
        'Financing options guidance',
        'Legal requirements overview'
      ],
      excluded: [
        'Dedicated agent assignment',
        'Property marketing services',
        'Negotiation support',
        'Legal documentation'
      ]
    },
    color: 'soft-sage',
    gradient: 'from-soft-sage to-deep-teal',
    icon: UserGroupIcon,
    buttonText: 'Schedule Consultation',
    additionalInfo: 'No commitment required'
  },
  {
    id: 'standard',
    name: 'Standard Service',
    description: 'Comprehensive real estate services for serious buyers and sellers.',
    price: '2.5%',
    period: 'Commission',
    popular: true,
    features: {
      included: [
        'Dedicated experienced agent',
        'Professional property marketing',
        'Market analysis and pricing',
        'Negotiation and closing support',
        'Legal documentation assistance',
        'Property inspection coordination',
        'Photography and virtual tours',
        '24/7 client support'
      ],
      excluded: [
        'Premium marketing package',
        'International buyer network',
        'Luxury property specialists'
      ]
    },
    color: 'deep-teal',
    gradient: 'from-deep-teal to-royal-navy',
    icon: StarIcon,
    buttonText: 'Get Started',
    additionalInfo: 'Most popular choice'
  },
  {
    id: 'premium',
    name: 'Premium Service',
    description: 'Elite service for luxury properties and high-value transactions.',
    price: '3.5%',
    period: 'Commission',
    popular: false,
    features: {
      included: [
        'Senior agent and team assignment',
        'Premium marketing and advertising',
        'International buyer network access',
        'Luxury property specialists',
        'Concierge-level service',
        'Professional staging consultation',
        'Drone photography and videography',
        'Priority scheduling and support',
        'Post-sale relationship management'
      ],
      excluded: []
    },
    color: 'gold-leaf',
    gradient: 'from-gold-leaf to-warm-sand',
    icon: StarSolidIcon,
    buttonText: 'Contact Premium Team',
    additionalInfo: 'White-glove service'
  }
];

const additionalServices = [
  {
    name: 'Property Management',
    price: '8-12%',
    period: 'Monthly Rent',
    description: 'Full-service property management including tenant screening, maintenance, and rent collection.'
  },
  {
    name: 'Investment Consulting',
    price: '$500-2,000',
    period: 'Per Project',
    description: 'Strategic investment analysis, market research, and portfolio planning services.'
  },
  {
    name: 'Legal Documentation',
    price: '$200-800',
    period: 'Per Transaction',
    description: 'Complete legal support including contract review, title verification, and registration.'
  },
  {
    name: 'Property Valuation',
    price: '$150-500',
    period: 'Per Property',
    description: 'Professional property appraisal for insurance, tax, or investment purposes.'
  }
];

const ServicePricing = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const [selectedTier, setSelectedTier] = useState<string>('standard');
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

      // Pricing cards animation
      gsap.fromTo('.pricing-card',
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: pricingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Floating elements
      gsap.to('.pricing-float', {
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
      className="relative py-20 lg:py-32 bg-gradient-to-br from-alabaster via-white to-silver-mist/30 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="pricing-float absolute top-20 left-10 w-32 h-32 bg-deep-teal/5 rounded-full blur-2xl" />
        <div className="pricing-float absolute bottom-20 right-10 w-48 h-48 bg-gold-leaf/10 rounded-full blur-3xl" />
        <div className="pricing-float absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-royal-navy/5 rounded-full blur-3xl" />
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
            Service Pricing
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-royal-navy mb-6 leading-tight">
            Transparent{' '}
            <span className="text-deep-teal relative">
              Pricing
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-deep-teal to-warm-sand rounded-full" />
            </span>
          </h2>
          <p className="font-montserrat text-lg md:text-xl text-slate-gray max-w-3xl mx-auto leading-relaxed">
            Choose the service level that best fits your needs. All our pricing is transparent 
            with no hidden fees or surprises.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div ref={pricingRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => {
            const IconComponent = tier.icon;
            const isSelected = selectedTier === tier.id;
            
            return (
              <motion.div
                key={tier.id}
                className={`pricing-card relative bg-white rounded-3xl shadow-elegant overflow-hidden transition-all duration-500 ${
                  tier.popular ? 'ring-2 ring-deep-teal ring-opacity-50 scale-105 lg:scale-110' : 'hover:shadow-2xl'
                } ${isSelected ? 'ring-2 ring-gold-leaf ring-opacity-50' : ''}`}
                whileHover={{ y: -8, scale: tier.popular ? 1.05 : 1.02 }}
                onClick={() => setSelectedTier(tier.id)}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-gradient-to-r from-deep-teal to-royal-navy text-white px-6 py-2 rounded-full text-sm font-montserrat font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Card Header */}
                <div className={`bg-gradient-to-r ${tier.gradient} p-8 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    {tier.popular && (
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <StarSolidIcon key={i} className="w-4 h-4 text-gold-leaf" />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-playfair text-2xl font-bold mb-2">
                    {tier.name}
                  </h3>
                  
                  <p className="font-montserrat text-white/90 mb-6">
                    {tier.description}
                  </p>
                  
                  <div className="flex items-baseline gap-2">
                    <span className="font-playfair text-4xl font-bold">
                      {tier.price}
                    </span>
                    <span className="font-montserrat text-white/80">
                      {tier.period}
                    </span>
                  </div>
                  
                  <p className="font-montserrat text-sm text-white/70 mt-2">
                    {tier.additionalInfo}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-8">
                  {/* Included Features */}
                  <div className="mb-6">
                    <h4 className="font-montserrat font-semibold text-charcoal mb-4">
                      What's Included:
                    </h4>
                    <ul className="space-y-3">
                      {tier.features.included.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <CheckCircleIcon className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                          <span className="font-montserrat text-slate-gray text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Excluded Features */}
                  {tier.features.excluded.length > 0 && (
                    <div className="mb-8">
                      <h4 className="font-montserrat font-semibold text-charcoal mb-4">
                        Not Included:
                      </h4>
                      <ul className="space-y-3">
                        {tier.features.excluded.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-3">
                            <XMarkIcon className="w-5 h-5 text-slate-gray/50 flex-shrink-0 mt-0.5" />
                            <span className="font-montserrat text-slate-gray/70 text-sm">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full bg-gradient-to-r ${tier.gradient} text-white font-montserrat font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg`}
                  >
                    {tier.buttonText}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="font-playfair text-3xl md:text-4xl font-bold text-royal-navy mb-4">
              Additional Services
            </h3>
            <p className="font-montserrat text-lg text-slate-gray max-w-2xl mx-auto">
              Specialized services available as add-ons or standalone offerings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-elegant hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-playfair text-lg font-semibold text-charcoal">
                    {service.name}
                  </h4>
                  <div className="w-10 h-10 bg-deep-teal/10 rounded-xl flex items-center justify-center">
                    <CurrencyDollarIcon className="w-5 h-5 text-deep-teal" />
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="font-playfair text-2xl font-bold text-deep-teal">
                      {service.price}
                    </span>
                    <span className="font-montserrat text-sm text-slate-gray">
                      {service.period}
                    </span>
                  </div>
                </div>
                
                <p className="font-montserrat text-sm text-slate-gray leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="bg-gradient-to-r from-deep-teal to-royal-navy rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h3 className="font-playfair text-2xl md:text-3xl font-bold mb-4">
            Need a Custom Quote?
          </h3>
          <p className="font-montserrat text-lg mb-8 text-warm-sand/90 max-w-2xl mx-auto">
            Every property and situation is unique. Contact us for a personalized consultation 
            and custom pricing tailored to your specific needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(255, 255, 255, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-deep-teal font-montserrat font-semibold px-8 py-4 rounded-xl hover:bg-warm-sand hover:text-royal-navy transition-all duration-300 flex items-center justify-center gap-3"
            >
              <PhoneIcon className="w-5 h-5" />
              Call Us Now
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-white/50 hover:border-white text-white font-montserrat font-semibold px-8 py-4 rounded-xl backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-3"
            >
              <EnvelopeIcon className="w-5 h-5" />
              Send Message
            </motion.button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-8 pt-8 border-t border-white/20">
            <div className="flex items-center gap-2 text-warm-sand/80">
              <ShieldCheckIcon className="w-5 h-5" />
              <span className="font-montserrat text-sm">Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2 text-warm-sand/80">
              <ClockIcon className="w-5 h-5" />
              <span className="font-montserrat text-sm">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2 text-warm-sand/80">
              <ChartBarIcon className="w-5 h-5" />
              <span className="font-montserrat text-sm">Market Experts</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicePricing;