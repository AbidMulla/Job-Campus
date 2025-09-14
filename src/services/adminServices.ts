import ApiController from './controllerServices';

// TypeScript interfaces for API responses
interface JobResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Admin Services
export const adminServices = {
  // Get admin profile
  getAdminProfile: async (adminId: string) => {
    // TODO: Implement API call to get admin profile
    return { adminId, name: 'Admin Name', email: 'admin@example.com', role: 'admin' };
  },

  // Update admin profile
  updateAdminProfile: async (adminId: string, data: Record<string, unknown>) => {
    // TODO: Implement API call to update admin profile
    return { success: true, message: 'Admin profile updated successfully' };
  },

  // Get admin dashboard data
  getDashboardData: async (adminId: string) => {
    // TODO: Implement API call to get admin dashboard data
    return { users: [], courses: [], analytics: {} };
  },

  // Get all users
  getAllUsers: async () => {
    // TODO: Implement API call to get all users
    return { users: [], total: 0 };
  },

  // Get all courses
  getAllCourses: async () => {
    // TODO: Implement API call to get all courses
    return { courses: [], total: 0 };
  },

  // Job Management Services
  addJob: async (jobData: any): Promise<JobResponse> => {
    try {
      const response = await ApiController.post<JobResponse>('/admin/add-job', jobData);
      return response;
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  },

  getJobs: async (params?: { page?: number; limit?: number; status?: string; search?: string }): Promise<JobResponse> => {
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.status) queryParams.append('status', params.status);
      if (params?.search) queryParams.append('search', params.search);

      const response = await ApiController.get<JobResponse>(`/admin/jobs?${queryParams.toString()}`);
      return response;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  },

  getJobById: async (jobId: string): Promise<JobResponse> => {
    try {
      const response = await ApiController.get<JobResponse>(`/admin/jobs/${jobId}`);
      return response;
    } catch (error) {
      console.error('Error fetching job:', error);
      throw error;
    }
  },

  updateJob: async (jobId: string, jobData: any): Promise<JobResponse> => {
    try {
      const response = await ApiController.put<JobResponse>(`/admin/jobs/${jobId}`, jobData);
      return response;
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  },

  deleteJob: async (jobId: string): Promise<JobResponse> => {
    try {
      const response = await ApiController.delete<JobResponse>(`/admin/jobs/${jobId}`);
      return response;
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  }
};
