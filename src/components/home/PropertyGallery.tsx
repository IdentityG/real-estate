'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Gallery item interface
interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  title: string;
  location: string;
  category: string;
  aspectRatio: 'tall' | 'wide' | 'square';
}

// Filter categories
const filterCategories = [
  { id: 'all', label: 'All Properties' },
  { id: 'interiors', label: 'Interiors' },
  { id: 'exteriors', label: 'Exteriors' },
  { id: 'luxury', label: 'Luxury Villas' },
  { id: 'apartments', label: 'Apartments' }
];

// Gallery data with existing images
const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: '/images/estate1.jpg',
    alt: 'Modern Villa Exterior',
    title: 'Modern Villa',
    location: 'Bole, Addis Ababa',
    category: 'exteriors',
    aspectRatio: 'tall'
  },
  {
    id: 2,
    src: '/images/estate2.jpg',
    alt: 'Luxury Apartment Interior',
    title: 'Luxury Apartment',
    location: 'Kazanchis, Addis Ababa',
    category: 'interiors',
    aspectRatio: 'wide'
  },
  {
    id: 3,
    src: '/images/estate3.jpg',
    alt: 'Contemporary Home',
    title: 'Contemporary Home',
    location: 'CMC, Addis Ababa',
    category: 'luxury',
    aspectRatio: 'square'
  },
  {
    id: 4,
    src: '/images/estate4.jpg',
    alt: 'Executive Apartment',
    title: 'Executive Apartment',
    location: 'Sarbet, Addis Ababa',
    category: 'apartments',
    aspectRatio: 'tall'
  },
  {
    id: 5,
    src: '/images/estate5.jpg',
    alt: 'Premium Villa',
    title: 'Premium Villa',
    location: 'Old Airport, Addis Ababa',
    category: 'luxury',
    aspectRatio: 'wide'
  },
  {
    id: 6,
    src: '/images/estate1.jpg',
    alt: 'Garden View Apartment',
    title: 'Garden View Apartment',
    location: 'Megenagna, Addis Ababa',
    category: 'apartments',
    aspectRatio: 'square'
  },
  {
    id: 7,
    src: '/images/estate2.jpg',
    alt: 'Penthouse Interior',
    title: 'Penthouse Suite',
    location: 'Bole, Addis Ababa',
    category: 'interiors',
    aspectRatio: 'tall'
  },
  {
    id: 8,
    src: '/images/estate3.jpg',
    alt: 'Villa Exterior',
    title: 'Villa Exterior',
    location: 'Ayat, Addis Ababa',
    category: 'exteriors',
    aspectRatio: 'wide'
  }
];

const PropertyGallery: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredItems, setFilteredItems] = useState(galleryItems);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Filter items based on active filter
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredItems(galleryItems);
    } else {
      setFilteredItems(galleryItems.filter(item => item.category === activeFilter));
    }
  }, [activeFilter]);

  // GSAP Animations
  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const filters = filtersRef.current;
    const grid = gridRef.current;
    const items = itemsRef.current;

    if (!section || !title || !grid) return;

    // Create main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate title
    tl.fromTo(
      title,
      {
        y: 60,
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out'
      }
    );

    // Animate filters
    if (filters) {
      tl.fromTo(
        filters.children,
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out'
        },
        '-=0.5'
      );
    }

    // Animate gallery items with stagger and clip-path reveal
    if (items.length > 0) {
      tl.fromTo(
        items,
        {
          clipPath: 'inset(100% 0% 0% 0%)',
          y: 100,
          opacity: 0,
          scale: 0.8
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: {
            amount: 1.5,
            from: 'random'
          },
          ease: 'power3.out'
        },
        '-=0.3'
      );
    }

    // Parallax effect for individual items
    items.forEach((item, index) => {
      if (item) {
        gsap.to(item, {
          y: -50,
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          }
        });
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [filteredItems]);

  // Add item to refs
  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current[index] = el;
    }
  };

  // Handle filter change with GSAP animation
  const handleFilterChange = (filterId: string) => {
    if (filterId === activeFilter) return;

    // Animate out current items
    gsap.to(itemsRef.current, {
      opacity: 0,
      scale: 0.8,
      y: 30,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.in',
      onComplete: () => {
        setActiveFilter(filterId);
        // Animate in new items will be handled by useEffect
      }
    });
  };

  // Open lightbox
  const openLightbox = (item: GalleryItem) => {
    const index = filteredItems.findIndex(i => i.id === item.id);
    setCurrentImageIndex(index);
    setSelectedImage(item);
  };

  // Navigate lightbox
  const navigateLightbox = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' 
      ? (currentImageIndex + 1) % filteredItems.length
      : (currentImageIndex - 1 + filteredItems.length) % filteredItems.length;
    
    setCurrentImageIndex(newIndex);
    setSelectedImage(filteredItems[newIndex]);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-br from-alabaster via-white to-warm-sand/10 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-deep-teal/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-warm-sand/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-soft-sage/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-royal-navy mb-6">
            Property{' '}
            <span className="text-deep-teal relative">
              Gallery
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-deep-teal to-warm-sand rounded-full" />
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-gray max-w-3xl mx-auto font-montserrat leading-relaxed">
            Discover Our Most Stunning Listings
          </p>
        </div>

        {/* Filter Buttons */}
        <div ref={filtersRef} className="flex flex-wrap justify-center gap-4 mb-12 lg:mb-16">
          {filterCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleFilterChange(category.id)}
              className={`px-6 py-3 rounded-full font-montserrat font-medium transition-all duration-300 ${
                activeFilter === category.id
                  ? 'bg-gradient-to-r from-deep-teal to-royal-navy text-white shadow-lg'
                  : 'bg-white/80 text-slate-gray hover:bg-deep-teal/10 hover:text-deep-teal border border-silver-mist/50'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => addToRefs(el, index)}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl shadow-elegant hover:shadow-2xl transition-all duration-500 ${
                item.aspectRatio === 'tall' ? 'md:row-span-2' :
                item.aspectRatio === 'wide' ? 'md:col-span-2' : ''
              }`}
              onClick={() => openLightbox(item)}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={600}
                  height={item.aspectRatio === 'tall' ? 800 : item.aspectRatio === 'wide' ? 300 : 400}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-royal-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* View Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <EyeIcon className="w-5 h-5 text-white" />
                </div>
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xl font-playfair font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm font-montserrat opacity-90">{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16 lg:mt-20">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(0, 95, 115, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-deep-teal to-royal-navy text-white font-montserrat font-semibold px-8 py-4 rounded-full shadow-elegant hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <span className="relative z-10">View Full Gallery</span>
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-200"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>

              {/* Navigation buttons */}
              <button
                onClick={() => navigateLightbox('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-200"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              
              <button
                onClick={() => navigateLightbox('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-200"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>

              {/* Image */}
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              
              {/* Image info */}
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-playfair font-bold text-royal-navy mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-slate-gray font-montserrat">
                  {selectedImage.location}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PropertyGallery;