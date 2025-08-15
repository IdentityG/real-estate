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
            : 'bg-white/20 backdrop-blur-md shadow-lg border-b border-white/10'
        }`}
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
                  <span className={`font-playfair font-bold text-2xl transition-all duration-300 drop-shadow-lg ${
                    isScrolled ? 'text-royal-navy' : 'text-white'
                  }`}>
                    Mekiya
                  </span>
                  <span className={`font-montserrat text-xs transition-all duration-300 drop-shadow-md ${
                    isScrolled ? 'text-slate-gray' : 'text-warm-sand'
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
                        className={`relative px-4 py-3 rounded-2xl font-montserrat font-medium text-sm transition-all duration-300 flex items-center gap-2 group drop-shadow-sm ${
                          isScrolled 
                            ? (isActive 
                                ? 'text-white bg-deep-teal shadow-lg' 
                                : 'text-charcoal hover:text-deep-teal hover:bg-deep-teal/10'
                              )
                            : (isActive 
                                ? 'text-royal-navy bg-white/30 backdrop-blur-sm shadow-lg border border-white/20' 
                                : 'text-white hover:text-white hover:bg-white/25 backdrop-blur-sm border border-white/10'
                              )
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                        <span>{item.name}</span>
                        
                        {/* Hover tooltip */}
                        <motion.div
                          className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 ${
                            isScrolled 
                              ? 'bg-charcoal text-white' 
                              : 'bg-white/90 backdrop-blur-sm text-charcoal border border-white/20'
                          }`}
                          initial={{ opacity: 0, y: -10 }}
                          whileHover={{ opacity: 1, y: 0 }}
                        >
                          {item.description}
                          <div className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 ${
                            isScrolled ? 'bg-charcoal' : 'bg-white/90'
                          }`} />
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

            {/* Enhanced Action Buttons */}
            <div className="flex items-center space-x-3">
              {/* Search Button 
              <motion.button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-2xl transition-all duration-300 border ${
                  isScrolled 
                    ? 'text-slate-gray hover:text-deep-teal hover:bg-deep-teal/10 border-transparent' 
                    : 'text-white hover:text-white hover:bg-white/20 border-white/20 backdrop-blur-sm'
                }`}
              >
                <MagnifyingGlassIcon className="w-5 h-5 drop-shadow-sm" />
              </motion.button> */}

              {/* Favorites Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`hidden sm:block p-3 rounded-2xl transition-all duration-300 relative border ${
                  isScrolled 
                    ? 'text-slate-gray hover:text-terracotta hover:bg-terracotta/10 border-transparent' 
                    : 'text-white hover:text-white hover:bg-white/20 border-white/20 backdrop-blur-sm'
                }`}
              >
                <HeartIcon className="w-5 h-5 drop-shadow-sm" />
                <motion.div
                  className="absolute -top-1 -right-1 w-4 h-4 bg-terracotta rounded-full flex items-center justify-center shadow-lg"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-white text-xs font-bold">3</span>
                </motion.div>
              </motion.button>

              {/* Notifications */}
              <motion.button
                onClick={() => setShowNotifications(!showNotifications)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`hidden sm:block p-3 rounded-2xl transition-all duration-300 relative border ${
                  isScrolled 
                    ? 'text-slate-gray hover:text-gold-leaf hover:bg-gold-leaf/10 border-transparent' 
                    : 'text-white hover:text-white hover:bg-white/20 border-white/20 backdrop-blur-sm'
                }`}
              >
                <BellIcon className="w-5 h-5 drop-shadow-sm" />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full shadow-lg"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.button>

              {/* CTA Button
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="hidden sm:block"
              >
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 10px 30px rgba(0, 95, 115, 0.3)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-deep-teal to-royal-navy text-white font-montserrat font-semibold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">List Property</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </motion.button>
              </motion.div>  */}

              {/* Enhanced Mobile Menu Button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`lg:hidden p-3 rounded-2xl transition-all duration-300 border ${
                  isScrolled 
                    ? 'text-charcoal hover:bg-deep-teal/10 border-transparent' 
                    : 'text-white hover:bg-white/20 border-white/20 backdrop-blur-sm'
                }`}
              >
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isOpen ? (
                    <XMarkIcon className="w-6 h-6 drop-shadow-sm" />
                  ) : (
                    <Bars3Icon className="w-6 h-6 drop-shadow-sm" />
                  )}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-midnight/90 backdrop-blur-xl z-50 flex items-start justify-center pt-32"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              variants={searchVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="w-full max-w-2xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-deep-teal" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search properties, locations, or agents..."
                    className="w-full pl-14 pr-6 py-4 bg-transparent border-2 border-silver-mist rounded-2xl font-montserrat text-lg text-charcoal placeholder-slate-gray focus:outline-none focus:border-deep-teal transition-colors duration-300"
                    autoFocus
                  />
                  <motion.button
                    onClick={() => setIsSearchOpen(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-slate-gray hover:text-charcoal transition-colors"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </motion.button>
                </div>
                
                {/* Search Suggestions */}
                {searchQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 space-y-2"
                  >
                    {['Luxury Villa in Bole', 'Modern Apartment in Kazanchis', 'Commercial Space in Piassa'].map((suggestion, index) => (
                      <motion.div
                        key={suggestion}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 rounded-xl hover:bg-deep-teal/10 cursor-pointer transition-colors duration-200"
                      >
                        <span className="font-montserrat text-charcoal">{suggestion}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notifications Dropdown */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="fixed top-24 right-4 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-silver-mist/50 z-40 overflow-hidden"
          >
            <div className="p-4 border-b border-silver-mist/30">
              <h3 className="font-playfair font-semibold text-charcoal">Notifications</h3>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {[
                { title: 'New Property Match', message: 'Found 3 properties matching your criteria', time: '2m ago' },
                { title: 'Price Drop Alert', message: 'Villa in Bole reduced by $50,000', time: '1h ago' },
                { title: 'Tour Scheduled', message: 'Virtual tour confirmed for tomorrow', time: '3h ago' }
              ].map((notification, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border-b border-silver-mist/20 last:border-b-0 hover:bg-deep-teal/5 cursor-pointer transition-colors"
                >
                  <h4 className="font-montserrat font-semibold text-charcoal text-sm">{notification.title}</h4>
                  <p className="font-montserrat text-slate-gray text-xs mt-1">{notification.message}</p>
                  <span className="font-montserrat text-deep-teal text-xs mt-2 block">{notification.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-midnight/80 backdrop-blur-md z-30 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Revolutionary Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white/95 backdrop-blur-xl shadow-2xl z-40 lg:hidden border-l border-silver-mist/30"
          >
            <div className="flex flex-col h-full">
              {/* Enhanced Mobile Menu Header */}
              <div className="relative p-6 bg-gradient-to-br from-deep-teal to-royal-navy">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <span className="font-playfair text-white font-bold text-xl">M</span>
                    </div>
                    <div>
                      <span className="font-playfair font-bold text-xl text-white block">Mekiya</span>
                      <span className="font-montserrat text-warm-sand/80 text-sm">Real Estate</span>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </motion.button>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
              </div>

              {/* Enhanced Mobile Menu Items */}
              <div className="flex-1 py-6 overflow-y-auto">
                {navItems.map((item, index) => {
                  const IconComponent = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <motion.div
                      key={item.name}
                      variants={menuItemVariants}
                      custom={index}
                    >
                      <TransitionLink
                        href={item.href}
                        className={`flex items-center gap-4 px-6 py-4 mx-4 rounded-2xl font-montserrat font-medium transition-all duration-300 group ${
                          isActive
                            ? 'text-white bg-gradient-to-r from-deep-teal to-royal-navy shadow-lg'
                            : 'text-charcoal hover:text-deep-teal hover:bg-deep-teal/10'
                        }`}
                      >
                        <div className={`p-2 rounded-xl transition-all duration-300 ${
                          isActive 
                            ? 'bg-white/20' 
                            : 'bg-silver-mist/30 group-hover:bg-deep-teal/20'
                        }`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">{item.name}</div>
                          <div className={`text-xs transition-colors duration-300 ${
                            isActive ? 'text-white/70' : 'text-slate-gray'
                          }`}>
                            {item.description}
                          </div>
                        </div>
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-white rounded-full"
                          />
                        )}
                      </TransitionLink>
                    </motion.div>
                  );
                })}
              </div>

              {/* Enhanced Mobile Actions */}
              <div className="p-6 border-t border-silver-mist/30 space-y-4">
                {/* Search Bar 
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative"
                >
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-gray" />
                  <input
                    type="text"
                    placeholder="Search properties..."
                    className="w-full pl-10 pr-4 py-3 bg-silver-mist/30 border border-silver-mist rounded-xl font-montserrat text-sm focus:outline-none focus:border-deep-teal transition-colors"
                  />
                </motion.div> */}

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 py-3 bg-terracotta/10 text-terracotta font-montserrat font-semibold rounded-xl transition-all duration-300"
                  >
                    <HeartIcon className="w-4 h-4" />
                    <span>Favorites</span>
                  </motion.button>
                  
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 py-3 bg-gold-leaf/10 text-gold-leaf font-montserrat font-semibold rounded-xl transition-all duration-300"
                  >
                    <BellIcon className="w-4 h-4" />
                    <span>Alerts</span>
                  </motion.button>
                </div>

                {/* Main CTA 
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 10px 30px rgba(0, 95, 115, 0.3)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-deep-teal to-royal-navy text-white font-montserrat font-bold rounded-2xl shadow-lg transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">List Your Property</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </motion.button> */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;