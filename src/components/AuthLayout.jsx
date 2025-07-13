// src/components/AuthLayout.jsx
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-white/10 rounded-full animate-bounce delay-700"></div>
      </div>

      <div className="relative z-10 max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="text-4xl font-bold text-white hover:text-yellow-200 transition-colors">
            eBikeRent
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm text-white/80">
              {subtitle}
            </p>
          )}
        </div>

        {/* Form Container */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;