'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  // Navigation items
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Agents', href: '/agents' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Scroll behavior - simplified to only change background
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = documentHeight > 0 ? currentScrollY / documentHeight : 0;
      
      // Update scroll progress
      setScrollProgress(progress);
      
      // Change background on scroll (navbar stays visible)
      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Animation variants
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  const menuItemVariants = {
    closed: {
      opacity: 0,
      y: 20
    },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: 'easeOut'
      }
    })
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      {isMounted && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-deep-teal to-royal-navy z-50"
          style={{
            scaleX: scrollProgress,
            transformOrigin: '0%'
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrollProgress }}
          transition={{ duration: 0.1 }}
        />
      )}

      {/* Main Navbar - Always visible and fixed */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
            >
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <span className={`font-bold text-xl transition-colors duration-300 ${
                  isScrolled ? 'text-gray-900' : 'text-blue-500'
                }`}>
                  Mekiya
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={`relative font-medium text-sm transition-all duration-300 group ${
                        isScrolled 
                          ? 'text-gray-700 hover:text-teal-600' 
                          : 'text-blue-700 hover:text-yellow-200'
                      } ${
                        pathname === item.href 
                          ? (isScrolled ? 'text-teal-600' : 'text-yellow-200') 
                          : ''
                      }`}
                    >
                      {item.name}
                      <motion.div
                        className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                          isScrolled 
                            ? 'bg-gradient-to-r from-teal-600 to-blue-800' 
                            : 'bg-gradient-to-r from-yellow-200 to-yellow-400'
                        }`}
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{ transformOrigin: '0%' }}
                      />
                      {pathname === item.href && (
                        <motion.div
                          className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                            isScrolled 
                              ? 'bg-gradient-to-r from-teal-600 to-blue-800' 
                              : 'bg-gradient-to-r from-yellow-200 to-yellow-400'
                          }`}
                          layoutId="activeTab"
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Button & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="hidden sm:block"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-2.5 rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  List Property
                </motion.button>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={`lg:hidden p-2 rounded-md transition-colors duration-300 ${
                  isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <motion.span
                    className={`block h-0.5 w-6 rounded-sm transition-all duration-300 ${
                      isScrolled ? 'bg-gray-700' : 'bg-blue-700'
                    }`}
                    animate={{
                      rotate: isOpen ? 45 : 0,
                      y: isOpen ? 2 : -2
                    }}
                  />
                  <motion.span
                    className={`block h-0.5 w-6 rounded-sm transition-all duration-300 ${
                      isScrolled ? 'bg-gray-700' : 'bg-blue-700'
                    }`}
                    animate={{
                      opacity: isOpen ? 0 : 1
                    }}
                  />
                  <motion.span
                    className={`block h-0.5 w-6 rounded-sm transition-all duration-300 ${
                      isScrolled ? 'bg-gray-700' : 'bg-blue-700'
                    }`}
                    animate={{
                      rotate: isOpen ? -45 : 0,
                      y: isOpen ? -2 : 2
                    }}
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-40 lg:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-600 to-blue-800 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">M</span>
                  </div>
                  <span className="font-bold text-xl text-gray-900">Mekiya</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile Menu Items */}
              <div className="flex-1 py-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    custom={index}
                    variants={menuItemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <Link
                      href={item.href}
                      className={`block px-6 py-4 font-medium text-lg transition-all duration-300 ${
                        pathname === item.href
                          ? 'text-teal-600 bg-teal-50 border-r-4 border-teal-600'
                          : 'text-gray-700 hover:text-teal-600 hover:bg-teal-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="p-6 border-t border-gray-200">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 rounded-md transition-all duration-300 shadow-md"
                >
                  List Property
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;