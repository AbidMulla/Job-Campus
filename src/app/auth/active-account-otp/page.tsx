'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { authServices } from '../../../services/authServices';
import { showSuccessToast, showErrorToast } from '../../../utils/simpleToast';

export default function ActiveAccountOTP() {
  console.log('🔵 ActiveAccountOTP component mounted');
  
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const router = useRouter();

  console.log('🔢 ActiveAccountOTP OTP:', otp);
  console.log('📧 ActiveAccountOTP email:', email);
  console.log('🔄 ActiveAccountOTP loading state:', isLoading);

  // Load email from localStorage on component mount and send OTP
  useEffect(() => {
    const savedEmail = localStorage.getItem('activateAccountEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      console.log('📧 Loaded email from localStorage:', savedEmail);
      
      // Automatically send activation OTP when component mounts
      const sendActivationOTP = async () => {
        try {
          console.log('📤 Auto-sending activation OTP to:', savedEmail);
          const response = await authServices.activateAccount(savedEmail);
          if (response.success) {
            console.log('✅ Activation OTP sent successfully');
            showSuccessToast('Activation OTP sent to your email!');
          }
        } catch (error: any) {
          console.error('❌ Failed to send activation OTP:', error);
          showErrorToast(error.response?.data?.message || 'Failed to send activation OTP. Please try again.');
        }
      };
      
      sendActivationOTP();
    } else {
      console.log('⚠️ No email found in localStorage, redirecting to login');
      router.push('/auth/login');
    }
  }, [router]);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow 6 digits
    if (value.length <= 6 && /^\d*$/.test(value)) {
      setOtp(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('🚀 ActiveAccountOTP form submitted');
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate OTP
      console.log('🔍 Validating ActiveAccountOTP:', otp);
      if (!otp || otp.length !== 6) {
        console.log('❌ OTP is required and must be 6 digits');
        showErrorToast('Please enter a valid 6-digit OTP');
        setIsLoading(false);
        return;
      }

      if (!email) {
        console.log('❌ Email not found');
        showErrorToast('Email not found. Please try again.');
        setIsLoading(false);
        return;
      }

      console.log('📤 Sending activation OTP verification request to API');
      // Verify activation OTP
      const response = await authServices.activateAccountOTP(email, otp);
      console.log('✅ ActiveAccountOTP API response:', response);
      
      if (response.success) {
        console.log('🎉 Account activated successfully');
        
        // Clear stored email
        localStorage.removeItem('activateAccountEmail');
        console.log('🗑️ Removed activateAccountEmail from localStorage');
        
        // Show success message and redirect to login after 2 seconds
        console.log('⏰ Setting timeout to show success message and navigate in 2 seconds');
        setTimeout(() => {
          setIsLoading(false);
          showSuccessToast('Account activated successfully! You can now login.');
          console.log('🧭 Navigating to /auth/login');
          router.push('/auth/login');
        }, 2000);
      }
    } catch (error: any) {
      console.error('❌ Activate account OTP verification error:', error);
      showErrorToast(error.response?.data?.message || 'Invalid OTP. Please try again.');
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    console.log('🔄 Resending activation OTP');
    if (!email) {
      showErrorToast('Email not found. Please try again.');
      return;
    }

    
    try {
      setIsLoading(true);
      const response = await authServices.activateAccountResendOTP(email);
      if (response.success) {
        showSuccessToast('Activation OTP sent to your email!');
      }
    } catch (error: any) {
      console.error('❌ Resend OTP error:', error);
      showErrorToast(error.response?.data?.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Icon icon="mdi:shield-check" className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-sm text-gray-500 mb-2">Enter the 6-digit code sent to your email</p>
            <h1 className="text-2xl font-bold text-gray-900">Activate Your Account</h1>
          </div>

          {/* Info Message */}
          <div className="mb-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start">
              <Icon icon="mdi:information" className="w-5 h-5 text-orange-600 mt-0.5 mr-2 flex-shrink-0" />
              <div className="text-sm text-orange-800">
                <p className="font-medium mb-1">Account Activation Required</p>
                <p>We've sent a 6-digit activation code to <strong>{email}</strong>. Enter the code below to activate your account.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Field */}
            <div>
              <label htmlFor="otp" className="block text-sm font-semibold text-gray-700 mb-2">
                Activation Code
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                maxLength={6}
                required
                suppressHydrationWarning
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 text-gray-900 text-center text-2xl tracking-widest"
                placeholder="000000"
                value={otp}
                onChange={handleOtpChange}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isLoading || otp.length !== 6}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                  isLoading || otp.length !== 6
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Icon icon="mdi:loading" className="w-5 h-5 mr-2 animate-spin" />
                    Verifying...
                  </div>
                ) : (
                  'Activate Account'
                )}
              </button>
            </div>
          </form>

          {/* Resend OTP */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-3">
              Didn't receive the code?
            </p>
            <button
              onClick={handleResendOTP}
              disabled={isLoading}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200 disabled:text-gray-400"
            >
              Resend Activation Code
            </button>
          </div>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link 
              href="/auth/login" 
              className="text-gray-600 hover:text-gray-700 text-sm transition-colors duration-200"
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}