import React from 'react'
import PropertiesPageHero from '../../components/properties/PropertiesPageHero'

const page = () => {
  return (
    <main className="min-h-screen">
        <PropertiesPageHero 
        title="All Properties"
        subtitle="Browse listings by location, type, or budget"
        backgroundImage="/images/estate1.jpg"
        // backgroundVideo="/videos/properties-hero.mp4" // Optional
        showBreadcrumb={true}
        showCTA={true}
      />  
    </main>
  )
}

export default page