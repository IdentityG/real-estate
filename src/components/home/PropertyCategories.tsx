'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import {
  HomeIcon,
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  MapIcon,
} from '@heroicons/react/24/outline';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Property category data interface
interface PropertyCategory {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  type: string;
  href: string;
  gradient: string;
  hoverGradient: string;
}

// Property categories data
const propertyCategories: PropertyCategory[] = [
  {
    id: 1,
    icon: HomeIcon,
    title: 'Buy',
    description: 'Find your dream home with our collection of properties for sale.',
    type: 'buy',
    href: '/properties?type=buy',
    gradient: 'from-deep-teal/10 to-royal-navy/10',
    hoverGradient: 'from-deep-teal to-royal-navy'
  },
  {
    id: 2,
    icon: BuildingOfficeIcon,
    title: 'Rent',
    description: 'Discover comfortable rental properties perfect for your lifestyle.',
    type: 'rent',
    href: '/properties?type=rent',
    gradient: 'from-warm-sand/20 to-soft-sage/20',
    hoverGradient: 'from-warm-sand to-soft-sage'
  },
  {
    id: 3,
    icon: BuildingStorefrontIcon,
    title: 'Commercial',
    description: 'Explore prime commercial spaces for your business ventures.',
    type: 'commercial',
    href: '/properties?type=commercial',
    gradient: 'from-gold-leaf/20 to-terracotta/20',
    hoverGradient: 'from-gold-leaf to-terracotta'
  },
  {
    id: 4,
    icon: MapIcon,
    title: 'Land',
    description: 'Invest in premium land parcels with excellent development potential.',
    type: 'land',
    href: '/properties?type=land',
    gradient: 'from-soft-sage/20 to-deep-teal/20',
    hoverGradient: 'from-soft-sage to-deep-teal'
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

const headingVariants = {
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
  }
};

const PropertyCategories: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const decorativeElementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    const decorativeElements = decorativeElementsRef.current;

    if (!section || cards.length === 0) return;

    // GSAP scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate cards with stagger and 3D effect
    tl.fromTo(
      cards,
      {
        y: 80,
        opacity: 0,
        scale: 0.8,
        rotationX: 15
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      }
    );

    // Floating animation for decorative elements
    if (decorativeElements.length > 0) {
      decorativeElements.forEach((element, index) => {
        gsap.to(element, {
          y: -30,
          rotation: 180,
          duration: 6 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut'
        });
      });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Add card to refs array
  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current[index] = el;
    }
  };

  // Add decorative element to refs array
  const addDecorativeToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !decorativeElementsRef.current.includes(el)) {
      decorativeElementsRef.current[index] = el;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-br from-white via-alabaster to-silver-mist/30 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          ref={(el) => addDecorativeToRefs(el, 0)}
          className="absolute top-16 left-8 w-24 h-24 bg-deep-teal/10 rounded-full blur-xl"
        />
        <div
          ref={(el) => addDecorativeToRefs(el, 1)}
          className="absolute bottom-16 right-8 w-32 h-32 bg-warm-sand/15 rounded-full blur-2xl"
        />
        <div
          ref={(el) => addDecorativeToRefs(el, 2)}
          className="absolute top-1/3 right-1/4 w-20 h-20 bg-soft-sage/10 rounded-full blur-lg"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.h2
            variants={headingVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-royal-navy mb-6"
          >
            Explore{' '}
            <span className="text-deep-teal relative">
              Property Types
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-deep-teal to-warm-sand rounded-full" />
            </span>
          </motion.h2>
          <motion.p
            variants={headingVariants}
            className="text-lg md:text-xl text-slate-gray max-w-3xl mx-auto font-montserrat leading-relaxed"
          >
            Find the right property that fits your needs and lifestyle preferences
          </motion.p>
        </motion.div>

        {/* Property Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {propertyCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.id}
                ref={(el) => addToRefs(el, index)}
                variants={cardVariants}
                className="group"
              >
                <Link href={category.href} className="block">
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      y: -10,
                      transition: { duration: 0.3, ease:  'easeInOut'}
                    }}
                    whileTap={{
                      scale: 0.98,
                      transition: { duration: 0.1 }
                    }}
                    className={`relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-elegant hover:shadow-2xl transition-all duration-500 border border-silver-mist/30 cursor-pointer overflow-hidden`}
                  >
                    {/* Background gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-100 group-hover:opacity-0 transition-opacity duration-500`} />
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.hoverGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon container */}
                      <motion.div
                        whileHover={{
                          rotate: [0, -5, 5, 0],
                          scale: 1.1,
                          transition: { duration: 0.5 }
                        }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 bg-gradient-to-br from-deep-teal/10 to-royal-navy/10 group-hover:from-deep-teal group-hover:to-royal-navy text-deep-teal group-hover:text-white transition-all duration-500"
                      >
                        <IconComponent className="w-10 h-10" />
                      </motion.div>

                      {/* Text content */}
                      <div className="space-y-4">
                        <h3 className="text-2xl font-playfair font-bold text-royal-navy group-hover:text-deep-teal transition-colors duration-300">
                          {category.title}
                        </h3>
                        <p className="text-slate-gray font-montserrat leading-relaxed group-hover:text-charcoal transition-colors duration-300">
                          {category.description}
                        </p>
                      </div>

                      {/* Arrow indicator */}
                      <motion.div
                        initial={{ x: 0, opacity: 0.7 }}
                        whileHover={{ x: 5, opacity: 1 }}
                        className="absolute bottom-8 right-8 text-deep-teal group-hover:text-royal-navy transition-colors duration-300"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Decorative corner elements */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-warm-sand/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-soft-sage/20 to-transparent rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Optional CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16 lg:mt-20"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center gap-2 text-deep-teal font-montserrat font-medium"
          >
            <span>Need help choosing?</span>
            <Link href="/contact" className="underline hover:text-royal-navy transition-colors duration-200">
              Contact our experts
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PropertyCategories;