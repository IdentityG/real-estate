import ServicesPageHero from '@/components/services/ServicesPageHero'
import ServicesOverview from '@/components/services/ServicesOverview'
import ServiceFeatures from '@/components/services/ServiceFeatures'
import ServiceProcess from '@/components/services/ServiceProcess'
import ServiceTestimonials from '@/components/services/ServiceTestimonials'
import ServicePricing from '@/components/services/ServicePricing'
import ServiceCTA from '@/components/services/ServiceCTA'
import React from 'react'

const page = () => {
  return (
    <main className='min-h-screen'>
        <ServicesPageHero />
        <ServicesOverview />
        <ServiceFeatures />
        <ServiceProcess />
        <ServiceTestimonials />
        <ServicePricing />
        <ServiceCTA />
    </main>
  )
}

export default page