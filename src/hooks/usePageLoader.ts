'use client';

import { useState, useEffect } from 'react';

interface UsePageLoaderOptions {
  minLoadingTime?: number;
  autoStart?: boolean;
  simulateProgress?: boolean;
}

export const usePageLoader = (options: UsePageLoaderOptions = {}) => {
  const {
    minLoadingTime = 2000,
    autoStart = true,
    simulateProgress = true
  } = options;

  const [isLoading, setIsLoading] = useState(autoStart);
  const [progress, setProgress] = useState(0);
  const [startTime] = useState(Date.now());

  // Simulate loading progress
  useEffect(() => {
    if (!isLoading || !simulateProgress) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const elapsed = Date.now() - startTime;
        const minProgress = Math.min((elapsed / minLoadingTime) * 100, 95);
        const randomIncrement = Math.random() * 10 + 2;
        const newProgress = Math.min(prev + randomIncrement, minProgress);
        
        return newProgress;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isLoading, simulateProgress, startTime, minLoadingTime]);

  const startLoading = () => {
    setIsLoading(true);
    setProgress(0);
  };

  const finishLoading = () => {
    const elapsed = Date.now() - startTime;
    const remainingTime = Math.max(minLoadingTime - elapsed, 0);
    
    // Complete progress immediately
    setProgress(100);
    
    // Wait for minimum time before hiding loader
    setTimeout(() => {
      setIsLoading(false);
    }, remainingTime);
  };

  const setLoadingState = (loading: boolean) => {
    if (loading) {
      startLoading();
    } else {
      finishLoading();
    }
  };

  return {
    isLoading,
    progress,
    startLoading,
    finishLoading,
    setLoadingState
  };
};