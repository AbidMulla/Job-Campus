'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { authServices } from '../../../services/authServices';
import { showSuccessToast, showErrorToast } from '../../../utils/simpleToast';

export default function ResetPassword() {
  console.log('🔵 ResetPassword component mounted');
  
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const router = useRouter();

  console.log('📝 ResetPassword form data:', formData);
  console.log('📧 ResetPassword email:', email);
  console.log('🔢 ResetPassword OTP:', otp);
  console.log('🔄 ResetPassword loading state:', isLoading);

  useEffect(() => {
    console.log('🔍 ResetPassword useEffect: Getting email and OTP from localStorage');
    // Get email and OTP from localStorage
    const forgotPasswordEmail = localStorage.getItem('forgotPasswordEmail');
    const forgotPasswordOTP = localStorage.getItem('forgotPasswordOTP');
    
    console.log('📧 Retrieved forgotPasswordEmail from localStorage:', forgotPasswordEmail);
    console.log('🔢 Retrieved forgotPasswordOTP from localStorage:', forgotPasswordOTP);
    
    if (!forgotPasswordEmail) {
      console.log('❌ No email found, redirecting to forgot password page');
      router.push('/auth/forgot-password');
      return;
    }
    
    console.log('✅ Setting email and OTP state');
    setEmail(forgotPasswordEmail);
    setOtp(forgotPasswordOTP || '');
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('🚀 ResetPassword form submitted');
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form
      console.log('🔍 Validating reset password form data:', formData);
      if (!formData.newPassword || !formData.confirmPassword) {
        console.log('❌ Missing password fields');
        showErrorToast('Please fill in all fields');
        setIsLoading(false);
        return;
      }

      if (formData.newPassword.length < 6) {
        console.log('❌ Password too short');
        showErrorToast('Password must be at least 6 characters long');
        setIsLoading(false);
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        console.log('❌ Passwords do not match');
        showErrorToast('Passwords do not match');
        setIsLoading(false);
        return;
      }

      console.log('📤 Sending reset password request to API');
      // Reset password
      const response = await authServices.resetPassword(email, otp, formData.newPassword);
      console.log('✅ ResetPassword API response:', response);
      
      if (response.success) {
        console.log('🎉 Password reset successfully');
        
        // Clear localStorage
        localStorage.removeItem('forgotPasswordEmail');
        localStorage.removeItem('forgotPasswordOTP');
        console.log('🗑️ Cleared forgotPasswordEmail and forgotPasswordOTP from localStorage');
        
        // Show success message and redirect after 2 seconds
        console.log('⏰ Setting timeout to show success message and navigate in 2 seconds');
        setTimeout(() => {
          setIsLoading(false);
          showSuccessToast('Password reset successfully!');
          console.log('🧭 Navigating to /auth/login');
          router.push('/auth/login');
        }, 2000);
      }
    } catch (error: any) {
      console.error('❌ Reset password error:', error);
      showErrorToast(error.response?.data?.message || 'Failed to reset password. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-sm text-gray-500 mb-2">Enter your new password for</p>
            <p className="text-sm font-semibold text-gray-700 mb-2">{email}</p>
            <h1 className="text-2xl font-bold text-gray-900">Set new password</h1>
          </div>


          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password Field */}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                New password
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  suppressHydrationWarning
                  className="w-full px-4 py-2 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 text-gray-900"
                  placeholder="Enter your new password"
                  value={formData.newPassword}
                  onChange={(e) => {
                    setFormData({...formData, newPassword: e.target.value});
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
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm new password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  suppressHydrationWarning
                  className="w-full px-4 py-2 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 text-gray-900"
                  placeholder="Confirm your new password"
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setFormData({...formData, confirmPassword: e.target.value});
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Icon 
                    icon={showConfirmPassword ? "mdi:eye-off" : "mdi:eye"} 
                    className="w-5 h-5" 
                  />
                </button>
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
                    Resetting password...
                  </>
                ) : (
                  'Reset password'
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


