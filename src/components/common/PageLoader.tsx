'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';

interface PageLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
  loadingText?: string;
  showProgress?: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({
  isLoading,
  onComplete,
  loadingText = "Mekiya Real Estate",
  showProgress = true
}) => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, delay: number}>>([]);
  
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const phases = [
    "Initializing...",
    "Loading Properties...",
    "Preparing Experience...",
    "Almost Ready..."
  ];

  // Generate particles
  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3
    }));
    setParticles(newParticles);
  }, []);

  // Progress simulation
  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15 + 5;
        
        // Update phase based on progress
        if (newProgress > 25 && currentPhase === 0) setCurrentPhase(1);
        else if (newProgress > 50 && currentPhase === 1) setCurrentPhase(2);
        else if (newProgress > 75 && currentPhase === 2) setCurrentPhase(3);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete?.(), 800);
          return 100;
        }
        
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isLoading, currentPhase, onComplete]);

  // GSAP Animations
  useEffect(() => {
    if (!isLoading) return;

    const ctx = gsap.context(() => {
      // Logo entrance animation
      if (logoRef.current) {
        gsap.fromTo(logoRef.current,
          { 
            scale: 0,
            rotation: -180,
            opacity: 0
          },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 1.5,
            ease: "elastic.out(1, 0.5)"
          }
        );

        // Continuous logo pulse
        gsap.to(logoRef.current, {
          scale: 1.1,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      // Particle animations
      if (particlesRef.current) {
        const particleElements = particlesRef.current.children;
        
        Array.from(particleElements).forEach((particle, index) => {
          gsap.to(particle, {
            y: -window.innerHeight - 100,
            rotation: 360,
            duration: 8 + Math.random() * 4,
            repeat: -1,
            ease: "none",
            delay: Math.random() * 3
          });
        });
      }

      // Background gradient animation
      gsap.to('.loader-gradient', {
        backgroundPosition: '200% 200%',
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

    }, loaderRef);

    return () => ctx.revert();
  }, [isLoading]);

  // Exit animation
  useEffect(() => {
    if (!isLoading && progress === 100) {
      controls.start({
        scale: 0,
        opacity: 0,
        rotateY: 180,
        transition: {
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      });
    }
  }, [isLoading, progress, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const logoVariants = {
    animate: {
      rotateY: [0, 360],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          ref={loaderRef}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ perspective: '1000px' }}
        >
          {/* Animated Background */}
          <div className="absolute inset-0">
            {/* Morphing Gradient */}
            <div 
              className="loader-gradient absolute inset-0"
              style={{
                background: `
                  radial-gradient(circle at 20% 80%, rgba(0, 95, 115, 0.9) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(25, 55, 109, 0.8) 0%, transparent 50%),
                  radial-gradient(circle at 40% 40%, rgba(139, 162, 142, 0.7) 0%, transparent 50%),
                  linear-gradient(135deg, #005F73 0%, #193B6D 25%, #8BA28E 50%, #D4A574 75%, #C67B5C 100%)
                `,
                backgroundSize: '400% 400%'
              }}
            />

            {/* Overlay Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-deep-teal/20 to-royal-navy/20" />
              <svg className="absolute inset-0 w-full h-full">
                <defs>
                  <pattern id="loaderGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#loaderGrid)" />
              </svg>
            </div>
          </div>

          {/* Floating Particles */}
          <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute bg-white/30 rounded-full"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`
                }}
                animate={{
                  y: [-20, -window.innerHeight - 100],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 10 + Math.random() * 5,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: 'linear'
                }}
              />
            ))}
          </div>

          {/* Main Loader Content */}
          <motion.div
            className="relative z-10 text-center"
            animate={controls}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Logo Container */}
            <motion.div
              ref={logoRef}
              className="relative mb-12"
              variants={logoVariants}
              animate="animate"
            >
              {/* Outer Ring */}
              <motion.div
                className="absolute inset-0 w-32 h-32 mx-auto border-4 border-white/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Middle Ring */}
              <motion.div
                className="absolute inset-2 w-28 h-28 mx-auto border-2 border-gold-leaf/40 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Inner Ring */}
              <motion.div
                className="absolute inset-4 w-24 h-24 mx-auto border border-warm-sand/60 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />

              {/* Logo Center */}
              <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-deep-teal via-royal-navy to-midnight rounded-full flex items-center justify-center shadow-2xl">
                <motion.div
                  className="text-4xl font-playfair font-bold text-white"
                  animate={{
                    scale: [1, 1.1, 1],
                    textShadow: [
                      '0 0 10px rgba(255,255,255,0.5)',
                      '0 0 20px rgba(212, 165, 116, 0.8)',
                      '0 0 10px rgba(255,255,255,0.5)'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  M
                </motion.div>
                
                {/* Pulse Effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-deep-teal/30 to-royal-navy/30"
                  variants={pulseVariants}
                  animate="animate"
                />
              </div>

              {/* Orbiting Elements */}
              <motion.div
                className="absolute top-0 left-1/2 w-3 h-3 bg-gold-leaf rounded-full transform -translate-x-1/2"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: '50% 64px' }}
              />
              <motion.div
                className="absolute top-0 left-1/2 w-2 h-2 bg-warm-sand rounded-full transform -translate-x-1/2"
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: '50% 64px' }}
              />
            </motion.div>

            {/* Brand Name */}
            <motion.div variants={itemVariants} className="mb-8">
              <motion.h1 
                className="font-playfair text-4xl md:text-5xl font-bold text-white mb-2"
                animate={{
                  opacity: [0.8, 1, 0.8],
                  scale: [1, 1.02, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {loadingText}
              </motion.h1>
              <motion.p 
                className="font-montserrat text-warm-sand/90 text-lg"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Premium Real Estate Experience
              </motion.p>
            </motion.div>

            {/* Loading Phase */}
            <motion.div variants={itemVariants} className="mb-8">
              <motion.p 
                key={currentPhase}
                className="font-montserrat text-white/80 text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                {phases[currentPhase]}
              </motion.p>
            </motion.div>

            {/* Progress Bar */}
            {showProgress && (
              <motion.div variants={itemVariants} className="w-80 max-w-sm mx-auto">
                <div className="relative">
                  {/* Progress Track */}
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                    <motion.div
                      className="h-full bg-gradient-to-r from-deep-teal via-gold-leaf to-warm-sand rounded-full relative"
                      style={{ width: `${progress}%` }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {/* Shimmer Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>
                  </div>
                  
                  {/* Progress Text */}
                  <motion.div 
                    className="text-center mt-3 font-montserrat text-white/70 text-sm"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {Math.round(progress)}%
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Loading Dots */}
            <motion.div 
              variants={itemVariants}
              className="flex justify-center space-x-2 mt-8"
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-3 h-3 bg-white/60 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Corner Decorations */}
          <motion.div
            className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/20"
            animate={{ rotate: [0, 90, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-white/20"
            animate={{ rotate: [0, -90, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div
            className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-white/20"
            animate={{ rotate: [0, -90, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/20"
            animate={{ rotate: [0, 90, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;