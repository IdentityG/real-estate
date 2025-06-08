'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Property interface
interface Property {
  id: number;
  image: string;
  title: string;
  price: string;
  type: string;
  location: string;
  tag: string;
}

const FeaturedProperties = () => {
  // State for tracking mounted state, active property, and current slide
  const [isMounted, setIsMounted] = useState(false);
  const [activeProperty, setActiveProperty] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Refs for animations and scrolling
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  
  // Scroll animations with Framer Motion
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  
  // Parallax effect values
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.6, 1], [0, 1, 1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.6, 1], [0.95, 1, 1, 0.98]);
  
  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // GSAP animations
  useEffect(() => {
    if (!isMounted) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards stagger animation
      gsap.fromTo('.property-card',
        {
          opacity: 0,
          y: 30,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isMounted]);
  
  // Dummy data for featured properties
  const properties: Property[] = [
    {
      id: 1,
      image: '/images/estate1.jpg',
      title: 'Luxury Penthouse',
      price: '$1,250,000',
      type: 'Residential',
      location: 'Downtown Mekiya',
      tag: '🔥 Hot Listing'
    },
    {
      id: 2,
      image: '/images/estate2.jpg',
      title: 'Waterfront Villa',
      price: '$2,850,000',
      type: 'Luxury Home',
      location: 'Harbor District',
      tag: '⭐ Featured'
    },
    {
      id: 3,
      image: '/images/estate3.jpg',
      title: 'Modern Office Space',
      price: '$3,500/mo',
      type: 'Commercial',
      location: 'Business Bay',
      tag: '🔥 Hot Listing'
    },
    {
      id: 4,
      image: '/images/estate4.jpg',
      title: 'Mountain Retreat',
      price: '$895,000',
      type: 'Vacation Home',
      location: 'Northern Highlands',
      tag: 'New Listing'
    },
    {
      id: 5,
      image: '/images/estate5.jpg',
      title: 'Urban Loft',
      price: '$650,000',
      type: 'Condominium',
      location: 'City Center',
      tag: '⭐ Featured'
    },
    {
      id: 6,
      image: '/images/estate1.jpg',
      title: 'Gated Community Home',
      price: '$1,750,000',
      type: 'Family Residence',
      location: 'Green Valley',
      tag: '🔥 Hot Listing'
    }
  ];

  // Scroll to next/previous slide
  const scrollToSlide = (direction: 'next' | 'prev') => {
    if (!cardsContainerRef.current) return;
    
    const container = cardsContainerRef.current;
    const cardWidth = container.querySelector('.property-card')?.clientWidth || 0;
    const gap = 24; // gap-6 = 1.5rem = 24px
    const scrollAmount = cardWidth + gap;
    
    if (direction === 'next') {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setCurrentSlide(prev => Math.min(prev + 1, properties.length - 1));
    } else {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      setCurrentSlide(prev => Math.max(prev - 1, 0));
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-20 bg-gradient-to-b from-alabaster to-white relative overflow-hidden w-full"
    >
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-20 left-10 w-24 h-24 bg-warm-sand/20 rounded-full blur-xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: 'easeInOut' 
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-40 h-40 bg-soft-sage/20 rounded-full blur-xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
      />
      
      {/* Background decoration with parallax */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-white via-alabaster to-silver-mist/30 opacity-70"
        style={{ y, opacity, scale }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Header with GSAP animation */}
        <motion.div
          ref={titleRef}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-royal-navy mb-4">
            Featured Properties
          </h2>
          <p className="font-montserrat text-lg text-slate-gray max-w-2xl mx-auto">
            Exclusive listings curated by our team
          </p>
        </motion.div>

        {/* Modern Card Layout with Responsive Design */}
        <div className="relative">
          {/* Navigation Arrows - Visible on all devices */}
          <div className="flex justify-between absolute top-1/2 -translate-y-1/2 w-full z-10 px-2 md:px-4 pointer-events-none">
            <motion.button 
              onClick={() => scrollToSlide('prev')}
              className="w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg text-deep-teal border border-silver-mist/30 pointer-events-auto"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 1)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0.8, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              disabled={currentSlide === 0}
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button 
              onClick={() => scrollToSlide('next')}
              className="w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg text-deep-teal border border-silver-mist/30 pointer-events-auto"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 1)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0.8, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              disabled={currentSlide === properties.length - 1}
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
          
          {/* Pagination Indicators */}
          <div className="flex justify-center mt-8 gap-2 py-6 w-full">
            {properties.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  if (!cardsContainerRef.current) return;
                  const container = cardsContainerRef.current;
                  const cardWidth = container.querySelector('.property-card')?.clientWidth || 0;
                  const gap = 24;
                  container.scrollTo({ 
                    left: index * (cardWidth + gap), 
                    behavior: 'smooth' 
                  });
                  setCurrentSlide(index);
                }}
                className={`w-2.5 h-2.5 rounded-full ${currentSlide === index ? 'bg-deep-teal' : 'bg-silver-mist'}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={{ 
                  scale: currentSlide === index ? 1.2 : 1,
                  backgroundColor: currentSlide === index ? '#005F73' : '#DEE2E6'
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
          
          {/* Modern Card Container with Responsive Design */}
          <div 
            ref={cardsContainerRef}
            className="overflow-x-auto hide-scrollbar pb-8 -mx-4 px-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex gap-6"
              style={{ paddingBottom: '10px' }} /* Extra padding for shadow */
            >
              {properties.map((property) => (
                <motion.div
                  key={property.id}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="property-card flex-shrink-0 bg-white rounded-xl shadow-elegant overflow-hidden hover:shadow-xl transition-all duration-300 snap-start"
                  style={{
                    width: 'calc(100vw - 2rem)',
                    maxWidth: '400px',
                  }}
                >
                  {/* Property Image with modern aspect ratio */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block bg-deep-teal/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-montserrat font-medium mb-2">
                          {property.tag}
                        </span>
                        <h3 className="text-white font-playfair text-xl font-semibold drop-shadow-md">
                          {property.title}
                        </h3>
                        <p className="text-white/90 font-montserrat text-sm mt-1 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {property.location}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-deep-teal text-xl font-montserrat font-bold">
                          {property.price}
                        </p>
                        <p className="text-slate-gray text-sm font-montserrat">
                          {property.type}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-9 h-9 bg-alabaster rounded-full flex items-center justify-center text-slate-gray hover:text-terracotta transition-colors duration-300"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </motion.button>
                    </div>
                    
                    <Link href={`/properties/${property.id}`}>
                      <motion.button 
                        whileHover={{ 
                          scale: 1.02,
                          boxShadow: '0 10px 25px rgba(0, 95, 115, 0.2)'
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-deep-teal to-royal-navy text-white py-3 rounded-lg transition-all duration-300 font-montserrat text-sm font-medium flex items-center justify-center group"
                      >
                        <span>View Details</span>
                        <motion.svg 
                          className="w-4 h-4 ml-2 opacity-70 group-hover:opacity-100" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity, 
                            ease: 'easeInOut',
                            repeatDelay: 0.5
                          }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </motion.svg>
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        
        {/* View All CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-12"
        >
          <Link href="/properties">
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 10px 25px rgba(0, 95, 115, 0.2)'
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-deep-teal to-royal-navy text-white font-montserrat font-medium px-8 py-3 rounded-full shadow-md inline-flex items-center"
            >
              <span>Explore All Properties</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Add custom CSS for hiding scrollbars */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default FeaturedProperties;