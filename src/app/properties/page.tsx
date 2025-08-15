'use client';

import { useState, useEffect } from 'react';
import PropertiesPageHero from '../../components/properties/PropertiesPageHero';
import AdvancedFilterBar from '../../components/properties/AdvancedFilterBar';
import PropertyGrid from '../../components/properties/PropertyGrid';
import PropertyStatsDashboard from '../../components/properties/PropertyStatsDashboard';
import PropertyMapView from '../../components/properties/PropertyMapView';
import PropertyCalculator from '../../components/properties/PropertyCalculator';
import PropertyRecommendations from '../../components/properties/PropertyRecommendations';
import { Property, FilterState, filterProperties, sortProperties } from '../../utils/propertyFilters';
import CTABanner from '@/components/home/CTABanner';
import FeaturedProperties from '@/components/properties/FeaturedProperties';
import MeetOurAgents from '@/components/home/MeetOurAgents';
import PropertyComparisonTool from '../../components/properties/PropertyComparisonTool';
import PropertyVirtualTour from '@/components/properties/PropertyVirtualTour';
import PropertyDetailsModal from '@/components/properties/PropertyDetailsModal';

const PropertiesPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [virtualTourOpen, setVirtualTourOpen] = useState(false);
  const [tourProperty, setTourProperty] = useState<Property | null>(null);
  const [selectedForComparison, setSelectedForComparison] = useState<Property[]>([]);
  const [showPropertyDetails, setShowPropertyDetails] = useState(false);
  const [detailsProperty, setDetailsProperty] = useState<Property | null>(null);

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

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
    // Scroll to property in the listing
    const propertyElement = document.getElementById(`property-${property.id}`);
    if (propertyElement) {
      propertyElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFavoriteToggle = (propertyId: number) => {
    setFavorites(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handleVirtualTourOpen = (property: Property) => {
    setTourProperty(property);
    setVirtualTourOpen(true);
  };

  const handleVirtualTourClose = () => {
    setVirtualTourOpen(false);
    setTourProperty(null);
  };

  const handleComparisonToggle = (property: Property) => {
    setSelectedForComparison(prev => {
      const isSelected = prev.find(p => p.id === property.id);
      if (isSelected) {
        return prev.filter(p => p.id !== property.id);
      } else if (prev.length < 3) {
        return [...prev, property];
      }
      return prev;
    });
  };

  const handlePropertyDetailsOpen = (property: Property) => {
    setDetailsProperty(property);
    setShowPropertyDetails(true);
  };

  const handlePropertyDetailsClose = () => {
    setShowPropertyDetails(false);
    setDetailsProperty(null);
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

      {/* Property Grid */}
      <PropertyGrid
        properties={filteredProperties}
        loading={loading}
        onPropertySelect={handlePropertySelect}
        onFavoriteToggle={handleFavoriteToggle}
        onVirtualTourOpen={handleVirtualTourOpen}
        onComparisonToggle={handleComparisonToggle}
        onPropertyDetailsOpen={handlePropertyDetailsOpen}
        selectedForComparison={selectedForComparison}
        favorites={favorites}
      />

      {/* Property Stats Dashboard */}
      <PropertyStatsDashboard
        properties={properties}
        filteredProperties={filteredProperties}
      />

      {/* Property Map View */}
      <PropertyMapView
        properties={properties}
        filteredProperties={filteredProperties}
        onPropertySelect={handlePropertySelect}
      />

      {/* Property Calculator */}
      <PropertyCalculator />

      {/* Property Recommendations */}
      <PropertyRecommendations
        properties={properties}
        currentProperty={selectedProperty || undefined}
        onFavoriteToggle={handleFavoriteToggle}
        favorites={favorites}
        userPreferences={{
          priceRange: { min: 400000, max: 2000000 },
          propertyTypes: ['buy', 'rent'],
          locations: ['Downtown', 'Marina District'],
          bedrooms: 3,
          amenities: ['Pool', 'Parking', 'Security']
        }}
      />

      <FeaturedProperties />
      <PropertyComparisonTool
        properties={properties}
        maxComparisons={3}
        selectedProperties={selectedForComparison}
        onSelectionChange={setSelectedForComparison}
      />
      <CTABanner />
      <MeetOurAgents />

      {/* Virtual Tour Modal */}
      {tourProperty && (
        <PropertyVirtualTour
          propertyId={tourProperty.id}
          propertyTitle={tourProperty.title}
          isOpen={virtualTourOpen}
          onClose={handleVirtualTourClose}
        />
      )}

      {/* Property Details Modal */}
      {detailsProperty && (
        <PropertyDetailsModal
          property={detailsProperty}
          isOpen={showPropertyDetails}
          onClose={handlePropertyDetailsClose}
          onFavoriteToggle={handleFavoriteToggle}
          favorites={favorites}
        />
      )}
    </main>
  );
};

export default PropertiesPage;