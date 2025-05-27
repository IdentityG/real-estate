export interface Property {
  id: number;
  title: string;
  description: string;
  location: string;
  propertyType: 'buy' | 'rent' | 'commercial' | 'land';
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  amenities: string[];
  images: string[];
  featured: boolean;
  yearBuilt: number | null;
  address: string;
  lotSize?: string;
}

export interface FilterState {
  location: string;
  propertyType: string;
  priceMin: string;
  priceMax: string;
  bedrooms: string;
  bathrooms: string;
  amenities: string[];
}

export const filterProperties = (properties: Property[], filters: FilterState): Property[] => {
  return properties.filter(property => {
    // Location filter
    if (filters.location && property.location !== filters.location) {
      return false;
    }

    // Property type filter
    if (filters.propertyType && property.propertyType !== filters.propertyType) {
      return false;
    }

    // Price range filter
    const minPrice = filters.priceMin ? parseInt(filters.priceMin.replace(/[^\d]/g, '')) : 0;
    const maxPrice = filters.priceMax ? parseInt(filters.priceMax.replace(/[^\d]/g, '')) : Infinity;
    
    if (property.price < minPrice || property.price > maxPrice) {
      return false;
    }

    // Bedrooms filter
    if (filters.bedrooms) {
      const bedroomCount = filters.bedrooms === '5+' ? 5 : parseInt(filters.bedrooms);
      if (filters.bedrooms === '5+') {
        if (property.bedrooms < 5) return false;
      } else {
        if (property.bedrooms !== bedroomCount) return false;
      }
    }

    // Bathrooms filter
    if (filters.bathrooms) {
      const bathroomCount = filters.bathrooms === '5+' ? 5 : parseInt(filters.bathrooms);
      if (filters.bathrooms === '5+') {
        if (property.bathrooms < 5) return false;
      } else {
        if (property.bathrooms !== bathroomCount) return false;
      }
    }

    // Amenities filter
    if (filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every(amenity => 
        property.amenities.includes(amenity)
      );
      if (!hasAllAmenities) return false;
    }

    return true;
  });
};

export const formatPrice = (price: number, propertyType: string): string => {
  if (propertyType === 'rent') {
    return `$${price.toLocaleString()}/month`;
  }
  return `$${price.toLocaleString()}`;
};

export const sortProperties = (properties: Property[], sortBy: 'price-asc' | 'price-desc' | 'newest' | 'featured' = 'featured'): Property[] => {
  return [...properties].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'newest':
        return (b.yearBuilt || 0) - (a.yearBuilt || 0);
      case 'featured':
      default:
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.price - a.price;
    }
  });
};