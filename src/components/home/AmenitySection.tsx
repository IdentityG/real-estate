'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  HomeIcon,
  ShieldCheckIcon,
  HeartIcon,
  CpuChipIcon,
  BuildingOfficeIcon,
  TruckIcon,
  UserGroupIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Amenity data interface
interface Amenity {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  featured?: boolean;
}

// Amenities data
const amenities: Amenity[] = [
  {
    id: 1,
    icon: HomeIcon,
    title: 'Swimming Pool',
    description: 'Olympic-sized swimming pool with crystal clear water and poolside lounging area.',
    featured: true
  },
  {
    id: 2,
    icon: ShieldCheckIcon,
    title: '24/7 Security',
    description: 'Round-the-clock security with CCTV monitoring and professional security personnel.'
  },
  {
    id: 3,
    icon: HeartIcon,
    title: 'Gym & Wellness',
    description: 'State-of-the-art fitness center with modern equipment and wellness facilities.'
  },
  {
    id: 4,
    icon: CpuChipIcon,
    title: 'Smart Home Features',
    description: 'Integrated smart home technology for lighting, climate, and security control.',
    featured: true
  },
  {
    id: 5,
    icon: BuildingOfficeIcon,
    title: 'Rooftop Lounge',
    description: 'Elegant rooftop terrace with panoramic city views and entertainment area.'
  },
  {
    id: 6,
    icon: TruckIcon,
    title: 'Dedicated Parking',
    description: 'Secure underground parking with assigned spaces for residents and guests.'
  },
  {
    id: 7,
    icon: UserGroupIcon,
    title: 'Children\'s Play Area',
    description: 'Safe and fun playground designed for children of all ages with modern equipment.'
  },
  {
    id: 8,
    icon: SparklesIcon,
    title: 'Landscaped Gardens',
    description: 'Beautifully maintained gardens with walking paths and relaxation areas.'
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.15
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

const AmenitySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const floatingElementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    const floatingElements = floatingElementsRef.current;

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

    // Animate cards with stagger
    tl.fromTo(
      cards,
      {
        y: 60,
        opacity: 0,
        scale: 0.8,
        rotationY: 15
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      }
    );

    // Floating animation for decorative elements
    if (floatingElements.length > 0) {
      floatingElements.forEach((element, index) => {
        gsap.to(element, {
          y: -20,
          rotation: 360,
          duration: 4 + index * 0.5,
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

  // Add floating element to refs array
  const addFloatingToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !floatingElementsRef.current.includes(el)) {
      floatingElementsRef.current[index] = el;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-br from-alabaster via-white to-warm-sand/20 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          ref={(el) => addFloatingToRefs(el, 0)}
          className="absolute top-20 left-10 w-32 h-32 bg-deep-teal/5 rounded-full blur-xl"
        />
        <div
          ref={(el) => addFloatingToRefs(el, 1)}
          className="absolute bottom-20 right-10 w-40 h-40 bg-warm-sand/20 rounded-full blur-2xl"
        />
        <div
          ref={(el) => addFloatingToRefs(el, 2)}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-soft-sage/10 rounded-full blur-3xl"
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
            World-Class{' '}
            <span className="text-deep-teal relative">
              Amenities
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-deep-teal to-warm-sand rounded-full" />
            </span>
          </motion.h2>
          <motion.p
            variants={headingVariants}
            className="text-lg md:text-xl text-slate-gray max-w-3xl mx-auto font-montserrat leading-relaxed"
          >
            Enhancing comfort, luxury, and lifestyle with premium amenities designed for modern living
          </motion.p>
        </motion.div>

        {/* Amenities Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {amenities.map((amenity, index) => {
            const IconComponent = amenity.icon;
            return (
              <motion.div
                key={amenity.id}
                ref={(el) => addToRefs(el, index)}
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.3, ease: 'easeOut' }
                }}
                className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-elegant hover:shadow-2xl transition-all duration-500 border border-silver-mist/30 ${
                  amenity.featured ? 'ring-2 ring-deep-teal/20' : ''
                }`}
              >
                {/* Featured badge */}
                {amenity.featured && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-deep-teal to-royal-navy text-white text-xs font-montserrat font-semibold px-3 py-1 rounded-full shadow-lg">
                    Featured
                  </div>
                )}

                {/* Icon container */}
                <motion.div
                  whileHover={{
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.5 }
                  }}
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-all duration-300 ${
                    amenity.featured
                      ? 'bg-gradient-to-br from-deep-teal to-royal-navy text-white'
                      : 'bg-gradient-to-br from-deep-teal/10 to-warm-sand/20 text-deep-teal group-hover:from-deep-teal group-hover:to-royal-navy group-hover:text-white'
                  }`}
                >
                  <IconComponent className="w-8 h-8" />
                </motion.div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-playfair font-semibold text-royal-navy group-hover:text-deep-teal transition-colors duration-300">
                    {amenity.title}
                  </h3>
                  <p className="text-slate-gray font-montserrat text-sm leading-relaxed group-hover:text-charcoal transition-colors duration-300">
                    {amenity.description}
                  </p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-deep-teal/5 to-warm-sand/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Optional CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16 lg:mt-20"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: '0 10px 30px rgba(0, 95, 115, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-deep-teal to-royal-navy text-white font-montserrat font-semibold px-8 py-4 rounded-full shadow-elegant hover:shadow-2xl transition-all duration-300"
          >
            Explore All Amenities
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default AmenitySection;