'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { authServices } from '../../../services/authServices';
import { showSuccessToast, showErrorToast } from '../../../utils/simpleToast';

export default function ForgotPasswordOTP() {
  console.log('🔵 ForgotPasswordOTP component mounted');
  
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  console.log('📝 ForgotPasswordOTP OTP:', otp);
  console.log('📧 ForgotPasswordOTP email:', email);
  console.log('🔄 ForgotPasswordOTP loading state:', isLoading);
  console.log('🔄 ForgotPasswordOTP resending state:', isResending);
  console.log('❌ ForgotPasswordOTP OTP error:', otpError);
  
  useEffect(() => {
    console.log('🔍 ForgotPasswordOTP useEffect: Getting email from localStorage');
    // Get email from localStorage
    const forgotPasswordEmail = localStorage.getItem('forgotPasswordEmail');
    console.log('📧 Retrieved forgotPasswordEmail from localStorage:', forgotPasswordEmail);
    if (!forgotPasswordEmail) {
      console.log('❌ No email found, redirecting to forgot password page');
      router.push('/auth/forgot-password');
      return;
    }
    console.log('✅ Setting email state:', forgotPasswordEmail);
    setEmail(forgotPasswordEmail);
  }, [router]);

  const handleOtpChange = (value: string) => {
    console.log('🔢 ForgotPasswordOTP OTP change:', value);
    // Only allow digits and limit to 6 characters
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    setOtp(numericValue);
    console.log('📝 Updated OTP:', numericValue);
    
    // Clear error when user starts typing
    if (otpError) {
      setOtpError('');
    }
  };

  const handleResendOTP = async () => {
    console.log('🔄 ForgotPasswordOTP resend OTP requested');
    setIsResending(true);

    try {
      console.log('📤 Sending resend OTP request to API for email:', email);
      const response = await authServices.forgotPasswordResendOTP(email);
      console.log('✅ Resend OTP API response:', response);
      if (response.success) {
        console.log('🎉 OTP resent successfully');
        showSuccessToast('OTP sent successfully!');
      }
    } catch (error: any) {
      console.error('❌ Resend OTP error:', error);
      showErrorToast(error.response?.data?.message || 'Failed to resend OTP. Please try again.');
    } finally {
      console.log('🏁 Resend OTP request completed');
      setIsResending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('🚀 ForgotPasswordOTP form submitted');
    e.preventDefault();
    setIsLoading(true);
    setOtpError('');

    console.log('🔢 ForgotPasswordOTP OTP string:', otp);
    if (otp.length !== 6) {
      console.log('❌ Incomplete OTP entered');
      setOtpError('Please enter the complete 6-digit OTP');
      setIsLoading(false);
      return;
    }

    try {
      console.log('📤 Sending OTP verification request to API');
      const response = await authServices.forgotPasswordOTP(email, otp);
      console.log('✅ ForgotPasswordOTP verification API response:', response);
      
      if (response.success) {
        console.log('🎉 ForgotPasswordOTP verified successfully');
        
        // Store OTP for reset password page
        localStorage.setItem('forgotPasswordOTP', otp);
        console.log('💾 Stored forgotPasswordOTP in localStorage:', otp);
        
        // Show success message and navigate after 2 seconds
        console.log('⏰ Setting timeout to show success message and navigate in 2 seconds');
        setTimeout(() => {
          setIsLoading(false);
          showSuccessToast('OTP verified successfully!');
          console.log('🧭 Navigating to /auth/reset-password');
          router.push('/auth/reset-password');
        }, 2000);
      }
    } catch (error: any) {
      console.error('❌ OTP verification error:', error);
      showErrorToast(error.response?.data?.message || 'Invalid OTP. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-sm text-gray-500 mb-2">We&apos;ve sent a verification code to</p>
            <p className="text-sm font-semibold text-gray-700 mb-2">{email}</p>
            <h1 className="text-2xl font-bold text-gray-900">Verify your email</h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input */}
            <div>
              <label htmlFor="otp" className="block text-sm font-semibold text-gray-700 mb-2 text-center">
                Enter the 6-digit code
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                maxLength={6}
                suppressHydrationWarning
                className={`w-full px-4 py-3 text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg font-semibold transition-all duration-200 placeholder-gray-400 text-gray-900 tracking-widest ${
                  otpError ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="000000"
                value={otp}
                onChange={(e) => handleOtpChange(e.target.value)}
              />
              {otpError && (
                <p className="mt-2 text-sm text-red-600 text-center">{otpError}</p>
              )}
            </div>

            {/* Resend Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Didn&apos;t receive the code?{' '}
                <button 
                  type="button" 
                  onClick={handleResendOTP}
                  disabled={isResending}
                  className="text-blue-600 hover:text-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isResending ? 'Sending...' : 'Resend'}
                </button>
              </p>
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
                    Verifying...
                  </>
                ) : (
                  'Verify & Continue'
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


