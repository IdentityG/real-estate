'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary/95 backdrop-blur-sm py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <Link href="/" className="flex items-center">
              <div className="relative h-10 w-40 overflow-hidden">
                <Image 
                  src="https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png" 
                  alt="Real Estate Logo" 
                  fill
                  style={{ objectFit: 'contain' }}
                  className={`transition-all duration-300 ${scrolled ? 'brightness-200' : 'brightness-100'}`}
                  priority
                />
              </div>
              <span className={`ml-2 font-heading font-semibold text-xl transition-colors duration-300 ${scrolled ? 'text-secondary' : 'text-primary'}`}>
                LuxEstate
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link 
                  href={link.href}
                  className={`relative px-4 py-2 rounded-full font-accent text-sm font-medium transition-colors duration-300 hover:text-accent group ${scrolled ? 'text-secondary-light' : 'text-primary-dark'}`}
                >
                  {link.name}
                  <motion.span 
                    className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent rounded-full transition-all duration-300 group-hover:w-full"
                    initial={{ width: '0%' }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="ml-4 px-5 py-2 bg-accent text-primary-dark rounded-full font-accent text-sm font-medium hover:bg-accent-light transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Get Started
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden relative z-10 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col justify-center items-center">
              <span 
                className={`block h-0.5 w-6 rounded-sm transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5 bg-secondary' : `${scrolled ? 'bg-secondary' : 'bg-primary'}`}`} 
              />
              <span 
                className={`block h-0.5 w-6 rounded-sm my-1 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : `${scrolled ? 'bg-secondary' : 'bg-primary'}`}`} 
              />
              <span 
                className={`block h-0.5 w-6 rounded-sm transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5 bg-secondary' : `${scrolled ? 'bg-secondary' : 'bg-primary'}`}`} 
              />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && <MobileMenu navLinks={navLinks} setMobileMenuOpen={setMobileMenuOpen} />}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;