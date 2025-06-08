'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronRightIcon, 
  PlayIcon,
  ArrowDownIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AboutPageHeroProps {
  title?: string;
  subtitle?: string;
  missionStatement?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  showBreadcrumb?: boolean;
  showStats?: boolean;
}

const AboutPageHero: React.FC<AboutPageHeroProps> = ({
  title = "About Mekiya Real Estate",
  subtitle = "Transforming Dreams into Reality Across Ethiopia",
  missionStatement = "We are committed to providing exceptional real estate services, connecting families with their perfect homes while building stronger communities throughout Ethiopia.",
  backgroundImage = "/images/estate3.jpg",
  backgroundVideo,
  showBreadcrumb = true,
  showStats = true
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Smooth parallax transforms using Framer Motion
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.2]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.85, 0.95]); // Increased opacity for darker overlay
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating decorative elements with Ethiopian-inspired patterns
      if (floatingElementsRef.current) {
        const elements = floatingElementsRef.current.children;
        
        Array.from(elements).forEach((element, index) => {
          gsap.to(element, {
            y: -20,
            rotation: index % 2 === 0 ? 5 : -5,
            duration: 5 + index * 0.7,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut',
            delay: index * 0.6
          });
        });
      }

      // Stats counter animation - Fixed to trigger on scroll
      if (statsRef.current) {
        const statNumbers = statsRef.current.querySelectorAll('.stat-number');
        statNumbers.forEach((stat) => {
          const finalValue = parseInt(stat.textContent || '0');
          // Set initial value to 0
          gsap.set(stat, { textContent: 0 });
          
          gsap.to(stat, {
            textContent: finalValue,
            duration: 2.5,
            ease: 'power2.out',
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: statsRef.current, // Use the stats container as trigger
              start: 'top 85%', // Start when stats section is 85% from top
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
              once: true // Only play once
            }
          });
        });
      }

      // Background setup
      if (backgroundRef.current) {
        gsap.set(backgroundRef.current, {
          scale: 1.1,
          transformOrigin: 'center center'
        });
      }

      // Overlay breathing effect - Reduced for darker overlay
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0.9, // Darker base opacity
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut'
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
        duration: 1.2,
        staggerChildren: 0.4
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: 'easeOut'
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: 0.2
      }
    }
  };

  const missionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: 0.4
      }
    }
  };

  const breadcrumbVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: 0.6
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: 0.8
      }
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image/Video */}
      <motion.div 
        ref={backgroundRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          y: backgroundY,
          scale: backgroundScale
        }}
      >
        {backgroundVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={backgroundVideo} type="video/mp4" />
            <Image
              src={backgroundImage}
              alt="About Mekiya Real Estate"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </video>
        ) : (
          <Image
            src={backgroundImage}
            alt="About Mekiya Real Estate"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
      </motion.div>

      {/* Enhanced Darker Overlay for Better Text Visibility */}
      <motion.div 
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-br from-royal-navy/90 via-deep-teal/85 to-midnight/95"
        style={{ opacity: overlayOpacity }}
      />
      
      {/* Additional Dark Overlay for Extra Text Contrast */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Ethiopian-inspired Floating Decorative Elements */}
      <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-8 w-20 h-20 bg-warm-sand/25 rounded-full blur-sm" />
        <div className="absolute top-32 right-16 w-16 h-16 bg-gold-leaf/30 rounded-full blur-sm" />
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-terracotta/20 rounded-full blur-sm" />
        <div className="absolute bottom-40 left-12 w-24 h-24 bg-soft-sage/25 rounded-full blur-sm" />
        <div className="absolute bottom-24 right-1/4 w-18 h-18 bg-warm-sand/20 rounded-full blur-sm" />
        <div className="absolute top-1/3 right-8 w-14 h-14 bg-gold-leaf/25 rounded-full blur-sm" />
      </div>

      {/* Content Container */}
      <motion.div 
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ y: contentY }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Breadcrumb */}
        {showBreadcrumb && (
          <motion.nav 
            className="mb-8 flex items-center justify-center text-sm"
            variants={breadcrumbVariants}
          >
            <Link 
              href="/" 
              className="text-warm-sand/90 hover:text-warm-sand transition-colors duration-300 font-montserrat"
            >
              Home
            </Link>
            <ChevronRightIcon className="w-4 h-4 mx-2 text-warm-sand/70" />
            <span className="text-white font-medium font-montserrat">About Us</span>
          </motion.nav>
        )}

        {/* Main Title */}
        <motion.h1 
          className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
          variants={titleVariants}
        >
          <span className="block bg-gradient-to-r from-warm-sand via-gold-leaf to-warm-sand bg-clip-text text-transparent">
            {title}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="font-montserrat text-xl sm:text-2xl md:text-3xl text-warm-sand/95 mb-8 max-w-4xl mx-auto leading-relaxed font-medium drop-shadow-md"
          variants={subtitleVariants}
        >
          {subtitle}
        </motion.p>

        {/* Mission Statement */}
        <motion.p 
          className="font-montserrat text-base sm:text-lg md:text-xl text-white/95 mb-12 max-w-5xl mx-auto leading-relaxed drop-shadow-md"
          variants={missionVariants}
        >
          {missionStatement}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          variants={ctaVariants}
        >
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-deep-teal to-royal-navy text-white font-montserrat font-semibold rounded-lg shadow-elegant overflow-hidden transition-all duration-300 hover:shadow-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const teamSection = document.getElementById('our-team');
              if (teamSection) {
                teamSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <div className="relative flex items-center gap-2">
              <UserGroupIcon className="w-5 h-5" />
              <span>Meet Our Team</span>
            </div>
          </motion.button>

          <motion.button
            className="group relative px-8 py-4 bg-transparent border-2 border-warm-sand text-warm-sand font-montserrat font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:bg-warm-sand hover:text-royal-navy"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const storySection = document.getElementById('company-story');
              if (storySection) {
                storySection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <div className="relative flex items-center gap-2">
              <BuildingOfficeIcon className="w-5 h-5" />
              <span>Our Story</span>
            </div>
          </motion.button>
        </motion.div>

        {/* Company Stats - Fixed to trigger on scroll */}
        {showStats && (
          <motion.div 
            ref={statsRef}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
            variants={statsVariants}
          >
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-playfair font-bold text-warm-sand mb-2 drop-shadow-lg">
                <span className="stat-number">500</span>+
              </div>
              <p className="text-white/90 font-montserrat text-sm sm:text-base drop-shadow-md">Properties Sold</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-playfair font-bold text-warm-sand mb-2 drop-shadow-lg">
                <span className="stat-number">15</span>+
              </div>
              <p className="text-white/90 font-montserrat text-sm sm:text-base drop-shadow-md">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-playfair font-bold text-warm-sand mb-2 drop-shadow-lg">
                <span className="stat-number">1000</span>+
              </div>
              <p className="text-white/90 font-montserrat text-sm sm:text-base drop-shadow-md">Happy Families</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-warm-sand/80"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-montserrat uppercase tracking-wider drop-shadow-md">Scroll to explore</span>
          <ArrowDownIcon className="w-5 h-5 drop-shadow-md" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/50 to-transparent" />
    </section>
  );
};

export default AboutPageHero;