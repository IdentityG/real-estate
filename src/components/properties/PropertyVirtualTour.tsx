'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import Image from 'next/image';
import {
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ArrowsPointingOutIcon,
  XMarkIcon,
  CameraIcon,
  MapIcon,
  HomeIcon,
  EyeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

interface VirtualTourProps {
  propertyId: number;
  propertyTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

interface TourStop {
  id: string;
  title: string;
  description: string;
  image: string;
  hotspots: {
    x: number;
    y: number;
    targetId: string;
    label: string;
  }[];
}

const PropertyVirtualTour: React.FC<VirtualTourProps> = ({
  propertyId,
  propertyTitle,
  isOpen,
  onClose
}) => {
  const [currentStop, setCurrentStop] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHotspots, setShowHotspots] = useState(true);
  const [loading, setLoading] = useState(true);
  
  const tourRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Mock tour data - in real app, this would come from API
  const tourStops: TourStop[] = [
    {
      id: 'entrance',
      title: 'Grand Entrance',
      description: 'Welcome to this stunning property featuring a grand entrance with marble flooring and crystal chandelier.',
      image: '/images/estate1.jpg',
      hotspots: [
        { x: 30, y: 60, targetId: 'living-room', label: 'Living Room' },
        { x: 70, y: 40, targetId: 'staircase', label: 'Upper Floor' }
      ]
    },
    {
      id: 'living-room',
      title: 'Spacious Living Room',
      description: 'Open-concept living space with floor-to-ceiling windows and modern fireplace.',
      image: '/images/estate2.jpg',
      hotspots: [
        { x: 20, y: 50, targetId: 'kitchen', label: 'Kitchen' },
        { x: 80, y: 30, targetId: 'dining', label: 'Dining Area' },
        { x: 50, y: 80, targetId: 'entrance', label: 'Back to Entrance' }
      ]
    },
    {
      id: 'kitchen',
      title: 'Gourmet Kitchen',
      description: 'State-of-the-art kitchen with premium appliances and granite countertops.',
      image: '/images/estate3.jpg',
      hotspots: [
        { x: 60, y: 40, targetId: 'dining', label: 'Dining Room' },
        { x: 40, y: 70, targetId: 'living-room', label: 'Living Room' }
      ]
    },
    {
      id: 'dining',
      title: 'Elegant Dining Room',
      description: 'Formal dining area perfect for entertaining guests.',
      image: '/images/estate4.jpg',
      hotspots: [
        { x: 30, y: 50, targetId: 'kitchen', label: 'Kitchen' },
        { x: 70, y: 60, targetId: 'living-room', label: 'Living Room' }
      ]
    },
    {
      id: 'staircase',
      title: 'Elegant Staircase',
      description: 'Beautiful curved staircase leading to the upper level.',
      image: '/images/estate5.jpg',
      hotspots: [
        { x: 50, y: 80, targetId: 'entrance', label: 'Ground Floor' },
        { x: 60, y: 20, targetId: 'master-bedroom', label: 'Master Bedroom' }
      ]
    },
    {
      id: 'master-bedroom',
      title: 'Master Bedroom Suite',
      description: 'Luxurious master bedroom with walk-in closet and en-suite bathroom.',
      image: '/images/estate1.jpg',
      hotspots: [
        { x: 20, y: 60, targetId: 'master-bath', label: 'Master Bath' },
        { x: 80, y: 70, targetId: 'staircase', label: 'Downstairs' }
      ]
    },
    {
      id: 'master-bath',
      title: 'Master Bathroom',
      description: 'Spa-like master bathroom with soaking tub and separate shower.',
      image: '/images/estate2.jpg',
      hotspots: [
        { x: 70, y: 50, targetId: 'master-bedroom', label: 'Master Bedroom' }
      ]
    }
  ];

  // GSAP Animations
  useEffect(() => {
    if (!isOpen) return;

    const ctx = gsap.context(() => {
      // Tour entrance animation
      gsap.fromTo(tourRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }
      );

      // Hotspots pulse animation
      gsap.to('.hotspot-pulse', {
        scale: 1.2,
        opacity: 0.7,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
        stagger: 0.3
      });
    }, tourRef);

    return () => ctx.revert();
  }, [isOpen, currentStop]);

  // Auto-advance tour
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStop(prev => (prev + 1) % tourStops.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, tourStops.length]);

  // Simulate loading
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleHotspotClick = (targetId: string) => {
    const targetIndex = tourStops.findIndex(stop => stop.id === targetId);
    if (targetIndex !== -1) {
      setCurrentStop(targetIndex);
    }
  };

  const nextStop = () => {
    setCurrentStop(prev => (prev + 1) % tourStops.length);
  };

  const prevStop = () => {
    setCurrentStop(prev => (prev - 1 + tourStops.length) % tourStops.length);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      tourRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (!isOpen) return null;

  const currentTourStop = tourStops[currentStop];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Loading Screen */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-midnight flex items-center justify-center z-60"
            >
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-deep-teal border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <h3 className="text-white font-playfair text-xl font-semibold mb-2">
                  Loading Virtual Tour
                </h3>
                <p className="text-warm-sand/80 font-montserrat">
                  Preparing immersive experience...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Tour Interface */}
        <div ref={tourRef} className="relative w-full h-full">
          {/* Tour Image */}
          <div ref={imageRef} className="relative w-full h-full">
            <Image
              src={currentTourStop.image}
              alt={currentTourStop.title}
              fill
              className="object-cover"
              priority
            />
            
            {/* Hotspots */}
            <AnimatePresence>
              {showHotspots && currentTourStop.hotspots.map((hotspot, index) => (
                <motion.button
                  key={`${currentTourStop.id}-${index}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: index * 0.2 }}
                  onClick={() => handleHotspotClick(hotspot.targetId)}
                  className="absolute group"
                  style={{
                    left: `${hotspot.x}%`,
                    top: `${hotspot.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  {/* Hotspot Pulse */}
                  <div className="hotspot-pulse absolute inset-0 w-8 h-8 bg-deep-teal rounded-full opacity-30" />
                  
                  {/* Hotspot Dot */}
                  <div className="relative w-8 h-8 bg-deep-teal rounded-full flex items-center justify-center border-2 border-white shadow-lg hover:scale-110 transition-transform duration-200">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  
                  {/* Hotspot Label */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-midnight/90 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-montserrat whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {hotspot.label}
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {/* Top Controls */}
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-white font-playfair text-2xl font-bold mb-1">
                  {propertyTitle}
                </h2>
                <p className="text-warm-sand/90 font-montserrat text-sm">
                  Virtual Tour • {currentStop + 1} of {tourStops.length}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Play/Pause */}
                <motion.button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isPlaying ? (
                    <PauseIcon className="w-6 h-6" />
                  ) : (
                    <PlayIcon className="w-6 h-6 ml-1" />
                  )}
                </motion.button>

                {/* Mute */}
                <motion.button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isMuted ? (
                    <SpeakerXMarkIcon className="w-6 h-6" />
                  ) : (
                    <SpeakerWaveIcon className="w-6 h-6" />
                  )}
                </motion.button>

                {/* Fullscreen */}
                <motion.button
                  onClick={toggleFullscreen}
                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowsPointingOutIcon className="w-6 h-6" />
                </motion.button>

                {/* Close */}
                <motion.button
                  onClick={onClose}
                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <XMarkIcon className="w-6 h-6" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
            <motion.button
              onClick={prevStop}
              className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeftIcon className="w-8 h-8" />
            </motion.button>
          </div>

          <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
            <motion.button
              onClick={nextStop}
              className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRightIcon className="w-8 h-8" />
            </motion.button>
          </div>

          {/* Bottom Info Panel */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-white font-playfair text-xl font-semibold mb-2">
                    {currentTourStop.title}
                  </h3>
                  <p className="text-warm-sand/90 font-montserrat leading-relaxed">
                    {currentTourStop.description}
                  </p>
                </div>
                
                <div className="flex items-center gap-3 ml-6">
                  {/* Toggle Hotspots */}
                  <motion.button
                    onClick={() => setShowHotspots(!showHotspots)}
                    className={`w-12 h-12 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors duration-200 ${
                      showHotspots ? 'bg-deep-teal text-white' : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <EyeIcon className="w-6 h-6" />
                  </motion.button>

                  {/* Info */}
                  <motion.button
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <InformationCircleIcon className="w-6 h-6" />
                  </motion.button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-white/20 rounded-full h-2 mb-4">
                <motion.div
                  className="bg-gradient-to-r from-deep-teal to-warm-sand h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStop + 1) / tourStops.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Tour Stops Navigation */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {tourStops.map((stop, index) => (
                  <motion.button
                    key={stop.id}
                    onClick={() => setCurrentStop(index)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-montserrat font-medium transition-all duration-200 ${
                      index === currentStop
                        ? 'bg-deep-teal text-white'
                        : 'bg-white/20 text-white/80 hover:bg-white/30'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {stop.title}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Tour Instructions (shown on first load) */}
          <AnimatePresence>
            {currentStop === 0 && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 1 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-midnight/90 backdrop-blur-sm rounded-2xl p-6 text-center max-w-md"
              >
                <div className="w-16 h-16 bg-deep-teal rounded-full flex items-center justify-center mx-auto mb-4">
                  <CameraIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-playfair text-xl font-semibold mb-2">
                  Welcome to the Virtual Tour
                </h3>
                <p className="text-warm-sand/90 font-montserrat text-sm mb-4">
                  Click on the blue hotspots to navigate between rooms, or use the controls to explore automatically.
                </p>
                <motion.button
                  onClick={() => setIsPlaying(true)}
                  className="bg-deep-teal text-white px-6 py-3 rounded-xl font-montserrat font-semibold hover:bg-deep-teal/90 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Auto Tour
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PropertyVirtualTour;