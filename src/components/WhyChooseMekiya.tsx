'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  UserGroupIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Value proposition data interface
interface ValueProposition {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

// Value propositions data
const valuePropositions: ValueProposition[] = [
  {
    id: 1,
    icon: UserGroupIcon,
    title: 'Trusted Agents',
    description: 'Our certified real estate professionals provide expert guidance with years of market experience.'
  },
  {
    id: 2,
    icon: MapPinIcon,
    title: 'Prime Locations',
    description: 'Access to the most desirable properties in premium neighborhoods across Ethiopia.'
  },
  {
    id: 3,
    icon: CurrencyDollarIcon,
    title: 'Best Deals & Financing',
    description: 'Competitive pricing and flexible financing options to make your dream home affordable.'
  },
  {
    id: 4,
    icon: ShieldCheckIcon,
    title: 'Transparent Process',
    description: 'Clear, honest communication throughout every step of your real estate journey.'
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
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
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const WhyChooseMekiya = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating animation for decorative elements
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        
        Array.from(cards).forEach((card, index) => {
          // Subtle floating animation
          gsap.to(card, {
            y: -10,
            duration: 2 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut',
            delay: index * 0.3
          });
        });
      }

      // Scroll-triggered animations
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => {
          gsap.from('.why-choose-card', {
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.7)'
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-br from-alabaster via-white to-warm-sand/10 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-deep-teal/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-royal-navy/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-warm-sand/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.h2
            variants={titleVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-royal-navy mb-6"
          >
            Why Choose{' '}
            <span className="text-deep-teal relative">
              Mekiya
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-deep-teal to-warm-sand rounded-full" />
            </span>
            ?
          </motion.h2>
          <motion.p
            variants={titleVariants}
            className="text-lg md:text-xl text-slate-gray max-w-2xl mx-auto font-montserrat leading-relaxed"
          >
            Experience excellence in real estate with our commitment to quality, trust, and exceptional service.
          </motion.p>
        </motion.div>

        {/* Value Proposition Cards */}
        <motion.div
          ref={cardsRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
        >
          {valuePropositions.map((item, index) => {
            const IconComponent = item.icon;
            
            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: 'easeOut' }
                }}
                className="why-choose-card group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-elegant hover:shadow-2xl transition-all duration-500 border border-silver-mist/30 hover:border-deep-teal/20"
              >
                {/* Card Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-deep-teal/5 via-transparent to-warm-sand/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-deep-teal to-royal-navy rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  {/* Floating icon background */}
                  <div className="absolute inset-0 w-16 h-16 bg-deep-teal/20 rounded-xl blur-xl group-hover:scale-125 transition-transform duration-500" />
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl lg:text-2xl font-playfair font-bold text-royal-navy mb-4 group-hover:text-deep-teal transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-slate-gray font-montserrat leading-relaxed text-sm lg:text-base">
                    {item.description}
                  </p>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-warm-sand rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
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

export default WhyChooseMekiya;