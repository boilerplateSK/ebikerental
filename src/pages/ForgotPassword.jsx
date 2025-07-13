// src/pages/ForgotPassword.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Loader, CheckCircle } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
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

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const validateEmail = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Implement actual forgot password API call
      console.log('Password reset request for:', email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setEmailSent(true);
      
    } catch (error) {
      console.error('Password reset failed:', error);
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Clear error when user starts typing
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  if (emailSent) {
    return (
      <AuthLayout 
        title="Check your email" 
        subtitle="We've sent a password reset link"
      >
        <div className="text-center space-y-6">
          <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">Email sent!</h3>
            <p className="text-sm text-gray-600">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="text-xs text-gray-500 mt-4">
              Didn't receive the email? Check your spam folder or try again.
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => {
                setEmailSent(false);
                setEmail('');
                setErrors({});
              }}
              variant="outline"
              className="w-full"
            >
              Try different email
            </Button>
            
            <Link to="/login">
              <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white">
                Back to sign in
              </Button>
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Forgot password?" 
      subtitle="No worries, we'll send you reset instructions"
    >
      <div className="space-y-6">
        {/* Back to Login Link */}
        <Link 
          to="/login" 
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to sign in
        </Link>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <Label htmlFor="email">Email address</Label>
            <div className="relative mt-1">
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={handleEmailChange}
                error={errors.email}
                className="pl-10"
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email}</p>
            )}
            <p className="mt-2 text-xs text-gray-500">
              We'll send a password reset link to this email address
            </p>
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
                Sending reset link...
              </>
            ) : (
              'Send reset link'
            )}
          </Button>
        </form>

        {/* Additional Help */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Remember your password?{' '}
            <Link 
              to="/login" 
              className="text-rose-600 hover:text-rose-500 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;