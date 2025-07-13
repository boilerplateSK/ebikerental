// src/pages/Signup.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Loader, Check } from 'lucide-react';
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

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return 0;
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return strength;
  };

  const getPasswordStrengthLabel = () => {
    const strength = getPasswordStrength();
    if (strength < 2) return 'Weak';
    if (strength < 4) return 'Medium';
    return 'Strong';
  };

  const getPasswordStrengthColor = () => {
    const strength = getPasswordStrength();
    if (strength < 2) return 'bg-red-500';
    if (strength < 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Implement actual signup API call
      console.log('Signup attempt:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Handle successful signup (redirect to login or auto-login)
      console.log('Signup successful');
      
    } catch (error) {
      console.error('Signup failed:', error);
      setErrors({ submit: 'An error occurred during signup. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Create account" 
      subtitle="Join thousands of riders on eBikeRent"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="First name"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              error={errors.firstName}
              className="mt-1"
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Last name"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              error={errors.lastName}
              className="mt-1"
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>
            )}
          </div>
        </div>

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
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative mt-1">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
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
          
          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="mt-2">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-1 w-6 rounded-full ${
                        level <= getPasswordStrength() 
                          ? getPasswordStrengthColor() 
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600">
                  {getPasswordStrengthLabel()}
                </span>
              </div>
            </div>
          )}
          
          {errors.password && (
            <p className="mt-1 text-xs text-red-600">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <div className="relative mt-1">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              error={errors.confirmPassword}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
            
            {/* Password Match Indicator */}
            {formData.confirmPassword && formData.password && (
              <div className="absolute inset-y-0 right-10 flex items-center">
                {formData.password === formData.confirmPassword ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : null}
              </div>
            )}
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Terms Agreement */}
        <div>
          <div className="flex items-start">
            <input
              id="agree-terms"
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
              className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded mt-1"
            />
            <Label htmlFor="agree-terms" className="ml-2 text-xs text-gray-600 leading-relaxed">
              I agree to the{' '}
              <Link to="/terms" className="text-rose-600 hover:text-rose-500 underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-rose-600 hover:text-rose-500 underline">
                Privacy Policy
              </Link>
            </Label>
          </div>
          {errors.agreeToTerms && (
            <p className="mt-1 text-xs text-red-600">{errors.agreeToTerms}</p>
          )}
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
              Creating account...
            </>
          ) : (
            'Create account'
          )}
        </Button>
      </form>

      {/* Social Login */}
      <SocialButtons type="signup" />

      {/* Login Link */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="font-medium text-rose-600 hover:text-rose-500"
          >
            Sign in instead
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Signup;