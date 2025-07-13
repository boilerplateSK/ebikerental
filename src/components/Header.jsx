// src/components/Header.jsx
import { Search, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

// Mock authentication state - in real app this would come from context/store
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  
  return {
    isAuthenticated,
    user,
    login: (userData) => {
      setIsAuthenticated(true);
      setUser(userData);
    },
    logout: () => {
      setIsAuthenticated(false);
      setUser(null);
    }
  };
};

// User Dropdown for authenticated users
const UserDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 border border-gray-300 rounded-full px-4 py-2 hover:shadow-md transition-shadow"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
          {user?.firstName?.[0] || 'U'}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          
          <Link 
            to="/profile" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() => setIsOpen(false)}
          >
            Your Profile
          </Link>
          <Link 
            to="/bookings" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() => setIsOpen(false)}
          >
            Your Bookings
          </Link>
          <Link 
            to="/favorites" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() => setIsOpen(false)}
          >
            Saved Bikes
          </Link>
          
          <div className="border-t border-gray-100 mt-2">
            <button
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Authentication buttons for non-authenticated users
const AuthButtons = () => (
  <div className="flex items-center space-x-2">
    <Link to="/login">
      <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
        Sign in
      </Button>
    </Link>
    <Link to="/signup">
      <Button className="bg-rose-500 hover:bg-rose-600 text-white">
        Sign up
      </Button>
    </Link>
  </div>
);

export default function Header() {
  const [whereValue, setWhereValue] = useState("vattiyoor");
  const [checkInValue, setCheckInValue] = useState("2025-02-13");
  const [checkOutValue, setCheckOutValue] = useState("2027-12-05");
  
  const { isAuthenticated, user, logout } = useAuth();
  
  const handleSearch = () => {
    console.log("handle search!");
  };

  return (
    <header className="p-3 sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-rose-500 hover:text-rose-600 transition-colors">
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
            {/* Rent your e-bike - Show only when authenticated or as separate button */}
            <Link to="/list-bike">
              <Button variant="ghost" className="hidden md:block text-sm font-medium text-gray-700 hover:text-gray-900">
                Rent your e-bike
              </Button>
            </Link>

            {/* Authentication State */}
            {isAuthenticated ? (
              <UserDropdown user={user} onLogout={logout} />
            ) : (
              <AuthButtons />
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden mt-4">
          <div className="flex items-center border border-gray-300 rounded-lg p-3 space-x-3">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Where do you want to ride?"
              className="flex-1 text-sm border-0 p-0 placeholder-gray-500 focus:ring-0 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </header>
  );
}