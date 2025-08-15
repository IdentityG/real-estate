'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAppLoading } from '@/components/providers/AppLoadingProvider';
import { useRouteTransition } from '@/hooks/useRouteTransition';
import TransitionLink from '@/components/common/TransitionLink';
import { navigateWithLoading, preloadRoute } from '@/utils/navigation';
import { 
  FloatingDotsLoader, 
  SpinnerWithText,
  ProgressRingLoader 
} from '@/components/common/LoaderVariants';

const LoadingIntegrationExample = () => {
  const router = useRouter();
  const { showLoader, hideLoader } = useAppLoading();
  const { navigateWithTransition, isTransitioning } = useRouteTransition();
  const [progress, setProgress] = useState(0);

  // Example: API call with loading
  const handleApiCall = async () => {
    showLoader('Processing your request...', 3000);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    hideLoader();
    alert('API call completed!');
  };

  // Example: Form submission with progress
  const handleFormSubmission = async () => {
    showLoader('Submitting form...');
    
    // Simulate form submission with progress updates
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    hideLoader();
    alert('Form submitted successfully!');
    setProgress(0);
  };

  // Example: Navigation with custom loading
  const handleCustomNavigation = () => {
    navigateWithLoading(
      router,
      '/properties',
      showLoader,
      {
        loadingText: 'Searching for your dream home...',
        loadingDuration: 2000
      }
    );
  };

  // Example: Preload and navigate
  const handlePreloadAndNavigate = () => {
    preloadRoute('/services');
    navigateWithTransition('/services');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-alabaster to-silver-mist/30 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl font-bold text-royal-navy mb-4">
            Loading Integration Examples
          </h1>
          <p className="font-montserrat text-slate-gray text-lg">
            See how to integrate loading states throughout your application
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Navigation Examples */}
          <div className="bg-white rounded-2xl shadow-elegant p-6">
            <h2 className="font-playfair text-xl font-semibold text-charcoal mb-6">
              Navigation with Loading
            </h2>
            
            <div className="space-y-4">
              <TransitionLink
                href="/properties"
                className="block w-full px-6 py-3 bg-deep-teal text-white font-montserrat font-semibold rounded-xl hover:bg-deep-teal/90 transition-colors text-center"
              >
                Navigate to Properties (Transition)
              </TransitionLink>
              
              <motion.button
                onClick={handleCustomNavigation}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-royal-navy text-white font-montserrat font-semibold rounded-xl hover:bg-royal-navy/90 transition-colors"
              >
                Custom Navigation Loading
              </motion.button>
              
              <motion.button
                onClick={handlePreloadAndNavigate}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-soft-sage text-white font-montserrat font-semibold rounded-xl hover:bg-soft-sage/90 transition-colors"
              >
                Preload & Navigate
              </motion.button>
            </div>
          </div>

          {/* API Call Examples */}
          <div className="bg-white rounded-2xl shadow-elegant p-6">
            <h2 className="font-playfair text-xl font-semibold text-charcoal mb-6">
              API Calls with Loading
            </h2>
            
            <div className="space-y-4">
              <motion.button
                onClick={handleApiCall}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-terracotta text-white font-montserrat font-semibold rounded-xl hover:bg-terracotta/90 transition-colors"
              >
                Simulate API Call
              </motion.button>
              
              <motion.button
                onClick={handleFormSubmission}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-gold-leaf text-white font-montserrat font-semibold rounded-xl hover:bg-gold-leaf/90 transition-colors"
              >
                Form Submission with Progress
              </motion.button>
            </div>
          </div>

          {/* Inline Loaders */}
          <div className="bg-white rounded-2xl shadow-elegant p-6">
            <h2 className="font-playfair text-xl font-semibold text-charcoal mb-6">
              Inline Loading States
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-montserrat font-semibold text-charcoal mb-2">
                  Floating Dots
                </h3>
                <FloatingDotsLoader />
              </div>
              
              <div>
                <h3 className="font-montserrat font-semibold text-charcoal mb-2">
                  Spinner with Text
                </h3>
                <SpinnerWithText text="Loading properties..." />
              </div>
              
              <div>
                <h3 className="font-montserrat font-semibold text-charcoal mb-2">
                  Progress Ring
                </h3>
                <div className="flex justify-center">
                  <ProgressRingLoader progress={progress} />
                </div>
              </div>
            </div>
          </div>

          {/* Status Display */}
          <div className="bg-white rounded-2xl shadow-elegant p-6">
            <h2 className="font-playfair text-xl font-semibold text-charcoal mb-6">
              Current Status
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-montserrat text-slate-gray">Route Transitioning:</span>
                <span className={`font-montserrat font-semibold ${isTransitioning ? 'text-terracotta' : 'text-success'}`}>
                  {isTransitioning ? 'Yes' : 'No'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-montserrat text-slate-gray">Progress:</span>
                <span className="font-montserrat font-semibold text-deep-teal">
                  {progress}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Code Examples */}
        <div className="mt-12 bg-white rounded-2xl shadow-elegant p-8">
          <h2 className="font-playfair text-2xl font-semibold text-charcoal mb-6">
            Code Examples
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-montserrat font-semibold text-charcoal mb-3">
                1. Using TransitionLink for Navigation
              </h3>
              <div className="bg-charcoal/5 rounded-lg p-4 font-mono text-sm">
                <code>{`import TransitionLink from '@/components/common/TransitionLink';

<TransitionLink href="/properties" className="nav-link">
  Properties
</TransitionLink>`}</code>
              </div>
            </div>
            
            <div>
              <h3 className="font-montserrat font-semibold text-charcoal mb-3">
                2. Programmatic Loading
              </h3>
              <div className="bg-charcoal/5 rounded-lg p-4 font-mono text-sm">
                <code>{`import { useAppLoading } from '@/components/providers/AppLoadingProvider';

const { showLoader, hideLoader } = useAppLoading();

// Show loader
showLoader('Processing...', 3000);

// Hide loader
hideLoader();`}</code>
              </div>
            </div>
            
            <div>
              <h3 className="font-montserrat font-semibold text-charcoal mb-3">
                3. Navigation with Custom Loading
              </h3>
              <div className="bg-charcoal/5 rounded-lg p-4 font-mono text-sm">
                <code>{`import { navigateWithLoading } from '@/utils/navigation';

navigateWithLoading(router, '/properties', showLoader, {
  loadingText: 'Finding properties...',
  loadingDuration: 2000
});`}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIntegrationExample;