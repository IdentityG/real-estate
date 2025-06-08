import AboutPageHero from '@/components/about/AboutPageHero'
import CompanyCulture from '@/components/about/CompanyCulture'
import CompanyStats from '@/components/about/CompanyStats'
import CompanyStory from '@/components/about/CompanyStory'
import OurServices from '@/components/about/OurServices'
import OurTeam from '@/components/about/OurTeam'
import React from 'react'

const page = () => {
  return (
    <main className='min-h-screen'>
     <AboutPageHero />
     <CompanyStory />
     <OurTeam />
     <CompanyStats />
     <OurServices />
     <CompanyCulture />
    </main>
  )
}

export default page