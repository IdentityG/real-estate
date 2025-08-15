'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import PageLoader from '@/components/common/PageLoader';

interface AppLoadingContextType {
  isLoading: boolean;
  loadingText: string;
  showLoader: (text?: string, duration?: number) => void;
  hideLoader: () => void;
  setLoadingText: (text: string) => void;
}

const AppLoadingContext = createContext<AppLoadingContextType | undefined>(undefined);

export const useAppLoading = () => {
  const context = useContext(AppLoadingContext);
  if (!context) {
    throw new Error('useAppLoading must be used within an AppLoadingProvider');
  }
  return context;
};

interface AppLoadingProviderProps {
  children: React.ReactNode;
}

export const AppLoadingProvider: React.FC<AppLoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading...');
  const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  // Clear any existing timeout when component unmounts
  useEffect(() => {
    return () => {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
    };
  }, [loadingTimeout]);

  const showLoader = (text?: string, duration?: number) => {
    // Clear any existing timeout
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
      setLoadingTimeout(null);
    }

    if (text) setLoadingText(text);
    setIsLoading(true);
    
    if (duration) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
        setLoadingTimeout(null);
      }, duration);
      setLoadingTimeout(timeout);
    }
  };

  const hideLoader = () => {
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
      setLoadingTimeout(null);
    }
    setIsLoading(false);
  };

  const value: AppLoadingContextType = {
    isLoading,
    loadingText,
    showLoader,
    hideLoader,
    setLoadingText
  };

  return (
    <AppLoadingContext.Provider value={value}>
      {children}
      <PageLoader
        isLoading={isLoading}
        loadingText={loadingText}
        onComplete={hideLoader}
        showProgress={false}
      />
    </AppLoadingContext.Provider>
  );
};