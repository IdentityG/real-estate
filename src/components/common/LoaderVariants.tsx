'use client';

import { motion } from 'framer-motion';

// Minimal Loader for quick operations
export const MinimalLoader = () => (
  <div className="flex items-center justify-center p-8">
    <motion.div
      className="w-8 h-8 border-3 border-deep-teal border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

// Property Card Skeleton Loader
export const PropertyCardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-elegant overflow-hidden animate-pulse">
    <div className="h-64 bg-silver-mist" />
    <div className="p-6 space-y-4">
      <div className="h-4 bg-silver-mist rounded w-3/4" />
      <div className="h-4 bg-silver-mist rounded w-1/2" />
      <div className="h-6 bg-silver-mist rounded w-1/3" />
      <div className="flex justify-between">
        <div className="h-4 bg-silver-mist rounded w-1/4" />
        <div className="h-4 bg-silver-mist rounded w-1/4" />
      </div>
    </div>
  </div>
);

// Floating Dots Loader
export const FloatingDotsLoader = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={`${sizeClasses[size]} bg-deep-teal rounded-full`}
          animate={{
            y: [-10, 10, -10],
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
    </div>
  );
};

// Pulse Loader
export const PulseLoader = ({ color = 'deep-teal' }: { color?: string }) => (
  <div className="flex items-center justify-center">
    <motion.div
      className={`w-16 h-16 bg-${color} rounded-full`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  </div>
);

// Ripple Loader
export const RippleLoader = () => (
  <div className="relative w-16 h-16 flex items-center justify-center">
    {[0, 1, 2].map((index) => (
      <motion.div
        key={index}
        className="absolute w-full h-full border-2 border-deep-teal rounded-full"
        animate={{
          scale: [0, 1],
          opacity: [1, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: index * 0.6,
          ease: "easeOut"
        }}
      />
    ))}
    <div className="w-4 h-4 bg-deep-teal rounded-full" />
  </div>
);

// Morphing Loader
export const MorphingLoader = () => (
  <div className="flex items-center justify-center">
    <motion.div
      className="w-12 h-12 bg-gradient-to-r from-deep-teal to-royal-navy"
      animate={{
        borderRadius: ["20%", "50%", "20%"],
        rotate: [0, 180, 360]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  </div>
);

// Text Loading Animation
export const TextLoader = ({ text = "Loading..." }: { text?: string }) => (
  <div className="flex items-center space-x-1">
    {text.split('').map((char, index) => (
      <motion.span
        key={index}
        className="font-montserrat text-deep-teal"
        animate={{
          opacity: [0.3, 1, 0.3],
          y: [0, -5, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: index * 0.1,
          ease: "easeInOut"
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))}
  </div>
);

// Progress Ring Loader
export const ProgressRingLoader = ({ progress = 0, size = 60 }: { progress?: number, size?: number }) => {
  const radius = (size - 8) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          className="text-silver-mist"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="text-deep-teal"
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-montserrat font-semibold text-deep-teal">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};

// Bouncing Balls Loader
export const BouncingBallsLoader = () => (
  <div className="flex items-end space-x-1">
    {[0, 1, 2, 3].map((index) => (
      <motion.div
        key={index}
        className="w-3 h-3 bg-deep-teal rounded-full"
        animate={{
          y: [0, -20, 0],
          scaleY: [1, 0.8, 1]
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          delay: index * 0.1,
          ease: "easeInOut"
        }}
      />
    ))}
  </div>
);

// Spinner with Text
export const SpinnerWithText = ({ text = "Loading...", size = 'md' }: { text?: string, size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className="flex items-center space-x-3">
      <motion.div
        className={`${sizeClasses[size]} border-2 border-deep-teal border-t-transparent rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <span className="font-montserrat text-slate-gray">{text}</span>
    </div>
  );
};