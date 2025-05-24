'use client';

import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface MobileMenuProps {
  navLinks: { name: string; href: string }[];
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const MobileMenu = ({ navLinks, setMobileMenuOpen }: MobileMenuProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-primary/95 backdrop-blur-sm z-40 md:hidden"
    >
      <motion.nav 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="h-full flex flex-col justify-center items-center p-8"
      >
        <ul className="space-y-6 w-full">
          {navLinks.map((link, index) => (
            <motion.li 
              key={link.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <Link 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-secondary text-2xl font-heading hover:text-accent transition-colors duration-300 inline-block"
              >
                {link.name}
              </Link>
            </motion.li>
          ))}
        </ul>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: navLinks.length * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 px-8 py-3 bg-accent text-primary-dark rounded-full font-accent text-base font-medium hover:bg-accent-light transition-colors duration-300 shadow-md hover:shadow-lg"
          onClick={() => setMobileMenuOpen(false)}
        >
          Get Started
        </motion.button>
      </motion.nav>
    </motion.div>
  );
};

export default MobileMenu;