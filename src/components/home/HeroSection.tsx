'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  HomeIcon,
  UserGroupIcon,
  PlayIcon,
  StarIcon,
  ChevronRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number, size: number, delay: number }>>([]);

  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const x = useSpring(0, springConfig);
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  // Generate particles
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  // Mouse movement handler
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current) return;

    const rect = heroRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left - centerX;
    const mouseY = e.clientY - rect.top - centerY;

    setMousePosition({ x: mouseX, y: mouseY });

    // Update spring values for 3D effect
    x.set(mouseX * 0.01);
    rotateY.set(mouseX * 0.01);
    rotateX.set(-mouseY * 0.01);
  }, [x, rotateX, rotateY]);

  // Auto-slide for background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Enhanced GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      const tl = gsap.timeline();

      tl.fromTo(heroRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 }
      );

      // Text reveal animation
      if (textRef.current) {
        gsap.fromTo('.hero-text-line',
          {
            y: 100,
            opacity: 0,
            rotationX: -90
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power3.out',
            delay: 0.5
          }
        );
      }

      // Background image animations
      if (imageRef.current) {
        gsap.set(imageRef.current, { scale: 1.1 });

        ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          animation: gsap.to(imageRef.current, {
            scale: 1.4,
            y: -150,
            ease: 'none'
          })
        });
      }

      // Floating elements with advanced animations
      if (floatingElementsRef.current) {
        const elements = floatingElementsRef.current.children;

        Array.from(elements).forEach((element, index) => {
          gsap.to(element, {
            y: -30,
            x: Math.sin(index) * 20,
            rotation: Math.cos(index) * 10,
            scale: 1.1,
            duration: 4 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.5
          });
        });
      }

      // Particle animations
      if (particlesRef.current) {
        const particleElements = particlesRef.current.children;

        Array.from(particleElements).forEach((particle, index) => {
          gsap.to(particle, {
            y: -window.innerHeight,
            duration: 10 + Math.random() * 10,
            repeat: -1,
            ease: 'none',
            delay: Math.random() * 5
          });
        });
      }

      // Morphing background gradient
      gsap.to('.gradient-morph', {
        backgroundPosition: '200% 200%',
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'none'
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Enhanced Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      rotateX: -15,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const slideInLeft = {
    hidden: {
      opacity: 0,
      x: -100,
      rotateY: -15
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 1,
        ease: 'backOut'
      }
    }
  };

  const slideInRight = {
    hidden: {
      opacity: 0,
      x: 100,
      rotateY: 15
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 1,
        ease: 'backOut'
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      rotate: [-5, 5, -5],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  const stats = [
    { number: '500+', label: 'Homes Sold', icon: HomeIcon, color: 'from-deep-teal to-soft-sage' },
    { number: '20+', label: 'Expert Agents', icon: UserGroupIcon, color: 'from-terracotta to-gold-leaf' },
    { number: '15+', label: 'Prime Cities', icon: MapPinIcon, color: 'from-royal-navy to-deep-teal' }
  ];

  const backgroundImages = [
    '/images/estate1.jpg',
    '/images/estate2.jpg',
    '/images/estate1.jpg'
  ];

  const propertyTypes = [
    { name: 'Luxury Villas', count: '150+', icon: '🏰' },
    { name: 'Modern Apartments', count: '200+', icon: '🏢' },
    { name: 'Commercial Spaces', count: '80+', icon: '🏬' }
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{ perspective: '1000px' }}
    >
      {/* Revolutionary Animated Background */}
      <div className="absolute inset-0">
        {/* Morphing Gradient Background */}
        <div
          className="gradient-morph absolute inset-0 opacity-90"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(0, 95, 115, 0.9) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(25, 55, 109, 0.8) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(139, 162, 142, 0.7) 0%, transparent 50%),
              linear-gradient(135deg, #005F73 0%, #193B6D 25%, #8BA28E 50%, #D4A574 75%, #C67B5C 100%)
            `,
            backgroundSize: '400% 400%'
          }}
        />

        {/* Dynamic Background Images with Crossfade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            ref={imageRef}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            <Image
              src={backgroundImages[currentSlide]}
              alt="Luxury Real Estate"
              fill
              className="object-cover object-center"
              priority
              quality={95}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-royal-navy/60 via-deep-teal/40 to-midnight/70" />
          </motion.div>
        </AnimatePresence>

        {/* Animated Mesh Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-royal-navy/30 via-transparent to-deep-teal/40" />
      </div>

      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-white/20 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`
            }}
            animate={{
              y: [-20, -window.innerHeight - 100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      {/* Enhanced Floating Decorative Elements */}
      <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-warm-sand/30 to-gold-leaf/20 rounded-full blur-2xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-br from-soft-sage/20 to-deep-teal/30 rounded-full blur-3xl"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '1s' }}
        />
        <motion.div
          className="absolute bottom-32 left-20 w-40 h-40 bg-gradient-to-br from-terracotta/25 to-royal-navy/20 rounded-full blur-2xl"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-gold-leaf/30 to-warm-sand/25 rounded-full blur-xl"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '3s' }}
        />

        {/* Geometric Shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-white/20 rotate-45"
          animate={{ rotate: [45, 405, 45] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-12 h-12 bg-gradient-to-br from-gold-leaf/30 to-transparent rounded-full"
          variants={pulseVariants}
          animate="animate"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-screen py-20">

          {/* Left Column - Enhanced Content */}
          <motion.div
            ref={textRef}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 text-white space-y-10"
            style={{
              transform: `perspective(1000px) rotateX(${rotateX.get()}deg) rotateY(${rotateY.get()}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Premium Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full"
            >
              <SparklesIcon className="w-4 h-4 text-gold-leaf" />
              <span className="font-montserrat text-sm font-medium text-warm-sand">
                #1 Premium Real Estate in Ethiopia
              </span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <StarIcon className="w-4 h-4 text-gold-leaf" />
              </motion.div>
            </motion.div>

            {/* Revolutionary Hero Headline */}
            <motion.div variants={slideInLeft} className="space-y-6">
              <div className="overflow-hidden">
                <motion.h1
                  className="hero-text-line font-playfair text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
                  style={{
                    opacity,
                    y,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  Discover Your
                </motion.h1>
              </div>

              <div className="overflow-hidden">
                <motion.h1
                  className="hero-text-line font-playfair text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
                >
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-warm-sand via-gold-leaf to-terracotta bg-clip-text text-transparent animate-pulse">
                      Dream Home
                    </span>
                    <motion.div
                      className="absolute -inset-2 bg-gradient-to-r from-warm-sand/20 to-gold-leaf/20 rounded-lg blur-lg"
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [0.95, 1.05, 0.95]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    />
                  </span>
                </motion.h1>
              </div>

              <div className="overflow-hidden">
                <motion.h1
                  className="hero-text-line font-playfair text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
                >
                  with{' '}
                  <span className="relative">
                    Mekiya
                    <motion.div
                      className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-deep-teal to-warm-sand rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 2, duration: 1, ease: 'easeOut' }}
                    />
                  </span>
                </motion.h1>
              </div>

              <motion.p
                variants={itemVariants}
                className="hero-text-line font-montserrat text-lg sm:text-xl lg:text-2xl text-warm-sand/90 max-w-2xl leading-relaxed"
              >
                Experience luxury living in Ethiopia's most prestigious locations with our
                <span className="text-gold-leaf font-semibold"> award-winning </span>
                real estate expertise.
              </motion.p>
            </motion.div>

            {/* Enhanced Search Bar */}


            {/* Enhanced CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 20px 40px rgba(0, 95, 115, 0.4)',
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-5 bg-gradient-to-r from-deep-teal via-royal-navy to-deep-teal text-white font-montserrat font-bold rounded-2xl shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                <div className="relative flex items-center gap-3">
                  <span>Explore Properties</span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </motion.div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsVideoPlaying(true)}
                className="group px-10 py-5 bg-white/10 backdrop-blur-xl border-2 border-white/30 hover:border-white/60 text-white font-montserrat font-semibold rounded-2xl transition-all duration-500 flex items-center gap-3"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                >
                  <PlayIcon className="w-4 h-4 ml-0.5" />
                </motion.div>
                <span>Watch Virtual Tour</span>
              </motion.button>
            </motion.div>

            {/* Property Types Quick Access */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              {propertyTypes.map((type, index) => (
                <motion.div
                  key={type.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full cursor-pointer group"
                >
                  <div className="flex items-center gap-2 text-sm font-montserrat">
                    <span className="text-lg">{type.icon}</span>
                    <span className="text-white group-hover:text-gold-leaf transition-colors">
                      {type.name}
                    </span>
                    <span className="text-warm-sand/70 text-xs">
                      {type.count}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-8 pt-10 border-t border-white/20"
            >
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    variants={slideInLeft}
                    transition={{ delay: 1.2 + index * 0.2 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center group cursor-pointer"
                  >
                    <motion.div
                      className={`relative mx-auto w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-2xl transition-all duration-300`}
                      whileHover={{ rotate: 5 }}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                      <motion.div
                        className="absolute inset-0 bg-white/20 rounded-2xl"
                        animate={{
                          opacity: [0, 0.5, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.5
                        }}
                      />
                    </motion.div>

                    <motion.div
                      className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-2"
                      animate={{
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    >
                      {stat.number}
                    </motion.div>

                    <div className="font-montserrat text-sm text-warm-sand/90 group-hover:text-gold-leaf transition-colors duration-300">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Column - Revolutionary Property Showcase */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 hidden lg:flex justify-center items-center"
          >
            <div className="relative w-full max-w-lg">
              {/* Main Featured Property Card */}
              <motion.div
                whileHover={{
                  y: -15,
                  scale: 1.03,
                  rotateY: 5,
                  rotateX: 5
                }}
                className="relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Glassmorphism Card with 3D Effect */}
                <div className="bg-white/10 backdrop-blur-2xl border border-white/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-deep-teal/20 to-gold-leaf/20" />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="absolute top-4 right-4 w-32 h-32 border border-white/20 rounded-full"
                    />
                  </div>

                  {/* Property Image with Advanced Effects */}
                  <div className="relative h-80 rounded-2xl overflow-hidden mb-8 group">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Image
                        src="/images/estate2.jpg"
                        alt="Featured Property"
                        fill
                        className="object-cover transition-all duration-700 group-hover:brightness-110"
                      />
                    </motion.div>

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-royal-navy/60 via-transparent to-transparent" />

                    {/* Multiple Badges */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="bg-gradient-to-r from-deep-teal to-royal-navy text-white px-4 py-2 rounded-full text-sm font-montserrat font-semibold shadow-lg"
                      >
                        ⭐ Featured
                      </motion.div>
                      <motion.div
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="bg-gradient-to-r from-terracotta to-gold-leaf text-white px-3 py-1 rounded-full text-xs font-montserrat font-medium"
                      >
                        🔥 Hot Deal
                      </motion.div>
                    </div>

                    {/* Property Stats Overlay */}
                    <div className="absolute bottom-4 left-4 flex gap-4">
                      {['4 Beds', '3 Baths', '2,500 sqft'].map((stat, index) => (
                        <motion.div
                          key={stat}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 2 + index * 0.2 }}
                          className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-xs font-montserrat"
                        >
                          {stat}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="space-y-6 relative z-10">
                    <div>
                      <motion.h3
                        className="font-playfair text-2xl font-bold text-white mb-2"
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        Luxury Waterfront Villa
                      </motion.h3>
                      <div className="flex items-center gap-2 text-warm-sand/90">
                        <MapPinIcon className="w-4 h-4" />
                        <span className="font-montserrat text-sm">
                          Bole, Premium Heights District
                        </span>
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="flex justify-between items-center">
                      <div>
                        <motion.span
                          className="font-playfair text-3xl font-bold bg-gradient-to-r from-gold-leaf to-warm-sand bg-clip-text text-transparent"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          $2,450,000
                        </motion.span>
                        <div className="text-warm-sand/70 text-sm font-montserrat">
                          $980/sqft
                        </div>
                      </div>

                      <motion.button
                        whileHover={{
                          scale: 1.15,
                          rotate: 5,
                          boxShadow: '0 10px 25px rgba(0, 95, 115, 0.4)'
                        }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-gradient-to-r from-deep-teal to-royal-navy text-white p-4 rounded-2xl shadow-lg transition-all duration-300"
                      >
                        <ChevronRightIcon className="w-6 h-6" />
                      </motion.button>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2">
                      {['Pool', 'Garden', 'Parking', 'Security'].map((amenity, index) => (
                        <motion.span
                          key={amenity}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 2.5 + index * 0.1 }}
                          className="bg-white/10 text-white px-3 py-1 rounded-full text-xs font-montserrat"
                        >
                          {amenity}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 10, 0]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="absolute -top-6 -left-6 bg-gradient-to-r from-terracotta to-gold-leaf text-white px-6 py-3 rounded-2xl text-sm font-montserrat font-bold shadow-2xl z-10"
                >
                  🏆 Best Investment 2024
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1
                  }}
                  className="absolute -bottom-4 -right-4 bg-gradient-to-r from-soft-sage to-deep-teal text-white px-4 py-2 rounded-xl text-xs font-montserrat font-semibold shadow-xl"
                >
                  💎 Premium Location
                </motion.div>
              </motion.div>

              {/* Floating Mini Cards */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 3, duration: 0.8 }}
                className="absolute -right-8 top-1/4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-xl"
              >
                <div className="text-center">
                  <div className="text-2xl font-playfair font-bold text-white">98%</div>
                  <div className="text-xs font-montserrat text-warm-sand/80">Satisfaction</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 3.5, duration: 0.8 }}
                className="absolute -left-8 bottom-1/4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-xl"
              >
                <div className="text-center">
                  <div className="text-2xl font-playfair font-bold text-white">24/7</div>
                  <div className="text-xs font-montserrat text-warm-sand/80">Support</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white z-20"
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center space-y-4 cursor-pointer group"
        >
          <motion.span
            className="font-montserrat text-sm text-warm-sand/90 group-hover:text-gold-leaf transition-colors"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Discover More Properties
          </motion.span>

          <motion.div
            className="relative w-8 h-12 border-2 border-white/40 rounded-full flex justify-center group-hover:border-gold-leaf/60 transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-4 bg-gradient-to-b from-white/80 to-gold-leaf rounded-full mt-2"
            />

            {/* Pulse rings */}
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 border-2 border-white/20 rounded-full"
            />
          </motion.div>

          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="w-6 h-6 border-t-2 border-r-2 border-gold-leaf/60 rounded-full"
          />
        </motion.div>
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setIsVideoPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-4xl mx-4 aspect-video bg-black rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="text-center">
                  <PlayIcon className="w-20 h-20 mx-auto mb-4 opacity-50" />
                  <p className="font-montserrat text-lg">Virtual Tour Video Coming Soon</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsVideoPlaying(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
              >
                ✕
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;