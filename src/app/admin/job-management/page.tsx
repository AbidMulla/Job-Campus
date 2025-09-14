'use client';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import BreadCrumbs from '@/components/admin/BreadCrumbs';
import { adminServices } from '@/services/adminServices';
import { showDeleteConfirm } from '@/utils/confirmModal';
import { showSuccessToast, showErrorToast } from '@/utils/simpleToast';

export default function JobManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedJobType, setSelectedJobType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedEmploymentType, setSelectedEmploymentType] = useState('all');
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch jobs from API
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: recordsPerPage,
        search: searchTerm || undefined,
        status: selectedStatus !== 'all' ? selectedStatus : undefined,
        job_type: selectedJobType !== 'all' ? selectedJobType : undefined,
        location: selectedLocation !== 'all' ? selectedLocation : undefined,
        employment_type: selectedEmploymentType !== 'all' ? selectedEmploymentType : undefined,
      };

      const response = await adminServices.getJobs(params);
      
      if (response.success) {
        setJobs(response.data || []);
        setTotalJobs(response.pagination?.total || 0);
        setTotalPages(response.pagination?.pages || 0);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
      setTotalJobs(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch jobs on component mount and when filters change
  useEffect(() => {
    fetchJobs();
  }, [currentPage, recordsPerPage, searchTerm, selectedStatus, selectedJobType, selectedLocation, selectedEmploymentType]);

  // Mock job data for fallback
  const mockJobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Tech Corp',
      location: 'New York, NY',
      status: 'active',
      category: 'Development',
      jobType: 'IT',
      employmentType: 'Full-time',
      postedDate: '2024-01-15',
      expireDate: '2024-02-15',
      applications: 24,
      views: 156,
      salary: '$80k - $120k'
    },
    {
      id: 2,
      title: 'UX Designer',
      company: 'Design Studio',
      location: 'San Francisco, CA',
      status: 'active',
      category: 'Design',
      jobType: 'IT',
      employmentType: 'Full-time',
      postedDate: '2024-01-14',
      expireDate: '2024-02-14',
      applications: 18,
      views: 134,
      salary: '$70k - $100k'
    },
    {
      id: 3,
      title: 'Product Manager',
      company: 'Startup Inc',
      location: 'Remote',
      status: 'expire',
      category: 'Management',
      jobType: 'IT',
      employmentType: 'Work from Home',
      postedDate: '2024-01-13',
      expireDate: '2024-02-13',
      applications: 0,
      views: 89,
      salary: '$90k - $130k'
    },
    {
      id: 4,
      title: 'Backend Engineer',
      company: 'Enterprise Ltd',
      location: 'Austin, TX',
      status: 'active',
      category: 'Development',
      jobType: 'IT',
      employmentType: 'Full-time',
      postedDate: '2024-01-12',
      expireDate: '2024-02-12',
      applications: 31,
      views: 203,
      salary: '$85k - $125k'
    },
    {
      id: 5,
      title: 'Marketing Specialist',
      company: 'Growth Co',
      location: 'Chicago, IL',
      status: 'expire',
      category: 'Marketing',
      jobType: 'Non-IT',
      employmentType: 'Part-time',
      postedDate: '2024-01-10',
      expireDate: '2024-02-10',
      applications: 15,
      views: 112,
      salary: '$60k - $85k'
    },
    {
      id: 6,
      title: 'Banking Officer',
      company: 'Finance Bank',
      location: 'New York, NY',
      status: 'active',
      category: 'Finance',
      jobType: 'Banking',
      employmentType: 'Full-time',
      postedDate: '2024-01-09',
      expireDate: '2024-02-09',
      applications: 22,
      views: 178,
      salary: '$65k - $95k'
    },
    {
      id: 7,
      title: 'Digital Marketing Manager',
      company: 'Ad Agency',
      location: 'Los Angeles, CA',
      status: 'active',
      category: 'Marketing',
      jobType: 'Marketing',
      employmentType: 'Full-time',
      postedDate: '2024-01-08',
      expireDate: '2024-02-08',
      applications: 19,
      views: 145,
      salary: '$75k - $110k'
  },
    {
      id: 8,
      title: 'Registered Nurse',
      company: 'City Hospital',
      location: 'Boston, MA',
      status: 'active',
      category: 'Healthcare',
      jobType: 'Healthcare',
      employmentType: 'Full-time',
      postedDate: '2024-01-07',
      expireDate: '2024-02-07',
      applications: 35,
      views: 267,
      salary: '$65k - $85k'
    },
    {
      id: 9,
      title: 'High School Teacher',
      company: 'Metro School District',
      location: 'Seattle, WA',
      status: 'active',
      category: 'Education',
      jobType: 'Education',
      employmentType: 'Full-time',
      postedDate: '2024-01-06',
      expireDate: '2024-02-06',
      applications: 12,
      views: 98,
      salary: '$55k - $75k'
    },
    {
      id: 10,
      title: 'Financial Analyst',
      company: 'Investment Corp',
      location: 'Miami, FL',
      status: 'active',
      category: 'Finance',
      jobType: 'Finance',
        employmentType: 'Full-time',
      postedDate: '2024-01-05',
      expireDate: '2024-02-05',
      applications: 28,
      views: 189,
      salary: '$70k - $95k'
    },
    {
      id: 11,
      title: 'Customer Service Representative',
      company: 'Support Solutions',
      location: 'Remote',
      status: 'active',
      category: 'Customer Service',
      jobType: 'Non-IT',
      employmentType: 'Part-time',
      postedDate: '2024-01-04',
      expireDate: '2024-02-04',
      applications: 45,
      views: 312,
      salary: '$35k - $45k'
    },
    {
      id: 12,
      title: 'Data Scientist',
      company: 'AI Innovations',
      location: 'San Jose, CA',
      status: 'active',
      category: 'Data Science',
      jobType: 'IT',
      employmentType: 'Full-time',
      postedDate: '2024-01-03',
      expireDate: '2024-02-03',
      applications: 41,
      views: 298,
      salary: '$100k - $140k'
    },
    {
      id: 13,
      title: 'Loan Officer',
      company: 'Community Bank',
      location: 'Denver, CO',
      status: 'expire',
      category: 'Banking',
      jobType: 'Banking',
      employmentType: 'Full-time',
      postedDate: '2024-01-02',
      expireDate: '2024-02-02',
      applications: 8,
      views: 67,
      salary: '$50k - $70k'
    },
    {
      id: 14,
      title: 'Content Writer',
      company: 'Media House',
      location: 'Portland, OR',
      status: 'active',
      category: 'Content',
      jobType: 'Marketing',
      employmentType: 'Work from Home',
      postedDate: '2024-01-01',
      expireDate: '2024-02-01',
      applications: 23,
      views: 156,
      salary: '$40k - $60k'
    },
    {
      id: 15,
      title: 'Software Engineer',
      company: 'Tech Startup',
      location: 'Austin, TX',
      status: 'active',
      category: 'Development',
      jobType: 'IT',
      employmentType: 'Full-time',
      postedDate: '2023-12-31',
      expireDate: '2024-01-31',
      applications: 67,
      views: 445,
      salary: '$90k - $130k'
    },
    {
      id: 16,
      title: 'Physical Therapist',
      company: 'Rehab Center',
      location: 'Phoenix, AZ',
      status: 'active',
      category: 'Healthcare',
      jobType: 'Healthcare',
      employmentType: 'Full-time',
      postedDate: '2023-12-30',
      expireDate: '2024-01-30',
      applications: 19,
      views: 134,
      salary: '$75k - $95k'
    },
    {
      id: 17,
      title: 'Sales Manager',
      company: 'Retail Corp',
      location: 'Dallas, TX',
      status: 'active',
      category: 'Sales',
      jobType: 'Non-IT',
      employmentType: 'Full-time',
      postedDate: '2023-12-29',
      expireDate: '2024-01-29',
      applications: 31,
      views: 223,
      salary: '$60k - $90k'
    },
    {
      id: 18,
      title: 'DevOps Engineer',
      company: 'Cloud Solutions',
      location: 'Remote',
      status: 'active',
      category: 'Infrastructure',
      jobType: 'IT',
      employmentType: 'Work from Home',
      postedDate: '2023-12-28',
      expireDate: '2024-01-28',
      applications: 38,
      views: 267,
      salary: '$95k - $125k'
    },
    {
      id: 19,
      title: 'Accountant',
      company: 'CPA Firm',
      location: 'Nashville, TN',
      status: 'expire',
      category: 'Accounting',
      jobType: 'Finance',
      employmentType: 'Full-time',
      postedDate: '2023-12-27',
      expireDate: '2024-01-27',
      applications: 15,
      views: 89,
      salary: '$55k - $75k'
    },
    {
      id: 20,
      title: 'Graphic Designer',
      company: 'Creative Agency',
      location: 'Minneapolis, MN',
      status: 'active',
      category: 'Design',
      jobType: 'Non-IT',
      employmentType: 'Part-time',
      postedDate: '2023-12-26',
      expireDate: '2024-01-26',
      applications: 26,
      views: 178,
      salary: '$45k - $65k'
    }
  ];

  // Since filtering is done on the server side, we use jobs directly
  const filteredJobs = jobs;
  const currentJobs = jobs;
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = Math.min(startIndex + recordsPerPage, totalJobs);

  // Debounce search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1); // Reset to first page when search changes
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Reset to first page when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle records per page change
  const handleRecordsPerPageChange = (value: number) => {
    setRecordsPerPage(value);
    setCurrentPage(1);
  };

  // Handle delete job
  const handleDeleteJob = async (jobId: string, jobTitle: string) => {
    try {
      // Show confirmation modal
      const confirmed = await showDeleteConfirm(jobTitle);
      
      if (!confirmed) {
        return; // User cancelled
      }

      // Call delete API
      const response = await adminServices.deleteJob(jobId);
      
      if (response.success) {
        showSuccessToast('Job deleted successfully');
        // Refresh the jobs list
        fetchJobs();
      } else {
        showErrorToast('Failed to delete job');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      showErrorToast('An error occurred while deleting the job');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Active' },
      expire: { color: 'bg-red-100 text-red-800', label: 'Expire' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.expire;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getCategoryBadge = (category: string) => {
    const categoryConfig = {
      Development: { color: 'bg-blue-100 text-blue-800' },
      Design: { color: 'bg-purple-100 text-purple-800' },
      Management: { color: 'bg-indigo-100 text-indigo-800' },
      Marketing: { color: 'bg-pink-100 text-pink-800' },
      Finance: { color: 'bg-emerald-100 text-emerald-800' }
    };
    
    const config = categoryConfig[category as keyof typeof categoryConfig] || { color: 'bg-gray-100 text-gray-800' };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {category}
      </span>
    );
  };

  const getJobTypeBadge = (jobType: string) => {
    const jobTypeConfig = {
      IT: { color: 'bg-blue-100 text-blue-800' },
      'Non-IT': { color: 'bg-gray-100 text-gray-800' },
      Banking: { color: 'bg-green-100 text-green-800' },
      Marketing: { color: 'bg-pink-100 text-pink-800' },
      Finance: { color: 'bg-emerald-100 text-emerald-800' },
      Healthcare: { color: 'bg-red-100 text-red-800' },
      Education: { color: 'bg-purple-100 text-purple-800' }
    };
    
    const config = jobTypeConfig[jobType as keyof typeof jobTypeConfig] || { color: 'bg-gray-100 text-gray-800' };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {jobType}
      </span>
    );
  };

  const getEmploymentTypeBadge = (employmentType: string) => {
    const employmentTypeConfig = {
      'Full-time': { color: 'bg-blue-100 text-blue-800' },
      'Part-time': { color: 'bg-orange-100 text-orange-800' },
      'Work from Home': { color: 'bg-purple-100 text-purple-800' }
    };
    
    const config = employmentTypeConfig[employmentType as keyof typeof employmentTypeConfig] || { color: 'bg-gray-100 text-gray-800' };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {employmentType}
      </span>
    );
  };

  return (
    <div className="space-y-2 relative">
      {/* Full Screen Loader */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600 font-medium">Loading jobs...</p>
          </div>
        </div>
      )}
      {/* BreadCrumbs */}
      <BreadCrumbs 
        title="Job Management" 
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard", icon: "fluent:grid-24-regular" },
          { label: "Job Management", icon: "fluent:briefcase-24-regular" }
        ]} 
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Upload Job</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">1,247</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Icon icon="fluent:briefcase-24-regular" className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <Link href="/admin/job-management/active" className="block w-full h-full">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">892</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <Icon icon="fluent:checkmark-circle-24-regular" className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <Link href="/admin/job-management/expired" className="block w-full h-full">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expire</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">156</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <Icon icon="fluent:clock-24-regular" className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Last</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">-</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <Icon icon="fluent:calendar-24-regular" className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-3">
          {/* Job Search */}
          <div className="relative w-48">
            <Icon icon="fluent:briefcase-24-regular" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by job..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              className="w-full pl-9 pr-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
            />
          </div>

          {/* Job Type Filter */}
          <div className="relative">
            <select
              value={selectedJobType}
                onChange={(e) => {
                  setSelectedJobType(e.target.value);
                  handleFilterChange();
                }}
              className="w-40 pl-3 pr-8 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
            >
                <option value="all">All Job Type</option>
              <option value="IT">IT</option>
              <option value="Non-IT">Non-IT</option>
              <option value="Banking">Banking</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
            </select>
            <Icon icon="fluent:chevron-down-24-regular" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>

          {/* Location Filter */}
          <div className="relative">
            <select
              value={selectedLocation}
                onChange={(e) => {
                  setSelectedLocation(e.target.value);
                  handleFilterChange();
                }}
              className="w-40 pl-3 pr-8 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
            >
              <option value="all">All Locations</option>
              <option value="New York, NY">New York, NY</option>
              <option value="San Francisco, CA">San Francisco, CA</option>
              <option value="Remote">Remote</option>
              <option value="Austin, TX">Austin, TX</option>
              <option value="Chicago, IL">Chicago, IL</option>
              <option value="Los Angeles, CA">Los Angeles, CA</option>
            </select>
            <Icon icon="fluent:chevron-down-24-regular" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>

          {/* Employment Type Filter */}
          <div className="relative">
            <select
              value={selectedEmploymentType}
                onChange={(e) => {
                  setSelectedEmploymentType(e.target.value);
                  handleFilterChange();
                }}
                className="w-48 pl-3 pr-8 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
              >
                <option value="all">All Employment Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Work from Home">Work from Home</option>
            </select>
            <Icon icon="fluent:chevron-down-24-regular" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  handleFilterChange();
                }}
              className="w-32 pl-3 pr-8 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expire">Expire</option>
            </select>
            <Icon icon="fluent:chevron-down-24-regular" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>

            {/* Records Per Page Selector */}
            <div className="relative">
              <select
                value={recordsPerPage}
                onChange={(e) => handleRecordsPerPageChange(Number(e.target.value))}
                className="w-24 pl-3 pr-8 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <Icon icon="fluent:chevron-down-24-regular" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

          {/* Add New Job Button */}
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2 ml-auto mr-3">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`min-w-[40px] px-4 py-2 text-sm font-medium rounded-lg ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white border border-blue-600'
                          : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Jobs ({totalJobs})</h3>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                Showing {startIndex + 1} to {endIndex} of {totalJobs} entries
              </div>
              <Link href="/admin/job-management/add-job" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Icon icon="fluent:add-24-regular" className="w-4 h-4" />
                Add New Job
              </Link>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={currentJobs.length > 0 && currentJobs.every(job => selectedJobs.includes(job._id))}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedJobs(currentJobs.map(job => job._id));
                      } else {
                        setSelectedJobs([]);
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No of Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expire Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentJobs.map((job, index) => (
                <tr 
                  key={job._id} 
                  className="hover:bg-gray-50 cursor-pointer group"
                  onClick={() => window.location.href = `/admin/job-details?id=${job._id}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getJobTypeBadge(job.job_type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center space-x-2">
                      <Icon icon="fluent:location-24-regular" className="w-4 h-4 text-gray-400" />
                      <span>{job.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-600 font-medium">{job.views || 0}</span>
                      <Icon icon="fluent:eye-24-regular" className="w-4 h-4 text-gray-400" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {job.job_post_date ? new Date(job.job_post_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    }) : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {job.job_expire_date ? new Date(job.job_expire_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    }) : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(job.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => window.location.href = `/admin/job-management/edit-job?id=${job._id}`}
                        className="p-1 border border-gray-300 rounded-md text-blue-600 hover:text-blue-900 hover:bg-blue-50 hover:border-blue-400 transition-colors"
                        title="Edit Job"
                      >
                        <Icon icon="fluent:edit-24-regular" className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => window.location.href = `/admin/job-details?id=${job._id}`}
                        className="p-1 border border-gray-300 rounded-md text-green-600 hover:text-green-900 hover:bg-green-50 hover:border-green-400 transition-colors"
                        title="View Job Details"
                      >
                        <Icon icon="fluent:eye-24-regular" className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteJob(job._id, job.job_title)}
                        className="p-1 border border-gray-300 rounded-md text-red-600 hover:text-red-900 hover:bg-red-50 hover:border-red-400 transition-colors"
                        title="Delete Job"
                      >
                        <Icon icon="fluent:delete-24-regular" className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
