'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { authServices } from '../../../services/authServices';

export default function ActiveAccountOTP() {
  console.log('🔵 ActiveAccountOTP component mounted');
  
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  console.log('📧 ActiveAccountOTP email:', email);
  console.log('🔄 ActiveAccountOTP loading state:', isLoading);
  console.log('❌ ActiveAccountOTP error:', error);
  console.log('✅ ActiveAccountOTP success:', success);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('🚀 ActiveAccountOTP form submitted');
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate email
      console.log('🔍 Validating ActiveAccountOTP email:', email);
      if (!email) {
        console.log('❌ Email is required');
        setError('Please enter your email address');
        return;
      }

      console.log('📤 Sending activation OTP request to API');
      // Send activation OTP request
      const response = await authServices.activateAccount(email);
      console.log('✅ ActiveAccountOTP API response:', response);
      
      if (response.success) {
        console.log('🎉 Activation OTP sent successfully');
        setSuccess('Activation OTP sent to your email!');
        
        // Store email for OTP verification
        localStorage.setItem('activateAccountEmail', email);
        console.log('💾 Stored activateAccountEmail in localStorage:', email);
        
        // Navigate to active account page after 2 seconds
        console.log('⏰ Setting timeout to navigate to active account page in 2 seconds');
        setTimeout(() => {
          console.log('🧭 Navigating to /auth/active-account');
          router.push('/auth/active-account');
        }, 2000);
      }
    } catch (error: any) {
      console.error('❌ Activate account error:', error);
      setError(error.response?.data?.message || 'Failed to send activation OTP. Please try again.');
    } finally {
      console.log('🏁 ActiveAccountOTP form submission completed');
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
              <Icon icon="mdi:account-alert" className="w-16 h-16 text-orange-500 mx-auto" />
            </div>
            <p className="text-sm text-gray-500 mb-2">Enter your email to receive an activation code</p>
            <h1 className="text-2xl font-bold text-gray-900">Activate Your Account</h1>
          </div>


          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-600">{success}</p>
            </div>
          )}

          {/* Info Message */}
          <div className="mb-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start">
              <Icon icon="mdi:information" className="w-5 h-5 text-orange-600 mt-0.5 mr-2 flex-shrink-0" />
              <div className="text-sm text-orange-800">
                <p className="font-medium mb-1">Account Not Activated</p>
                <p>Your account needs to be activated before you can access all features. We&apos;ll send you an activation code.</p>
              </div>
            </div>
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
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 text-gray-900"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
                  'Send Activation OTP'
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
