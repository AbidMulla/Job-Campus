'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { authServices } from '../../../services/authServices';

export default function ActiveAccount() {
  console.log('🔵 ActiveAccount component mounted');
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  console.log('📝 ActiveAccount OTP:', otp);
  console.log('📧 ActiveAccount email:', email);
  console.log('🔄 ActiveAccount loading state:', isLoading);
  console.log('🔄 ActiveAccount resending state:', isResending);
  console.log('❌ ActiveAccount error:', error);
  console.log('✅ ActiveAccount success:', success);

  useEffect(() => {
    console.log('🔍 ActiveAccount useEffect: Getting email from localStorage or URL params');
    // Get email from localStorage or URL params
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    const storedEmail = localStorage.getItem('activateAccountEmail');
    
    console.log('📧 Email from URL params:', emailParam);
    console.log('📧 Email from localStorage:', storedEmail);
    
    const userEmail = emailParam || storedEmail;
    
    if (!userEmail) {
      console.log('❌ No email found, redirecting to login page');
      router.push('/auth/login');
      return;
    }
    
    console.log('✅ Setting email state:', userEmail);
    setEmail(userEmail);
    
    // Store email in localStorage if it came from URL
    if (emailParam && !storedEmail) {
      console.log('💾 Storing email from URL params in localStorage:', emailParam);
      localStorage.setItem('activateAccountEmail', emailParam);
    }
  }, [router]);

  const handleOtpChange = (index: number, value: string) => {
    console.log(`🔢 ActiveAccount OTP change at index ${index}:`, value);
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      console.log('📝 Updated OTP array:', newOtp);
      
      // Auto-focus next input
      if (value && index < 5) {
        console.log(`🎯 Auto-focusing next input at index ${index + 1}`);
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleResendOTP = async () => {
    console.log('🔄 ActiveAccount resend OTP requested');
    setIsResending(true);
    setError('');
    setSuccess('');

    try {
      console.log('📤 Sending resend activation OTP request to API for email:', email);
      const response = await authServices.activateAccountResendOTP(email);
      console.log('✅ Resend activation OTP API response:', response);
      if (response.success) {
        console.log('🎉 Activation OTP resent successfully');
        setSuccess('Activation OTP sent successfully!');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error: any) {
      console.error('❌ Resend activation OTP error:', error);
      setError(error.response?.data?.message || 'Failed to resend activation OTP. Please try again.');
    } finally {
      console.log('🏁 Resend activation OTP request completed');
      setIsResending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('🚀 ActiveAccount form submitted');
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const otpString = otp.join('');
      console.log('🔢 ActiveAccount OTP string:', otpString);
      if (otpString.length !== 6) {
        console.log('❌ Incomplete OTP entered');
        setError('Please enter the complete 6-digit OTP');
        return;
      }

      console.log('📤 Sending account activation request to API');
      // For account activation, we'll use the registerOTP endpoint since it activates the account
      const response = await authServices.registerOTP(email, otpString);
      console.log('✅ ActiveAccount activation API response:', response);
      
      if (response.success) {
        console.log('🎉 Account activated successfully');
        setSuccess('Account activated successfully!');
        
        // Clear activation email from localStorage
        localStorage.removeItem('activateAccountEmail');
        console.log('🗑️ Cleared activateAccountEmail from localStorage');
        
        // Redirect to login page
        console.log('⏰ Setting timeout to navigate to login page in 2 seconds');
        setTimeout(() => {
          console.log('🧭 Navigating to /auth/login');
          router.push('/auth/login');
        }, 2000);
      }
    } catch (error: any) {
      console.error('❌ Account activation error:', error);
      setError(error.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      console.log('🏁 ActiveAccount form submission completed');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <Icon icon="mdi:account-check" className="w-16 h-16 text-blue-600 mx-auto" />
            </div>
            <p className="text-sm text-gray-500 mb-2">Activate your account for</p>
            <p className="text-sm font-semibold text-gray-700 mb-2">{email}</p>
            <h1 className="text-2xl font-bold text-gray-900">Activate Account</h1>
          </div>


          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-600">{success}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4 text-center">
                Enter the 6-digit activation code
              </label>
              <div className="flex justify-center space-x-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    className="w-12 h-12 text-center border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg font-semibold transition-all duration-200 placeholder-gray-400 text-gray-900"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                  />
                ))}
              </div>
            </div>

            {/* Info Message */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <Icon icon="mdi:information" className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Account Activation Required</p>
                  <p>Please enter the activation code sent to your email to complete your account setup.</p>
                </div>
              </div>
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
                    Activating...
                  </>
                ) : (
                  'Activate Account'
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
