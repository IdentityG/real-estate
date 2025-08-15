'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
import {
  HomeIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  UserGroupIcon,
  MapPinIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ComponentType<any>;
  image: string;
  color: string;
  gradient: string;
  href: string;
}

const services: Service[] = [
  {
    id: 'residential-sales',
    title: 'Residential Sales',
    description: 'Expert guidance for buying and selling residential properties across Ethiopia\'s prime locations.',
    features: ['Property Valuation', 'Market Analysis', 'Negotiation Support', 'Legal Documentation'],
    icon: HomeIcon,
    image: '/images/estate1.jpg',
    color: 'deep-teal',
    gradient: 'from-deep-teal to-royal-navy',
    href: '/services/residential-sales'
  },
  {
    id: 'commercial-real-estate',
    title: 'Commercial Real Estate',
    description: 'Comprehensive commercial property solutions for businesses and investors.',
    features: ['Office Spaces', 'Retail Properties', 'Industrial Sites', 'Investment Analysis'],
    icon: BuildingOfficeIcon,
    image: '/images/estate2.jpg',
    color: 'royal-navy',
    gradient: 'from-royal-navy to-deep-teal',
    href: '/services/commercial'
  },
  {
    id: 'property-management',
    title: 'Property Management',
    description: 'Full-service property management to maximize your investment returns.',
    features: ['Tenant Screening', 'Maintenance Services', 'Rent Collection', 'Financial Reporting'],
    icon: UserGroupIcon,
    image: '/images/estate3.jpg',
    color: 'soft-sage',
    gradient: 'from-soft-sage to-deep-teal',
    href: '/services/management'
  },
  {
    id: 'investment-consulting',
    title: 'Investment Consulting',
    description: 'Strategic real estate investment advice tailored to Ethiopian market dynamics.',
    features: ['Market Research', 'ROI Analysis', 'Portfolio Planning', 'Risk Assessment'],
    icon: ChartBarIcon,
    image: '/images/estate4.jpg',
    color: 'gold-leaf',
    gradient: 'from-gold-leaf to-warm-sand',
    href: '/services/investment'
  },
  {
    id: 'legal-services',
    title: 'Legal & Documentation',
    description: 'Complete legal support for all your real estate transactions and documentation.',
    features: ['Contract Review', 'Title Verification', 'Registration Support', 'Compliance Check'],
    icon: DocumentTextIcon,
    image: '/images/estate5.jpg',
    color: 'terracotta',
    gradient: 'from-terracotta to-gold-leaf',
    href: '/services/legal'
  },
  {
    id: 'valuation-services',
    title: 'Property Valuation',
    description: 'Professional property valuation services for accurate market assessments.',
    features: ['Market Valuation', 'Insurance Appraisal', 'Tax Assessment', 'Investment Analysis'],
    icon: CurrencyDollarIcon,
    image: '/images/estate1.jpg',
    color: 'warm-sand',
    gradient: 'from-warm-sand to-soft-sage',
    href: '/services/valuation'
  }
];

const ServicesOverview = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const servicesGridRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState<string | null>(null);
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

      // Service cards stagger animation
      gsap.fromTo('.service-card',
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: servicesGridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Floating elements
      gsap.to('.service-float', {
        y: -20,
        rotation: 5,
        duration: 3,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.5
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section 
      id="services-overview"
      ref={sectionRef} 
      className="relative py-20 lg:py-32 bg-gradient-to-br from-alabaster via-white to-silver-mist/30 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="service-float absolute top-20 right-10 w-64 h-64 bg-deep-teal/5 rounded-full blur-3xl" />
        <div className="service-float absolute bottom-20 left-10 w-48 h-48 bg-warm-sand/10 rounded-full blur-3xl" />
        <div className="service-float absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-royal-navy/5 rounded-full blur-3xl" />
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
            Our Services
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-royal-navy mb-6 leading-tight">
            Comprehensive Real Estate{' '}
            <span className="text-deep-teal relative">
              Solutions
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-deep-teal to-warm-sand rounded-full" />
            </span>
          </h2>
          <p className="font-montserrat text-lg md:text-xl text-slate-gray max-w-3xl mx-auto leading-relaxed">
            From residential sales to commercial investments, we provide end-to-end real estate services 
            tailored to Ethiopia's dynamic market landscape.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          ref={servicesGridRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => setActiveService(service.id)}
                onHoverEnd={() => setActiveService(null)}
                className="service-card group relative bg-white rounded-3xl shadow-elegant overflow-hidden hover:shadow-2xl transition-all duration-500"
              >
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-60 group-hover:opacity-70 transition-opacity duration-300`} />
                  
                  {/* Service Icon */}
                  <div className="absolute top-6 left-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>

                  {/* Service Number */}
                  <div className="absolute top-6 right-6 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                    <span className="text-white font-montserrat font-bold text-sm">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-8">
                  <h3 className="font-playfair text-xl font-semibold text-charcoal mb-4 group-hover:text-deep-teal transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="font-montserrat text-slate-gray mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm font-montserrat text-slate-gray">
                        <CheckCircleIcon className="w-4 h-4 text-deep-teal mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Link */}
                  <Link href={service.href}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`group/btn w-full bg-gradient-to-r ${service.gradient} text-white font-montserrat font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2`}
                    >
                      <span>Learn More</span>
                      <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </motion.button>
                  </Link>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-teal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center bg-gradient-to-r from-deep-teal to-royal-navy rounded-3xl p-8 md:p-12 text-white"
        >
          <h3 className="font-playfair text-2xl md:text-3xl font-bold mb-4">
            Need a Custom Solution?
          </h3>
          <p className="font-montserrat text-lg mb-8 text-warm-sand/90 max-w-2xl mx-auto">
            Our team of experts can create tailored real estate solutions to meet your specific needs and objectives.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(255, 255, 255, 0.2)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-deep-teal font-montserrat font-semibold px-8 py-4 rounded-xl hover:bg-warm-sand hover:text-royal-navy transition-all duration-300"
              >
                Get Consultation
              </motion.button>
            </Link>
            
            <Link href="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white/50 hover:border-white text-white font-montserrat font-semibold px-8 py-4 rounded-xl backdrop-blur-sm transition-all duration-300"
              >
                View All Services
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesOverview;