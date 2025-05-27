'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Social Media Icons (using Heroicons)
const FacebookIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323C5.902 8.198 7.053 7.708 8.35 7.708s2.448.49 3.323 1.297c.876.876 1.366 2.027 1.366 3.324s-.49 2.448-1.366 3.323c-.875.876-2.026 1.366-3.323 1.366zm7.718 0c-1.297 0-2.448-.49-3.323-1.297-.876-.875-1.366-2.026-1.366-3.323s.49-2.448 1.366-3.323c.875-.876 2.026-1.366 3.323-1.366s2.448.49 3.323 1.366c.876.875 1.366 2.026 1.366 3.323s-.49 2.448-1.366 3.323c-.875.876-2.026 1.366-3.323 1.366z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: '-100px' });

  // GSAP Animations
  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax background effect
      gsap.to('.footer-bg-gradient', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Floating decorative elements
      gsap.to('.footer-decoration', {
        y: -20,
        rotation: 5,
        duration: 3,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
      });

      // Pulse effect for social icons
      gsap.to('.social-pulse', {
        scale: 1.05,
        duration: 2,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const socialIconVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  // Quick Links data
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Agents', href: '/agents' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  // Social Media data
  const socialLinks = [
    { name: 'Facebook', href: '#', icon: FacebookIcon },
    { name: 'Twitter', href: '#', icon: TwitterIcon },
    { name: 'Instagram', href: '#', icon: InstagramIcon },
    { name: 'LinkedIn', href: '#', icon: LinkedInIcon },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className="relative bg-gradient-to-br from-royal-navy via-deep-teal to-royal-navy overflow-hidden"
    >
      {/* Background Gradient with Parallax */}
      <div className="footer-bg-gradient absolute inset-0 bg-gradient-to-r from-royal-navy/90 to-deep-teal/90" />
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 footer-decoration opacity-20">
        <div className="w-20 h-20 rounded-full bg-warm-sand/30 blur-xl" />
      </div>
      <div className="absolute bottom-20 right-20 footer-decoration opacity-20">
        <div className="w-32 h-32 rounded-full bg-soft-sage/20 blur-2xl" />
      </div>
      <div className="absolute top-1/2 left-1/3 footer-decoration opacity-10">
        <div className="w-16 h-16 rounded-full bg-gold-leaf/40 blur-lg" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info Column */}
            <motion.div variants={columnVariants} className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-playfair font-bold text-warm-sand mb-4">
                  Mekiya Real Estate
                </h3>
                <p className="text-alabaster/80 font-montserrat text-sm leading-relaxed">
                  Your trusted partner in finding the perfect property. 
                  Luxury, comfort, and excellence in every transaction.
                </p>
              </div>
            </motion.div>

            {/* Quick Links Column */}
            <motion.div variants={columnVariants} className="lg:col-span-1">
              <nav aria-label="Footer Navigation">
                <h4 className="text-lg font-playfair font-semibold text-warm-sand mb-6">
                  Quick Links
                </h4>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-alabaster/80 hover:text-warm-sand font-montserrat text-sm transition-all duration-300 hover:translate-x-1 inline-block group"
                      >
                        <span className="relative">
                          {link.name}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-warm-sand transition-all duration-300 group-hover:w-full" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>

            {/* Contact Info Column */}
            <motion.div variants={columnVariants} className="lg:col-span-1">
              <address className="not-italic">
                <h4 className="text-lg font-playfair font-semibold text-warm-sand mb-6">
                  Contact Us
                </h4>
                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start space-x-3 group">
                    <MapPinIcon className="w-5 h-5 text-soft-sage mt-0.5 group-hover:text-warm-sand transition-colors duration-300" />
                    <div>
                      <p className="text-alabaster/80 font-montserrat text-sm leading-relaxed">
                        123 Luxury Avenue<br />
                        Premium District<br />
                        City, State 12345
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center space-x-3 group">
                    <EnvelopeIcon className="w-5 h-5 text-soft-sage group-hover:text-warm-sand transition-colors duration-300" />
                    <a
                      href="mailto:info@mekiyarealestate.com"
                      className="text-alabaster/80 hover:text-warm-sand font-montserrat text-sm transition-colors duration-300"
                    >
                      info@mekiyarealestate.com
                    </a>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center space-x-3 group">
                    <PhoneIcon className="w-5 h-5 text-soft-sage group-hover:text-warm-sand transition-colors duration-300" />
                    <a
                      href="tel:+1234567890"
                      className="text-alabaster/80 hover:text-warm-sand font-montserrat text-sm transition-colors duration-300"
                    >
                      +1 (234) 567-8900
                    </a>
                  </div>
                </div>
              </address>
            </motion.div>

            {/* Social Media Column */}
            <motion.div variants={columnVariants} className="lg:col-span-1">
              <h4 className="text-lg font-playfair font-semibold text-warm-sand mb-6">
                Follow Us
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      className="social-pulse w-12 h-12 bg-alabaster/10 hover:bg-warm-sand/20 rounded-full flex items-center justify-center text-alabaster/80 hover:text-warm-sand transition-all duration-300 backdrop-blur-sm border border-alabaster/20 hover:border-warm-sand/40"
                      variants={socialIconVariants}
                      whileHover="hover"
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <IconComponent />
                    </motion.a>
                  );
                })}
              </div>
              
              {/* Newsletter Signup */}
              <div className="mt-8">
                <h5 className="text-sm font-montserrat font-semibold text-warm-sand mb-3">
                  Stay Updated
                </h5>
                <p className="text-alabaster/70 font-montserrat text-xs mb-4">
                  Subscribe to our newsletter for the latest properties and market insights.
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 bg-alabaster/10 border border-alabaster/20 rounded-l-lg text-alabaster placeholder-alabaster/50 text-sm focus:outline-none focus:border-warm-sand/50 backdrop-blur-sm"
                  />
                  <button className="px-4 py-2 bg-warm-sand text-royal-navy font-montserrat font-semibold text-sm rounded-r-lg hover:bg-gold-leaf transition-colors duration-300">
                    Subscribe
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Copyright Section */}
        <motion.div
          className="border-t border-alabaster/20 py-6"
          variants={columnVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-alabaster/60 font-montserrat text-sm text-center md:text-left">
                © {currentYear} Mekiya Real Estate. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link
                  href="/privacy"
                  className="text-alabaster/60 hover:text-warm-sand font-montserrat text-sm transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-alabaster/60 hover:text-warm-sand font-montserrat text-sm transition-colors duration-300"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;