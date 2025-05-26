'use client';

import Navbar from '@/components/common/Navbar';
import HeroSection from '@/components/home/HeroSection';
import AdvancedPropertySearch from '@/components/home/AdvancedPropertySearch';
import FeaturedProperties from '@/components/home/FeaturedProperties';
import WhyChooseMekiya from '@/components/home/WhyChooseMekiya';
import AboutMekiya from '@/components/home/AboutMekiya';

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