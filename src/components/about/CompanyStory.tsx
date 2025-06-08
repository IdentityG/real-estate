'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import {
  CalendarIcon,
  BuildingOfficeIcon,
  HeartIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  StarIcon,
  TrophyIcon,
  MapPinIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  image?: string;
  achievement?: string;
}

interface CompanyValue {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}

const CompanyStory: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const [activeTimelineItem, setActiveTimelineItem] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Timeline data
  const timelineEvents: TimelineEvent[] = [
    {
      year: "2008",
      title: "Foundation & Vision",
      description: "Mekiya Real Estate was founded with a vision to transform Ethiopia's real estate landscape, starting with a small office in Addis Ababa.",
      icon: BuildingOfficeIcon,
      image: "/images/estate1.jpg",
      achievement: "First Office Established"
    },
    {
      year: "2012",
      title: "Market Expansion",
      description: "Expanded operations to major Ethiopian cities, establishing partnerships with local developers and international investors.",
      icon: MapPinIcon,
      achievement: "5 Cities Coverage"
    },
    {
      year: "2016",
      title: "Digital Innovation",
      description: "Launched Ethiopia's first comprehensive online property platform, revolutionizing how Ethiopians search for homes.",
      icon: LightBulbIcon,
      achievement: "10,000+ Online Listings"
    },
    {
      year: "2020",
      title: "Community Impact",
      description: "Initiated affordable housing programs and community development projects, helping over 1,000 families find their dream homes.",
      icon: HeartIcon,
      achievement: "1,000+ Families Served"
    },
    {
      year: "2024",
      title: "Industry Leadership",
      description: "Recognized as Ethiopia's leading real estate company, with over 500 properties sold and a team of 50+ professionals.",
      icon: TrophyIcon,
      achievement: "Market Leader"
    }
  ];

  // Company values
  const companyValues: CompanyValue[] = [
    {
      id: 1,
      icon: ShieldCheckIcon,
      title: "Integrity",
      description: "We conduct business with the highest ethical standards, ensuring transparency in every transaction.",
      color: "from-deep-teal to-royal-navy"
    },
    {
      id: 2,
      icon: UserGroupIcon,
      title: "Community",
      description: "We believe in building stronger communities by connecting families with homes that enhance their lives.",
      color: "from-warm-sand to-gold-leaf"
    },
    {
      id: 3,
      icon: LightBulbIcon,
      title: "Innovation",
      description: "We embrace technology and creative solutions to make real estate accessible and efficient for everyone.",
      color: "from-soft-sage to-terracotta"
    },
    {
      id: 4,
      icon: StarIcon,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our service, from initial consultation to final handover.",
      color: "from-royal-navy to-midnight"
    }
  ];

  // GSAP Animations
  useEffect(() => {
    if (!isInView) return;

    const ctx = gsap.context(() => {
      // Timeline animation
      if (timelineRef.current) {
        const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
        
        gsap.fromTo(timelineItems,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Values cards animation
      if (valuesRef.current) {
        const valueCards = valuesRef.current.querySelectorAll('.value-card');
        
        gsap.fromTo(valueCards,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: valuesRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

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

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  const textVariants = {
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

  return (
    <section 
      id="company-story"
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-warm-sand/10" />
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-20 left-10 w-32 h-32 bg-deep-teal rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-gold-leaf rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-royal-navy rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16 lg:mb-24"
        >
          {/* Section Header */}
          <motion.div variants={titleVariants} className="mb-8">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-deep-teal/10 to-royal-navy/10 text-deep-teal font-montserrat font-semibold text-sm uppercase tracking-wider rounded-full mb-4">
              Our Journey
            </span>
            <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-royal-navy mb-6">
              The <span className="bg-gradient-to-r from-deep-teal to-gold-leaf bg-clip-text text-transparent">Mekiya</span> Story
            </h2>
          </motion.div>

          <motion.p 
            variants={textVariants}
            className="font-montserrat text-lg sm:text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed"
          >
            From humble beginnings to becoming Ethiopia's most trusted real estate partner, 
            our journey is built on unwavering commitment to excellence, innovation, and community impact.
          </motion.p>
        </motion.div>

        {/* Mission & Vision Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8 mb-20 lg:mb-32"
        >
          {/* Mission Card */}
          <motion.div 
            variants={textVariants}
            className="group relative p-8 lg:p-10 bg-white rounded-2xl shadow-elegant hover:shadow-2xl transition-all duration-500 border border-neutral-100 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-deep-teal/5 to-royal-navy/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-r from-deep-teal to-royal-navy rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <LightBulbIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-royal-navy mb-4">Our Mission</h3>
              <p className="font-montserrat text-neutral-600 leading-relaxed">
                To provide exceptional real estate services that connect families with their perfect homes, 
                while building stronger, more vibrant communities throughout Ethiopia.
              </p>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div 
            variants={textVariants}
            className="group relative p-8 lg:p-10 bg-white rounded-2xl shadow-elegant hover:shadow-2xl transition-all duration-500 border border-neutral-100 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-warm-sand/5 to-gold-leaf/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-r from-warm-sand to-gold-leaf rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <StarIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-royal-navy mb-4">Our Vision</h3>
              <p className="font-montserrat text-neutral-600 leading-relaxed">
                To be Ethiopia's leading real estate company, recognized for innovation, integrity, 
                and our positive impact on communities across the nation.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Timeline Section */}
        <div className="mb-20 lg:mb-32">
          <motion.div 
            variants={titleVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center mb-16"
          >
            <h3 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-royal-navy mb-4">
              Our <span className="bg-gradient-to-r from-deep-teal to-gold-leaf bg-clip-text text-transparent">Journey</span>
            </h3>
            <p className="font-montserrat text-lg text-neutral-600 max-w-2xl mx-auto">
              Key milestones that shaped our growth and commitment to excellence
            </p>
          </motion.div>

          <div ref={timelineRef} className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-deep-teal via-royal-navy to-gold-leaf transform md:-translate-x-1/2" />
            
            {timelineEvents.map((event, index) => (
              <div 
                key={index}
                className={`timeline-item relative flex items-center mb-12 lg:mb-16 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-gradient-to-r from-deep-teal to-royal-navy rounded-full transform md:-translate-x-1/2 z-10 shadow-lg" />
                
                {/* Content Card */}
                <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                }`}>
                  <motion.div 
                    className="group bg-white p-6 lg:p-8 rounded-2xl shadow-elegant hover:shadow-2xl transition-all duration-500 border border-neutral-100"
                    whileHover={{ scale: 1.02 }}
                    onHoverStart={() => setActiveTimelineItem(index)}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-deep-teal to-royal-navy rounded-lg flex items-center justify-center flex-shrink-0">
                        <event.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-warm-sand/20 to-gold-leaf/20 text-deep-teal font-montserrat font-bold text-sm rounded-full mb-2">
                          {event.year}
                        </span>
                        <h4 className="font-playfair text-xl lg:text-2xl font-bold text-royal-navy mb-2">
                          {event.title}
                        </h4>
                      </div>
                    </div>
                    
                    <p className="font-montserrat text-neutral-600 leading-relaxed mb-4">
                      {event.description}
                    </p>
                    
                    {event.achievement && (
                      <div className="flex items-center gap-2 text-deep-teal font-montserrat font-semibold text-sm">
                        <TrophyIcon className="w-4 h-4" />
                        <span>{event.achievement}</span>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Company Values */}
        <div ref={valuesRef}>
          <motion.div 
            variants={titleVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center mb-16"
          >
            <h3 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-royal-navy mb-4">
              Our <span className="bg-gradient-to-r from-deep-teal to-gold-leaf bg-clip-text text-transparent">Values</span>
            </h3>
            <p className="font-montserrat text-lg text-neutral-600 max-w-2xl mx-auto">
              The principles that guide every decision and shape our company culture
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {companyValues.map((value) => (
              <motion.div 
                key={value.id}
                className="value-card group relative p-6 lg:p-8 bg-white rounded-2xl shadow-elegant hover:shadow-2xl transition-all duration-500 border border-neutral-100 overflow-hidden"
                whileHover={{ y: -5 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className="relative z-10 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h4 className="font-playfair text-xl lg:text-2xl font-bold text-royal-navy mb-4">
                    {value.title}
                  </h4>
                  
                  <p className="font-montserrat text-neutral-600 leading-relaxed text-sm lg:text-base">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStory;