import { Search } from 'lucide-react';
import { useState, forwardRef } from 'react';
import Button from './Button';
// const Button = forwardRef(
//   ({ className = '', children, ...props }, ref) => {
//     return (
//       <button
//         ref={ref}
//         className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors 
//           focus:outline-none focus:ring-2 focus:ring-offset-2 bg-transparent hover:bg-gray-100 ${className}`}
//         {...props}
//       >
//         {children}
//       </button>
//     );
//   }
// );
// Button.displayName = 'Button';

// Mock Link component for demonstration (replace with actual react-router-dom Link)
const Link = ({ to, children, className }) => (
  <a href={to} className={className}>{children}</a>
);

// Mock UserDropdown component
const UserDropdown = () => (
  <div className="flex items-center space-x-2">
    <Button className="border border-gray-300 rounded-full px-4 py-2">
      <div className="flex items-center space-x-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
      </div>
    </Button>
  </div>
);

export default function Header() {
  const [whereValue, setWhereValue] = useState("vattiyoor");
  const [checkInValue, setCheckInValue] = useState("2025-02-13");
  const [checkOutValue, setCheckOutValue] = useState("2027-12-05");
  
  const handleSearch = () => {
    console.log("handle search!");
  };

  return (
    <header className="p-3 sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-rose-500">
              eBikeRent
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center border border-gray-300 rounded-full pt-2 px-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="px-3 py-1">
                <span className="text-sm font-medium">Where</span>
                <input
                  type="text"
                  placeholder="Search destinations"
                  className="block w-32 text-sm border-0 p-0 placeholder-gray-500 focus:ring-0 focus:outline-none"
                  value={whereValue}
                  onChange={(e) => setWhereValue(e.target.value)}
                />
              </div>
              <div className="border-l border-gray-300 h-6"></div>
              <div className="px-3 py-1">
                <span className="text-sm font-medium">Check in</span>
                <input
                  type="date"
                  className="block w-32 text-sm border-0 p-0 placeholder-gray-500 focus:ring-0 focus:outline-none"
                  value={checkInValue}
                  onChange={(e) => setCheckInValue(e.target.value)}
                />
              </div>
              <div className="border-l border-gray-300 h-6"></div>
              <div className="px-3 py-1">
                <span className="text-sm font-medium">Check out</span>
                <input
                  type="date"
                  className="block w-32 text-sm border-0 p-0 placeholder-gray-500 focus:ring-0 focus:outline-none"
                  value={checkOutValue}
                  onChange={(e) => setCheckOutValue(e.target.value)}
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-rose-500 text-white p-2 rounded-full hover:bg-rose-600 transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right Menu */}
          <div className="flex items-center space-x-4">
            {/* Rent your e-bike - Standalone button */}
            <Link to="/list-bike">
              <Button className="hidden md:block text-sm font-medium">
                Rent your e-bike
              </Button>
            </Link>

            <UserDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}