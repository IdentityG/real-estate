'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import {
  ArrowRightIcon,
  PhoneIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.3
    }
  }
};

const textVariants = {
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

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const CTABanner = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated Background Gradient
      if (backgroundRef.current) {
        gsap.to(backgroundRef.current, {
          backgroundPosition: '200% 50%',
          duration: 8,
          ease: 'none',
          repeat: -1,
          yoyo: true
        });
      }

      // Parallax effect for floating elements
      gsap.to('.cta-float-element', {
        y: -30,
        rotation: 5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Content reveal animation
      if (contentRef.current) {
        gsap.fromTo(contentRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Floating animation for decorative elements
      gsap.to('.cta-bg-element', {
        y: -20,
        x: 10,
        rotation: 3,
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
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Animated Background */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-royal-navy via-deep-teal to-royal-navy"
        style={{
          backgroundSize: '400% 400%',
          backgroundPosition: '0% 50%'
        }}
      />
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-royal-navy/80 via-deep-teal/70 to-royal-navy/80" />

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="cta-float-element absolute top-20 left-10 w-32 h-32 bg-warm-sand/10 rounded-full blur-xl" />
        <div className="cta-float-element absolute bottom-20 right-16 w-48 h-48 bg-gold-leaf/8 rounded-full blur-2xl" />
        <div className="cta-bg-element absolute top-1/2 left-1/4 w-24 h-24 bg-warm-sand/5 rounded-full blur-lg" />
        <div className="cta-bg-element absolute bottom-1/3 right-1/3 w-36 h-36 bg-gold-leaf/5 rounded-full blur-xl" />
        
        {/* Geometric Patterns */}
        <div className="absolute top-10 right-20 w-16 h-16 border border-warm-sand/20 rounded-lg rotate-45 animate-pulse" />
        <div className="absolute bottom-16 left-20 w-12 h-12 border border-gold-leaf/20 rounded-full animate-bounce" style={{ animationDuration: '3s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={contentRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Main Headline */}
          <motion.h2 
            variants={textVariants}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-white mb-6 leading-tight"
          >
            Ready to find your{' '}
            <span className="text-warm-sand relative inline-block">
              perfect home?
              <motion.div 
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-warm-sand to-gold-leaf rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p 
            variants={textVariants}
            className="text-xl md:text-2xl text-silver-mist font-montserrat mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Let our expert agents guide you every step of the way to your dream property
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={containerVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            {/* Primary CTA */}
            <motion.div
              variants={buttonVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/contact"
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-warm-sand to-gold-leaf text-royal-navy font-montserrat font-bold text-lg rounded-full hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Button Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-gold-leaf to-warm-sand opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <span className="relative z-10 flex items-center">
                  Get Started Today
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </motion.div>
                </span>
                
                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-700" />
                </div>
              </Link>
            </motion.div>

            {/* Secondary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div
                variants={buttonVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-montserrat font-semibold rounded-full border border-white/20 hover:bg-white/20 hover:border-warm-sand/50 transition-all duration-300 group"
                >
                  <PhoneIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  Call Us Now
                </Link>
              </motion.div>

              <motion.div
                variants={buttonVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/schedule"
                  className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-montserrat font-semibold rounded-full border border-white/20 hover:bg-white/20 hover:border-warm-sand/50 transition-all duration-300 group"
                >
                  <CalendarDaysIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  Schedule Visit
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            variants={textVariants}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-silver-mist font-montserrat"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-sm">Free Consultation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <span className="text-sm">Expert Guidance</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              <span className="text-sm">No Hidden Fees</span>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            variants={textVariants}
            className="mt-8 text-center"
          >
            <p className="text-silver-mist font-montserrat text-sm">
              Questions? Call us at{' '}
              <Link 
                href="tel:+251911123456" 
                className="text-warm-sand hover:text-gold-leaf transition-colors duration-200 font-semibold"
              >
                +251 911 123 456
              </Link>
              {' '}or email{' '}
              <Link 
                href="mailto:info@mekiya.com" 
                className="text-warm-sand hover:text-gold-leaf transition-colors duration-200 font-semibold"
              >
                info@mekiya.com
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Wave Effect */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg 
          className="relative block w-full h-12" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".25" 
            className="fill-alabaster"
          />
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            opacity=".5" 
            className="fill-alabaster"
          />
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            className="fill-alabaster"
          />
        </svg>
      </div>
    </section>
  );
};

export default CTABanner;