import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Base API URL from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - adds auth token to requests
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => Promise.reject(error)
);

// Response interceptor - handles common errors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: unknown) => {
    const axiosError = error as { response?: { status: number; data?: { message?: string } } };
    const { response } = axiosError;

    if (!response) {
      console.error('Network/Server Error', error);
      alert('Something went wrong. Please try again later.');
      return Promise.reject(error);
    }

    const status = response.status;

    switch (status) {
      case 400:
        console.warn('Validation Error:', response.data);
        alert(response.data?.message || 'Validation failed. Please check your input.');
        break;

      case 401:
        console.warn('Unauthorized:', response.data);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Only redirect to login if we're not already on the login page
        if (!window.location.pathname.includes('/auth/login')) {
          window.location.href = '/auth/login';
        }
        break;

      case 403:
        console.warn('Forbidden:', response.data);
        // alert('You do not have permission to perform this action.');
        break;

      case 404:
        console.warn('Not Found:', response.data);
        //  alert(response.data?.message || 'Requested resource not found.');
        break;

      case 409:
        console.warn('Conflict Error:', response.data);
        // alert(response.data?.message || 'Resource conflict. Please try again.');
        break;

      case 422:
        console.warn('Unprocessable Entity:', response.data);
        // alert(response.data?.message || 'Invalid data provided.');
        break;

      case 429:
        console.warn('Too Many Requests:', response.data);
        // alert('Too many requests. Please wait a moment and try again.');
        break;

      case 500:
        console.error('Internal Server Error:', response.data);
        // alert('Server error occurred. Please try again later.');
        break;

      case 502:
        console.error('Bad Gateway:', response.data);
        // alert('Service temporarily unavailable. Please try again later.');
        break;

      case 503:
        console.error('Service Unavailable:', response.data);
        // alert('Service is currently unavailable. Please try again later.');
        break;

      case 504:
        console.error('Gateway Timeout:', response.data);
        // alert('Request timeout. Please try again later.');
        break;

      default:
        if (status >= 500) {
          console.error(`Server Error (${status}):`, response.data);
          // alert('Server error occurred. Please try again later.');
        } else {
          console.warn(`Unexpected Error (${status}):`, response.data);
          // alert(response.data?.message || 'An unexpected error occurred.');
        }
        break;
    }

    return Promise.reject(error);
  }
);

// TypeScript interfaces
interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success?: boolean;
}

interface CustomConfig extends AxiosRequestConfig {
  headers?: Record<string, string>;
}

// Simple API Controller
// Handles API calls and passes errors from backend to frontend
const ApiController = {
  // GET request
  get: async <T = unknown>(endpoint: string, customConfig: CustomConfig = {}): Promise<T> => {
    try {
      const response = await axiosInstance.get<T>(endpoint, customConfig);
      return response.data;
    } catch (error: unknown) {
      console.error('GET Error:', error);
      throw error;
    }
  },

  // POST request
  post: async <T = unknown>(endpoint: string, data: Record<string, unknown> = {}, customConfig: CustomConfig = {}): Promise<T> => {
    try {
      const response = await axiosInstance.post<T>(endpoint, data, customConfig);
      return response.data;
    } catch (error: unknown) {
      console.error('POST Error:', error);
      throw error;
    }
  },

  // PUT request
  put: async <T = unknown>(endpoint: string, data: Record<string, unknown> = {}, customConfig: CustomConfig = {}): Promise<T> => {
    try {
      const response = await axiosInstance.put<T>(endpoint, data, customConfig);
      return response.data;
    } catch (error: unknown) {
      console.error('PUT Error:', error);
      throw error;
    }
  },

  // PATCH request
  patch: async <T = unknown>(endpoint: string, data: Record<string, unknown> = {}, customConfig: CustomConfig = {}): Promise<T> => {
    try {
      const response = await axiosInstance.patch<T>(endpoint, data, customConfig);
      return response.data;
    } catch (error: unknown) {
      console.error('PATCH Error:', error);
      throw error;
    }
  },

  // DELETE request
  delete: async <T = unknown>(endpoint: string, customConfig: CustomConfig = {}): Promise<T> => {
    try {
      const response = await axiosInstance.delete<T>(endpoint, customConfig);
      return response.data;
    } catch (error: unknown) {
      console.error('DELETE Error:', error);
      throw error;
    }
  },

  // Single file upload
  uploadSingleFile: async <T = unknown>(endpoint: string, file: File, customConfig: CustomConfig = {}): Promise<T> => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const config: CustomConfig = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        ...customConfig,
      };

      const response = await axiosInstance.post<T>(endpoint, formData, config);
      return response.data;
    } catch (error: unknown) {
      console.error('Single File Upload Error:', error);
      throw error;
    }
  },

  // Upload multiple files
  uploadMultipleFiles: async <T = unknown>(endpoint: string, files: File[], customConfig: CustomConfig = {}): Promise<T> => {
    try {
      const formData = new FormData();
      
      // Add multiple files to FormData
      files.forEach((file: File) => {
        formData.append('files', file);
      });

      const config: CustomConfig = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        ...customConfig,
      };

      const response = await axiosInstance.post<T>(endpoint, formData, config);
      return response.data;
    } catch (error: unknown) {
      console.error('Multiple Files Upload Error:', error);
      throw error;
    }
  },

  // Get current user token
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  // Clear token on logout
  clearToken: (): void => {
    localStorage.removeItem('token');
  },

  // Create config for public endpoints (no auth)
  publicConfig: {
    headers: { Authorization: '' }
  } as CustomConfig
};

export default ApiController;

/**
 * API CONTROLLER - Simple Usage Guide
 * 
 * METHODS AVAILABLE:
 * - get<T>(endpoint, config) - GET requests
 * - post<T>(endpoint, data, config) - POST requests  
 * - put<T>(endpoint, data, config) - PUT requests
 * - patch<T>(endpoint, data, config) - PATCH requests
 * - delete<T>(endpoint, config) - DELETE requests
 * - uploadSingleFile<T>(endpoint, file, config) - Single file upload
 * - uploadMultipleFiles<T>(endpoint, files, config) - Multiple files upload
 * 
 * Basic Usage:
 * const data = await ApiController.get<User[]>('/users');
 * const newUser = await ApiController.post<User>('/users', userData);
 * const updated = await ApiController.put<User>('/users/123', userData);
 * const patched = await ApiController.patch<User>('/users/123', { name: 'John' });
 * await ApiController.delete('/users/123');
 * 
 * File Uploads:
 * const file = await ApiController.uploadSingleFile<FileResponse>('/upload', file);
 * const files = await ApiController.uploadMultipleFiles<FileResponse[]>('/upload-multiple', files);
 * 
 * Public Endpoints (no auth):
 * const publicData = await ApiController.get('/public', ApiController.publicConfig);
 * 
 * ERROR HANDLING:
 * - 400: Validation error (shows message)
 * - 401: Unauthorized (auto logout + redirect to login)
 * - 403: Forbidden (permission denied)
 * - 404: Not found (resource not found)
 * - 409: Conflict (resource conflict)
 * - 422: Invalid data (unprocessable entity)
 * - 429: Too many requests (rate limit)
 * - 500: Server error (try again later)
 * - 502/503/504: Service unavailable/timeout
 * 
 * Environment (.env):
 * NEXT_PUBLIC_API_URL=http://localhost:5000/api
 * 
 * Features: Auto auth, error handling, file uploads, timeout (30s), TypeScript support
 */
