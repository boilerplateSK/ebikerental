// src/components/BikeCard.jsx
import { Heart, Star, Battery, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button from './Button';
import { Badge } from './Badge';

// Beautiful e-bike images
const DEFAULT_BIKE_IMAGES = [
  'https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=800',  // Road e-bike
  'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=800',  // City e-bike  
  'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800'   // Mountain e-bike
];

export default function BikeCard({ bike }) {
  const {
    id,
    title,
    name,
    location,
    daily_rate,
    battery_range,
    bike_type,
    status,
    images,
    image, // Single image field
    rating = 4.8,
    reviews = 12
  } = bike;

  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const available = status === 'available' || status !== 'unavailable';

  // Get image URL with fallback logic
  const getImageUrl = () => {
    // If bike has images array
    if (Array.isArray(images) && images.length > 0) {
      return images[0].image_url || images[0];
    }
    
    // If bike has single image field
    if (image) {
      return image;
    }
    
    // Use default images based on bike ID or type
    const imageIndex = id ? (id - 1) % DEFAULT_BIKE_IMAGES.length : 0;
    return DEFAULT_BIKE_IMAGES[imageIndex];
  };

  const imageUrl = getImageUrl();

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  return (
    <div className="group cursor-pointer">
      <Link to={`/bikes/${id}`}>
        {/* Image */}
        <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-gray-100">
          {/* Loading skeleton */}
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="text-gray-400 text-sm">Loading...</div>
            </div>
          )}
          
          {/* Main image */}
          <img
            src={imageError ? DEFAULT_BIKE_IMAGES[0] : imageUrl}
            alt={title || name}
            className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-300 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
          
          {/* Favorite button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-3 right-3 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm shadow-sm"
            onClick={(e) => {
              e.preventDefault();
              // TODO: Handle favorite toggle
              console.log('Toggle favorite for bike:', id);
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
          
          {/* Availability overlay */}
          {!available && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
              <Badge variant="secondary" className="bg-white text-black font-medium">
                Not Available
              </Badge>
            </div>
          )}
          
          {/* Bike type badge */}
          <Badge className="absolute top-3 left-3 bg-rose-500 text-white capitalize font-medium">
            {bike_type || 'E-bike'}
          </Badge>
        </div>

        {/* Details */}
        <div className="space-y-2">
          {/* Location and Rating */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {location || 'San Francisco'}
            </p>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{rating}</span>
              <span className="text-sm text-gray-600">({reviews})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 group-hover:text-rose-600 transition-colors leading-tight">
            {title || name || 'Premium E-bike'}
          </h3>

          {/* Battery range */}
          <div className="flex items-center text-sm text-gray-600">
            <Battery className="h-3 w-3 mr-1 text-green-600" />
            <span>{battery_range || 80}km range</span>
          </div>

          {/* Price and Book button */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="font-semibold text-gray-900">${daily_rate || 50}</span>
              <span className="text-gray-600 text-sm"> / day</span>
            </div>
            {available && (
              <Button 
                size="sm" 
                className="bg-rose-500 hover:bg-rose-600 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  // TODO: Handle booking
                  console.log('Book bike:', id);
                }}
              >
                Book Now
              </Button>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}