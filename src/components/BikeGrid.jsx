import { ArrowRight, Map } from 'lucide-react';
import { Link } from 'react-router-dom';
import BikeCard from './BikeCard';
import Button from './Button';


const dummyBikes = [
  { id: 1, name: 'Hero Electric', daily_rate: 50, bike_type: 'city' },
  { id: 2, name: 'Ather 450X', daily_rate: 70, bike_type: 'sport' },
  { id: 3, name: 'Ola S1 Pro', daily_rate: 65, bike_type: 'commute' },
  { id: 4, name: 'TVS iQube', daily_rate: 60, bike_type: 'city' },
];

export default function BikeGrid() {
  const bikes = dummyBikes;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">E-bikes near you</h2>
        <p className="text-gray-600">
          {bikes.length} e-bike{bikes.length !== 1 ? 's' : ''} available
        </p>
      </div>

      {bikes.length === 0 ? (
        <div className="text-center py-12">
          <Map className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bikes found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your filters to see more results.</p>
          <Button variant="outline" asChild>
            <Link to="/bikes">Browse all bikes</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bikes.map((bike) => (
              <BikeCard key={bike.id} bike={bike} />
            ))}
          </div>
          <div className="flex justify-center">
            <Button variant="outline" size="sm" asChild className="mt-20">
              <Link to="/bikes">
                <ArrowRight className="h-4 w-4 mr-2" />
                View all bikes
              </Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
