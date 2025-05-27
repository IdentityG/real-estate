'use client';

import { useState, useEffect } from 'react';
import PropertiesPageHero from '../../components/properties/PropertiesPageHero';
import AdvancedFilterBar from '../../components/properties/AdvancedFilterBar';
import { Property, FilterState, filterProperties, sortProperties } from '../../utils/propertyFilters';
import CTABanner from '@/components/home/CTABanner';

const PropertiesPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Load properties data
  useEffect(() => {
    const loadProperties = async () => {
      try {
        const response = await fetch('/data/properties.json');
        const data = await response.json();
        setProperties(data.properties);
        setFilteredProperties(sortProperties(data.properties));
      } catch (error) {
        console.error('Error loading properties:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  const handleFiltersChange = (filters: FilterState) => {
    console.log('Filters changed:', filters);
    const filtered = filterProperties(properties, filters);
    const sorted = sortProperties(filtered);
    setFilteredProperties(sorted);
  };

  if (loading) {
    return (
      <main className="min-h-screen">
        <PropertiesPageHero 
          title="All Properties"
          subtitle="Browse listings by location, type, or budget"
          backgroundImage="/images/estate1.jpg"
          showBreadcrumb={true}
          showCTA={true}
        />
        <div className="py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-deep-teal mx-auto"></div>
          <p className="mt-4 font-montserrat text-slate-gray">Loading properties...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <PropertiesPageHero 
        title="All Properties"
        subtitle="Browse listings by location, type, or budget"
        backgroundImage="/images/estate1.jpg"
        showBreadcrumb={true}
        showCTA={true}
      />
      
      <AdvancedFilterBar 
        onFiltersChange={handleFiltersChange}
        isSticky={false}
        collapsible={true}
      />
      
      {/* Property listings */}
      <section className="py-8 bg-alabaster mt-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="font-playfair text-3xl font-bold text-charcoal mb-4">
              Property Listings
            </h2>
            <p className="font-montserrat text-slate-gray">
              {filteredProperties.length} properties found
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map(property => (
              <div key={property.id} className="bg-white rounded-lg shadow-elegant overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img 
                    src={property.images[0]} 
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  {property.featured && (
                    <div className="absolute top-4 left-4 bg-deep-teal text-white px-2 py-1 rounded text-xs font-montserrat font-medium">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-charcoal mb-2">
                    {property.title}
                  </h3>
                  <p className="font-montserrat text-slate-gray text-sm mb-3">
                    {property.description}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-montserrat font-bold text-deep-teal text-lg">
                      {property.propertyType === 'rent' 
                        ? `$${property.price.toLocaleString()}/month`
                        : `$${property.price.toLocaleString()}`
                      }
                    </span>
                    <span className="font-montserrat text-xs text-slate-gray">
                      {property.location}
                    </span>
                  </div>
                  {property.bedrooms > 0 && (
                    <div className="flex items-center gap-4 text-sm font-montserrat text-slate-gray">
                      <span>{property.bedrooms} bed</span>
                      <span>{property.bathrooms} bath</span>
                      <span>{property.sqft.toLocaleString()} sqft</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <p className="font-montserrat text-slate-gray text-lg">
                No properties match your current filters. Try adjusting your search criteria.
              </p>
            </div>
          )}
        </div>
      </section>
      <CTABanner />
    </main>
  );
};

export default PropertiesPage;