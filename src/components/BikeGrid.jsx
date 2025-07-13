// src/components/BikeGrid.jsx
import { ArrowRight, Map } from 'lucide-react';
import { Link } from 'react-router-dom';
import BikeCard from './BikeCard';
import Button from './Button';

// Beautiful e-bike images
const BIKE_IMAGES = [
  'https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=800',  // Road e-bike
  'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=800',  // City e-bike  
  'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800'   // Mountain e-bike
];

const dummyBikes = [
  { 
    id: 1, 
    name: 'Trek Powerfly FS', 
    title: 'Trek Powerfly FS',
    daily_rate: 65, 
    bike_type: 'mountain',
    location: 'San Francisco, CA',
    battery_range: 85,
    rating: 4.9,
    reviews: 24,
    status: 'available',
    image: BIKE_IMAGES[2] // Mountain bike
  },
  { 
    id: 2, 
    name: 'Urban Commuter Pro', 
    title: 'Urban Commuter Pro',
    daily_rate: 45, 
    bike_type: 'commuter',
    location: 'Oakland, CA',
    battery_range: 70,
    rating: 4.7,
    reviews: 18,
    status: 'available',
    image: BIKE_IMAGES[1] // City bike
  },
  { 
    id: 3, 
    name: 'Speed Demon Road', 
    title: 'Speed Demon Road',
    daily_rate: 75, 
    bike_type: 'road',
    location: 'Berkeley, CA',
    battery_range: 90,
    rating: 4.8,
    reviews: 31,
    status: 'available',
    image: BIKE_IMAGES[0] // Road bike
  },
  { 
    id: 4, 
    name: 'City Explorer Elite', 
    title: 'City Explorer Elite',
    daily_rate: 55, 
    bike_type: 'hybrid',
    location: 'Palo Alto, CA',
    battery_range: 75,
    rating: 4.6,
    reviews: 15,
    status: 'available',
    image: BIKE_IMAGES[1] // City bike
  },
  { 
    id: 5, 
    name: 'Mountain Beast Pro', 
    title: 'Mountain Beast Pro',
    daily_rate: 80, 
    bike_type: 'mountain',
    location: 'San Jose, CA',
    battery_range: 95,
    rating: 4.9,
    reviews: 28,
    status: 'available',
    image: BIKE_IMAGES[2] // Mountain bike
  },
  { 
    id: 6, 
    name: 'Lightning Speedster', 
    title: 'Lightning Speedster',
    daily_rate: 70, 
    bike_type: 'road',
    location: 'Marin County, CA',
    battery_range: 88,
    rating: 4.8,
    reviews: 22,
    status: 'available',
    image: BIKE_IMAGES[0] // Road bike
  }
];

export default function BikeGrid() {
  const bikes = dummyBikes;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">E-bikes near you</h2>
        <p className="text-gray-600 text-lg">
          {bikes.length} premium e-bike{bikes.length !== 1 ? 's' : ''} available for rent
        </p>
      </div>

      {bikes.length === 0 ? (
        <div className="text-center py-16">
          <Map className="h-16 w-16 text-gray-400 mx-auto mb-6" />
          <h3 className="text-xl font-medium text-gray-900 mb-3">No bikes found</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Try adjusting your filters or search in a different location to see more results.
          </p>
          <Button variant="outline" asChild>
            <Link to="/bikes" className="inline-flex items-center">
              <ArrowRight className="h-4 w-4 mr-2" />
              Browse all bikes
            </Link>
          </Button>
        </div>
      ) : (
        <>
          {/* Bikes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 mb-12">
            {bikes.map((bike) => (
              <BikeCard key={bike.id} bike={bike} />
            ))}
          </div>
          
          {/* View All Button */}
          <div className="flex justify-center">
            <Button variant="outline" size="lg" asChild className="group">
              <Link to="/bikes" className="inline-flex items-center">
                View all bikes
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}