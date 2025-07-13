import { useState, useEffect } from 'react';
import { Grid, List, SlidersHorizontal, Search, Loader } from 'lucide-react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import BikeCard from '../components/BikeCard';


// Mock shadcn/ui components
const Button = ({ children, variant = 'default', size = 'default', className = '', onClick, ...props }) => {
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
      className={`${baseClass} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ className = '', ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${className}`}
    {...props}
  />
);

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/80 bg-gray-900 text-white',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 bg-gray-100 text-gray-900'
  };
  
  return (
    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

const Slider = ({ value, onValueChange, min = 0, max = 100, step = 1, className = '' }) => {
  const handleChange = (e) => {
    const newValue = [parseInt(e.target.value), value[1]];
    onValueChange(newValue);
  };
  
  const handleChange2 = (e) => {
    const newValue = [value[0], parseInt(e.target.value)];
    onValueChange(newValue);
  };
  
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={handleChange}
        className="flex-1"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[1]}
        onChange={handleChange2}
        className="flex-1"
      />
    </div>
  );
};

const Select = ({ children, value, onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      {children}
    </div>
  );
};

const SelectTrigger = ({ children, className = '' }) => (
  <button className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 ${className}`}>
    {children}
  </button>
);

const SelectValue = ({ placeholder }) => <span className="text-gray-500">{placeholder}</span>;

const SelectContent = ({ children }) => (
  <div className="relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md border-gray-200 bg-white">
    {children}
  </div>
);

const SelectItem = ({ children, value }) => (
  <div className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground hover:bg-gray-100">
    {children}
  </div>
);

const DropdownMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return <div className="relative">{children}</div>;
};

const DropdownMenuTrigger = ({ children, asChild }) => children;

const DropdownMenuContent = ({ children, className = '' }) => (
  <div className={`z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md border-gray-200 bg-white ${className}`}>
    {children}
  </div>
);

const DropdownMenuLabel = ({ children }) => (
  <div className="px-2 py-1.5 text-sm font-semibold">{children}</div>
);

const DropdownMenuSeparator = () => (
  <div className="-mx-1 my-1 h-px bg-muted bg-gray-200"></div>
);

// Mock components



// Create a simple map icon component
const MapIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);

const BikeMap = ({ bikes }) => (
  <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
    <div className="text-center">
      <MapIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
      <p className="text-gray-500">Map view showing {bikes.length} bikes</p>
    </div>
  </div>
);

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-center items-center space-x-2">
    <Button
      variant="outline"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      Previous
    </Button>
    <span className="px-4 py-2 text-sm text-gray-600">
      Page {currentPage} of {totalPages}
    </span>
    <Button
      variant="outline"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Next
    </Button>
  </div>
);

// Mock data and constants
const BIKE_TYPES_WITH_ALL = [
  'All Types',
  'Mountain',
  'Road',
  'Hybrid',
  'Electric',
  'Commuter',
  'Folding'
];

const mockBikes = [
  {
    id: 1,
    name: 'Trek Mountain Explorer',
    type: 'Mountain',
    location: 'San Francisco',
    daily_rate: 45,
    rating: 4.8,
    image: '/api/placeholder/400/300'
  },
  {
    id: 2,
    name: 'City Cruiser Pro',
    type: 'Commuter',
    location: 'Oakland',
    daily_rate: 35,
    rating: 4.5,
    image: '/api/placeholder/400/300'
  },
  {
    id: 3,
    name: 'Electric Speedster',
    type: 'Electric',
    location: 'Berkeley',
    daily_rate: 65,
    rating: 4.9,
    image: '/api/placeholder/400/300'
  },
  {
    id: 4,
    name: 'Folding Compact',
    type: 'Folding',
    location: 'Palo Alto',
    daily_rate: 40,
    rating: 4.6,
    image: '/api/placeholder/400/300'
  },
  {
    id: 5,
    name: 'Road Runner Elite',
    type: 'Road',
    location: 'San Jose',
    daily_rate: 55,
    rating: 4.7,
    image: '/api/placeholder/400/300'
  },
  {
    id: 6,
    name: 'Hybrid Adventure',
    type: 'Hybrid',
    location: 'Marin County',
    daily_rate: 50,
    rating: 4.4,
    image: '/api/placeholder/400/300'
  }
];

const Bikes = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    priceRange: [10, 200],
    batteryRange: [20, 200],
    location: '',
    sortBy: 'relevance',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [filteredBikes, setFilteredBikes] = useState(mockBikes);

  const itemsPerPage = 8;
  const locations = [
    'All Locations',
    'San Francisco',
    'Oakland',
    'Berkeley',
    'Palo Alto',
    'San Jose',
    'Marin County',
  ];

  // Filter bikes based on current filters
  useEffect(() => {
    let filtered = mockBikes;
    
    if (filters.search) {
      filtered = filtered.filter(bike => 
        bike.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        bike.location.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    if (filters.type && filters.type !== 'All Types') {
      filtered = filtered.filter(bike => bike.type === filters.type);
    }
    
    if (filters.location && filters.location !== 'All Locations') {
      filtered = filtered.filter(bike => bike.location === filters.location);
    }
    
    filtered = filtered.filter(bike => 
      bike.daily_rate >= filters.priceRange[0] && 
      bike.daily_rate <= filters.priceRange[1]
    );
    
    setFilteredBikes(filtered);
  }, [filters]);

  const totalCount = filteredBikes.length;
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBikes = filteredBikes.slice(startIndex, endIndex);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Search & Filter Bar */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search e-bikes..."
                className="pl-10"
                value={filters.search}
                onChange={(e) => handleFilterChange({ search: e.target.value })}
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-2">
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange({ type: e.target.value })}
                className="w-40 h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {BIKE_TYPES_WITH_ALL.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <select
                value={filters.location}
                onChange={(e) => handleFilterChange({ location: e.target.value })}
                className="w-40 h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>

              <div className="relative">
                <Button variant="outline">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>

              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
                className="w-40 h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                size="sm"
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                onClick={() => setViewMode('grid')}
                className="h-8"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                onClick={() => setViewMode('list')}
                className="h-8"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'map' ? 'default' : 'ghost'}
                onClick={() => setViewMode('map')}
                className="h-8"
              >
                <MapIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex items-center space-x-2 mt-4">
            {filters.search && (
              <Badge variant="secondary" className="flex items-center">
                Search: {filters.search}
                <button
                  onClick={() => handleFilterChange({ search: '' })}
                  className="ml-2 hover:text-gray-700"
                >
                  ×
                </button>
              </Badge>
            )}
            {filters.type && filters.type !== 'All Types' && (
              <Badge variant="secondary" className="flex items-center">
                Type: {filters.type}
                <button
                  onClick={() => handleFilterChange({ type: '' })}
                  className="ml-2 hover:text-gray-700"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">E-bikes for rent</h1>
            <p className="text-gray-600">
              {totalCount} bikes available
              {totalPages > 1 && (
                <span className="ml-2 text-sm">
                  • Page {currentPage} of {totalPages}
                </span>
              )}
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="h-8 w-8 animate-spin text-gray-500" />
            <span className="ml-2 text-gray-500">Loading bikes...</span>
          </div>
        ) : viewMode === 'map' ? (
          <BikeMap bikes={currentBikes} />
        ) : (
          <>
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
              }
            >
              {currentBikes.length > 0 ? (
                currentBikes.map((bike) => <BikeCard key={bike.id} bike={bike} />)
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">No bikes found matching your criteria.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 mb-8">
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Bikes;