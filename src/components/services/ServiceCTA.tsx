'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
import {
  PhoneIcon,
  EnvelopeIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ContactMethod {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  action: string;
  color: string;
  gradient: string;
  href: string;
  stats: string;
}

const contactMethods: ContactMethod[] = [
  {
    id: 'phone',
    title: 'Call Us Now',
    description: 'Speak directly with our real estate experts for immediate assistance.',
    icon: PhoneIcon,
    action: '+251 11 123 4567',
    color: 'deep-teal',
    gradient: 'from-deep-teal to-royal-navy',
    href: 'tel:+251111234567',
    stats: 'Avg. response: 2 mins'
  },
  {
    id: 'email',
    title: 'Send Message',
    description: 'Get detailed information and personalized recommendations via email.',
    icon: EnvelopeIcon,
    action: 'info@mekiyarealestate.com',
    color: 'royal-navy',
    gradient: 'from-royal-navy to-deep-teal',
    href: 'mailto:info@mekiyarealestate.com',
    stats: 'Response within 2 hours'
  },
  {
    id: 'schedule',
    title: 'Schedule Meeting',
    description: 'Book a consultation at your convenience with our senior agents.',
    icon: CalendarDaysIcon,
    action: 'Book Appointment',
    color: 'gold-leaf',
    gradient: 'from-gold-leaf to-warm-sand',
    href: '/contact',
    stats: 'Available 7 days a week'
  },
  {
    id: 'chat',
    title: 'Live Chat',
    description: 'Get instant answers to your questions through our live chat support.',
    icon: ChatBubbleLeftRightIcon,
    action: 'Start Chat',
    color: 'soft-sage',
    gradient: 'from-soft-sage to-deep-teal',
    href: '#chat',
    stats: 'Online 24/7'
  }
];

const officeLocations = [
  {
    name: 'Main Office - Bole',
    address: '123 Bole Road, Addis Ababa',
    phone: '+251 11 123 4567',
    hours: 'Mon-Sat: 8:00 AM - 6:00 PM'
  },
  {
    name: 'Branch Office - Kazanchis',
    address: '456 Kazanchis Street, Addis Ababa',
    phone: '+251 11 234 5678',
    hours: 'Mon-Fri: 9:00 AM - 5:00 PM'
  }
];

const ServiceCTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [selectedMethod, setSelectedMethod] = useState<string>('phone');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

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

      // CTA cards animation
      gsap.fromTo('.cta-card',
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Floating elements
      gsap.to('.cta-float', {
        y: -20,
        rotation: 5,
        duration: 4,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.8
      });

      // Form animation
      gsap.fromTo('.contact-form',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-br from-royal-navy via-deep-teal to-midnight overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="cta-float absolute top-20 left-10 w-32 h-32 bg-warm-sand/10 rounded-full blur-2xl" />
        <div className="cta-float absolute bottom-20 right-10 w-48 h-48 bg-gold-leaf/10 rounded-full blur-3xl" />
        <div className="cta-float absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-soft-sage/10 rounded-full blur-3xl" />
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
          <div className="inline-block px-4 py-2 bg-warm-sand/20 text-warm-sand font-montserrat font-semibold text-sm rounded-full mb-6 backdrop-blur-sm border border-warm-sand/30">
            Get Started Today
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to{' '}
            <span className="text-warm-sand relative">
              Begin?
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-warm-sand to-gold-leaf rounded-full" />
            </span>
          </h2>
          <p className="font-montserrat text-lg md:text-xl text-alabaster/80 max-w-3xl mx-auto leading-relaxed">
            Take the first step towards your real estate goals. Our expert team is ready to provide 
            personalized guidance and exceptional service.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Methods */}
          <div ref={ctaRef}>
            <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-8">
              Choose Your Preferred Contact Method
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                const isSelected = selectedMethod === method.id;
                
                return (
                  <motion.div
                    key={method.id}
                    className={`cta-card group relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 cursor-pointer ${
                      isSelected 
                        ? 'border-warm-sand/50 bg-white/15 ring-2 ring-warm-sand/30' 
                        : 'border-white/20 hover:border-white/40 hover:bg-white/15'
                    }`}
                    whileHover={{ y: -5, scale: 1.02 }}
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                      isSelected 
                        ? `bg-gradient-to-r ${method.gradient} text-white` 
                        : 'bg-white/20 text-white group-hover:bg-white/30'
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>

                    {/* Content */}
                    <h4 className="font-playfair text-lg font-semibold text-white mb-2">
                      {method.title}
                    </h4>
                    
                    <p className="font-montserrat text-sm text-alabaster/80 mb-4 leading-relaxed">
                      {method.description}
                    </p>

                    {/* Action */}
                    <div className="flex items-center justify-between">
                      <span className="font-montserrat font-semibold text-warm-sand text-sm">
                        {method.action}
                      </span>
                      <ArrowRightIcon className="w-4 h-4 text-warm-sand group-hover:translate-x-1 transition-transform duration-300" />
                    </div>

                    {/* Stats */}
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <span className="font-montserrat text-xs text-alabaster/60">
                        {method.stats}
                      </span>
                    </div>

                    {/* Selection Indicator */}
                    {isSelected && (
                      <motion.div
                        layoutId="selectedMethod"
                        className="absolute inset-0 bg-gradient-to-r from-warm-sand/10 to-gold-leaf/10 rounded-2xl pointer-events-none"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(233, 216, 166, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-warm-sand to-gold-leaf text-royal-navy font-montserrat font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <CalendarDaysIcon className="w-5 h-5" />
                  Schedule Consultation
                </motion.button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white/50 hover:border-white text-white font-montserrat font-semibold py-4 px-6 rounded-xl backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-3"
              >
                <PlayIcon className="w-5 h-5" />
                Watch Demo
              </motion.button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h3 className="font-playfair text-2xl font-bold text-white mb-6">
                Send Us a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-montserrat text-sm font-medium text-white mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-warm-sand/50 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block font-montserrat text-sm font-medium text-white mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-warm-sand/50 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-montserrat text-sm font-medium text-white mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-warm-sand/50 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                      placeholder="Enter your phone"
                    />
                  </div>
                  
                  <div>
                    <label className="block font-montserrat text-sm font-medium text-white mb-2">
                      Service Interest
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-warm-sand/50 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    >
                      <option value="" className="bg-royal-navy">Select a service</option>
                      <option value="residential" className="bg-royal-navy">Residential Sales</option>
                      <option value="commercial" className="bg-royal-navy">Commercial Real Estate</option>
                      <option value="management" className="bg-royal-navy">Property Management</option>
                      <option value="investment" className="bg-royal-navy">Investment Consulting</option>
                      <option value="legal" className="bg-royal-navy">Legal Services</option>
                      <option value="valuation" className="bg-royal-navy">Property Valuation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-montserrat text-sm font-medium text-white mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-warm-sand/50 focus:border-transparent backdrop-blur-sm transition-all duration-300 resize-none"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-warm-sand to-gold-leaf text-royal-navy font-montserrat font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <EnvelopeIcon className="w-5 h-5" />
                  Send Message
                </motion.button>
              </form>
            </div>
          </div>
        </div>

        {/* Office Locations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {officeLocations.map((office, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-warm-sand/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPinIcon className="w-6 h-6 text-warm-sand" />
                </div>
                <div>
                  <h4 className="font-playfair text-lg font-semibold text-white mb-2">
                    {office.name}
                  </h4>
                  <p className="font-montserrat text-alabaster/80 mb-2">
                    {office.address}
                  </p>
                  <p className="font-montserrat text-warm-sand mb-2">
                    {office.phone}
                  </p>
                  <div className="flex items-center gap-2 text-alabaster/60">
                    <ClockIcon className="w-4 h-4" />
                    <span className="font-montserrat text-sm">{office.hours}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { icon: CheckCircleIcon, text: 'Licensed & Regulated' },
              { icon: UserGroupIcon, text: '2,500+ Happy Clients' },
              { icon: ClockIcon, text: '24/7 Support Available' },
              { icon: MapPinIcon, text: 'Serving All Ethiopia' }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="flex items-center gap-3 text-warm-sand/80">
                  <IconComponent className="w-5 h-5" />
                  <span className="font-montserrat text-sm">{item.text}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceCTA;