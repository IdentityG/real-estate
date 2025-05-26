'use client';

import Navbar from '@/components/common/Navbar';
import HeroSection from '@/components/home/HeroSection';
import AdvancedPropertySearch from '@/components/home/AdvancedPropertySearch';
import FeaturedProperties from '@/components/home/FeaturedProperties';
import WhyChooseMekiya from '@/components/home/WhyChooseMekiya';
import AboutMekiya from '@/components/home/AboutMekiya';
import AmenitySection from '@/components/home/AmenitySection';
import PropertyCategories from '@/components/home/PropertyCategories';
import PropertyGallery from '@/components/home/PropertyGallery';
import MeetOurAgents from '@/components/home/MeetOurAgents';
import ClientTestimonials from '@/components/home/ClientTestimonials';
import BlogHighlights from '@/components/home/BlogHighlights';
import CTABanner from '@/components/home/CTABanner';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutMekiya />
      <AdvancedPropertySearch />
      <FeaturedProperties />
      <AmenitySection />
      <PropertyGallery />
      <PropertyCategories />
      <MeetOurAgents />
      <ClientTestimonials />
      <BlogHighlights />
      <CTABanner />
      <WhyChooseMekiya />
     
      {/* Add other sections here */}
    </main>
  );
}