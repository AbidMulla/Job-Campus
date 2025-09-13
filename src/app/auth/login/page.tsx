'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { authServices } from '../../../services/authServices';
import { showSuccessToast, showErrorToast, showWarningToast } from '../../../utils/simpleToast';

export default function Login() {
  console.log('🔵 Login component mounted');
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  console.log('📝 Login form data:', formData);
  console.log('🔄 Login loading state:', isLoading);
  console.log('❌ Login errors:', errors);

  // Load saved credentials on component mount
  useEffect(() => {
    const savedCredentials = localStorage.getItem('rememberedCredentials');
    if (savedCredentials) {
      try {
        const { email, password, timestamp } = JSON.parse(savedCredentials);
        // Check if credentials are still valid (within 30 days)
        const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
        if (Date.now() - timestamp < thirtyDaysInMs) {
          setFormData({ email, password });
          setRememberMe(true);
          console.log('📋 Loaded saved credentials');
        } else {
          // Remove expired credentials
          localStorage.removeItem('rememberedCredentials');
          console.log('🗑️ Removed expired credentials');
        }
      } catch (error) {
        console.error('Error loading saved credentials:', error);
        localStorage.removeItem('rememberedCredentials');
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('🚀 Login form submitted');
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validate form
    const newErrors: {[key: string]: string} = {};
    console.log('🔍 Validating login form data:', formData);
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      console.log('❌ Login validation errors:', newErrors);
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      console.log('📤 Sending login request to API');
      // Login user
      const response = await authServices.login(formData.email, formData.password);
      console.log('✅ Login API response:', response);
      
      if (response.success) {
        console.log('🎉 Login successful, checking user status');
        
        // Handle remember me functionality
        if (rememberMe) {
          const credentialsToSave = {
            email: formData.email,
            password: formData.password,
            timestamp: Date.now()
          };
          localStorage.setItem('rememberedCredentials', JSON.stringify(credentialsToSave));
          console.log('💾 Saved credentials for 30 days');
        } else {
          // Remove saved credentials if remember me is unchecked
          localStorage.removeItem('rememberedCredentials');
          console.log('🗑️ Removed saved credentials');
        }
        
        // Check if user is active
        if (response.data?.user?.is_active) {
          console.log('✅ User is active, redirecting to dashboard');
          showSuccessToast('Login successful! Welcome back!');
          // Redirect to dashboard
          console.log('🧭 Navigating to /user/dashboard');
          router.push('/user/dashboard');
          setIsLoading(false);
        } else {
          console.log('⚠️ User account not activated, redirecting to activation OTP page');
          showErrorToast('Account not activated. Please activate your account first.');
          // User is not active, redirect to active account OTP page
          localStorage.setItem('activateAccountEmail', formData.email);
          console.log('💾 Stored activateAccountEmail in localStorage:', formData.email);
          
          // Keep loading state active and redirect after delay
          setTimeout(() => {
            console.log('🧭 Navigating to /auth/active-account-otp');
            router.push('/auth/active-account-otp');
          }, 1500);
          // Don't set loading to false here - keep it active during redirect
          return;
        }
      }
    } catch (error: any) {
      console.error('❌ Login error:', error);
      console.log('🔍 Error response data:', error.response?.data);
      
      // Check if the error is due to inactive account
      if (error.response?.data?.message?.toLowerCase().includes('not active') || 
          error.response?.data?.message?.toLowerCase().includes('inactive') ||
          error.response?.data?.message?.toLowerCase().includes('activate')) {
        console.log('⚠️ Account not active detected in error response');
        showWarningToast('Account not activated. Please activate your account first.');
        localStorage.setItem('activateAccountEmail', formData.email);
        console.log('💾 Stored activateAccountEmail in localStorage:', formData.email);
        
        // Keep loading state active and redirect after delay
        setTimeout(() => {
          console.log('🧭 Navigating to /auth/active-account-otp');
          router.push('/auth/active-account-otp');
        }, 1500);
        // Don't set loading to false here - keep it active during redirect
        return;
      } else {
        const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
        showErrorToast(errorMessage);
        setIsLoading(false);
      }
    } finally {
      console.log('🏁 Login form submission completed');
      // Only set loading to false if we're not redirecting to active-account-otp
      // (loading will be kept active during redirect)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          {/* Home Link */}
          <div className="text-center mb-6">
            <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
              ← Back to Home
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-sm text-gray-500 mb-2">Please enter your details</p>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                suppressHydrationWarning
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 text-gray-900 ${
                  errors.email ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({...formData, email: e.target.value});
                  if (errors.email) setErrors({...errors, email: ''});
                }}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            
            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className={`w-full px-4 py-2 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 text-gray-900 ${
                    errors.password ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({...formData, password: e.target.value});
                    if (errors.password) setErrors({...errors, password: ''});
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Icon 
                    icon={showPassword ? "mdi:eye-off" : "mdi:eye"} 
                    className="w-5 h-5" 
                  />
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-600">
                  Remember for 30 days
                </label>
              </div>
              <div className="text-sm">
                <Link href="/auth/forgot-password" className="text-blue-600 hover:text-blue-700 font-medium">
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Icon icon="line-md:loading-loop" className="w-5 h-5 mr-2" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/auth/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


