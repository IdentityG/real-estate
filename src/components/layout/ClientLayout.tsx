'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { LoadingProvider } from '@/components/providers/LoadingProvider';
import { AppLoadingProvider } from '@/components/providers/AppLoadingProvider';
import PageLoader from '@/components/common/PageLoader';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  const [currentPath, setCurrentPath] = useState(pathname);

  // Handle initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 3000); // Show loader for 3 seconds on initial load

    return () => clearTimeout(timer);
  }, []);

  // Handle route changes
  useEffect(() => {
    if (!isInitialLoad && pathname !== currentPath) {
      setIsRouteChanging(true);
      setCurrentPath(pathname);
      
      // Simulate route transition time
      const timer = setTimeout(() => {
        setIsRouteChanging(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams, currentPath, isInitialLoad]);

  // Get loading text based on route
  const getLoadingText = (path: string) => {
    const routeTexts: Record<string, string> = {
      '/': 'Welcome to Mekiya',
      '/properties': 'Loading Properties',
      '/services': 'Loading Services',
      '/about': 'About Mekiya',
      '/contact': 'Contact Information',
      '/agents': 'Meet Our Agents',
      '/blog': 'Latest News'
    };

    return routeTexts[path] || 'Loading...';
  };

  return (
    <AppLoadingProvider>
      <LoadingProvider initialLoading={false}>
        {/* Initial Page Loader */}
        <PageLoader
          isLoading={isInitialLoad}
          loadingText="Mekiya Real Estate"
          onComplete={() => setIsInitialLoad(false)}
          showProgress={true}
        />

        {/* Route Transition Loader */}
        <PageLoader
          isLoading={isRouteChanging}
          loadingText={getLoadingText(pathname)}
          onComplete={() => setIsRouteChanging(false)}
          showProgress={false}
        />

        {/* Page Content with Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </LoadingProvider>
    </AppLoadingProvider>
  );
};

export default ClientLayout;