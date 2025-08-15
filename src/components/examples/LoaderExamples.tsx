'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PageLoader from '@/components/common/PageLoader';
import { useLoading } from '@/components/providers/LoadingProvider';
import {
  MinimalLoader,
  PropertyCardSkeleton,
  FloatingDotsLoader,
  PulseLoader,
  RippleLoader,
  MorphingLoader,
  TextLoader,
  ProgressRingLoader,
  BouncingBallsLoader,
  SpinnerWithText
} from '@/components/common/LoaderVariants';

const LoaderExamples = () => {
  const [showPageLoader, setShowPageLoader] = useState(false);
  const [progress, setProgress] = useState(65);
  const { showLoader, hideLoader } = useLoading();

  const handleShowPageLoader = () => {
    setShowPageLoader(true);
    setTimeout(() => setShowPageLoader(false), 4000);
  };

  const handleShowGlobalLoader = () => {
    showLoader('Processing your request...', 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-alabaster to-silver-mist/30 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl font-bold text-royal-navy mb-4">
            Mekiya Loader Components
          </h1>
          <p className="font-montserrat text-slate-gray text-lg">
            Beautiful, animated loading components for your real estate platform
          </p>
        </div>

        {/* Page Loader Demo */}
        <div className="bg-white rounded-2xl shadow-elegant p-8 mb-8">
          <h2 className="font-playfair text-2xl font-semibold text-charcoal mb-6">
            Full Page Loader
          </h2>
          <div className="flex gap-4">
            <motion.button
              onClick={handleShowPageLoader}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-deep-teal text-white font-montserrat font-semibold rounded-xl hover:bg-deep-teal/90 transition-colors"
            >
              Show Page Loader
            </motion.button>
            <motion.button
              onClick={handleShowGlobalLoader}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-royal-navy text-white font-montserrat font-semibold rounded-xl hover:bg-royal-navy/90 transition-colors"
            >
              Show Global Loader
            </motion.button>
          </div>
        </div>

        {/* Loader Variants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Minimal Loader */}
          <div className="bg-white rounded-2xl shadow-elegant p-6">
            <h3 className="font-playfair text-lg font-semibold text-charcoal mb-4">
              Minimal Loader
            </h3>
            <MinimalLoader />
          </div>

          {/* Floating Dots */}
          <div className="bg-white rounded-2xl shadow-elegant p-6">
            <h3 className="font-playfair text-lg font-semibold text-charcoal mb-4">
              Floating Dots
            </h3>
            <FloatingDotsLoader size="lg" />
          </div>

          {/* Pulse Loader */}
          <div className="bg-white rounded-2xl shadow-elegant p-6">
            <h3 className="font-playfair text-lg font-semibold text-charcoal mb-4">
              Pulse Loader
            </h3>
            <PulseLoader />
          </div>

          {/* Ripple Loader */}
          <div className="bg-white rounded-2xl shadow-elegant p-6">
            <h3 className="font-playfair text-lg font-semibold text-charcoal mb-4">
              Ripple Loader
            </h3>
            <RippleLoader />
          </div>

          {/* Morphing Loader */}
          <div className="bg-white rounded-2xl shadow-elegant p-6">
            <h3 className="font-playfair text-lg font-semibold text-charcoal mb-4">
              Morphing Loader
            </h3>
            <MorphingLoader />
          </div>

          {/* Text Loader */}
          <div className="bg-white rounded-2xl shadow-elegant p-6">
            <h3 className="font-playfair text-lg font-semibold text-charcoal mb-4">
              Text Animation
            </h3>
            <TextLoader text="Loading Properties..." />
          </div>

          {/* Progress Ring */}
          <div className="bg-white rounded-2xl shadow-elegant p-6">
            <h3 className="font-playfair text-lg font-semibold text-charcoal mb-4">
              Progress Ring
            </h3>
            <div className="flex justify-center">
              <ProgressRingLoader progress={progress} />
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-3 py-1 bg-slate-gray text-white text-sm rounded"
              >
                -10%
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-3 py-1 bg-deep-teal text-white text-sm rounded"
              >
                +10%
              </button>
            </div>
          </div>

          {/* Bouncing Balls */}
          <div className="bg-white rounded-2xl shadow-elegant p-6">
            <h3 className="font-playfair text-lg font-semibold text-charcoal mb-4">
              Bouncing Balls
            </h3>
            <BouncingBallsLoader />
          </div>

          {/* Spinner with Text */}
          <div className="bg-white rounded-2xl shadow-elegant p-6">
            <h3 className="font-playfair text-lg font-semibold text-charcoal mb-4">
              Spinner with Text
            </h3>
            <SpinnerWithText text="Searching properties..." />
          </div>
        </div>

        {/* Property Card Skeleton */}
        <div className="mt-8">
          <h2 className="font-playfair text-2xl font-semibold text-charcoal mb-6">
            Property Card Skeleton
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        </div>

        {/* Usage Examples */}
        <div className="mt-12 bg-white rounded-2xl shadow-elegant p-8">
          <h2 className="font-playfair text-2xl font-semibold text-charcoal mb-6">
            Usage Examples
          </h2>
          <div className="space-y-4 font-montserrat text-slate-gray">
            <div className="bg-charcoal/5 rounded-lg p-4">
              <h3 className="font-semibold text-charcoal mb-2">Basic Usage:</h3>
              <code className="text-sm">
                {`import PageLoader from '@/components/common/PageLoader';

<PageLoader 
  isLoading={isLoading}
  loadingText="Custom Text"
  onComplete={() => setIsLoading(false)}
/>`}
              </code>
            </div>

            <div className="bg-charcoal/5 rounded-lg p-4">
              <h3 className="font-semibold text-charcoal mb-2">With Loading Provider:</h3>
              <code className="text-sm">
                {`import { useLoading } from '@/components/providers/LoadingProvider';

const { showLoader, hideLoader } = useLoading();

// Show loader
showLoader('Processing...', 3000);

// Hide loader
hideLoader();`}
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* Page Loader Instance */}
      <PageLoader
        isLoading={showPageLoader}
        loadingText="Demo Page Loader"
        onComplete={() => setShowPageLoader(false)}
      />
    </div>
  );
};

export default LoaderExamples;