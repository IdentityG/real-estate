'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/utils/propertyFilters';

gsap.registerPlugin(ScrollTrigger);

interface PropertyMapViewProps {
  properties: Property[];
  filteredProperties: Property[];
  onPropertySelect?: (property: Property) => void;
}

interface PropertyCoordinates {
  id: number;
  x: number;
  y: number;
}

const PropertyMapView: React.FC<PropertyMapViewProps> = ({ properties, filteredProperties }) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'satellite' | '3d'>('map');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredProperty, setHoveredProperty] = useState<Property | null>(null);
  const [mapCenter, setMapCenter] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);

  const mapRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const scaleTransform = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  // Enhanced Animation variants
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.15
      }
    }
  };

  const markerVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
      rotateY: -180,
      z: -100
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      z: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.8
      }
    },
    hover: {
      scale: 1.3,
      z: 50,
      rotateY: 15,
      transition: {
        duration: 0.3,
        ease: "backOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const infoCardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.7,
      y: 50,
      rotateX: -20,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.7,
      y: 50,
      rotateX: -20,
      filter: "blur(10px)",
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  const mapVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      filter: "blur(20px)"
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Enhanced GSAP animations
  useEffect(() => {
    if (mapRef.current && containerRef.current) {
      const tl = gsap.timeline();

      // Map entrance animation
      tl.fromTo(mapRef.current,
        {
          opacity: 0,
          scale: 0.8,
          rotationX: -15,
          transformOrigin: "center center",
          filter: "blur(20px)"
        },
        {
          opacity: 1,
          scale: 1,
          rotationX: 0,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power3.out"
        }
      );

      // Floating animation for decorative elements
      gsap.to(".floating-element", {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-5, 5)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5
      });

      // Parallax effect for background elements
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(".parallax-bg", {
            y: progress * 100,
            duration: 0.3,
            ease: "none"
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    // Enhanced marker animations with wave effect
    markersRef.current.forEach((marker, index) => {
      if (marker) {
        const tl = gsap.timeline();

        tl.fromTo(marker,
          {
            scale: 0,
            rotation: -360,
            y: -100,
            opacity: 0,
            filter: "blur(10px)"
          },
          {
            scale: 1,
            rotation: 0,
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.8,
            delay: index * 0.1,
            ease: "elastic.out(1, 0.5)"
          }
        );

        // Continuous pulse animation for active markers
        gsap.to(marker.querySelector('.marker-pulse'), {
          scale: 1.5,
          opacity: 0,
          duration: 2,
          repeat: -1,
          ease: "power2.out",
          delay: index * 0.2
        });
      }
    });
  }, [filteredProperties]);

  // Mouse interaction effects
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!mapRef.current) return;

    const rect = mapRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    gsap.to(".interactive-element", {
      x: (x - 0.5) * 20,
      y: (y - 0.5) * 20,
      duration: 0.5,
      ease: "power2.out"
    });
  }, []);

  // Generate property coordinates based on Addis Ababa locations
  const getPropertyCoordinates = (property: Property): PropertyCoordinates => {
    // Base coordinates for different areas in Addis Ababa
    const addisAbabaAreas = {
      'Bole': { baseX: 45, baseY: 35 },
      'Kazanchis': { baseX: 40, baseY: 40 },
      'Piassa': { baseX: 35, baseY: 45 },
      'Merkato': { baseX: 30, baseY: 50 },
      'CMC': { baseX: 50, baseY: 30 },
      'Gerji': { baseX: 55, baseY: 25 },
      'Sarbet': { baseX: 25, baseY: 55 },
      'Megenagna': { baseX: 60, baseY: 40 },
      'Lebu': { baseX: 20, baseY: 35 },
      'Ayat': { baseX: 65, baseY: 60 }
    };

    // Get area from property location or use random
    const locationKey = Object.keys(addisAbabaAreas).find(area =>
      property.location.toLowerCase().includes(area.toLowerCase())
    ) || Object.keys(addisAbabaAreas)[property.id % Object.keys(addisAbabaAreas).length];

    const baseCoords = addisAbabaAreas[locationKey as keyof typeof addisAbabaAreas];

    // Add some randomness for realistic distribution
    const randomOffsetX = (Math.sin(property.id * 2.5) * 8) + (Math.cos(property.id * 1.7) * 5);
    const randomOffsetY = (Math.cos(property.id * 3.1) * 8) + (Math.sin(property.id * 2.3) * 5);

    return {
      id: property.id,
      x: Math.max(5, Math.min(95, baseCoords.baseX + randomOffsetX)),
      y: Math.max(5, Math.min(95, baseCoords.baseY + randomOffsetY))
    };
  };

  const propertyCoordinates = filteredProperties.map(getPropertyCoordinates);

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);

    // Animate to property location
    const coord = getPropertyCoordinates(property);
    gsap.to(mapRef.current, {
      x: -(coord.x - 50) * 2,
      y: -(coord.y - 50) * 2,
      duration: 1,
      ease: "power2.inOut"
    });
  };

  const handlePropertyHover = (property: Property | null) => {
    setHoveredProperty(property);

    if (property) {
      // Highlight related markers
      gsap.to(`.marker-${property.id}`, {
        scale: 1.4,
        z: 100,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    } else {
      // Reset all markers
      gsap.to(".property-marker", {
        scale: 1,
        z: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleZoomIn = () => {
    const newZoom = Math.min(zoomLevel + 0.3, 3);
    setZoomLevel(newZoom);

    gsap.to(mapRef.current, {
      scale: newZoom,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoomLevel - 0.3, 0.5);
    setZoomLevel(newZoom);

    gsap.to(mapRef.current, {
      scale: newZoom,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleMapDrag = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setMapCenter(prev => ({
      x: Math.max(0, Math.min(100, prev.x - deltaX * 0.1)),
      y: Math.max(0, Math.min(100, prev.y - deltaY * 0.1))
    }));
  };

  const getPropertyTypeColor = (type: string) => {
    const colors = {
      'House': 'bg-deep-teal',
      'Apartment': 'bg-royal-navy',
      'Condo': 'bg-soft-sage',
      'Townhouse': 'bg-terracotta',
      'Villa': 'bg-gold-leaf',
      'Commercial': 'bg-warm-sand'
    };
    return colors[type as keyof typeof colors] || 'bg-deep-teal';
  };

  const getPropertyTypeIcon = (type: string) => {
    const icons = {
      'House': '🏠',
      'Apartment': '🏢',
      'Condo': '🏘️',
      'Townhouse': '🏡',
      'Villa': '🏰',
      'Commercial': '🏬'
    };
    return icons[type as keyof typeof icons] || '🏠';
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Addis Ababa Map...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.section
      ref={containerRef}
      className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-alabaster via-white to-silver-mist/30"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="floating-element absolute top-20 left-10 w-32 h-32 bg-deep-teal/10 rounded-full blur-2xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="floating-element absolute top-40 right-20 w-24 h-24 bg-royal-navy/10 rounded-full blur-2xl"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '1s' }}
        />
        <motion.div
          className="floating-element absolute bottom-32 left-1/4 w-40 h-40 bg-warm-sand/10 rounded-full blur-3xl"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
        />

        {/* Geometric Patterns */}
        <div className="parallax-bg absolute inset-0">
          <svg className="absolute top-10 left-1/3 w-20 h-20 text-deep-teal/5" viewBox="0 0 100 100">
            <polygon points="50,0 100,50 50,100 0,50" fill="currentColor" />
          </svg>
          <svg className="absolute bottom-20 right-1/4 w-16 h-16 text-royal-navy/5" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" fill="currentColor" />
          </svg>
        </div>
      </div>

      <motion.div
        className="container max-w-7xl mx-auto px-4 relative z-10"
        style={{ y: parallaxY, scale: scaleTransform }}
      >
        {/* Enhanced Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: "easeOut" }
            }
          }}
        >
          <motion.div
            className="inline-block mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="inline-block px-6 py-2 bg-deep-teal/10 backdrop-blur-sm rounded-full text-deep-teal text-sm font-montserrat font-semibold border border-deep-teal/20">
              Interactive Property Map
            </span>
          </motion.div>

          <motion.h2
            className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-royal-navy mb-6 leading-tight"
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 1, ease: "backOut" }
              }
            }}
          >
            Discover{' '}
            <span className="text-deep-teal relative">
              Addis Ababa
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-deep-teal to-warm-sand rounded-full" />
            </span>
          </motion.h2>

          <motion.p
            className="font-montserrat text-lg md:text-xl text-slate-gray max-w-4xl mx-auto leading-relaxed"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.3 }
              }
            }}
          >
            Navigate through Ethiopia's capital with our immersive 3D property explorer.
            Experience premium real estate opportunities with cutting-edge visualization technology.
          </motion.p>

          {/* Stats Counter */}
          <motion.div
            className="flex justify-center items-center gap-8 mt-8"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay: 0.5, staggerChildren: 0.1 }
              }
            }}
          >
            {[
              { label: 'Properties', value: filteredProperties.length },
              { label: 'Locations', value: new Set(filteredProperties.map(p => p.location)).size },
              { label: 'Property Types', value: new Set(filteredProperties.map(p => p.propertyType)).size }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                variants={{
                  hidden: { opacity: 0, scale: 0.5 },
                  visible: { opacity: 1, scale: 1 }
                }}
              >
                <div className="font-playfair text-2xl font-bold text-royal-navy">{stat.value}</div>
                <div className="font-montserrat text-sm text-slate-gray">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Map Container */}
        <motion.div
          className="relative group"
          variants={mapVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Enhanced Container */}
          <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-elegant border border-silver-mist/30">
            {/* Map Canvas */}
            <motion.div
              ref={mapRef}
              className="relative bg-gradient-to-br from-charcoal via-royal-navy to-midnight rounded-2xl overflow-hidden shadow-inner"
              style={{
                height: '700px',
                perspective: '1000px'
              }}
              onMouseMove={handleMouseMove}
              onMouseDown={(e) => {
                setIsDragging(true);
                setDragStart({ x: e.clientX, y: e.clientY });
              }}
              onMouseUp={() => setIsDragging(false)}
              onMouseMove={handleMapDrag}
            >
              {/* Enhanced Map Background with Multiple Layers */}
              <div className="absolute inset-0">
                {/* Base Map Layer */}
                <motion.div
                  className="absolute inset-0 transition-all duration-700 ease-out"
                  style={{
                    transform: `scale(${zoomLevel}) translate(${mapCenter.x - 50}px, ${mapCenter.y - 50}px)`,
                    transformOrigin: 'center center'
                  }}
                  animate={{
                    filter: viewMode === '3d' ? 'contrast(1.2) saturate(1.3)' : 'none'
                  }}
                >
                  {viewMode === 'map' && (
                    <div className="relative w-full h-full">
                      {/* Custom Map Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-deep-teal/20 via-transparent to-royal-navy/20" />
                      <Image
                        src="https://tile.openstreetmap.org/10/614/393.png"
                        alt="Addis Ababa Map"
                        fill
                        className="object-cover"
                        style={{
                          filter: 'sepia(15%) saturate(140%) brightness(110%) contrast(1.1)',
                          transform: 'scale(4)',
                          mixBlendMode: 'multiply'
                        }}
                      />
                    </div>
                  )}

                  {viewMode === 'satellite' && (
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-soft-sage/10 via-transparent to-deep-teal/10" />
                      <Image
                        src="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/10/393/614"
                        alt="Addis Ababa Satellite"
                        fill
                        className="object-cover"
                        style={{
                          transform: 'scale(4)',
                          filter: 'contrast(1.1) saturate(1.2)'
                        }}
                      />
                    </div>
                  )}

                  {viewMode === '3d' && (
                    <div className="relative w-full h-full">
                      {/* 3D Terrain Effect */}
                      <div className="absolute inset-0 bg-gradient-radial from-charcoal via-royal-navy to-midnight" />
                      <div className="absolute inset-0 opacity-60">
                        <div className="w-full h-full bg-gradient-to-br from-deep-teal/20 via-warm-sand/20 to-terracotta/20" />
                        {/* Terrain Grid */}
                        <svg className="absolute inset-0 w-full h-full opacity-30">
                          <defs>
                            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Heatmap Overlay */}
                <AnimatePresence>
                  {showHeatmap && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.7 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {propertyCoordinates.map((coord, index) => {
                        const property = filteredProperties.find(p => p.id === coord.id);
                        if (!property) return null;

                        const intensity = property.price / Math.max(...filteredProperties.map(p => p.price));
                        return (
                          <div
                            key={`heatmap-${property.id}`}
                            className="absolute rounded-full"
                            style={{
                              left: `${coord.x}%`,
                              top: `${coord.y}%`,
                              width: `${20 + intensity * 40}px`,
                              height: `${20 + intensity * 40}px`,
                              background: `radial-gradient(circle, rgba(255, ${255 - intensity * 100}, 0, ${intensity * 0.8}) 0%, transparent 70%)`,
                              transform: 'translate(-50%, -50%)',
                              filter: 'blur(10px)'
                            }}
                          />
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Interactive Grid Lines */}
                <div className="interactive-element absolute inset-0 opacity-20">
                  <svg className="w-full h-full">
                    <defs>
                      <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                        <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                      </linearGradient>
                    </defs>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <g key={i}>
                        <line
                          x1={`${i * 10}%`}
                          y1="0%"
                          x2={`${i * 10}%`}
                          y2="100%"
                          stroke="url(#gridGradient)"
                          strokeWidth="1"
                          opacity={0.3}
                        />
                        <line
                          x1="0%"
                          y1={`${i * 10}%`}
                          x2="100%"
                          y2={`${i * 10}%`}
                          stroke="url(#gridGradient)"
                          strokeWidth="1"
                          opacity={0.3}
                        />
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Enhanced 3D Property Markers */}
              <div className="absolute inset-0" style={{ perspective: '1000px' }}>
                {propertyCoordinates.map((coord, index) => {
                  const property = filteredProperties.find(p => p.id === coord.id);
                  if (!property) return null;

                  const isSelected = selectedProperty?.id === property.id;
                  const isHovered = hoveredProperty?.id === property.id;

                  return (
                    <motion.div
                      key={property.id}
                      ref={(el) => {
                        if (el) markersRef.current[index] = el;
                      }}
                      className={`property-marker marker-${property.id} absolute cursor-pointer group`}
                      style={{
                        left: `${coord.x}%`,
                        top: `${coord.y}%`,
                        transform: 'translate(-50%, -100%)',
                        zIndex: isSelected ? 50 : isHovered ? 30 : 10
                      }}
                      variants={markerVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => handlePropertySelect(property)}
                      onHoverStart={() => handlePropertyHover(property)}
                      onHoverEnd={() => handlePropertyHover(null)}
                    >
                      {/* Revolutionary 3D Marker Design */}
                      <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
                        {/* Dynamic Shadow */}
                        <motion.div
                          className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-black/30 rounded-full blur-md"
                          style={{
                            width: isSelected ? '24px' : isHovered ? '20px' : '16px',
                            height: isSelected ? '8px' : isHovered ? '6px' : '4px'
                          }}
                          animate={{
                            scale: isSelected ? 1.5 : isHovered ? 1.2 : 1,
                            opacity: isSelected ? 0.4 : isHovered ? 0.3 : 0.2
                          }}
                        />

                        {/* Main 3D Pin Structure */}
                        <motion.div
                          className={`relative ${getPropertyTypeColor(property.propertyType)} rounded-t-full shadow-2xl`}
                          style={{
                            width: isSelected ? '48px' : '36px',
                            height: isSelected ? '60px' : '45px',
                            transformStyle: 'preserve-3d'
                          }}
                          animate={{
                            rotateX: isHovered ? -10 : 0,
                            rotateY: isSelected ? 15 : 0,
                            scale: isSelected ? 1.3 : isHovered ? 1.1 : 1
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                          {/* Holographic Gradient Overlay */}
                          <div className="absolute inset-0 rounded-t-full bg-gradient-to-br from-white/40 via-transparent to-black/20" />
                          <div className="absolute inset-0 rounded-t-full bg-gradient-to-t from-transparent via-white/10 to-white/30" />

                          {/* Animated Ring */}
                          <motion.div
                            className="marker-pulse absolute inset-0 rounded-t-full border-2 border-white/50"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.5, 0, 0.5]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />

                          {/* Property Type Icon with Animation */}
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center text-white font-bold"
                            style={{ fontSize: isSelected ? '20px' : '16px' }}
                            animate={{
                              rotateY: isSelected ? [0, 360] : 0
                            }}
                            transition={{
                              duration: 2,
                              repeat: isSelected ? Infinity : 0,
                              ease: "linear"
                            }}
                          >
                            {getPropertyTypeIcon(property.propertyType)}
                          </motion.div>

                          {/* 3D Pin Point */}
                          <motion.div
                            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-current rounded-full shadow-lg"
                            style={{
                              width: isSelected ? '12px' : '8px',
                              height: isSelected ? '12px' : '8px'
                            }}
                            animate={{
                              y: isHovered ? -2 : 0
                            }}
                          />

                          {/* Glowing Edge Effect */}
                          <div className="absolute inset-0 rounded-t-full shadow-inner" style={{
                            boxShadow: `inset 0 0 20px rgba(255,255,255,0.3), 0 0 20px ${getPropertyTypeColor(property.propertyType).replace('bg-', 'rgba(').replace('-500', ', 0.5)')}`
                          }} />
                        </motion.div>

                        {/* Enhanced Featured Badge */}
                        {property.featured && (
                          <motion.div
                            className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                            style={{
                              width: isSelected ? '24px' : '20px',
                              height: isSelected ? '24px' : '20px'
                            }}
                            animate={{
                              rotate: [0, 360],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{
                              rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                            }}
                          >
                            <span className="text-white font-bold" style={{ fontSize: isSelected ? '12px' : '10px' }}>⭐</span>
                          </motion.div>
                        )}

                        {/* Advanced Price Display */}
                        <AnimatePresence>
                          {(isHovered || isSelected) && (
                            <motion.div
                              className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-2xl border border-white/50"
                              initial={{ opacity: 0, scale: 0.8, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.8, y: 10 }}
                              transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            >
                              <div className="text-center">
                                <div className="text-lg font-bold text-gray-900">
                                  {formatPrice(property.price)}
                                </div>
                                <div className="text-xs text-gray-600 font-medium">
                                  {property.propertyType}
                                </div>
                              </div>
                              {/* Arrow */}
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/95"></div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Property Stats Mini Display */}
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                            >
                              {property.bedrooms}BR • {property.bathrooms}BA • {property.sqft.toLocaleString()}ft²
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Connection Lines to Related Properties */}
                        {isSelected && (
                          <svg className="absolute inset-0 pointer-events-none" style={{ width: '200%', height: '200%', left: '-50%', top: '-50%' }}>
                            {filteredProperties
                              .filter(p => p.propertyType === property.propertyType && p.id !== property.id)
                              .slice(0, 3)
                              .map((relatedProperty, idx) => {
                                const relatedCoord = getPropertyCoordinates(relatedProperty);
                                return (
                                  <motion.line
                                    key={relatedProperty.id}
                                    x1="50%"
                                    y1="50%"
                                    x2={`${((relatedCoord.x - coord.x) * 0.5) + 50}%`}
                                    y2={`${((relatedCoord.y - coord.y) * 0.5) + 50}%`}
                                    stroke="rgba(255,255,255,0.3)"
                                    strokeWidth="1"
                                    strokeDasharray="5,5"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 0.6 }}
                                    transition={{ duration: 1, delay: idx * 0.2 }}
                                  />
                                );
                              })}
                          </svg>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Selected Property Info Card */}
              <AnimatePresence>
                {selectedProperty && (
                  <motion.div
                    className="absolute top-4 left-4 bg-white rounded-xl shadow-2xl p-6 max-w-sm z-10 border"
                    variants={infoCardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {/* Property Image */}
                    <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={selectedProperty.images[0]}
                        alt={selectedProperty.title}
                        fill
                        className="object-cover"
                      />
                      {/* Property Type Badge */}
                      <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-semibold text-white ${getPropertyTypeColor(selectedProperty.propertyType)}`}>
                        {selectedProperty.propertyType}
                      </div>
                      {/* Featured Badge */}
                      {selectedProperty.featured && (
                        <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                          Featured
                        </div>
                      )}
                    </div>

                    {/* Property Details */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                        {selectedProperty.title}
                      </h3>

                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{selectedProperty.location}</span>
                      </div>

                      <div className="text-2xl font-bold text-blue-600">
                        {formatPrice(selectedProperty.price)}
                      </div>

                      {/* Property Stats */}
                      <div className="grid grid-cols-3 gap-4 py-3 border-t border-gray-100">
                        <div className="text-center">
                          <div className="text-lg font-semibold text-gray-900">{selectedProperty.bedrooms}</div>
                          <div className="text-xs text-gray-500">Bedrooms</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-gray-900">{selectedProperty.bathrooms}</div>
                          <div className="text-xs text-gray-500">Bathrooms</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-gray-900">{selectedProperty.sqft.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">Sq Ft</div>
                        </div>
                      </div>

                      {/* Amenities Preview */}
                      {selectedProperty.amenities && selectedProperty.amenities.length > 0 && (
                        <div className="border-t border-gray-100 pt-3">
                          <div className="text-sm font-semibold text-gray-700 mb-2">Key Amenities</div>
                          <div className="flex flex-wrap gap-1">
                            {selectedProperty.amenities.slice(0, 3).map((amenity, index) => (
                              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                {amenity}
                              </span>
                            ))}
                            {selectedProperty.amenities.length > 3 && (
                              <span className="text-gray-500 text-xs px-2 py-1">
                                +{selectedProperty.amenities.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-3">
                        <Link
                          href={`/properties/${selectedProperty.id}`}
                          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-center text-sm font-semibold hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </Link>
                        <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">
                          Save
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Advanced Control Panel */}
              <div className="absolute top-6 right-6 flex flex-col gap-3">
                {/* View Mode Toggle */}
                <motion.div
                  className="bg-white/95 backdrop-blur-xl rounded-2xl p-2 border border-silver-mist/30 shadow-elegant"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex rounded-xl overflow-hidden">
                    {[
                      { mode: 'map', icon: '🗺️', label: 'Map' },
                      { mode: 'satellite', icon: '🛰️', label: 'Satellite' },
                      { mode: '3d', icon: '🏗️', label: '3D' }
                    ].map((option) => (
                      <motion.button
                        key={option.mode}
                        onClick={() => setViewMode(option.mode as any)}
                        className={`px-4 py-3 text-sm font-montserrat font-medium transition-all duration-300 ${viewMode === option.mode
                            ? 'bg-deep-teal text-white shadow-lg'
                            : 'text-slate-gray hover:text-deep-teal hover:bg-deep-teal/5'
                          }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-lg">{option.icon}</span>
                          <span className="text-xs">{option.label}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Enhanced Zoom Controls */}
                <motion.div
                  className="bg-white/95 backdrop-blur-xl rounded-2xl p-2 border border-silver-mist/30 shadow-elegant"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex flex-col gap-1">
                    <motion.button
                      onClick={handleZoomIn}
                      className="p-3 text-slate-gray hover:text-deep-teal hover:bg-deep-teal/5 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={zoomLevel >= 3}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </motion.button>

                    {/* Zoom Level Indicator */}
                    <div className="px-3 py-2 text-center">
                      <div className="font-montserrat text-xs text-slate-gray mb-1">Zoom</div>
                      <div className="w-full bg-silver-mist rounded-full h-2">
                        <motion.div
                          className="bg-deep-teal rounded-full h-2"
                          style={{ width: `${((zoomLevel - 0.5) / 2.5) * 100}%` }}
                          animate={{ width: `${((zoomLevel - 0.5) / 2.5) * 100}%` }}
                        />
                      </div>
                      <div className="font-montserrat text-xs text-deep-teal mt-1 font-semibold">{Math.round(zoomLevel * 100)}%</div>
                    </div>

                    <motion.button
                      onClick={handleZoomOut}
                      className="p-3 text-slate-gray hover:text-deep-teal hover:bg-deep-teal/5 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={zoomLevel <= 0.5}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>

                {/* Additional Controls */}
                <motion.div
                  className="bg-white/95 backdrop-blur-xl rounded-2xl p-2 border border-silver-mist/30 shadow-elegant"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex flex-col gap-2">
                    {/* Heatmap Toggle */}
                    <motion.button
                      onClick={() => setShowHeatmap(!showHeatmap)}
                      className={`p-3 rounded-xl transition-all duration-200 ${showHeatmap
                          ? 'bg-terracotta text-white'
                          : 'text-slate-gray hover:text-terracotta hover:bg-terracotta/5'
                        }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title="Toggle Price Heatmap"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </motion.button>

                    {/* Reset View */}
                    <motion.button
                      onClick={() => {
                        setZoomLevel(1);
                        setMapCenter({ x: 50, y: 50 });
                        setSelectedProperty(null);
                      }}
                      className="p-3 text-slate-gray hover:text-royal-navy hover:bg-royal-navy/5 rounded-xl transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title="Reset View"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </motion.button>

                    {/* Fullscreen Toggle */}
                    <motion.button
                      className="p-3 text-slate-gray hover:text-gold-leaf hover:bg-gold-leaf/5 rounded-xl transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title="Fullscreen"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              </div>

              {/* Close Selected Property */}
              <AnimatePresence>
                {selectedProperty && (
                  <motion.button
                    onClick={() => setSelectedProperty(null)}
                    className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-elegant hover:bg-deep-teal hover:text-white transition-all duration-200 border border-silver-mist/30 z-50"
                    initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-5 h-5 text-slate-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Enhanced Map Attribution */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg text-xs text-slate-gray border border-silver-mist/30">
                <div className="flex items-center gap-2 font-montserrat">
                  <span>© OpenStreetMap contributors</span>
                  <span className="text-slate-gray/40">|</span>
                  <span className="text-deep-teal font-semibold">Powered by Mekiya</span>
                </div>
              </div>

              {/* Loading Overlay */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-center">
                      <motion.div
                        className="w-16 h-16 border-4 border-silver-mist border-t-deep-teal rounded-full mx-auto mb-4"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.p
                        className="text-royal-navy text-lg font-playfair font-semibold"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Loading Interactive Map...
                      </motion.p>
                      <p className="text-slate-gray font-montserrat text-sm mt-2">Preparing 3D visualization</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>

        {/* Revolutionary Interactive Legend */}
        <motion.div
          className="mt-12 bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-silver-mist/30 shadow-elegant"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, delay: 0.8 }
            }
          }}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-playfair text-2xl font-bold text-royal-navy">Interactive Legend</h3>
            <motion.div
              className="flex items-center gap-2 text-slate-gray"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="font-montserrat text-sm">Live Data</span>
            </motion.div>
          </div>

          {/* Property Types Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            {[
              { type: 'House', icon: '🏠', color: 'bg-deep-teal', count: filteredProperties.filter(p => p.propertyType === 'House').length },
              { type: 'Apartment', icon: '🏢', color: 'bg-royal-navy', count: filteredProperties.filter(p => p.propertyType === 'Apartment').length },
              { type: 'Condo', icon: '🏘️', color: 'bg-soft-sage', count: filteredProperties.filter(p => p.propertyType === 'Condo').length },
              { type: 'Townhouse', icon: '🏡', color: 'bg-terracotta', count: filteredProperties.filter(p => p.propertyType === 'Townhouse').length },
              { type: 'Villa', icon: '🏰', color: 'bg-gold-leaf', count: filteredProperties.filter(p => p.propertyType === 'Villa').length },
              { type: 'Commercial', icon: '🏬', color: 'bg-warm-sand', count: filteredProperties.filter(p => p.propertyType === 'Commercial').length }
            ].map((item, index) => (
              <motion.div
                key={item.type}
                className="group cursor-pointer"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { delay: index * 0.1 }
                  }
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-silver-mist/30 hover:border-deep-teal/40 hover:shadow-elegant transition-all duration-300">
                  <div className="flex flex-col items-center space-y-3">
                    <motion.div
                      className={`w-12 h-15 ${item.color} rounded-t-full flex items-center justify-center text-white text-lg shadow-lg relative`}
                      whileHover={{ rotateY: 15, scale: 1.1 }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {item.icon}
                      <div className="absolute inset-0 rounded-t-full bg-gradient-to-br from-white/30 to-transparent"></div>
                    </motion.div>
                    <div className="text-center">
                      <div className="text-charcoal font-montserrat font-semibold text-sm">{item.type}</div>
                      <motion.div
                        className="text-slate-gray font-montserrat text-xs mt-1"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      >
                        {item.count} available
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Advanced Legend Features */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Interactive Elements */}
            <div className="space-y-4">
              <h4 className="font-playfair text-lg font-semibold text-royal-navy mb-4">Interactive Elements</h4>
              <div className="space-y-3">
                {[
                  { icon: '⭐', label: 'Featured Property', desc: 'Premium listings with special offers' },
                  { icon: '🔥', label: 'Hot Property', desc: 'High demand, limited availability' },
                  { icon: '💎', label: 'Luxury Property', desc: 'Premium amenities and location' },
                  { icon: '🆕', label: 'New Listing', desc: 'Recently added to market' }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="flex items-center space-x-4 bg-warm-sand/10 rounded-xl p-3 hover:bg-warm-sand/20 transition-all duration-200"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { delay: 1 + index * 0.1 }
                      }
                    }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-gold-leaf to-terracotta rounded-full flex items-center justify-center text-sm">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-charcoal font-montserrat font-medium text-sm">{item.label}</div>
                      <div className="text-slate-gray font-montserrat text-xs">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Map Controls Guide */}
            <div className="space-y-4">
              <h4 className="font-playfair text-lg font-semibold text-royal-navy mb-4">Map Controls</h4>
              <div className="space-y-3">
                {[
                  { icon: '🖱️', label: 'Click & Drag', desc: 'Pan around the map' },
                  { icon: '🔍', label: 'Zoom Controls', desc: 'Zoom in/out for detail view' },
                  { icon: '🎯', label: 'Marker Click', desc: 'View property details' },
                  { icon: '🌡️', label: 'Heatmap Toggle', desc: 'Show price density' }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="flex items-center space-x-4 bg-deep-teal/10 rounded-xl p-3 hover:bg-deep-teal/20 transition-all duration-200"
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { delay: 1.2 + index * 0.1 }
                      }
                    }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-deep-teal to-royal-navy rounded-full flex items-center justify-center text-sm">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-charcoal font-montserrat font-medium text-sm">{item.label}</div>
                      <div className="text-slate-gray font-montserrat text-xs">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <motion.div
            className="mt-8 pt-8 border-t border-white/20"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: 1.5 }
              }
            }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Properties', value: filteredProperties.length, icon: '🏘️' },
                { label: 'Avg Price', value: `$${Math.round(filteredProperties.reduce((sum, p) => sum + p.price, 0) / filteredProperties.length / 1000)}K`, icon: '💰' },
                { label: 'Featured', value: filteredProperties.filter(p => p.featured).length, icon: '⭐' },
                { label: 'Locations', value: new Set(filteredProperties.map(p => p.location)).size, icon: '📍' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center bg-silver-mist/20 rounded-xl p-4 border border-silver-mist/30"
                  whileHover={{ scale: 1.05, y: -2 }}
                  animate={{
                    boxShadow: [
                      '0 0 0 rgba(0, 95, 115, 0.1)',
                      '0 0 20px rgba(0, 95, 115, 0.2)',
                      '0 0 0 rgba(0, 95, 115, 0.1)'
                    ]
                  }}
                  transition={{
                    boxShadow: { duration: 3, repeat: Infinity, delay: index * 0.5 }
                  }}
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="font-playfair text-2xl font-bold text-royal-navy">{stat.value}</div>
                  <div className="font-montserrat text-sm text-slate-gray">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default PropertyMapView;