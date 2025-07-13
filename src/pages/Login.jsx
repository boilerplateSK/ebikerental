// src/pages/Login.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Loader } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import SocialButtons from '../components/SocialButtons';
import Button from '../components/Button';

// Mock Input component matching your existing style
const Input = ({ className = '', type = 'text', error, ...props }) => (
  <input
    type={type}
    className={`flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all ${
      error ? 'border-red-500 focus:ring-red-500' : ''
    } ${className}`}
    {...props}
  />
);

const Label = ({ children, htmlFor, className = '' }) => (
  <label htmlFor={htmlFor} className={`text-sm font-medium text-gray-700 ${className}`}>
    {children}
  </label>
);

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Implement actual login API call
      console.log('Login attempt:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Handle successful login (store token, redirect)
      console.log('Login successful');
      
    } catch (error) {
      console.error('Login failed:', error);
      setErrors({ submit: 'Invalid email or password. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Sign in to your account to continue"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={errors.email}
            className="mt-1"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative mt-1">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              error={errors.password}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-2 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
              className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
            />
            <Label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
              Remember me
            </Label>
          </div>

          <Link 
            to="/forgot-password" 
            className="text-sm text-rose-600 hover:text-rose-500 font-medium"
          >
            Forgot your password?
          </Link>
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-800">{errors.submit}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign in'
          )}
        </Button>
      </form>

      {/* Social Login */}
      <SocialButtons type="login" />

      {/* Sign Up Link */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link 
            to="/signup" 
            className="font-medium text-rose-600 hover:text-rose-500"
          >
            Create one now
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;