import { useState } from 'react';
import {
    ArrowLeft,
    Heart,
    Share2,
    Star,
    MapPin,
    Battery,
    Users,
    Calendar,
    Clock,
    Shield,
    Wifi,
    ChevronLeft,
    ChevronRight,
    Loader,
    Copy,
    Facebook,
    Twitter,
    Mail,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookingProcess from '../components/BookingProcess';

// Mock shadcn/ui components
const Button = ({ children, variant = 'default', size = 'default', className = '', onClick, disabled, ...props }) => {
  const baseClass = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90 bg-gray-900 text-white hover:bg-gray-800',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground border-gray-300 hover:bg-gray-50',
    ghost: 'hover:bg-accent hover:text-accent-foreground hover:bg-gray-100',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 bg-gray-100 text-gray-900 hover:bg-gray-200'
  };
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-8 px-3 text-sm',
    lg: 'h-11 px-8'
  };
  
  return (
    <button
      className={`${baseClass} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, className = '' }) => (
  <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors bg-gray-900 text-white ${className}`}>
    {children}
  </div>
);

const Card = ({ children, className = '' }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm border-gray-200 bg-white ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const Input = ({ className = '', ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${className}`}
    {...props}
  />
);

const Label = ({ children, htmlFor, className = '' }) => (
  <label htmlFor={htmlFor} className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}>
    {children}
  </label>
);

const Dialog = ({ children, open, onOpenChange }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        {children}
      </div>
    </div>
  );
};

const DialogContent = ({ children, className = '' }) => (
  <div className={`${className}`}>
    {children}
  </div>
);

const DialogHeader = ({ children }) => (
  <div className="p-6 pb-4">
    {children}
  </div>
);

const DialogTitle = ({ children }) => (
  <h3 className="text-lg font-semibold">{children}</h3>
);

const Link = ({ to, children, className = '' }) => (
  <a href={to} className={className}>{children}</a>
);

// Beautiful e-bike images for gallery
const BIKE_IMAGES = [
  'https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=800',  // Road e-bike
  'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=800',  // City e-bike  
  'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800'   // Mountain e-bike
];

// Mock data
const mockBike = {
  id: 1,
  title: 'Premium Electric Mountain Bike',
  bike_type: 'mountain',
  location: 'San Francisco, CA',
  daily_rate: 65,
  hourly_rate: 15,
  battery_range: 80,
  max_speed: 28,
  weight: 25,
  description: 'Experience the perfect blend of power and comfort with this premium electric mountain bike. Featuring a high-capacity battery, robust motor, and premium components, this e-bike is ideal for both urban commuting and off-road adventures.',
  images: [
    { image_url: BIKE_IMAGES[2] }, // Main mountain bike image
    { image_url: BIKE_IMAGES[0] }, // Road bike angle
    { image_url: BIKE_IMAGES[1] }  // City bike perspective
  ],
  features: [
    'Helmet Included',
    'Charger Provided',
    'GPS Tracking',
    'Phone Mount',
    'Water Bottle Holder',
    'LED Lights'
  ],
  owner: {
    first_name: 'John',
    last_name: 'Doe'
  }
};

const mockRatingStats = {
  average_rating: 4.8,
  total_ratings: 24
};

// Mock hooks
const useBike = (id) => ({
  data: { data: mockBike },
  isLoading: false,
  error: null
});

const useIsFavorite = (id) => ({
  data: { data: { is_favorite: false } }
});

const useBikeRatingStats = (id) => ({
  data: { data: { statistics: mockRatingStats } }
});

const useToggleFavorite = () => ({
  mutate: (id) => console.log('Toggle favorite for bike:', id),
  isPending: false
});

const getBikeTypeLabel = (type) => {
  const labels = {
    mountain: 'Mountain Bike',
    road: 'Road Bike',
    hybrid: 'Hybrid Bike',
    electric: 'Electric Bike',
    commuter: 'Commuter Bike',
    folding: 'Folding Bike'
  };
  return labels[type] || 'E-Bike';
};

const toast = {
  success: (message) => console.log('Success:', message)
};

const RatingsList = ({ bikeId, bikeTitle, maxDisplay }) => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Reviews ({mockRatingStats.total_ratings})</h2>
    <div className="space-y-4">
      {[1, 2, 3].map((review) => (
        <div key={review} className="border-b border-gray-200 pb-4">
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-4 w-4 fill-current text-yellow-400" />
              ))}
            </div>
            <span className="ml-2 font-medium">Jane Smith</span>
            <span className="ml-2 text-gray-500 text-sm">2 weeks ago</span>
          </div>
          <p className="text-gray-700">Great bike! Really enjoyed the ride. The battery life was excellent and the bike was very comfortable.</p>
        </div>
      ))}
    </div>
  </div>
);

const BikeDetails = () => {
  // Mock useParams
  const bikeId = 1;
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [showBookingProcess, setShowBookingProcess] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Fetch bike data from API
  const { data: bikeResponse, isLoading, error } = useBike(bikeId);
  const bike = bikeResponse?.data;

  // Fetch favorite status
  const { data: favoriteResponse } = useIsFavorite(bikeId);
  const isFavorite = favoriteResponse?.data?.is_favorite || false;

  // Fetch rating statistics
  const { data: ratingStatsResponse } = useBikeRatingStats(bikeId);
  const ratingStats = ratingStatsResponse?.data?.statistics;

  // Toggle favorite mutation
  const toggleFavoriteMutation = useToggleFavorite();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-96">
          <Loader className="h-8 w-8 animate-spin text-rose-500" />
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !bike) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Bike not found</h2>
            <p className="text-gray-600 mb-6">
              The bike you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/bikes">
              <Button className="bg-rose-500 hover:bg-rose-600">Browse All Bikes</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % bike.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + bike.images.length) % bike.images.length);
  };

  // Handle sharing functionality
  const handleShare = (method) => {
    const url = window.location.href;
    const text = `Check out this amazing e-bike: ${bike.title}`;

    switch (method) {
      case 'copy':
        navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
          '_blank',
        );
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`, '_blank');
        break;
    }
    setShowShareModal(false);
  };

  // Use actual rating data or fallback
  const rating = ratingStats?.average_rating || 0;
  const reviewsCount = ratingStats?.total_ratings || 0;
  const hostName =
    bike.owner?.first_name && bike.owner?.last_name
      ? `${bike.owner.first_name} ${bike.owner.last_name}`
      : 'Bike Owner';
  const pricePerDay = bike.daily_rate || 45;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <Link to="/bikes" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to list
        </Link>

        {/* Title and Actions */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-rose-500">{getBikeTypeLabel(bike.bike_type)}</Badge>
              {reviewsCount > 0 && (
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-current text-yellow-400" />
                  <span className="ml-1 font-medium">{rating.toFixed(1)}</span>
                  <span className="text-gray-600 ml-1">({reviewsCount} reviews)</span>
                </div>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{bike.title}</h1>
            <p className="text-gray-600 flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {bike.location}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setShowShareModal(true)}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleFavoriteMutation.mutate(bikeId)}
              disabled={toggleFavoriteMutation.isPending}
            >
              <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              {isFavorite ? 'Saved' : 'Save'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            {/* Enhanced Image Gallery */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-8 bg-gray-100 shadow-lg">
              <img
                src={
                  bike.images.length > 0
                    ? bike.images[currentImageIndex].image_url
                    : BIKE_IMAGES[0]
                }
                alt={bike.title}
                className="w-full h-full object-cover transition-all duration-500"
                onError={(e) => {
                  e.target.src = BIKE_IMAGES[0]; // Fallback to first default image
                }}
              />
              
              {/* Image Counter */}
              <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                {currentImageIndex + 1} / {bike.images.length}
              </div>
              
              {bike.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-700" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-700" />
                  </button>
                  
                  {/* Image indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {bike.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          index === currentImageIndex 
                            ? 'bg-white shadow-lg scale-110' 
                            : 'bg-white/60 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
              
              {/* Gradient overlay for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Thumbnail Gallery */}
            {bike.images.length > 1 && (
              <div className="grid grid-cols-3 gap-4 mb-8">
                {bike.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-[4/3] rounded-lg overflow-hidden transition-all duration-200 ${
                      index === currentImageIndex 
                        ? 'ring-2 ring-rose-500 scale-105' 
                        : 'hover:scale-105 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image.image_url}
                      alt={`${bike.title} - View ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = BIKE_IMAGES[index % BIKE_IMAGES.length];
                      }}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Enhanced Host Info */}
            <div className="flex items-center justify-between p-6 border border-gray-200 rounded-xl mb-8 bg-gray-50/50">
              <div className="flex items-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white font-semibold text-lg mr-4 shadow-lg">
                  {hostName.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Hosted by {hostName}</h3>
                  <p className="text-sm text-gray-600">E-bike Owner • Member since 2024</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600 ml-1">Verified Host</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="hover:bg-rose-50 hover:border-rose-300">
                Contact Host
              </Button>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">About this e-bike</h2>
              <p className="text-gray-700 leading-relaxed">
                {bike.description ||
                  'This premium electric bike offers a smooth, comfortable ride with excellent battery life. Perfect for city commuting and leisure rides.'}
              </p>
            </div>

            {/* Specifications */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Specifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <Battery className="h-6 w-6 mx-auto mb-2 text-green-600" />
                  <p className="font-semibold">{bike.battery_range}km</p>
                  <p className="text-sm text-gray-600">Range</p>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <p className="font-semibold">{bike.max_speed}km/h</p>
                  <p className="text-sm text-gray-600">Max Speed</p>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <Users className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                  <p className="font-semibold">{bike.weight}kg</p>
                  <p className="text-sm text-gray-600">Weight</p>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <Shield className="h-6 w-6 mx-auto mb-2 text-red-600" />
                  <p className="font-semibold">Class 2</p>
                  <p className="text-sm text-gray-600">E-bike Type</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">What's included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bike.features && bike.features.length > 0 ? (
                  bike.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Wifi className="h-5 w-5 mr-3 text-green-600" />
                      <span>{feature}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 mr-3 text-green-600" />
                      <span>Helmet Included</span>
                    </div>
                    <div className="flex items-center">
                      <Battery className="h-5 w-5 mr-3 text-green-600" />
                      <span>Charger Provided</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mb-8">
              <RatingsList bikeId={bikeId} bikeTitle={bike.title} maxDisplay={5} />
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-2xl font-bold">${pricePerDay}</span>
                    <span className="text-gray-600"> / day</span>
                  </div>
                  {reviewsCount > 0 && (
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-current text-yellow-400" />
                      <span className="ml-1 font-medium">{rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="checkin">Check-in</Label>
                      <Input
                        id="checkin"
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="checkout">Check-out</Label>
                      <Input
                        id="checkout"
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="guests">Guests</Label>
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      max="4"
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <Button
                  className="w-full bg-rose-500 hover:bg-rose-600 mb-4"
                  onClick={() => setShowBookingProcess(true)}
                >
                  Reserve
                </Button>

                <p className="text-center text-sm text-gray-600">You won't be charged yet</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Process Modal */}
      {showBookingProcess && (
        <BookingProcess
          bikeId={bikeId}
          bikeTitle={bike.title}
          hourlyRate={bike.hourly_rate}
          dailyRate={bike.daily_rate}
          onClose={() => setShowBookingProcess(false)}
          onSuccess={(bookingId) => {
            setShowBookingProcess(false);
            toast.success('Booking request submitted successfully!');
          }}
        />
      )}

      {/* Share Modal */}
      <Dialog open={showShareModal} onOpenChange={setShowShareModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share this bike</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4 px-6 pb-6">
            <Button
              variant="outline"
              onClick={() => handleShare('copy')}
              className="flex items-center justify-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Copy Link
            </Button>
            <Button
              variant="outline"
              onClick={() => handleShare('facebook')}
              className="flex items-center justify-center gap-2"
            >
              <Facebook className="h-4 w-4" />
              Facebook
            </Button>
            <Button
              variant="outline"
              onClick={() => handleShare('twitter')}
              className="flex items-center justify-center gap-2"
            >
              <Twitter className="h-4 w-4" />
              Twitter
            </Button>
            <Button
              variant="outline"
              onClick={() => handleShare('email')}
              className="flex items-center justify-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Email
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default BikeDetails;