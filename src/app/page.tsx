'use client';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AdvancedPropertySearch from '@/components/AdvancedPropertySearch';
import FeaturedProperties from '@/components/FeaturedProperties';
import WhyChooseMekiya from '@/components/WhyChooseMekiya';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AdvancedPropertySearch />
      <FeaturedProperties />
      <WhyChooseMekiya />
      {/* Add other sections here */}
    </main>
  );
}