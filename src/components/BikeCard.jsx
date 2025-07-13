import { Heart, Star, Battery, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { Badge } from './Badge';

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
  } = bike;

  const available = status === 'available';
 const image = Array.isArray(images) && images.length > 0
  ? images[0].image_url
  : '/placeholder.svg';

  return (
    <div className="group cursor-pointer">
      <Link to={`/bikes/${id}`}>
        {/* Image */}
        <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-gray-100">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-3 right-3 rounded-full bg-white/80 hover:bg-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
          {!available && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="secondary" className="bg-white text-black">
                Not Available
              </Badge>
            </div>
          )}
          <Badge className="absolute top-3 left-3 bg-rose-500 capitalize">{bike_type}</Badge>
        </div>

        {/* Details */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {location}
            </p>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 text-yellow-400" />
              <span className="text-sm font-medium">4.8</span>
              <span className="text-sm text-gray-600">(12)</span>
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 group-hover:text-rose-600 transition-colors">
            {title || name}
          </h3>

          <div className="flex items-center text-sm text-gray-600">
            <Battery className="h-3 w-3 mr-1" />
            <span>{battery_range}km range</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="font-semibold text-gray-900">${daily_rate}</span>
              <span className="text-gray-600"> / day</span>
            </div>
            {available && (
              <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
                Book Now
              </Button>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
