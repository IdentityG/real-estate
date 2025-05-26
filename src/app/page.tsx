'use client';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AdvancedPropertySearch from '@/components/AdvancedPropertySearch';
import FeaturedProperties from '@/components/FeaturedProperties';
import WhyChooseMekiya from '@/components/WhyChooseMekiya';
import AboutMekiya from '@/components/AboutMekiya';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutMekiya />
      <AdvancedPropertySearch />
      <FeaturedProperties />
      <WhyChooseMekiya />
     
      {/* Add other sections here */}
    </main>
  );
}