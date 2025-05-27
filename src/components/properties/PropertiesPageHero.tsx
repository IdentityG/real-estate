'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon, FunnelIcon } from '@heroicons/react/24/outline';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface PropertiesPageHeroProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  showBreadcrumb?: boolean;
  showCTA?: boolean;
}

const PropertiesPageHero: React.FC<PropertiesPageHeroProps> = ({
  title = "Explore Properties",
  subtitle = "Browse listings by location, type, or budget",
  backgroundImage = "/images/estate1.jpg",
  backgroundVideo,
  showBreadcrumb = true,
  showCTA = true
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Smooth parallax transforms using Framer Motion
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 0.8]);

  // GSAP Animations (only for non-scroll elements)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating decorative elements
      if (floatingElementsRef.current) {
        const elements = floatingElementsRef.current.children;
        
        Array.from(elements).forEach((element, index) => {
          gsap.to(element, {
            y: -15,
            rotation: 3,
            duration: 4 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut',
            delay: index * 0.4
          });
        });
      }

      // Initial background setup
      if (backgroundRef.current) {
        gsap.set(backgroundRef.current, {
          scale: 1.1,
          transformOrigin: 'center center'
        });
      }

      // Subtle overlay breathing effect
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0.65,
          duration: 4,
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
        duration: 1,
        staggerChildren: 0.3
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: 0.2
      }
    }
  };

  const breadcrumbVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: 0.4
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
            {/* Fallback image */}
            <Image
              src={backgroundImage}
              alt="Properties background"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </video>
        ) : (
          <Image
            src={backgroundImage}
            alt="Properties background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
      </motion.div>

      {/* Overlay */}
      <motion.div 
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-br from-royal-navy/70 via-deep-teal/60 to-midnight/80"
        style={{ opacity: overlayOpacity }}
      />

      {/* Floating Decorative Elements */}
      <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-warm-sand/20 rounded-full blur-sm" />
        <div className="absolute top-40 right-20 w-12 h-12 bg-gold-leaf/30 rounded-full blur-sm" />
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-soft-sage/20 rounded-full blur-sm" />
        <div className="absolute bottom-20 right-1/3 w-14 h-14 bg-terracotta/25 rounded-full blur-sm" />
      </div>

      {/* Content Container */}
      <motion.div 
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center"
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
              className="text-warm-sand/80 hover:text-warm-sand transition-colors duration-300"
            >
              Home
            </Link>
            <ChevronRightIcon className="w-4 h-4 mx-2 text-warm-sand/60" />
            <span className="text-white font-medium">Properties</span>
          </motion.nav>
        )}

        {/* Main Title */}
        <motion.h1 
          className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          variants={titleVariants}
        >
          <span className="block">{title}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="font-montserrat text-lg sm:text-xl md:text-2xl text-warm-sand/90 mb-8 max-w-3xl mx-auto leading-relaxed"
          variants={subtitleVariants}
        >
          {subtitle}
        </motion.p>

        {/* CTA Button */}
        {showCTA && (
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={ctaVariants}
          >
            <motion.button
              className="group relative px-8 py-4 bg-gradient-to-r from-deep-teal to-royal-navy text-white font-montserrat font-semibold rounded-lg shadow-elegant overflow-hidden transition-all duration-300 hover:shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                // Scroll to filter section with precise positioning
                const filterSection = document.getElementById('property-filters');
                if (filterSection) {
                  const navbarHeight = 80; // Adjust based on your navbar height
                  const yOffset = -navbarHeight; // Negative offset to account for navbar
                  const y = filterSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              
              <div className="relative flex items-center gap-2">
                <FunnelIcon className="w-5 h-5" />
                <span>Start Filtering</span>
              </div>
            </motion.button>

            {/* Secondary info */}
            <motion.div 
              className="text-warm-sand/70 text-sm font-montserrat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <span>Discover your perfect home</span>
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/50 to-transparent" />
    </section>
  );
};

export default PropertiesPageHero;