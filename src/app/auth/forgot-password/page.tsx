'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { authServices } from '../../../services/authServices';
import { showSuccessToast, showErrorToast } from '../../../utils/simpleToast';

export default function ForgotPassword() {
  console.log('🔵 ForgotPassword component mounted');
  
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const router = useRouter();

  console.log('📝 ForgotPassword email:', email);
  console.log('🔄 ForgotPassword loading state:', isLoading);
  console.log('❌ ForgotPassword email error:', emailError);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('🚀 ForgotPassword form submitted');
    e.preventDefault();
    setIsLoading(true);
    setEmailError('');

    // Validate email
    console.log('🔍 Validating forgot password email:', email);
    if (!email.trim()) {
      console.log('❌ Email is required');
      setEmailError('Email is required');
      setIsLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      console.log('❌ Invalid email format');
      setEmailError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      console.log('📤 Sending forgot password request to API');
      // Send forgot password request
      const response = await authServices.forgotPassword(email);
      console.log('✅ ForgotPassword API response:', response);
      
      if (response.success) {
        console.log('🎉 Forgot password OTP sent successfully');
        showSuccessToast('Password reset OTP sent to your email!');
        
        // Store email for OTP verification
        localStorage.setItem('forgotPasswordEmail', email);
        console.log('💾 Stored forgotPasswordEmail in localStorage:', email);
        
        // Navigate to OTP verification page after 2 seconds
        console.log('⏰ Setting timeout to navigate to OTP page in 2 seconds');
        setTimeout(() => {
          console.log('🧭 Navigating to /auth/forgot-password-otp');
          router.push('/auth/forgot-password-otp');
        }, 2000);
      }
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message 
        : 'Failed to send reset OTP. Please try again.';
      showErrorToast(errorMessage || 'Failed to send reset OTP. Please try again.');
      console.error('❌ Forgot password error:', error);
      showErrorToast(error.response?.data?.message || 'Failed to send reset link. Please try again.');
    } finally {
      console.log('🏁 ForgotPassword form submission completed');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-sm text-gray-500 mb-2">Enter your email address and we&apos;ll send you an OTP to reset your password</p>
            <h1 className="text-2xl font-bold text-gray-900">Reset your password</h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  emailError ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError('');
                }}
              />
              {emailError && (
                <p className="mt-1 text-sm text-red-600">{emailError}</p>
              )}
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
                    Sending OTP...
                  </>
                ) : (
                  'Send reset OTP'
                )}
              </button>
            </div>
          </form>

          {/* Back to Login Link */}
          <div className="text-center mt-8">
            <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-semibold">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


