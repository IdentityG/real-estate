'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { MagnifyingGlassIcon, MapPinIcon, HomeIcon, UserGroupIcon } from '@heroicons/react/24/outline';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero image parallax and zoom effect
      if (imageRef.current) {
        gsap.set(imageRef.current, { scale: 1.1 });
        
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          animation: gsap.to(imageRef.current, {
            scale: 1.3,
            y: -100,
            ease: 'none'
          })
        });
      }

      // Floating elements animation
      if (floatingElementsRef.current) {
        const elements = floatingElementsRef.current.children;
        
        Array.from(elements).forEach((element, index) => {
          gsap.to(element, {
            y: -20,
            rotation: 5,
            duration: 3 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut',
            delay: index * 0.3
          });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  const stats = [
    { number: '500+', label: 'Homes Sold', icon: HomeIcon },
    { number: '20+', label: 'Expert Agents', icon: UserGroupIcon },
    { number: '15+', label: 'Prime Cities', icon: MapPinIcon }
  ];

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-royal-navy via-deep-teal to-midnight"
    >
      {/* Animated Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-royal-navy/90 via-deep-teal/80 to-transparent" />
      
      {/* Background Image with Parallax */}
      <div 
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="/images/estate1.jpg"
          alt="Luxury Real Estate"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-royal-navy/70 via-deep-teal/50 to-royal-navy/60" />
      </div>

      {/* Floating Decorative Elements */}
      <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-warm-sand/20 rounded-full blur-xl" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-gold-leaf/15 rounded-full blur-2xl" />
        <div className="absolute bottom-32 left-20 w-24 h-24 bg-soft-sage/20 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-terracotta/20 rounded-full blur-lg" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          
          {/* Left Column - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-white space-y-8"
          >
            {/* Hero Headline */}
            <motion.div variants={slideInLeft} className="space-y-4">
              <motion.h1 
                className="font-playfair text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
                style={{ opacity, y }}
              >
                Find Your{' '}
                <span className="bg-gradient-to-r from-warm-sand to-gold-leaf bg-clip-text text-transparent">
                  Dream Home
                </span>
                {' '}with Mekiya
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="font-montserrat text-lg sm:text-xl lg:text-2xl text-warm-sand/90 max-w-2xl leading-relaxed"
              >
                Trusted Real Estate Experts in Prime Locations
              </motion.p>
            </motion.div>

            {/* Search Bar */}
            <motion.div variants={itemVariants} className="max-w-2xl">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-6 w-6 text-slate-gray" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by location, property type, or keyword..."
                  className="w-full pl-12 pr-32 py-4 bg-white/95 backdrop-blur-md border border-silver-mist rounded-xl font-montserrat text-charcoal placeholder-slate-gray focus:outline-none focus:ring-2 focus:ring-deep-teal focus:border-transparent shadow-elegant transition-all duration-300"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute inset-y-0 right-0 mr-2 px-6 bg-deep-teal hover:bg-deep-teal/90 text-white font-montserrat font-medium rounded-lg transition-all duration-300 shadow-md"
                >
                  Search
                </motion.button>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0, 95, 115, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-deep-teal hover:bg-deep-teal/90 text-white font-montserrat font-semibold rounded-xl shadow-elegant transition-all duration-300 transform hover:shadow-2xl"
              >
                Explore Properties
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white/50 hover:border-white text-white font-montserrat font-semibold rounded-xl backdrop-blur-sm transition-all duration-300"
              >
                Schedule a Visit
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20"
            >
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    variants={slideInLeft}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="text-center group"
                  >
                    <div className="flex justify-center mb-2">
                      <IconComponent className="h-8 w-8 text-warm-sand group-hover:text-gold-leaf transition-colors duration-300" />
                    </div>
                    <div className="font-playfair text-2xl sm:text-3xl font-bold text-white">
                      {stat.number}
                    </div>
                    <div className="font-montserrat text-sm text-warm-sand/80">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Column - Featured Property Card */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex justify-center items-center"
          >
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative max-w-md w-full"
            >
              {/* Glassmorphism Card */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
                <div className="relative h-64 rounded-xl overflow-hidden mb-6">
                  <Image
                    src="/images/estate2.jpg"
                    alt="Featured Property"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-deep-teal text-white px-3 py-1 rounded-full text-sm font-montserrat font-medium">
                    Featured
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-playfair text-xl font-semibold text-white">
                    Luxury Waterfront Villa
                  </h3>
                  <p className="font-montserrat text-warm-sand/80">
                    123 Ocean Drive, Premium Heights
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-montserrat text-2xl font-bold text-gold-leaf">
                      $2,450,000
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="absolute -top-4 -left-4 bg-gradient-to-r from-terracotta to-gold-leaf text-white px-4 py-2 rounded-full text-sm font-montserrat font-medium shadow-lg"
              >
                🏆 Best Deal
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center space-y-2"
        >
          <span className="font-montserrat text-sm text-warm-sand/80">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;