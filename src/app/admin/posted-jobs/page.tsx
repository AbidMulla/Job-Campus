'use client';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import BreadCrumbs from '@/components/admin/BreadCrumbs';

export default function PostedJobs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedJobs, setSelectedJobs] = useState<number[]>([]);

  // Mock posted jobs data
  const postedJobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Tech Corp',
      location: 'New York, NY',
      status: 'active',
      postedDate: '2024-01-15',
      expireDate: '2024-02-15',
      applications: 24,
      views: 156,
      salary: '$80k - $120k',
      jobType: 'Full-time',
      category: 'Development'
    },
    {
      id: 2,
      title: 'UX Designer',
      company: 'Design Studio',
      location: 'San Francisco, CA',
      status: 'active',
      postedDate: '2024-01-14',
      expireDate: '2024-02-14',
      applications: 18,
      views: 134,
      salary: '$70k - $100k',
      jobType: 'Full-time',
      category: 'Design'
    },
    {
      id: 3,
      title: 'Product Manager',
      company: 'Startup Inc',
      location: 'Remote',
      status: 'expired',
      postedDate: '2024-01-13',
      expireDate: '2024-02-13',
      applications: 0,
      views: 89,
      salary: '$90k - $130k',
      jobType: 'Work from Home',
      category: 'Management'
    },
    {
      id: 4,
      title: 'Backend Engineer',
      company: 'Enterprise Ltd',
      location: 'Austin, TX',
      status: 'active',
      postedDate: '2024-01-12',
      expireDate: '2024-02-12',
      applications: 31,
      views: 203,
      salary: '$85k - $125k',
      jobType: 'Full-time',
      category: 'Development'
    },
    {
      id: 5,
      title: 'Marketing Specialist',
      company: 'Growth Co',
      location: 'Chicago, IL',
      status: 'expired',
      postedDate: '2024-01-10',
      expireDate: '2024-02-10',
      applications: 15,
      views: 112,
      salary: '$60k - $85k',
      jobType: 'Part-time',
      category: 'Marketing'
    },
    {
      id: 6,
      title: 'Data Scientist',
      company: 'AI Innovations',
      location: 'San Jose, CA',
      status: 'active',
      postedDate: '2024-01-03',
      expireDate: '2024-02-03',
      applications: 41,
      views: 298,
      salary: '$100k - $140k',
      jobType: 'Full-time',
      category: 'Data Science'
    }
  ];

  const filteredJobs = postedJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || job.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Active' },
      expired: { color: 'bg-red-100 text-red-800', label: 'Expired' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.expired;
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
      'Data Science': { color: 'bg-emerald-100 text-emerald-800' }
    };
    
    const config = categoryConfig[category as keyof typeof categoryConfig] || { color: 'bg-gray-100 text-gray-800' };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {category}
      </span>
    );
  };

  return (
    <div className="space-y-2">
      {/* BreadCrumbs */}
      <BreadCrumbs 
        title="Posted Jobs" 
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard", icon: "fluent:grid-24-regular" },
          { label: "Posted Jobs", icon: "fluent:document-24-regular" }
        ]} 
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Posted Jobs</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{postedJobs.length}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Icon icon="fluent:document-24-regular" className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Jobs</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {postedJobs.filter(job => job.status === 'active').length}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Icon icon="fluent:checkmark-circle-24-regular" className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Expired Jobs</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {postedJobs.filter(job => job.status === 'expired').length}
              </p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <Icon icon="fluent:clock-24-regular" className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {postedJobs.reduce((sum, job) => sum + job.applications, 0)}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Icon icon="fluent:people-24-regular" className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Job Search */}
          <div className="relative w-48">
            <Icon icon="fluent:search-24-regular" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-32 pl-3 pr-8 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
            </select>
            <Icon icon="fluent:chevron-down-24-regular" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>

          {/* Add New Job Button */}
          <Link href="/admin/job-management/add-job" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Icon icon="fluent:add-24-regular" className="w-4 h-4" />
            Add New Job
          </Link>
        </div>
      </div>

      {/* Posted Jobs Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Posted Jobs ({filteredJobs.length})</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={filteredJobs.length > 0 && filteredJobs.every(job => selectedJobs.includes(job.id))}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedJobs(filteredJobs.map(job => job.id));
                      } else {
                        setSelectedJobs([]);
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredJobs.map((job) => (
                <tr 
                  key={job.id} 
                  className="hover:bg-gray-50 cursor-pointer group"
                  onClick={() => window.location.href = `/admin/job-details?id=${job.id}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <input
                      type="checkbox"
                      checked={selectedJobs.includes(job.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        if (e.target.checked) {
                          setSelectedJobs([...selectedJobs, job.id]);
                        } else {
                          setSelectedJobs(selectedJobs.filter(id => id !== job.id));
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                      {job.title}
                    </div>
                    <div className="text-sm text-gray-500">{job.salary}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {job.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center space-x-2">
                      <Icon icon="fluent:location-24-regular" className="w-4 h-4 text-gray-400" />
                      <span>{job.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getCategoryBadge(job.category)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(job.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-600 font-medium">{job.applications}</span>
                      <Icon icon="fluent:people-24-regular" className="w-4 h-4 text-gray-400" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600 font-medium">{job.views}</span>
                      <Icon icon="fluent:eye-24-regular" className="w-4 h-4 text-gray-400" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(job.postedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                      <button className="p-1 border border-gray-300 rounded-md text-blue-600 hover:text-blue-900 hover:bg-blue-50 hover:border-blue-400 transition-colors">
                        <Icon icon="fluent:edit-24-regular" className="w-4 h-4" />
                      </button>
                      <button className="p-1 border border-gray-300 rounded-md text-green-600 hover:text-green-900 hover:bg-green-50 hover:border-green-400 transition-colors">
                        <Icon icon="fluent:eye-24-regular" className="w-4 h-4" />
                      </button>
                      <button className="p-1 border border-gray-300 rounded-md text-red-600 hover:text-red-900 hover:bg-red-50 hover:border-red-400 transition-colors">
                        <Icon icon="fluent:delete-24-regular" className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Icon icon="fluent:document-24-regular" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
