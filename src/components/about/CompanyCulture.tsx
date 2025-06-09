'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import {
  HeartIcon,
  UserGroupIcon,
  GlobeAltIcon,
  SparklesIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  HandRaisedIcon,
  StarIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: number;
  name: string;
  role: string;
  department: string;
  image: string;
  quote: string;
  rating: number;
  yearsWithCompany: number;
  location: string;
}

interface CultureValue {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  stats: string;
}

interface CSRInitiative {
  id: number;
  title: string;
  description: string;
  impact: string;
  image: string;
  category: 'education' | 'housing' | 'environment' | 'community';
  year: string;
  beneficiaries: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Meron Tadesse',
    role: 'Senior Property Manager',
    department: 'Property Management',
    image: '/images/agent1.jpg',
    quote: 'Working here has been transformative. The company truly values innovation and provides opportunities for growth in Ethiopia\'s evolving real estate market.',
    rating: 5,
    yearsWithCompany: 4,
    location: 'Addis Ababa'
  },
  {
    id: 2,
    name: 'Daniel Bekele',
    role: 'Investment Analyst',
    department: 'Investment Services',
    image: '/images/agent2.jpg',
    quote: 'The collaborative environment and focus on sustainable development make this the perfect place to build a meaningful career in real estate.',
    rating: 5,
    yearsWithCompany: 3,
    location: 'Bahir Dar'
  },
  {
    id: 3,
    name: 'Sara Alemayehu',
    role: 'Legal Advisor',
    department: 'Legal Services',
    image: '/images/agent3.jpg',
    quote: 'The company\'s commitment to ethical practices and community development aligns perfectly with my values. It\'s more than just a job.',
    rating: 5,
    yearsWithCompany: 5,
    location: 'Hawassa'
  },
  {
    id: 4,
    name: 'Yohannes Girma',
    role: 'Marketing Specialist',
    department: 'Marketing',
    image: '/images/agent4.jpg',
    quote: 'The creative freedom and support for innovative marketing strategies have helped me grow professionally while contributing to Ethiopia\'s real estate sector.',
    rating: 5,
    yearsWithCompany: 2,
    location: 'Mekelle'
  }
];

const cultureValues: CultureValue[] = [
  {
    id: 1,
    title: 'Innovation & Excellence',
    description: 'We embrace cutting-edge technology and innovative solutions to transform Ethiopia\'s real estate landscape.',
    icon: SparklesIcon,
    color: 'from-teal-500 to-cyan-600',
    stats: '95% Employee Satisfaction'
  },
  {
    id: 2,
    title: 'Collaborative Spirit',
    description: 'Our diverse team works together, combining local expertise with international best practices.',
    icon: UserGroupIcon,
    color: 'from-blue-500 to-indigo-600',
    stats: '12 Departments Working Together'
  },
  {
    id: 3,
    title: 'Continuous Learning',
    description: 'We invest in our team\'s growth through training, certifications, and professional development programs.',
    icon: AcademicCapIcon,
    color: 'from-purple-500 to-pink-600',
    stats: '40+ Training Programs Annually'
  },
  {
    id: 4,
    title: 'Work-Life Balance',
    description: 'We believe in maintaining a healthy balance between professional excellence and personal well-being.',
    icon: HeartIcon,
    color: 'from-rose-500 to-orange-600',
    stats: 'Flexible Work Arrangements'
  }
];

const csrInitiatives: CSRInitiative[] = [
  {
    id: 1,
    title: 'Affordable Housing Initiative',
    description: 'Developing low-cost housing solutions for middle-income families across Ethiopia.',
    impact: '500+ families housed',
    image: '/images/estate1.jpg',
    category: 'housing',
    year: '2023',
    beneficiaries: '2,000+ individuals'
  },
  {
    id: 2,
    title: 'Education Support Program',
    description: 'Building schools and providing educational resources in underserved communities.',
    impact: '5 schools built',
    image: '/images/estate2.jpg',
    category: 'education',
    year: '2023',
    beneficiaries: '1,500+ students'
  },
  {
    id: 3,
    title: 'Green Building Initiative',
    description: 'Promoting sustainable construction practices and environmental conservation.',
    impact: '30% carbon reduction',
    image: '/images/estate3.jpg',
    category: 'environment',
    year: '2023',
    beneficiaries: 'Entire community'
  },
  {
    id: 4,
    title: 'Community Development',
    description: 'Supporting local businesses and creating employment opportunities in real estate.',
    impact: '200+ jobs created',
    image: '/images/estate4.jpg',
    category: 'community',
    year: '2023',
    beneficiaries: '800+ families'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

export default function CompanyCulture() {
  const sectionRef = useRef<HTMLElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const csrRef = useRef<HTMLDivElement>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeCSRCategory, setActiveCSRCategory] = useState<string>('all');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  const valuesInView = useInView(valuesRef, { once: true, margin: '-100px' });
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: '-100px' });
  const csrInView = useInView(csrRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!sectionRef.current) return;

    // Floating elements animation
    gsap.set('.floating-element', {
      y: 'random(-20, 20)',
      x: 'random(-20, 20)',
      rotation: 'random(-15, 15)'
    });

    gsap.to('.floating-element', {
      y: '+=30',
      x: '+=20',
      rotation: '+=10',
      duration: 'random(3, 5)',
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      stagger: {
        each: 0.5,
        from: 'random'
      }
    });

    // Testimonial auto-rotation
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      clearInterval(testimonialInterval);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const filteredCSRInitiatives = activeCSRCategory === 'all' 
    ? csrInitiatives 
    : csrInitiatives.filter(initiative => initiative.category === activeCSRCategory);

  const csrCategories = [
    { id: 'all', label: 'All Initiatives', icon: GlobeAltIcon },
    { id: 'housing', label: 'Housing', icon: BuildingOfficeIcon },
    { id: 'education', label: 'Education', icon: AcademicCapIcon },
    { id: 'environment', label: 'Environment', icon: SparklesIcon },
    { id: 'community', label: 'Community', icon: HandRaisedIcon }
  ];

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* Background Elements */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY, opacity }}
      >
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-teal-200 to-cyan-300 rounded-full blur-xl floating-element" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full blur-lg floating-element" />
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-purple-200 to-pink-300 rounded-full blur-2xl floating-element" />
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-orange-200 to-yellow-300 rounded-full blur-lg floating-element" />
      </motion.div>

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
            <HeartIcon className="w-4 h-4" />
            Our Culture & Values
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Building More Than Properties,
            <span className="block bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Building Communities
            </span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Our culture is rooted in Ethiopian values of community, excellence, and sustainable growth. 
            We're not just transforming real estate; we're building a better future for Ethiopia.
          </motion.p>
        </motion.div>

        {/* Culture Values */}
        <motion.div
          ref={valuesRef}
          initial="hidden"
          animate={valuesInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="mb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cultureValues.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={value.id}
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 overflow-hidden"
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${value.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-teal-700 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {value.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="flex items-center gap-2 text-sm font-medium text-teal-600">
                    <CheckCircleIcon className="w-4 h-4" />
                    {value.stats}
                  </div>
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Employee Testimonials */}
        <motion.div
          ref={testimonialsRef}
          initial="hidden"
          animate={testimonialsInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              What Our Team Says
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Hear from our talented team members about their experience working with us
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Main Testimonial */}
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-100 to-cyan-200 rounded-full blur-2xl opacity-50" />
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Profile Image */}
                  <div className="relative">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-gradient-to-r from-teal-400 to-cyan-500 p-1">
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <Image
                          src={testimonials[activeTestimonial].image}
                          alt={testimonials[activeTestimonial].name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    {/* Rating Stars */}
                    <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                      <div className="flex gap-1">
                        {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                          <StarIcon key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                      <ChatBubbleLeftRightIcon className="w-6 h-6 text-teal-500" />
                      <span className="text-sm font-medium text-teal-600 uppercase tracking-wide">
                        Employee Testimonial
                      </span>
                    </div>
                    
                    <blockquote className="text-lg md:text-xl text-slate-700 mb-6 leading-relaxed italic">
                      "{testimonials[activeTestimonial].quote}"
                    </blockquote>
                    
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold text-slate-800">
                        {testimonials[activeTestimonial].name}
                      </h4>
                      <p className="text-teal-600 font-medium">
                        {testimonials[activeTestimonial].role}
                      </p>
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-slate-500">
                        <span>{testimonials[activeTestimonial].department}</span>
                        <span>•</span>
                        <span>{testimonials[activeTestimonial].yearsWithCompany} years with company</span>
                        <span>•</span>
                        <span>{testimonials[activeTestimonial].location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial
                      ? 'bg-teal-500 scale-125'
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Corporate Social Responsibility */}
        <motion.div
          ref={csrRef}
          initial="hidden"
          animate={csrInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Corporate Social Responsibility
            </h3>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We believe in giving back to the communities we serve. Our CSR initiatives focus on 
              sustainable development and creating positive impact across Ethiopia.
            </p>
          </motion.div>

          {/* CSR Category Filter */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
            {csrCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCSRCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeCSRCategory === category.id
                      ? 'bg-teal-500 text-white shadow-lg scale-105'
                      : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {category.label}
                </button>
              );
            })}
          </motion.div>

          {/* CSR Initiatives Grid */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {filteredCSRInitiatives.map((initiative, index) => (
              <motion.div
                key={initiative.id}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={initiative.image}
                    alt={initiative.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {initiative.category}
                    </span>
                  </div>
                  
                  {/* Year Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {initiative.year}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h4 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-teal-700 transition-colors">
                    {initiative.title}
                  </h4>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {initiative.description}
                  </p>
                  
                  {/* Impact Stats */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Impact:</span>
                      <span className="font-semibold text-teal-600">{initiative.impact}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Beneficiaries:</span>
                      <span className="font-semibold text-slate-700">{initiative.beneficiaries}</span>
                    </div>
                  </div>
                  
                  {/* Learn More Button */}
                  <button className="group/btn flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium transition-colors">
                    Learn More
                    <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}