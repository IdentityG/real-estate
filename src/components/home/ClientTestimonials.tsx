'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import {
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid';
import {
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { FaQuoteLeft } from "react-icons/fa";

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Testimonial data interface
interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  property: string;
  location: string;
  date: string;
  propertyType: string;
}

// Sample testimonial data
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Abel Teshale',
    avatar: '/images/agent4.jpg',
    rating: 5,
    text: 'Mekiya Real Estate made our dream home a reality. Their professional team guided us through every step of the process with exceptional care and expertise. The attention to detail and personalized service exceeded all our expectations.',
    property: 'Luxury Villa',
    location: 'Bole, Addis Ababa',
    date: 'March 2024',
    propertyType: 'Purchase'
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: '/images/agent2.jpg',
    rating: 5,
    text: 'Outstanding service from start to finish! The Mekiya team found us the perfect commercial space for our business. Their market knowledge and negotiation skills saved us both time and money. Highly recommended!',
    property: 'Commercial Office',
    location: 'Kazanchis, Addis Ababa',
    date: 'February 2024',
    propertyType: 'Lease'
  },
  {
    id: 3,
    name: 'Hana Biruk',
    avatar: '/images/agent6.jpg',
    rating: 5,
    text: 'Selling our property through Mekiya was seamless and stress-free. They marketed our home beautifully and found qualified buyers quickly. The entire process was transparent and professional.',
    property: 'Family Residence',
    location: 'CMC, Addis Ababa',
    date: 'January 2024',
    propertyType: 'Sale'
  },
  {
    id: 4,
    name: 'David Wilson',
    avatar: '/images/agent3.jpg',
    rating: 5,
    text: 'Exceptional investment guidance! Mekiya helped us identify prime real estate opportunities with excellent ROI potential. Their market analysis and strategic advice have been invaluable to our portfolio growth.',
    property: 'Investment Portfolio',
    location: 'Various Locations',
    date: 'December 2023',
    propertyType: 'Investment'
  },
  {
    id: 5,
    name: 'Hanan Ahmed',
    avatar: '/images/agent5.jpg',
    rating: 5,
    text: 'First-time home buying was made easy with Mekiya. Their agents were patient, knowledgeable, and truly cared about finding us the right home within our budget. We couldn\'t be happier with our new place!',
    property: 'Modern Apartment',
    location: 'Megenagna, Addis Ababa',
    date: 'November 2023',
    propertyType: 'Purchase'
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2
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

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: {
    opacity: 0,
    y: -50,
    scale: 0.9,
    transition: {
      duration: 0.4
    }
  }
};

const ClientTestimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Navigation functions
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating animation for decorative elements
      gsap.to('.testimonial-bg-element', {
        y: -20,
        rotation: 3,
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
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Parallax effect for section background
      gsap.to('.testimonials-parallax', {
        yPercent: -15,
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

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-br from-royal-navy via-deep-teal to-royal-navy overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="testimonial-bg-element absolute top-20 left-10 w-40 h-40 bg-warm-sand/10 rounded-full blur-2xl" />
        <div className="testimonial-bg-element absolute bottom-32 right-16 w-56 h-56 bg-gold-leaf/5 rounded-full blur-3xl" />
        <div className="testimonials-parallax absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-warm-sand/5 to-gold-leaf/5 rounded-full blur-3xl" />
        
        {/* Quote Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 text-6xl text-warm-sand font-playfair">"</div>
          <div className="absolute bottom-20 right-20 text-6xl text-warm-sand font-playfair rotate-180">"</div>
          <div className="absolute top-1/2 left-1/4 text-4xl text-gold-leaf font-playfair">"</div>
          <div className="absolute top-1/3 right-1/4 text-4xl text-gold-leaf font-playfair rotate-180">"</div>
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
            className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-6"
          >
            What Our{' '}
            <span className="text-warm-sand relative">
              Clients Say
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-warm-sand to-gold-leaf rounded-full" />
            </span>
          </motion.h2>
          
          <motion.p 
            variants={titleVariants}
            className="text-lg md:text-xl text-silver-mist font-montserrat max-w-2xl mx-auto leading-relaxed"
          >
            Real Stories from Real Buyers & Sellers
          </motion.p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative"
            >
              {/* Large Quote Icon */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-12 h-12 bg-warm-sand rounded-full flex items-center justify-center shadow-xl">
                  <FaQuoteLeft className="w-6 h-6 text-royal-navy" />
                </div>
              </div>

              {/* Main Testimonial Card */}
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-warm-sand/20">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  {/* Client Photo and Info */}
                  <div className="text-center md:text-left">
                    <div className="relative w-24 h-24 mx-auto md:mx-0 mb-4 rounded-full overflow-hidden ring-4 ring-warm-sand/30 shadow-lg">
                      <Image
                        src={currentTestimonial.avatar}
                        alt={currentTestimonial.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 96px, 96px"
                      />
                    </div>
                    
                    <h3 className="text-xl font-playfair font-semibold text-royal-navy mb-2">
                      {currentTestimonial.name}
                    </h3>
                    
                    {/* Rating Stars */}
                    <div className="flex items-center justify-center md:justify-start space-x-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-5 h-5 ${
                            i < currentTestimonial.rating
                              ? 'text-gold-leaf'
                              : 'text-silver-mist'
                          }`}
                        />
                      ))}
                    </div>
                    
                    {/* Property Info */}
                    <div className="space-y-1 text-sm text-slate-gray font-montserrat">
                      <div className="font-medium text-deep-teal">
                        {currentTestimonial.propertyType}: {currentTestimonial.property}
                      </div>
                      <div>{currentTestimonial.location}</div>
                      <div>{currentTestimonial.date}</div>
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <div className="md:col-span-2">
                    <blockquote className="text-lg md:text-xl text-charcoal font-montserrat leading-relaxed italic">
                      "{currentTestimonial.text}"
                    </blockquote>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-12 space-x-6">
            {/* Previous Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={goToPrevious}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-warm-sand hover:text-royal-navy transition-all duration-300 shadow-lg"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </motion.button>

            {/* Dot Indicators */}
            <div className="flex space-x-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-warm-sand scale-125'
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={goToNext}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-warm-sand hover:text-royal-navy transition-all duration-300 shadow-lg"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Secondary Testimonials Grid (Desktop) */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6 mt-16">
            {testimonials
              .filter((_, index) => index !== currentIndex)
              .slice(0, 3)
              .map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => goToSlide(testimonials.indexOf(testimonial))}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 cursor-pointer hover:bg-white/20 transition-all duration-300 border border-white/10"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-warm-sand/30">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-montserrat font-medium text-sm">
                        {testimonial.name}
                      </h4>
                      <div className="flex space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <StarIcon key={i} className="w-3 h-3 text-gold-leaf" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-silver-mist text-sm font-montserrat line-clamp-3">
                    "{testimonial.text.substring(0, 120)}..."
                  </p>
                </motion.div>
              ))
            }
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-warm-sand to-gold-leaf text-royal-navy font-montserrat font-semibold rounded-full hover:shadow-2xl transition-all duration-300 group"
          >
            Share Your Experience
            <motion.div
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRightIcon className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientTestimonials;