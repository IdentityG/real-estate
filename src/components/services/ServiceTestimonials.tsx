'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import {
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BuildingOfficeIcon,
  HomeIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import { RiDoubleQuotesL } from "react-icons/ri";
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  image: string;
  rating: number;
  testimonial: string;
  service: string;
  serviceIcon: React.ComponentType<any>;
  location: string;
  propertyType: string;
  dealValue: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Alemayehu Tadesse',
    title: 'CEO',
    company: 'Tadesse Holdings',
    image: '/images/agent1.jpg',
    rating: 5,
    testimonial: 'Mekiya Real Estate exceeded our expectations in finding the perfect commercial space for our headquarters. Their deep understanding of Addis Ababa\'s commercial market and professional approach made the entire process seamless.',
    service: 'Commercial Real Estate',
    serviceIcon: BuildingOfficeIcon,
    location: 'Addis Ababa, Bole',
    propertyType: 'Office Complex',
    dealValue: '$2.8M'
  },
  {
    id: 2,
    name: 'Sara Mohammed',
    title: 'Investment Manager',
    company: 'Horizon Investments',
    image: '/images/agent2.jpg',
    rating: 5,
    testimonial: 'The investment consulting services provided by Mekiya were invaluable. They helped us identify high-potential properties and navigate the Ethiopian real estate regulations with expertise and transparency.',
    service: 'Investment Consulting',
    serviceIcon: CurrencyDollarIcon,
    location: 'Addis Ababa, Kazanchis',
    propertyType: 'Mixed-Use Development',
    dealValue: '$4.2M'
  },
  {
    id: 3,
    name: 'Daniel Bekele',
    title: 'Family Head',
    company: 'Private Client',
    image: '/images/agent3.jpg',
    rating: 5,
    testimonial: 'Finding our dream home was made effortless by the Mekiya team. Their attention to detail, market knowledge, and genuine care for our family\'s needs made all the difference. Highly recommended!',
    service: 'Residential Sales',
    serviceIcon: HomeIcon,
    location: 'Addis Ababa, Gerji',
    propertyType: 'Luxury Villa',
    dealValue: '$850K'
  },
  {
    id: 4,
    name: 'Hanan Ahmed',
    title: 'Property Developer',
    company: 'Ahmed Construction',
    image: '/images/agent4.jpg',
    rating: 5,
    testimonial: 'Mekiya\'s property management services have been exceptional. They handle everything from tenant relations to maintenance with professionalism, allowing me to focus on expanding my portfolio.',
    service: 'Property Management',
    serviceIcon: BuildingOfficeIcon,
    location: 'Addis Ababa, CMC',
    propertyType: 'Residential Complex',
    dealValue: '$1.5M'
  },
  {
    id: 5,
    name: 'Yohannes Girma',
    title: 'Business Owner',
    company: 'Girma Enterprises',
    image: '/images/agent5.jpg',
    rating: 5,
    testimonial: 'The legal and documentation support from Mekiya was thorough and professional. They ensured all paperwork was compliant with Ethiopian regulations, giving us complete peace of mind.',
    service: 'Legal Services',
    serviceIcon: BuildingOfficeIcon,
    location: 'Addis Ababa, Megenagna',
    propertyType: 'Commercial Plot',
    dealValue: '$1.2M'
  },
  {
    id: 6,
    name: 'Meron Tesfaye',
    title: 'Entrepreneur',
    company: 'Tech Startup',
    image: '/images/agent6.jpg',
    rating: 5,
    testimonial: 'The property valuation service was incredibly detailed and accurate. Mekiya\'s market analysis helped us make an informed investment decision that has already shown great returns.',
    service: 'Property Valuation',
    serviceIcon: CurrencyDollarIcon,
    location: 'Addis Ababa, Piassa',
    propertyType: 'Mixed-Use Building',
    dealValue: '$950K'
  }
];

const ServiceTestimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

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

      // Floating elements
      gsap.to('.testimonial-float', {
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

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];
  const ServiceIcon = currentTestimonial.serviceIcon;

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-br from-royal-navy via-deep-teal to-midnight overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="testimonial-float absolute top-20 left-10 w-32 h-32 bg-warm-sand/10 rounded-full blur-2xl" />
        <div className="testimonial-float absolute bottom-20 right-10 w-48 h-48 bg-gold-leaf/10 rounded-full blur-3xl" />
        <div className="testimonial-float absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-soft-sage/10 rounded-full blur-3xl" />
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
          <div className="inline-block px-4 py-2 bg-warm-sand/20 text-warm-sand font-montserrat font-semibold text-sm rounded-full mb-6 backdrop-blur-sm border border-warm-sand/30">
            Client Success Stories
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            What Our{' '}
            <span className="text-warm-sand relative">
              Clients Say
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-warm-sand to-gold-leaf rounded-full" />
            </span>
          </h2>
          <p className="font-montserrat text-lg md:text-xl text-alabaster/80 max-w-3xl mx-auto leading-relaxed">
            Discover how Mekiya Real Estate has helped clients achieve their property goals 
            across Ethiopia's dynamic real estate market.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative">
          {/* Main Testimonial Card */}
          <div className="relative h-[600px] md:h-[500px] overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 h-full">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                    {/* Testimonial Content */}
                    <div className="flex flex-col justify-center">
                      {/* Quote Icon */}
                      <div className="w-16 h-16 bg-warm-sand/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-warm-sand/30">
                        <RiDoubleQuotesL className="w-8 h-8 text-warm-sand" />
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <StarSolidIcon
                            key={i}
                            className={`w-6 h-6 ${
                              i < currentTestimonial.rating ? 'text-gold-leaf' : 'text-white/20'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-white/80 font-montserrat text-sm">
                          {currentTestimonial.rating}.0
                        </span>
                      </div>

                      {/* Testimonial Text */}
                      <blockquote className="font-montserrat text-lg md:text-xl text-white/90 leading-relaxed mb-8">
                        "{currentTestimonial.testimonial}"
                      </blockquote>

                      {/* Service Badge */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-deep-teal/30 rounded-xl flex items-center justify-center backdrop-blur-sm border border-deep-teal/50">
                          <ServiceIcon className="w-5 h-5 text-deep-teal" />
                        </div>
                        <span className="text-deep-teal font-montserrat font-semibold">
                          {currentTestimonial.service}
                        </span>
                      </div>

                      {/* Client Info */}
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden">
                          <Image
                            src={currentTestimonial.image}
                            alt={currentTestimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-playfair text-xl font-semibold text-white">
                            {currentTestimonial.name}
                          </h4>
                          <p className="font-montserrat text-warm-sand/80">
                            {currentTestimonial.title}, {currentTestimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Deal Details */}
                    <div className="flex flex-col justify-center">
                      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        <h5 className="font-playfair text-2xl font-semibold text-white mb-6">
                          Deal Highlights
                        </h5>
                        
                        <div className="space-y-4">
                          <div className="flex justify-between items-center py-3 border-b border-white/10">
                            <span className="font-montserrat text-white/70">Location</span>
                            <span className="font-montserrat font-semibold text-white">
                              {currentTestimonial.location}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center py-3 border-b border-white/10">
                            <span className="font-montserrat text-white/70">Property Type</span>
                            <span className="font-montserrat font-semibold text-white">
                              {currentTestimonial.propertyType}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center py-3">
                            <span className="font-montserrat text-white/70">Deal Value</span>
                            <span className="font-playfair font-bold text-2xl text-gold-leaf">
                              {currentTestimonial.dealValue}
                            </span>
                          </div>
                        </div>

                        {/* Success Badge */}
                        <div className="mt-6 bg-gradient-to-r from-success/20 to-deep-teal/20 rounded-xl p-4 border border-success/30">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="font-montserrat font-semibold text-success">
                              Successfully Completed
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {/* Previous Button */}
            <motion.button
              onClick={prevTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <ChevronLeftIcon className="w-6 h-6 text-white" />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-warm-sand scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              onClick={nextTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <ChevronRightIcon className="w-6 h-6 text-white" />
            </motion.button>
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          {[
            { label: 'Client Satisfaction', value: '98%', icon: StarIcon },
            { label: 'Successful Deals', value: '2,500+', icon: BuildingOfficeIcon },
            { label: 'Average Deal Time', value: '21 Days', icon: CurrencyDollarIcon }
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-warm-sand/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-warm-sand/30">
                  <IconComponent className="w-8 h-8 text-warm-sand" />
                </div>
                <div className="font-playfair text-3xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="font-montserrat text-alabaster/80">
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

export default ServiceTestimonials;