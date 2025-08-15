'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useRouteTransition } from '@/hooks/useRouteTransition';

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const TransitionLink: React.FC<TransitionLinkProps> = ({
  href,
  children,
  className = '',
  onClick,
  disabled = false
}) => {
  const { navigateWithTransition, isTransitioning } = useRouteTransition();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (disabled || isTransitioning) return;
    
    onClick?.();
    navigateWithTransition(href);
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      className={`${className} ${disabled || isTransitioning ? 'pointer-events-none opacity-50' : ''}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.a>
  );
};

export default TransitionLink;