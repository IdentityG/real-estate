import AboutPageHero from '@/components/about/AboutPageHero'
import CompanyStats from '@/components/about/CompanyStats'
import CompanyStory from '@/components/about/CompanyStory'
import OurTeam from '@/components/about/OurTeam'
import React from 'react'

const page = () => {
  return (
    <main className='min-h-screen'>
     <AboutPageHero />
     <CompanyStory />
     <OurTeam />
     <CompanyStats />
    </main>
  )
}

export default page