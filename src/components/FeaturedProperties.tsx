'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
import { MdOutlineBed, MdOutlineShower} from "react-icons/md";

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Property data interface
interface Property {
  id: number;
  title: string;
  price: string;
  location: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  type: 'For Sale' | 'For Rent' | 'Land' | 'Commercial';
  featured?: boolean;
}

// Mock property data
const mockProperties: Property[] = [
  {
    id: 1,
    title: 'Modern Villa',
    price: '$850,000',
    location: 'Addis Ababa, Bole',
    image: '/images/estate1.jpg',
    bedrooms: 4,
    bathrooms: 3,
    type: 'For Sale',
    featured: true
  },
  {
    id: 2,
    title: 'Luxury Apartment',
    price: '$2,500/month',
    location: 'Addis Ababa, Kazanchis',
    image: '/images/estate2.jpg',
    bedrooms: 2,
    bathrooms: 2,
    type: 'For Rent',
    featured: true
  },
  {
    id: 3,
    title: 'Commercial Plot',
    price: '$1,200,000',
    location: 'Addis Ababa, CMC',
    image: '/images/estate3.jpg',
    bedrooms: 5,
    bathrooms: 3,
    type: 'Land',
    featured: true
  },
  {
    id: 4,
    title: 'Office Complex',
    price: '$2,800,000',
    location: 'Addis Ababa, Megenagna',
    image: '/images/estate4.jpg',
    bedrooms: 14,
    bathrooms: 8,
    type: 'Commercial',
    featured: true
  },
  {
    id: 5,
    title: 'Family House',
    price: '$650,000',
    location: 'Addis Ababa, Gerji',
    image: '/images/estate5.jpg',
    bedrooms: 3,
    bathrooms: 2,
    type: 'For Sale',
    featured: true
  },
  {
    id: 6,
    title: 'Studio Apartment',
    price: '$1,200/month',
    location: 'Addis Ababa, Piassa',
    image: '/images/estate1.jpg',
    bedrooms: 1,
    bathrooms: 1,
    type: 'For Rent',
    featured: true
  }
];

const FeaturedProperties = () => {
  // State management
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties);
  const [isMounted, setIsMounted] = useState(false);
  
  // Refs for GSAP animations
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Filter tabs
  const filterTabs = ['All', 'For Sale', 'For Rent', 'Land', 'Commercial'];

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // GSAP Scroll Animations
  useEffect(() => {
    if (!isMounted) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards stagger animation
      gsap.fromTo('.property-card',
        {
          opacity: 0,
          y: 60,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isMounted, filteredProperties]);

  // Filter properties
  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProperties(mockProperties);
    } else {
      setFilteredProperties(mockProperties.filter(property => property.type === activeFilter));
    }
  }, [activeFilter]);

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  const tabVariants = {
    inactive: {
      backgroundColor: 'transparent',
      color: '#6C757D'
    },
    active: {
      backgroundColor: '#005F73',
      color: '#FFFFFF'
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-alabaster relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-alabaster to-silver-mist opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-royal-navy mb-6">
            Featured Properties
          </h2>
          <p className="font-montserrat text-lg text-slate-gray max-w-2xl mx-auto leading-relaxed">
            Discover our handpicked selection of premium properties in the most sought-after locations across Addis Ababa.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filterTabs.map((tab, index) => (
            <motion.button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              variants={tabVariants}
              animate={activeFilter === tab ? 'active' : 'inactive'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`relative px-6 py-3 rounded-full font-montserrat font-medium text-sm transition-all duration-300 border-2 ${
                activeFilter === tab
                  ? 'bg-deep-teal text-white border-deep-teal shadow-lg'
                  : 'bg-transparent text-slate-gray border-silver-mist hover:border-deep-teal hover:text-deep-teal'
              }`}
            >
              {tab}
              {/* Active tab underline */}
              {activeFilter === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-deep-teal rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Property Cards Grid */}
        <motion.div
          ref={cardsRef}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16"
        >
          <AnimatePresence mode="wait">
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                variants={cardVariants}
                layout
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="property-card bg-white rounded-2xl shadow-elegant overflow-hidden hover:shadow-2xl transition-all duration-500 group"
              >
                {/* Property Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Property Type Badge */}
                  <div className="absolute top-4 left-4 bg-deep-teal text-white px-3 py-1 rounded-full text-xs font-montserrat font-medium">
                    {property.type}
                  </div>
                  {/* Favorite Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-gray hover:text-terracotta transition-colors duration-300"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                </div>

                {/* Property Details */}
                <div className="p-6">
                  {/* Title and Price */}
                  <div className="mb-4">
                    <h3 className="font-playfair font-semibold text-xl text-charcoal mb-2 group-hover:text-deep-teal transition-colors duration-300">
                      {property.title}
                    </h3>
                    <p className="font-montserrat font-bold text-2xl text-deep-teal">
                      {property.price}
                    </p>
                  </div>

                  {/* Location */}
                  <div className="flex items-center text-slate-gray mb-4">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-montserrat text-sm">{property.location}</span>
                  </div>

                  {/* Property Features */}
                  {(property.bedrooms > 0 || property.bathrooms > 0) && (
                    <div className="flex items-center gap-4 text-slate-gray border-t border-silver-mist pt-4">
                      {property.bedrooms > 0 && (
                        <div className="flex items-center">
                        <label className="flex items-center text-sm font-montserrat">
                         <MdOutlineBed className="w-4 h-4 mr-2 text-deep-teal" />
                         {property.bedrooms} bed
                       </label>
                        </div>
                        
                      )}
                      {property.bathrooms > 0 && (
                        <div className="flex items-center">
                         <label className="flex items-center text-sm font-montserrat">
                         <MdOutlineShower className="w-4 h-4 mr-2 text-deep-teal" />
                         {property.bathrooms} bath
                       </label>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-teal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/properties">
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 10px 30px rgba(0, 95, 115, 0.3)'
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-deep-teal to-royal-navy text-white font-montserrat font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <span className="flex items-center">
                View All Properties
                <motion.svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    ease: 'easeInOut' 
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-warm-sand/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-soft-sage/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
    </section>
  );
};

export default FeaturedProperties;