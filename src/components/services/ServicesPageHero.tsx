'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import {
  HomeIcon,
  ChevronRightIcon,
  ArrowDownIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  UserGroupIcon,
  MapPinIcon,
  StarIcon,
  CheckCircleIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

gsap.registerPlugin(ScrollTrigger);

interface ServicesPageHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  breadcrumb?: Array<{ label: string; href: string }>;
  ctaText?: string;
  ctaAction?: () => void;
  stats?: Array<{ label: string; value: string; icon: React.ComponentType<any> }>;
}

const defaultProps: ServicesPageHeroProps = {
  title: 'Professional Real Estate Services',
  subtitle: 'Comprehensive Solutions for Ethiopia\'s Growing Market',
  description: 'From property acquisition to investment consulting, we provide end-to-end real estate services tailored to Ethiopia\'s unique market dynamics and regulatory landscape.',
  backgroundImage: '/images/estate1.jpg',
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' }
  ],
  ctaText: 'Explore Our Services',
  stats: [
    { label: 'Service Categories', value: '8+', icon: BuildingOfficeIcon },
    { label: 'Years Experience', value: '15+', icon: StarIcon },
    { label: 'Satisfied Clients', value: '2,500+', icon: UserGroupIcon },
    { label: 'Ethiopian Cities', value: '12+', icon: MapPinIcon }
  ]
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  }
};

const statsVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

export default function ServicesPageHero({
  title = defaultProps.title,
  subtitle = defaultProps.subtitle,
  description = defaultProps.description,
  backgroundImage = defaultProps.backgroundImage,
  backgroundVideo,
  breadcrumb = defaultProps.breadcrumb,
  ctaText = defaultProps.ctaText,
  ctaAction,
  stats = defaultProps.stats
}: ServicesPageHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.7]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Floating elements animation
    gsap.set('.floating-service-element', {
      y: 'random(-30, 30)',
      x: 'random(-30, 30)',
      rotation: 'random(-20, 20)',
      scale: 'random(0.8, 1.2)'
    });

    gsap.to('.floating-service-element', {
      y: '+=40',
      x: '+=30',
      rotation: '+=15',
      duration: 'random(4, 7)',
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      stagger: {
        each: 0.8,
        from: 'random'
      }
    });

    // Background parallax effect
    gsap.to('.hero-background', {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    // Overlay animation
    gsap.fromTo(overlayRef.current, 
      { opacity: 0.3 },
      {
        opacity: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    // Stats counter animation
    gsap.fromTo('.stat-number', 
      { textContent: 0 },
      {
        textContent: (_i: number, target: HTMLElement) => target.getAttribute('data-value'),
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: '.stats-container',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        stagger: 0.2
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services-overview');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
    if (ctaAction) ctaAction();
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image/Video */}
      <motion.div 
        className="absolute inset-0 hero-background"
        style={{ y: backgroundY }}
      >
        {backgroundVideo ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={backgroundImage!}
            alt="Services Hero Background"
            fill
            className="object-cover"
            priority
          />
        )}
      </motion.div>

      {/* Overlay */}
      <motion.div 
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-800/50 to-teal-900/60"
        style={{ opacity: overlayOpacity }}
      />
      
      {/* Additional Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

      {/* Floating Decorative Elements */}
      <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none">
        <div className="floating-service-element absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-teal-400/20 to-cyan-500/20 rounded-full backdrop-blur-sm border border-white/10" />
        <div className="floating-service-element absolute top-40 right-20 w-12 h-12 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-lg backdrop-blur-sm border border-white/10" />
        <div className="floating-service-element absolute bottom-40 left-1/4 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full backdrop-blur-sm border border-white/10" />
        <div className="floating-service-element absolute bottom-32 right-1/3 w-14 h-14 bg-gradient-to-br from-orange-400/20 to-yellow-500/20 rounded-lg backdrop-blur-sm border border-white/10" />
        <div className="floating-service-element absolute top-1/3 left-1/2 w-10 h-10 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full backdrop-blur-sm border border-white/10" />
        <div className="floating-service-element absolute bottom-1/4 left-20 w-18 h-18 bg-gradient-to-br from-rose-400/20 to-red-500/20 rounded-lg backdrop-blur-sm border border-white/10" />
      </div>

      {/* Content Container */}
      <motion.div 
        className="relative z-10 container mx-auto px-4 pt-6 text-center"
        style={{ y: contentY }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          {/* Breadcrumb */}
          <motion.nav variants={itemVariants} className="flex items-center justify-center gap-2 mb-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
              {breadcrumb?.map((item, index) => (
                <React.Fragment key={index}>
                  {index === 0 ? (
                    <HomeIcon className="w-4 h-4 text-white/80" />
                  ) : null}
                  <Link 
                    href={item.href}
                    className="text-white/90 hover:text-white transition-colors text-sm font-medium"
                  >
                    {item.label}
                  </Link>
                  {index < breadcrumb.length - 1 && (
                    <ChevronRightIcon className="w-4 h-4 text-white/60" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.nav>

          {/* Service Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500/90 to-cyan-600/90 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-white/20">
            <BuildingOfficeIcon className="w-5 h-5" />
            Mekiya Real Estate Services
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            <span className="block text-shadow-lg">{title}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.h2 
            variants={itemVariants}
            className="text-xl md:text-2xl lg:text-3xl font-semibold text-teal-200 mb-8 text-shadow-md"
          >
            {subtitle}
          </motion.h2>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed text-shadow-sm"
          >
            {description}
          </motion.p>

          {/* Stats Grid */}
          <motion.div 
            variants={itemVariants}
            className="stats-container grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto"
          >
            {stats?.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={statsVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="stat-number text-2xl md:text-3xl font-bold text-white mb-2" data-value={stat.value.replace('+', '')}>
                      0
                    </div>
                    <div className="text-sm text-white/80 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={scrollToServices}
              className="group relative bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-white/20 backdrop-blur-sm"
            >
              <span className="relative z-10 flex items-center gap-3">
                {ctaText}
                <ArrowDownIcon className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
            </button>
            
            <button className="group flex items-center gap-3 text-white hover:text-teal-200 font-semibold text-lg transition-colors duration-300">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                <PlayIcon className="w-5 h-5 ml-1" />
              </div>
              Watch Our Story
            </button>
          </motion.div>

          {/* Service Highlights */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="flex flex-wrap items-center justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-teal-400" />
                <span className="text-sm font-medium">Licensed & Regulated</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-teal-400" />
                <span className="text-sm font-medium">Ethiopian Market Experts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-teal-400" />
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-teal-400" />
                <span className="text-sm font-medium">Multilingual Service</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />
    </section>
  );
}