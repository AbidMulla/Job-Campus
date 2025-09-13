import ApiController from './controllerServices';

// TypeScript interfaces for API responses
interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    token?: string;
    user?: {
      id: string;
      name: string;
      email: string;
      mobile_no?: string;
      is_email_verified: boolean;
      is_active: boolean;
    };
    userId?: string;
  };
  error?: string;
}

interface RegisterData extends Record<string, unknown> {
  name: string;
  email: string;
  mobile_no?: string;
  password: string;
}

// Auth Services
export const authServices = {
  // Register user
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await ApiController.post<AuthResponse>('/auth/register', userData, ApiController.publicConfig);
      return response;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  // Verify registration OTP
  registerOTP: async (email: string, otp: string): Promise<AuthResponse> => {
    try {
      const response = await ApiController.post<AuthResponse>('/auth/register-otp', { email, otp }, ApiController.publicConfig);
      return response;
    } catch (error) {
      console.error('Register OTP verification error:', error);
      throw error;
    }
  },

  // Resend registration OTP
  registerResendOTP: async (email: string): Promise<AuthResponse> => {
    try {
      const response = await ApiController.post<AuthResponse>('/auth/register-resend-otp', { email }, ApiController.publicConfig);
      return response;
    } catch (error) {
      console.error('Register resend OTP error:', error);
      throw error;
    }
  },

  // Activate account (resend OTP)
  activateAccount: async (email: string): Promise<AuthResponse> => {
    try {
      const response = await ApiController.post<AuthResponse>('/auth/activate-account', { email }, ApiController.publicConfig);
      return response;
    } catch (error) {
      console.error('Activate account error:', error);
      throw error;
    }
  },

  // Verify activate account OTP
  activateAccountOTP: async (email: string, otp: string): Promise<AuthResponse> => {
    try {
      const response = await ApiController.post<AuthResponse>('/auth/activate-account-otp', { email, otp }, ApiController.publicConfig);
      return response;
    } catch (error) {
      console.error('Activate account OTP verification error:', error);
      throw error;
    }
  },

  // Resend activate account OTP
  activateAccountResendOTP: async (email: string): Promise<AuthResponse> => {
    try {
      const response = await ApiController.post<AuthResponse>('/auth/activate-account-resend-otp', { email }, ApiController.publicConfig);
      return response;
    } catch (error) {
      console.error('Activate account resend OTP error:', error);
      throw error;
    }
  },

  // Login user
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await ApiController.post<AuthResponse>('/auth/login', { email, password }, ApiController.publicConfig);
      
      // Store token and user data if login successful
      if (response.success && response.data?.token) {
        localStorage.setItem('token', response.data.token);
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
      }
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Logout user
  logout: async (): Promise<AuthResponse> => {
    try {
      const response = await ApiController.post<AuthResponse>('/auth/logout');
      
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      return response;
    } catch (error) {
      console.error('Logout error:', error);
      // Clear local storage even if API call fails
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw error;
    }
  },

  // Forgot password
  forgotPassword: async (email: string): Promise<AuthResponse> => {
    try {
      const response = await ApiController.post<AuthResponse>('/auth/forgot-password', { email }, ApiController.publicConfig);
      return response;
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  },

  // Verify forgot password OTP
  forgotPasswordOTP: async (email: string, otp: string): Promise<AuthResponse> => {
    try {
      const response = await ApiController.post<AuthResponse>('/auth/forgot-password-otp', { email, otp }, ApiController.publicConfig);
      return response;
    } catch (error) {
      console.error('Forgot password OTP verification error:', error);
      throw error;
    }
  },

  // Resend forgot password OTP
  forgotPasswordResendOTP: async (email: string): Promise<AuthResponse> => {
    try {
      const response = await ApiController.post<AuthResponse>('/auth/forgot-password-resend-otp', { email }, ApiController.publicConfig);
      return response;
    } catch (error) {
      console.error('Forgot password resend OTP error:', error);
      throw error;
    }
  },

  // Reset password
  resetPassword: async (email: string, otp: string, newPassword: string): Promise<AuthResponse> => {
    try {
      const response = await ApiController.post<AuthResponse>('/auth/reset-password', { email, otp, newPassword }, ApiController.publicConfig);
      return response;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('token');
    return !!token;
  },

  // Get token
  getToken: (): string | null => {
    return localStorage.getItem('token');
  }
};
