import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface NavigationOptions {
  showLoader?: boolean;
  loadingText?: string;
  loadingDuration?: number;
  delay?: number;
}

export const navigateWithLoading = async (
  router: AppRouterInstance,
  href: string,
  showLoader?: (text?: string, duration?: number) => void,
  options: NavigationOptions = {}
) => {
  const {
    showLoader: shouldShowLoader = true,
    loadingText = 'Loading...',
    loadingDuration = 1500,
    delay = 100
  } = options;

  if (shouldShowLoader && showLoader) {
    showLoader(loadingText, loadingDuration);
  }

  // Small delay to show the loader
  await new Promise(resolve => setTimeout(resolve, delay));
  
  router.push(href);
};

export const getRouteLoadingText = (route: string): string => {
  const routeTexts: Record<string, string> = {
    '/': 'Welcome to Mekiya',
    '/properties': 'Discovering Properties',
    '/services': 'Loading Services',
    '/about': 'About Mekiya',
    '/contact': 'Contact Information',
    '/agents': 'Meet Our Agents',
    '/blog': 'Latest News & Updates'
  };

  // Handle dynamic routes
  if (route.startsWith('/properties/')) {
    return 'Loading Property Details';
  }
  if (route.startsWith('/agents/')) {
    return 'Loading Agent Profile';
  }
  if (route.startsWith('/blog/')) {
    return 'Loading Article';
  }
  
  return routeTexts[route] || 'Loading...';
};

export const preloadRoute = (href: string) => {
  // Preload the route for faster navigation
  if (typeof window !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  }
};