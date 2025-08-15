'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MagnifyingGlassIcon,
  DocumentTextIcon,
  HandRaisedIcon,
  KeyIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  details: string[];
  icon: React.ComponentType<any>;
  color: string;
  duration: string;
}

const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: 'Initial Consultation',
    description: 'We begin with understanding your specific needs, budget, and preferences.',
    details: [
      'Needs assessment and goal setting',
      'Budget analysis and financing options',
      'Market overview and opportunities',
      'Timeline planning and expectations'
    ],
    icon: UserGroupIcon,
    color: 'deep-teal',
    duration: '1-2 Days'
  },
  {
    id: 2,
    title: 'Market Research',
    description: 'Comprehensive market analysis to identify the best opportunities.',
    details: [
      'Property search and screening',
      'Comparative market analysis',
      'Location and neighborhood research',
      'Investment potential evaluation'
    ],
    icon: MagnifyingGlassIcon,
    color: 'royal-navy',
    duration: '3-7 Days'
  },
  {
    id: 3,
    title: 'Property Evaluation',
    description: 'Detailed assessment of shortlisted properties for informed decisions.',
    details: [
      'Professional property inspection',
      'Valuation and pricing analysis',
      'Legal due diligence',
      'Risk assessment report'
    ],
    icon: ChartBarIcon,
    color: 'soft-sage',
    duration: '2-5 Days'
  },
  {
    id: 4,
    title: 'Documentation',
    description: 'Complete legal documentation and contract preparation.',
    details: [
      'Contract drafting and review',
      'Legal compliance verification',
      'Title deed verification',
      'Registration documentation'
    ],
    icon: DocumentTextIcon,
    color: 'gold-leaf',
    duration: '5-10 Days'
  },
  {
    id: 5,
    title: 'Negotiation',
    description: 'Expert negotiation to secure the best terms and conditions.',
    details: [
      'Price negotiation strategy',
      'Terms and conditions review',
      'Closing date coordination',
      'Final agreement preparation'
    ],
    icon: HandRaisedIcon,
    color: 'terracotta',
    duration: '2-7 Days'
  },
  {
    id: 6,
    title: 'Closing & Handover',
    description: 'Seamless transaction completion and property handover.',
    details: [
      'Final walkthrough inspection',
      'Payment processing and transfer',
      'Key handover ceremony',
      'Post-sale support and guidance'
    ],
    icon: KeyIcon,
    color: 'warm-sand',
    duration: '1-3 Days'
  }
];

const ServiceProcess = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Auto-progress through steps
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setActiveStep(prev => {
        const next = prev >= processSteps.length ? 1 : prev + 1;
        if (prev < processSteps.length) {
          setCompletedSteps(current => [...current, prev]);
        }
        if (next === 1) {
          setCompletedSteps([]);
        }
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isInView]);

  // GSAP Animations
  useEffect(() => {
    if (!isInView) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Steps animation
      gsap.fromTo('.process-step',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Progress line animation
      gsap.fromTo('.progress-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-br from-white via-alabaster to-silver-mist/20 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-deep-teal/5 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-royal-navy/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-warm-sand/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-deep-teal/10 text-deep-teal font-montserrat font-semibold text-sm rounded-full mb-6">
            Our Process
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-royal-navy mb-6 leading-tight">
            How We{' '}
            <span className="text-deep-teal relative">
              Work
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-deep-teal to-warm-sand rounded-full" />
            </span>
          </h2>
          <p className="font-montserrat text-lg md:text-xl text-slate-gray max-w-3xl mx-auto leading-relaxed">
            Our proven 6-step process ensures smooth, transparent, and successful real estate transactions 
            tailored to Ethiopian market requirements.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div ref={stepsRef} className="relative">
          {/* Progress Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-silver-mist transform -translate-x-1/2">
            <div 
              className="progress-line absolute top-0 left-0 w-full bg-gradient-to-b from-deep-teal to-royal-navy origin-top"
              style={{ 
                height: `${(activeStep / processSteps.length) * 100}%`,
                transition: 'height 0.5s ease-in-out'
              }}
            />
          </div>

          {/* Steps Grid */}
          <div className="space-y-12 lg:space-y-24">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = activeStep === step.id;
              const isCompleted = completedSteps.includes(step.id);
              const isEven = index % 2 === 1;

              return (
                <motion.div
                  key={step.id}
                  className={`process-step relative flex flex-col lg:flex-row items-center gap-8 ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 50 : -50 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  {/* Step Content */}
                  <div className={`flex-1 ${isEven ? 'lg:text-right' : 'lg:text-left'} text-center lg:text-left`}>
                    <motion.div
                      className={`bg-white rounded-3xl p-8 shadow-elegant hover:shadow-2xl transition-all duration-500 ${
                        isActive ? 'ring-2 ring-deep-teal ring-opacity-50 shadow-2xl' : ''
                      }`}
                      whileHover={{ y: -5, scale: 1.02 }}
                    >
                      {/* Step Header */}
                      <div className={`flex items-center gap-4 mb-6 ${isEven ? 'lg:justify-end' : 'justify-center lg:justify-start'}`}>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isActive ? `bg-${step.color} text-white` : 
                          isCompleted ? 'bg-success text-white' : 
                          `bg-${step.color}/10 text-${step.color}`
                        } transition-all duration-300`}>
                          {isCompleted ? (
                            <CheckCircleIcon className="w-6 h-6" />
                          ) : (
                            <IconComponent className="w-6 h-6" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-playfair text-xl font-semibold text-charcoal">
                            {step.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-slate-gray">
                            <span className="font-montserrat">Duration:</span>
                            <span className={`px-2 py-1 bg-${step.color}/10 text-${step.color} rounded-full font-medium`}>
                              {step.duration}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Step Description */}
                      <p className="font-montserrat text-slate-gray mb-6 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Step Details */}
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className={`flex items-center gap-3 text-sm font-montserrat text-slate-gray ${
                            isEven ? 'lg:justify-end' : 'justify-center lg:justify-start'
                          }`}>
                            <CheckCircleIcon className={`w-4 h-4 text-${step.color} flex-shrink-0 ${isEven ? 'order-2' : ''}`} />
                            <span className={isEven ? 'order-1' : ''}>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Step Number Circle */}
                  <div className="relative z-10 flex-shrink-0">
                    <motion.div
                      className={`w-16 h-16 rounded-full flex items-center justify-center font-playfair font-bold text-xl transition-all duration-500 ${
                        isActive ? `bg-${step.color} text-white shadow-lg scale-110` :
                        isCompleted ? 'bg-success text-white shadow-lg' :
                        'bg-white text-slate-gray border-2 border-silver-mist'
                      }`}
                      animate={{
                        scale: isActive ? 1.1 : 1,
                        rotate: isActive ? 360 : 0
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {isCompleted ? (
                        <CheckCircleIcon className="w-8 h-8" />
                      ) : (
                        step.id
                      )}
                    </motion.div>
                    
                    {/* Pulse Effect for Active Step */}
                    {isActive && (
                      <motion.div
                        className={`absolute inset-0 rounded-full bg-${step.color} opacity-20`}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>

                  {/* Mobile Progress Line */}
                  {index < processSteps.length - 1 && (
                    <div className="lg:hidden w-0.5 h-12 bg-silver-mist relative">
                      <div 
                        className={`absolute top-0 left-0 w-full bg-gradient-to-b from-${step.color} to-royal-navy transition-all duration-500 ${
                          isCompleted || isActive ? 'h-full' : 'h-0'
                        }`}
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-deep-teal to-royal-navy rounded-3xl p-8 md:p-12 text-white">
            <h3 className="font-playfair text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="font-montserrat text-lg mb-8 text-warm-sand/90 max-w-2xl mx-auto">
              Let our experienced team guide you through every step of your real estate transaction.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(255, 255, 255, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-deep-teal font-montserrat font-semibold px-8 py-4 rounded-xl hover:bg-warm-sand hover:text-royal-navy transition-all duration-300"
            >
              Start Your Process Today
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceProcess;