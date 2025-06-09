'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import {
  EnvelopeIcon,
  PhoneIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Agent data interface
interface Agent {
  id: number;
  name: string;
  role: string;
  image: string;
  phone: string;
  email: string;
  rating: number;
  experience: string;
  specialization: string;
}

// Dummy agent data
const agents: Agent[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Senior Sales Agent',
    image: '/images/agent5.jpg',
    phone: '+251 911 123 456',
    email: 'sarah@mekiya.com',
    rating: 4.9,
    experience: '8+ Years',
    specialization: 'Luxury Properties'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Property Consultant',
    image: '/images/agent2.jpg',
    phone: '+251 911 234 567',
    email: 'michael@mekiya.com',
    rating: 4.8,
    experience: '6+ Years',
    specialization: 'Commercial Real Estate'
  },
  {
    id: 3,
    name: 'Hana Biruk',
    role: 'Real Estate Advisor',
    image: '/images/agent6.jpg',
    phone: '+251 911 345 678',
    email: 'hana@mekiya.com',
    rating: 4.9,
    experience: '5+ Years',
    specialization: 'Residential Properties'
  },
  {
    id: 4,
    name: 'David Wilson',
    role: 'Investment Specialist',
    image: '/images/agent4.jpg',
    phone: '+251 911 456 789',
    email: 'david@mekiya.com',
    rating: 4.7,
    experience: '10+ Years',
    specialization: 'Investment Properties'
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

const MeetOurAgents = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating animation for decorative elements
      gsap.to('.agent-bg-element', {
        y: -30,
        rotation: 5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Title reveal animation
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Cards stagger animation
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        
        gsap.fromTo(cards,
          {
            opacity: 0,
            y: 80,
            scale: 0.8,
            rotationY: 15
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Parallax effect for section background
      gsap.to('.agents-parallax', {
        yPercent: -20,
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
      className="relative py-20 lg:py-32 bg-gradient-to-br from-alabaster via-white to-silver-mist overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="agent-bg-element absolute top-20 left-10 w-32 h-32 bg-deep-teal/5 rounded-full blur-xl" />
        <div className="agent-bg-element absolute bottom-32 right-16 w-48 h-48 bg-warm-sand/10 rounded-full blur-2xl" />
        <div className="agents-parallax absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-deep-teal/5 to-royal-navy/5 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.h2 
            variants={titleVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-royal-navy mb-6"
          >
            Meet Our{' '}
            <span className="text-deep-teal relative">
              Agents
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-deep-teal to-warm-sand rounded-full" />
            </span>
          </motion.h2>
          
          <motion.p 
            variants={titleVariants}
            className="text-lg md:text-xl text-slate-gray font-montserrat max-w-2xl mx-auto leading-relaxed"
          >
            Professional, Trustworthy, Experienced
          </motion.p>
          
          <motion.div 
            variants={titleVariants}
            className="mt-8 text-sm text-slate-gray font-montserrat"
          >
            Our dedicated team of real estate professionals is here to guide you through every step of your property journey
          </motion.div>
        </motion.div>

        {/* Agents Grid */}
        <motion.div
          ref={cardsRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
        >
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="group relative bg-white rounded-2xl p-6 shadow-elegant hover:shadow-2xl transition-all duration-500 border border-silver-mist/30 hover:border-deep-teal/20 overflow-hidden"
            >
              {/* Card Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-deep-teal/0 via-transparent to-warm-sand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-silver-mist/30 group-hover:ring-deep-teal/30 transition-all duration-500">
                  <Image
                    src={agent.image}
                    alt={agent.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 96px, 96px"
                  />
                  
                  {/* Online Status Indicator */}
                  <div className="absolute bottom-1 right-1 w-4 h-4 bg-success rounded-full border-2 border-white shadow-sm" />
                </div>
                
                {/* Rating Stars */}
                <div className="flex items-center justify-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(agent.rating)
                          ? 'text-gold-leaf fill-current'
                          : 'text-silver-mist'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-slate-gray font-montserrat ml-2">
                    {agent.rating}
                  </span>
                </div>
              </div>

              {/* Agent Info */}
              <div className="text-center relative z-10">
                <h3 className="text-xl font-playfair font-semibold text-royal-navy mb-2 group-hover:text-deep-teal transition-colors duration-300">
                  {agent.name}
                </h3>
                
                <p className="text-deep-teal font-montserrat font-medium mb-3">
                  {agent.role}
                </p>
                
                <div className="space-y-2 mb-6">
                  <div className="text-sm text-slate-gray font-montserrat">
                    <span className="font-medium">Experience:</span> {agent.experience}
                  </div>
                  <div className="text-sm text-slate-gray font-montserrat">
                    <span className="font-medium">Specialization:</span> {agent.specialization}
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="flex space-x-3 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center w-10 h-10 bg-deep-teal text-white rounded-full hover:bg-royal-navy transition-all duration-300 shadow-md hover:shadow-lg group/btn"
                    title={`Call ${agent.name}`}
                  >
                    <PhoneIcon className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center w-10 h-10 bg-warm-sand text-royal-navy rounded-full hover:bg-gold-leaf hover:text-white transition-all duration-300 shadow-md hover:shadow-lg group/btn"
                    title={`Email ${agent.name}`}
                  >
                    <EnvelopeIcon className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
                  </motion.button>
                </div>

                {/* Contact Info (Hidden by default, shown on hover) */}
                <div className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-sm p-4 rounded-b-2xl transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 border-t border-silver-mist/30">
                  <div className="text-xs text-slate-gray font-montserrat space-y-1">
                    <div className="flex items-center justify-center space-x-2">
                      <PhoneIcon className="w-3 h-3" />
                      <span>{agent.phone}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <EnvelopeIcon className="w-3 h-3" />
                      <span>{agent.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-deep-teal to-royal-navy text-white font-montserrat font-semibold rounded-full hover:shadow-xl transition-all duration-300 group"
          >
            View All Agents
            <motion.div
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default MeetOurAgents;