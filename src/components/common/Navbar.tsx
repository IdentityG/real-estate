'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import TransitionLink from './TransitionLink';
import { 
  HomeIcon, 
  BuildingOfficeIcon, 
  InformationCircleIcon, 
  Cog6ToothIcon,
  UserGroupIcon,
  NewspaperIcon,
  PhoneIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  BellIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 100], [0.95, 1]);
  const navBlur = useTransform(scrollY, [0, 100], [10, 20]);

  // Enhanced Navigation items with icons and descriptions
  const navItems = [
    { 
      name: 'Home', 
      href: '/', 
      icon: HomeIcon,
      description: 'Welcome to Mekiya'
    },
    { 
      name: 'Properties', 
      href: '/properties', 
      icon: BuildingOfficeIcon,
      description: 'Browse luxury properties'
    },
    { 
      name: 'About', 
      href: '/about', 
      icon: InformationCircleIcon,
      description: 'Our story & mission'
    },
    { 
      name: 'Services', 
      href: '/services', 
      icon: Cog6ToothIcon,
      description: 'Real estate services'
    },
    { 
      name: 'Agents', 
      href: '/agents', 
      icon: UserGroupIcon,
      description: 'Meet our experts'
    },
    { 
      name: 'Blog', 
      href: '/blog', 
      icon: NewspaperIcon,
      description: 'Latest news & insights'
    },
    { 
      name: 'Contact', 
      href: '/contact', 
      icon: PhoneIcon,
      description: 'Get in touch'
    },
  ];

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Enhanced scroll behavior with smooth transitions
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = documentHeight > 0 ? currentScrollY / documentHeight : 0;
      
      setScrollProgress(progress);
      setIsScrolled(currentScrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted]);

  // Close menus when route changes
  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
    setShowNotifications(false);
  }, [pathname]);

  // Close search on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setShowNotifications(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Enhanced Animation variants
  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      }
    }
  };

  const logoVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    open: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const menuItemVariants = {
    closed: {
      opacity: 0,
      y: 30,
      x: 20
    },
    open: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    }
  };

  const searchVariants = {
    closed: {
      opacity: 0,
      scale: 0.8,
      y: -20
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'backOut'
      }
    }
  };

  return (
    <>
      {/* Enhanced Scroll Progress Indicator */}
      {isMounted && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-deep-teal via-royal-navy to-warm-sand z-50"
          style={{
            scaleX: scrollProgress,
            transformOrigin: '0%'
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrollProgress }}
          transition={{ duration: 0.1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
        </motion.div>
      )}

      {/* Revolutionary Navbar */}
      <motion.nav
        ref={navRef}
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-silver-mist/50'
            : 'bg-white/10 backdrop-blur-md'
        }`}
        style={{
          opacity: navOpacity,
          backdropFilter: `blur(${navBlur.get()}px)`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 lg:h-24">
            {/* Enhanced Logo */}
            <motion.div
              variants={logoVariants}
              className="flex-shrink-0 group"
            >
              <TransitionLink href="/" className="flex items-center space-x-3">
                <motion.div 
                  className="relative w-12 h-12 bg-gradient-to-br from-deep-teal via-royal-navy to-midnight rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 5,
                    boxShadow: '0 20px 40px rgba(0, 95, 115, 0.3)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="font-playfair text-white font-bold text-xl">M</span>
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent"
                    animate={{
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
                <div className="flex flex-col">
                  <span className={`font-playfair font-bold text-2xl transition-all duration-300 ${
                    isScrolled ? 'text-royal-navy' : 'text-white'
                  }`}>
                    Mekiya
                  </span>
                  <span className={`font-montserrat text-xs transition-all duration-300 ${
                    isScrolled ? 'text-slate-gray' : 'text-warm-sand/80'
                  }`}>
                    Real Estate
                  </span>
                </div>
              </TransitionLink>
            </motion.div>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden lg:block flex-1 max-w-2xl mx-8">
              <div className="flex items-center justify-center space-x-1">
                {navItems.map((item, index) => {
                  const IconComponent = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative group"
                    >
                      <TransitionLink
                        href={item.href}
                        className={`relative px-4 py-3 rounded-2xl font-montserrat font-medium text-sm transition-all duration-300 flex items-center gap-2 group ${
                          isScrolled 
                            ? (isActive 
                                ? 'text-white bg-deep-teal shadow-lg' 
                                : 'text-charcoal hover:text-deep-teal hover:bg-deep-teal/10'
                              )
                            : (isActive 
                                ? 'text-royal-navy bg-white/20 backdrop-blur-sm shadow-lg' 
                                : 'text-white/90 hover:text-white hover:bg-white/20 backdrop-blur-sm'
                              )
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                        <span>{item.name}</span>
                        
                        {/* Hover tooltip */}
                        <motion.div
                          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-charcoal text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50"
                          initial={{ opacity: 0, y: -10 }}
                          whileHover={{ opacity: 1, y: 0 }}
                        >
                          {item.description}
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-charcoal rotate-45" />
                        </motion.div>
                      </TransitionLink>
                      
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-deep-teal rounded-full"
                          layoutId="activeIndicator"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  );
                })}
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