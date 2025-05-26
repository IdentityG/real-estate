'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

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
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 1.1, x: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const AboutMekiya = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image clip reveal animation
      if (imageRef.current) {
        gsap.set(imageRef.current, {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
        });

        ScrollTrigger.create({
          trigger: imageRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          onEnter: () => {
            gsap.to(imageRef.current, {
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              duration: 1.2,
              ease: 'power3.out'
            });
          }
        });
      }

      // Parallax effect for background elements
      gsap.to('.about-bg-element', {
        y: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Text reveal animation
      if (textRef.current) {
        const textElements = textRef.current.querySelectorAll('.text-reveal');
        
        textElements.forEach((element, index) => {
          gsap.fromTo(element,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.2,
              scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-br from-white via-alabaster to-silver-mist/20 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="about-bg-element absolute top-20 right-10 w-64 h-64 bg-deep-teal/5 rounded-full blur-3xl" />
        <div className="about-bg-element absolute bottom-20 left-10 w-48 h-48 bg-warm-sand/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-royal-navy/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Text Content */}
          <motion.div 
            ref={textRef}
            variants={textVariants}
            className="space-y-8 lg:pr-8"
          >
            {/* Section Heading */}
            <div className="space-y-6">
              <div className="text-reveal">
                <span className="inline-block px-4 py-2 bg-deep-teal/10 text-deep-teal font-montserrat font-semibold text-sm rounded-full mb-4">
                  Our Story
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-royal-navy leading-tight">
                  About{' '}
                  <span className="text-deep-teal relative">
                    Mekiya
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-deep-teal to-warm-sand rounded-full" />
                  </span>
                </h2>
              </div>
            </div>

            {/* Company Description */}
            <div className="space-y-6">
              <div className="text-reveal">
                <p className="text-lg md:text-xl text-slate-gray font-montserrat leading-relaxed">
                  For over a decade, Mekiya Real Estate has been Ethiopia's trusted partner in finding dream homes and investment opportunities. We combine deep local expertise with innovative technology to deliver exceptional real estate experiences.
                </p>
              </div>
              
              <div className="text-reveal">
                <p className="text-base md:text-lg text-slate-gray font-montserrat leading-relaxed">
                  Our commitment to transparency, integrity, and personalized service has helped thousands of families and investors achieve their real estate goals. From luxury properties in Addis Ababa to emerging markets across Ethiopia, we're your gateway to exceptional real estate opportunities.
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div className="text-reveal">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6">
                <div className="text-center sm:text-left">
                  <div className="text-3xl font-playfair font-bold text-deep-teal mb-2">10+</div>
                  <div className="text-sm font-montserrat text-slate-gray">Years Experience</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-3xl font-playfair font-bold text-deep-teal mb-2">5000+</div>
                  <div className="text-sm font-montserrat text-slate-gray">Happy Clients</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-3xl font-playfair font-bold text-deep-teal mb-2">500+</div>
                  <div className="text-sm font-montserrat text-slate-gray">Properties Sold</div>
                </div>
              </div>
            </div>

            {/* Call-to-Action Button */}
            <div className="text-reveal">
              <Link href="/about">
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 10px 30px rgba(0, 95, 115, 0.3)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-deep-teal to-royal-navy text-white font-montserrat font-semibold rounded-2xl shadow-elegant hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  {/* Button background animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-royal-navy to-deep-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Button content */}
                  <div className="relative flex items-center space-x-3">
                    <span className="text-lg">Read More</span>
                    <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                  
                  {/* Button glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-deep-teal to-royal-navy opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300" />
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Visual Element - Image */}
          <motion.div 
            variants={imageVariants}
            className="relative order-first lg:order-last"
          >
            <div 
              ref={imageRef}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] lg:aspect-[3/4]">
                <Image
                  src="/images/estate1.jpg"
                  alt="Modern real estate property showcasing Mekiya's premium portfolio"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
                
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-royal-navy/20 via-transparent to-transparent" />
              </div>
              
              {/* Floating stats card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-elegant"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-playfair font-bold text-royal-navy mb-1">Premium Properties</div>
                    <div className="text-sm font-montserrat text-slate-gray">Trusted by thousands across Ethiopia</div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-deep-teal to-royal-navy rounded-xl flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative elements around image */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-warm-sand/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-deep-teal/10 rounded-full blur-2xl" />
          </motion.div>
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex justify-center mt-16 lg:mt-20"
        >
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-deep-teal rounded-full animate-pulse" />
            <div className="w-16 h-0.5 bg-gradient-to-r from-deep-teal to-warm-sand" />
            <div className="w-2 h-2 bg-warm-sand rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMekiya;