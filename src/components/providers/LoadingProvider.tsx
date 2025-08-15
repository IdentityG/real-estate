'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import PageLoader from '@/components/common/PageLoader';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  showLoader: (text?: string, duration?: number) => void;
  hideLoader: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: React.ReactNode;
  initialLoading?: boolean;
  minLoadingTime?: number;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
  initialLoading = true,
  minLoadingTime = 3000
}) => {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [loadingText, setLoadingText] = useState('Mekiya Real Estate');
  const [startTime] = useState(Date.now());

  // Auto-hide initial loader after minimum time
  useEffect(() => {
    if (initialLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, minLoadingTime);

      return () => clearTimeout(timer);
    }
  }, [initialLoading, minLoadingTime]);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const showLoader = (text?: string, duration?: number) => {
    if (text) setLoadingText(text);
    setIsLoading(true);
    
    if (duration) {
      setTimeout(() => {
        setIsLoading(false);
      }, duration);
    }
  };

  const hideLoader = () => {
    const elapsed = Date.now() - startTime;
    const remainingTime = Math.max(1000 - elapsed, 0);
    
    setTimeout(() => {
      setIsLoading(false);
    }, remainingTime);
  };

  const value: LoadingContextType = {
    isLoading,
    setLoading,
    showLoader,
    hideLoader
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      <PageLoader
        isLoading={isLoading}
        loadingText={loadingText}
        onComplete={() => setIsLoading(false)}
        showProgress={true}
      />
    </LoadingContext.Provider>
  );
};