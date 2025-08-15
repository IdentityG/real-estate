'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface UseRouteTransitionOptions {
  transitionDuration?: number;
  showLoader?: boolean;
  customLoadingTexts?: Record<string, string>;
}

export const useRouteTransition = (options: UseRouteTransitionOptions = {}) => {
  const {
    transitionDuration = 1000,
    showLoader = true,
    customLoadingTexts = {}
  } = options;

  const pathname = usePathname();
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetRoute, setTargetRoute] = useState<string | null>(null);

  const defaultLoadingTexts: Record<string, string> = {
    '/': 'Welcome Home',
    '/properties': 'Discovering Properties',
    '/services': 'Our Services',
    '/about': 'About Mekiya',
    '/contact': 'Get In Touch',
    '/agents': 'Meet Our Team',
    '/blog': 'Latest Updates',
    ...customLoadingTexts
  };

  const getLoadingText = useCallback((route: string) => {
    // Check for dynamic routes
    if (route.startsWith('/properties/')) {
      return 'Loading Property Details';
    }
    if (route.startsWith('/agents/')) {
      return 'Loading Agent Profile';
    }
    if (route.startsWith('/blog/')) {
      return 'Loading Article';
    }
    
    return defaultLoadingTexts[route] || 'Loading...';
  }, [defaultLoadingTexts]);

  const navigateWithTransition = useCallback((route: string) => {
    if (route === pathname) return;

    setTargetRoute(route);
    setIsTransitioning(true);

    // Start transition
    setTimeout(() => {
      router.push(route);
      
      // End transition after duration
      setTimeout(() => {
        setIsTransitioning(false);
        setTargetRoute(null);
      }, transitionDuration);
    }, 100);
  }, [pathname, router, transitionDuration]);

  const getCurrentLoadingText = useCallback(() => {
    return getLoadingText(targetRoute || pathname);
  }, [targetRoute, pathname, getLoadingText]);

  return {
    isTransitioning,
    targetRoute,
    navigateWithTransition,
    getCurrentLoadingText,
    currentPath: pathname
  };
};