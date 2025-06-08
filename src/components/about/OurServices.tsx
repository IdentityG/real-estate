'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  HomeIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  ScaleIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  MapPinIcon,
  PhoneIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  KeyIcon
} from '@heroicons/react/24/outline';
import { FaHandshake } from 'react-icons/fa';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Service interface
interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  features: string[];
  process: ProcessStep[];
  benefits: string[];
  pricing: string;
  duration: string;
  category: 'primary' | 'secondary';
  color: string;
  bgColor: string;
  gradient: string;
}

// Process step interface
interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  duration: string;
}

// Service category interface
interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  services: Service[];
}

// Services data
const services: Service[] = [
  {
    id: 1,
    title: 'Property Buying Services',
    description: 'Complete assistance in finding and purchasing your dream property in Ethiopia',
    icon: HomeIcon,
    features: [
      'Property Search & Matching',
      'Market Analysis & Valuation',
      'Negotiation Support',
      'Legal Documentation',
      'Financing Assistance',
      'Post-Purchase Support'
    ],
    process: [
      {
        id: 1,
        title: 'Initial Consultation',
        description: 'Understanding your requirements, budget, and preferences',
        icon: UserGroupIcon,
        duration: '1-2 hours'
      },
      {
        id: 2,
        title: 'Property Search',
        description: 'Curated property listings matching your criteria',
        icon: MapPinIcon,
        duration: '1-2 weeks'
      },
      {
        id: 3,
        title: 'Property Viewing',
        description: 'Guided tours of selected properties with expert insights',
        icon: KeyIcon,
        duration: '2-3 days'
      },
      {
        id: 4,
        title: 'Offer & Negotiation',
        description: 'Strategic negotiation to secure the best deal',
        icon: FaHandshake,
        duration: '3-5 days'
      },
      {
        id: 5,
        title: 'Legal Process',
        description: 'Complete legal documentation and transfer process',
        icon: DocumentTextIcon,
        duration: '2-4 weeks'
      },
      {
        id: 6,
        title: 'Handover',
        description: 'Final property inspection and key handover',
        icon: CheckCircleIcon,
        duration: '1 day'
      }
    ],
    benefits: [
      'Expert local market knowledge',
      'Access to exclusive listings',
      'Professional negotiation',
      'Legal protection & compliance',
      'Time-saving process',
      'Post-purchase support'
    ],
    pricing: 'Commission-based',
    duration: '4-8 weeks',
    category: 'primary',
    color: 'text-deep-teal',
    bgColor: 'bg-deep-teal/10',
    gradient: 'from-deep-teal to-royal-navy'
  },
  {
    id: 2,
    title: 'Property Selling Services',
    description: 'Maximize your property value with our comprehensive selling solutions',
    icon: CurrencyDollarIcon,
    features: [
      'Property Valuation & Pricing',
      'Marketing & Advertising',
      'Professional Photography',
      'Buyer Screening',
      'Negotiation Management',
      'Legal Documentation'
    ],
    process: [
      {
        id: 1,
        title: 'Property Assessment',
        description: 'Comprehensive evaluation and market analysis',
        icon: ChartBarIcon,
        duration: '1-2 days'
      },
      {
        id: 2,
        title: 'Pricing Strategy',
        description: 'Optimal pricing based on market conditions',
        icon: CurrencyDollarIcon,
        duration: '1 day'
      },
      {
        id: 3,
        title: 'Marketing Launch',
        description: 'Multi-channel marketing campaign launch',
        icon: GlobeAltIcon,
        duration: '1 week'
      },
      {
        id: 4,
        title: 'Buyer Management',
        description: 'Screening and managing potential buyers',
        icon: UserGroupIcon,
        duration: 'Ongoing'
      },
      {
        id: 5,
        title: 'Offer Negotiation',
        description: 'Professional negotiation to maximize value',
        icon: FaHandshake,
        duration: '1-2 weeks'
      },
      {
        id: 6,
        title: 'Sale Completion',
        description: 'Legal completion and fund transfer',
        icon: CheckCircleIcon,
        duration: '2-3 weeks'
      }
    ],
    benefits: [
      'Maximum property value',
      'Professional marketing',
      'Qualified buyer network',
      'Expert negotiation',
      'Legal compliance',
      'Stress-free process'
    ],
    pricing: 'Commission-based',
    duration: '6-12 weeks',
    category: 'primary',
    color: 'text-royal-navy',
    bgColor: 'bg-royal-navy/10',
    gradient: 'from-royal-navy to-deep-teal'
  },
  {
    id: 3,
    title: 'Investment Consulting',
    description: 'Strategic real estate investment guidance for optimal returns',
    icon: ChartBarIcon,
    features: [
      'Market Research & Analysis',
      'Investment Strategy Development',
      'Portfolio Diversification',
      'Risk Assessment',
      'ROI Projections',
      'Exit Strategy Planning'
    ],
    process: [
      {
        id: 1,
        title: 'Investment Goals',
        description: 'Define investment objectives and risk tolerance',
        icon: AcademicCapIcon,
        duration: '1-2 hours'
      },
      {
        id: 2,
        title: 'Market Analysis',
        description: 'Comprehensive market research and opportunity identification',
        icon: ChartBarIcon,
        duration: '1-2 weeks'
      },
      {
        id: 3,
        title: 'Strategy Development',
        description: 'Customized investment strategy creation',
        icon: DocumentTextIcon,
        duration: '3-5 days'
      },
      {
        id: 4,
        title: 'Property Selection',
        description: 'Identification and evaluation of investment properties',
        icon: HomeIcon,
        duration: '2-4 weeks'
      },
      {
        id: 5,
        title: 'Due Diligence',
        description: 'Thorough property and financial analysis',
        icon: ShieldCheckIcon,
        duration: '1-2 weeks'
      },
      {
        id: 6,
        title: 'Investment Execution',
        description: 'Purchase completion and portfolio integration',
        icon: CheckCircleIcon,
        duration: '2-4 weeks'
      }
    ],
    benefits: [
      'Expert market insights',
      'Optimized returns',
      'Risk mitigation',
      'Portfolio diversification',
      'Long-term strategy',
      'Ongoing support'
    ],
    pricing: 'Consultation fees',
    duration: '8-12 weeks',
    category: 'primary',
    color: 'text-warm-sand',
    bgColor: 'bg-warm-sand/20',
    gradient: 'from-warm-sand to-gold-leaf'
  },
  {
    id: 4,
    title: 'Property Management',
    description: 'Complete property management solutions for landlords and investors',
    icon: BuildingOfficeIcon,
    features: [
      'Tenant Screening & Placement',
      'Rent Collection & Accounting',
      'Property Maintenance',
      'Legal Compliance',
      'Financial Reporting',
      '24/7 Emergency Support'
    ],
    process: [
      {
        id: 1,
        title: 'Property Onboarding',
        description: 'Initial property assessment and documentation',
        icon: DocumentTextIcon,
        duration: '1-2 days'
      },
      {
        id: 2,
        title: 'Marketing & Leasing',
        description: 'Tenant acquisition and lease agreement',
        icon: UserGroupIcon,
        duration: '2-4 weeks'
      },
      {
        id: 3,
        title: 'Ongoing Management',
        description: 'Day-to-day property management operations',
        icon: ClockIcon,
        duration: 'Ongoing'
      },
      {
        id: 4,
        title: 'Maintenance Coordination',
        description: 'Regular maintenance and emergency repairs',
        icon: BuildingOfficeIcon,
        duration: 'As needed'
      },
      {
        id: 5,
        title: 'Financial Reporting',
        description: 'Monthly financial statements and reporting',
        icon: ChartBarIcon,
        duration: 'Monthly'
      },
      {
        id: 6,
        title: 'Tenant Relations',
        description: 'Ongoing tenant communication and support',
        icon: PhoneIcon,
        duration: 'Ongoing'
      }
    ],
    benefits: [
      'Passive income generation',
      'Professional tenant management',
      'Property value preservation',
      'Legal compliance assurance',
      'Stress-free ownership',
      'Detailed reporting'
    ],
    pricing: 'Monthly management fee',
    duration: 'Ongoing service',
    category: 'secondary',
    color: 'text-success',
    bgColor: 'bg-success/10',
    gradient: 'from-success to-deep-teal'
  },
  {
    id: 5,
    title: 'Legal Assistance',
    description: 'Comprehensive legal support for all real estate transactions',
    icon: ScaleIcon,
    features: [
      'Contract Review & Drafting',
      'Title Verification',
      'Due Diligence Support',
      'Dispute Resolution',
      'Regulatory Compliance',
      'Legal Documentation'
    ],
    process: [
      {
        id: 1,
        title: 'Legal Consultation',
        description: 'Initial legal assessment and advice',
        icon: ScaleIcon,
        duration: '1-2 hours'
      },
      {
        id: 2,
        title: 'Document Review',
        description: 'Comprehensive review of all legal documents',
        icon: DocumentTextIcon,
        duration: '2-3 days'
      },
      {
        id: 3,
        title: 'Due Diligence',
        description: 'Legal due diligence and risk assessment',
        icon: ShieldCheckIcon,
        duration: '1-2 weeks'
      },
      {
        id: 4,
        title: 'Contract Preparation',
        description: 'Legal contract drafting and preparation',
        icon: DocumentTextIcon,
        duration: '3-5 days'
      },
      {
        id: 5,
        title: 'Transaction Support',
        description: 'Legal support throughout the transaction',
        icon: FaHandshake,
        duration: '2-4 weeks'
      },
      {
        id: 6,
        title: 'Completion',
        description: 'Final legal completion and registration',
        icon: CheckCircleIcon,
        duration: '1-2 weeks'
      }
    ],
    benefits: [
      'Legal protection',
      'Risk mitigation',
      'Compliance assurance',
      'Expert guidance',
      'Dispute prevention',
      'Peace of mind'
    ],
    pricing: 'Hourly rates',
    duration: '2-6 weeks',
    category: 'secondary',
    color: 'text-royal-navy',
    bgColor: 'bg-royal-navy/10',
    gradient: 'from-royal-navy to-slate-gray'
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.1
    }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const serviceVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const processVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const OurServices = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  
  const [activeService, setActiveService] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'primary' | 'secondary'>('all');

  // Filter services based on selected category
  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating animation for decorative elements
      gsap.to('.services-bg-element', {
        y: -60,
        rotation: 12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Title reveal animation
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Services cards animation
      if (servicesRef.current) {
        const serviceCards = servicesRef.current.children;
        gsap.fromTo(serviceCards,
          {
            opacity: 0,
            y: 100,
            scale: 0.8,
            rotationY: 15
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.2,
            scrollTrigger: {
              trigger: servicesRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Parallax effect for section background
      gsap.to('.services-parallax', {
        yPercent: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-br from-alabaster via-white to-silver-mist overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="services-bg-element absolute top-20 left-16 w-56 h-56 bg-deep-teal/8 rounded-full blur-2xl" />
        <div className="services-bg-element absolute bottom-32 right-20 w-72 h-72 bg-warm-sand/10 rounded-full blur-3xl" />
        <div className="services-bg-element absolute top-1/2 left-1/4 w-48 h-48 bg-royal-navy/6 rounded-full blur-xl" />
        <div className="services-parallax absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-deep-teal/5 to-royal-navy/5 rounded-full blur-3xl" />
        
        {/* Ethiopian Pattern Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-24 h-24 border-2 border-deep-teal rotate-45" />
          <div className="absolute bottom-32 left-16 w-20 h-20 border-2 border-warm-sand rotate-12" />
          <div className="absolute top-1/2 right-1/3 w-28 h-28 border-2 border-royal-navy rotate-45" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.h2 
            variants={titleVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-royal-navy mb-6"
          >
            Our{' '}
            <span className="text-deep-teal relative">
              Services
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-deep-teal to-warm-sand rounded-full" />
            </span>
          </motion.h2>
          
          <motion.p 
            variants={titleVariants}
            className="text-lg md:text-xl text-slate-gray font-montserrat max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Comprehensive real estate solutions tailored to the Ethiopian market, delivering exceptional value at every step of your property journey
          </motion.p>
          
          <motion.div 
            variants={titleVariants}
            className="flex items-center justify-center space-x-2 text-deep-teal/80"
          >
            <ShieldCheckIcon className="w-5 h-5" />
            <span className="text-sm font-montserrat">Licensed & Regulated by Ethiopian Real Estate Authority</span>
          </motion.div>
        </motion.div>

        {/* Service Category Filter */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[
            { key: 'all', label: 'All Services', count: services.length },
            { key: 'primary', label: 'Core Services', count: services.filter(s => s.category === 'primary').length },
            { key: 'secondary', label: 'Support Services', count: services.filter(s => s.category === 'secondary').length }
          ].map((category) => (
            <motion.button
              key={category.key}
              variants={titleVariants}
              onClick={() => setSelectedCategory(category.key as any)}
              className={`px-6 py-3 rounded-full font-montserrat font-semibold transition-all duration-300 ${
                selectedCategory === category.key
                  ? 'bg-gradient-to-r from-deep-teal to-royal-navy text-white shadow-lg'
                  : 'bg-white text-slate-gray hover:bg-silver-mist/30 border border-silver-mist'
              }`}
            >
              {category.label} ({category.count})
            </motion.button>
          ))}
        </motion.div>

        {/* Services Grid */}
        <motion.div
          ref={servicesRef}
          key={selectedCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
        >
          {filteredServices.map((service, index) => {
            const IconComponent = service.icon;
            const isActive = activeService === service.id;
            
            return (
              <motion.div
                key={service.id}
                variants={serviceVariants}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="group relative bg-white rounded-3xl p-8 lg:p-10 shadow-elegant hover:shadow-2xl transition-all duration-500 border border-silver-mist/30 hover:border-deep-teal/20 overflow-hidden"
              >
                {/* Service Category Badge */}
                <div className="absolute top-6 right-6 z-20">
                  <div className={`px-3 py-1 rounded-full text-xs font-montserrat font-semibold ${
                    service.category === 'primary'
                      ? 'bg-gradient-to-r from-deep-teal to-royal-navy text-white'
                      : 'bg-gradient-to-r from-warm-sand to-gold-leaf text-royal-navy'
                  }`}>
                    {service.category === 'primary' ? 'Core Service' : 'Support Service'}
                  </div>
                </div>

                {/* Card Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient}/0 via-transparent to-${service.color.split('-')[1]}-${service.color.split('-')[2]}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Service Header */}
                <div className="relative z-10 mb-8">
                  <div className={`w-20 h-20 ${service.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-10 h-10 ${service.color}`} />
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-playfair font-bold text-royal-navy mb-4 group-hover:text-deep-teal transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-slate-gray font-montserrat leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  {/* Service Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2 text-sm text-slate-gray">
                      <ClockIcon className="w-4 h-4 text-deep-teal" />
                      <span className="font-montserrat">{service.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-gray">
                      <CurrencyDollarIcon className="w-4 h-4 text-deep-teal" />
                      <span className="font-montserrat">{service.pricing}</span>
                    </div>
                  </div>
                </div>

                {/* Service Features */}
                <div className="relative z-10 mb-8">
                  <h4 className="text-lg font-montserrat font-semibold text-royal-navy mb-4">Key Features:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircleIcon className="w-5 h-5 text-success flex-shrink-0" />
                        <span className="text-sm text-slate-gray font-montserrat">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expand/Collapse Button */}
                <div className="relative z-10">
                  <motion.button
                    onClick={() => setActiveService(isActive ? null : service.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full flex items-center justify-center space-x-3 px-6 py-4 rounded-2xl font-montserrat font-semibold transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-royal-navy to-deep-teal text-white'
                        : 'bg-gradient-to-r from-deep-teal to-royal-navy text-white hover:shadow-lg'
                    }`}
                  >
                    <span>{isActive ? 'Hide Process' : 'View Process'}</span>
                    <motion.div
                      animate={{ rotate: isActive ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRightIcon className="w-5 h-5" />
                    </motion.div>
                  </motion.button>
                </div>

                {/* Expandable Process Section */}
                <motion.div
                  initial={false}
                  animate={{ 
                    height: isActive ? 'auto' : 0,
                    opacity: isActive ? 1 : 0
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-8 border-t border-silver-mist/30 mt-8">
                    <h4 className="text-lg font-montserrat font-semibold text-royal-navy mb-6">Our Process:</h4>
                    
                    <div className="space-y-4">
                      {service.process.map((step, idx) => {
                        const StepIcon = step.icon;
                        return (
                          <motion.div
                            key={step.id}
                            variants={processVariants}
                            initial="hidden"
                            animate={isActive ? "visible" : "hidden"}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start space-x-4 p-4 bg-alabaster/50 rounded-xl hover:bg-silver-mist/30 transition-colors duration-300"
                          >
                            <div className="w-10 h-10 bg-deep-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <StepIcon className="w-5 h-5 text-deep-teal" />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-montserrat font-semibold text-royal-navy">
                                  {idx + 1}. {step.title}
                                </h5>
                                <span className="text-xs text-slate-gray font-montserrat">
                                  {step.duration}
                                </span>
                              </div>
                              <p className="text-sm text-slate-gray font-montserrat leading-relaxed">
                                {step.description}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                    
                    {/* Benefits Section */}
                    <div className="mt-8">
                      <h4 className="text-lg font-montserrat font-semibold text-royal-navy mb-4">Benefits:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-deep-teal rounded-full" />
                            <span className="text-sm text-slate-gray font-montserrat">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-16 lg:mt-20"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-deep-teal via-royal-navy to-deep-teal text-white font-montserrat font-bold rounded-full hover:shadow-2xl transition-all duration-300 group bg-size-200 bg-pos-0 hover:bg-pos-100"
          >
            <PhoneIcon className="w-5 h-5 mr-3" />
            Schedule Free Consultation
            <motion.div
              className="ml-3"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.div>
          
          <p className="text-sm text-slate-gray font-montserrat mt-4 max-w-md mx-auto">
            Get expert advice tailored to your specific real estate needs in Ethiopia
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OurServices;