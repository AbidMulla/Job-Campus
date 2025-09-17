'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import Image from 'next/image';
import BreadCrumbs from '@/components/admin/BreadCrumbs';
import { adminServices } from '@/services/adminServices';

interface JobData {
  _id: string;
  job_title: string;
  slug: string;
  job_description: string;
  company: string;
  location: string;
  job_type: string;
  employment_type: string;
  job_post_date: string;
  job_post_time?: string;
  job_expire_date: string;
  job_expire_time?: string;
  min_salary?: number;
  max_salary?: number;
  currency: string;
  salary_type: string;
  apply_link?: string;
  status: string;
  views?: number;
  title_and_description_json?: Array<{
    title: string;
    description: string[];
    type: string;
    order: number;
  }>;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  og_image_width?: number;
  og_image_height?: number;
  og_image_alt?: string;
  og_url?: string;
  og_site_name?: string;
  og_locale?: string;
  og_type?: string;
  posted_by?: {
    name?: string;
    email?: string;
  };
  last_modified_by?: {
    name?: string;
    email?: string;
  };
  createdAt: string;
  updatedAt: string;
}

function JobDetailsContent() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get('id');
  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await adminServices.viewJobById(jobId);
        console.log('response-----------------', response);
        if (response.success && response.data) {
          setJob(response.data as JobData);
        } else {
          setJob(null);
        }
      } catch (error) {
        console.error('Error fetching job:', error);
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Active' },
      expire: { color: 'bg-red-100 text-red-800', label: 'Expire' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.expire;
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        {config.label}
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
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
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
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        {employmentType}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="space-y-2">
        <BreadCrumbs 
          title="Job Details" 
          breadcrumbs={[
            { label: "Dashboard", href: "/admin/dashboard", icon: "fluent:grid-24-regular" },
            { label: "Job Management", href: "/admin/job-management", icon: "fluent:briefcase-24-regular" },
            { label: "Job Details", icon: "fluent:document-24-regular" }
          ]} 
        />
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <Icon icon="fluent:error-circle-24-regular" className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h2>
          <p className="text-gray-600 mb-6">The job you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link 
            href="/admin/job-management"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Icon icon="fluent:arrow-left-24-regular" className="w-4 h-4 mr-2" />
            Back to Job Management
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* BreadCrumbs */}
      <BreadCrumbs 
        title="Job Details" 
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard", icon: "fluent:grid-24-regular" },
          { label: "Job Management", href: "/admin/job-management", icon: "fluent:briefcase-24-regular" },
          { label: "Job Details", icon: "fluent:document-24-regular" }
        ]} 
      />

      {/* Job Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{job.job_title}</h1>
              {getStatusBadge(job.status)}
            </div>
            <div className="flex items-center gap-4 text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <Icon icon="fluent:building-24-regular" className="w-5 h-5" />
                <span className="font-medium">{job.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="fluent:location-24-regular" className="w-5 h-5" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="fluent:money-24-regular" className="w-5 h-5" />
                <span className="font-medium">
                  {job.min_salary && job.max_salary 
                    ? `${job.currency} ${job.min_salary.toLocaleString()} - ${job.max_salary.toLocaleString()}`
                    : job.min_salary 
                    ? `${job.currency} ${job.min_salary.toLocaleString()}+`
                    : 'Salary not specified'
                  }
                </span>
              </div>
            </div>
            
            {/* Job Type, Employment Type, and Status Badges */}
            <div className="flex items-center gap-3 mb-4">
              {getJobTypeBadge(job.job_type)}
              {getEmploymentTypeBadge(job.employment_type)}
              <div className="flex items-center gap-2 text-gray-600">
                <Icon icon="fluent:briefcase-24-regular" className="w-4 h-4" />
                <span className="text-sm">{job.job_type}</span>
              </div>
            </div>
         
          </div>
          <div className="mt-6 lg:mt-0 lg:ml-6">
            <div className="flex flex-col gap-3">
              <Link 
                href={`/admin/job-management/edit-job?id=${job._id}`}
                className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Icon icon="fluent:edit-24-regular" className="w-4 h-4 mr-2" />
                Edit Job
              </Link>
              <button className="inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
                <Icon icon="fluent:delete-24-regular" className="w-4 h-4 mr-2" />
                Delete Job
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Job Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Posted Date</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {new Date(job.job_post_date).toLocaleDateString()}
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Icon icon="fluent:calendar-24-regular" className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Expire Date</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {new Date(job.job_expire_date).toLocaleDateString()}
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
              <p className="text-sm font-medium text-gray-600">View Jobs</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">0</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Icon icon="fluent:people-24-regular" className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Click on Link</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{job.views || 0}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Icon icon="fluent:eye-24-regular" className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Job Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Overview</h3>
            <p className="text-gray-700 leading-relaxed">{job.job_description}</p>
          </div>


          {/* Job Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-700">Job Title:</span>
                  <span className="ml-2 text-gray-900">{job.job_title}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Job Slug:</span>
                  <span className="ml-2 text-gray-900 font-mono text-sm">{job.slug}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Job Type:</span>
                  <span className="ml-2 text-gray-900">{job.job_type}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Location:</span>
                  <span className="ml-2 text-gray-900">{job.location}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Employment Type:</span>
                  <span className="ml-2 text-gray-900">{job.employment_type}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Status:</span>
                  <span className="ml-2">{getStatusBadge(job.status)}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-700">Posted Date:</span>
                  <span className="ml-2 text-gray-900">
                    {new Date(job.job_post_date).toLocaleDateString()}
                    {job.job_post_time && ` at ${job.job_post_time}`}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Expire Date:</span>
                  <span className="ml-2 text-gray-900">
                    {new Date(job.job_expire_date).toLocaleDateString()}
                    {job.job_expire_time && ` at ${job.job_expire_time}`}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Salary:</span>
                  <span className="ml-2 text-gray-900">
                    {job.min_salary && job.max_salary 
                      ? `${job.currency} ${job.min_salary.toLocaleString()} - ${job.max_salary.toLocaleString()}`
                      : job.min_salary 
                      ? `${job.currency} ${job.min_salary.toLocaleString()}+`
                      : 'Not specified'
                    }
                    {job.salary_type && ` (${job.salary_type})`}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Apply Link:</span>
                  <span className="ml-2 text-gray-900">
                    {job.apply_link ? (
                      <a href={job.apply_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                        {job.apply_link}
                      </a>
                    ) : 'Not provided'}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Views:</span>
                  <span className="ml-2 text-gray-900">{job.views || 0}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Role and Responsibility */}
          {job.title_and_description_json && job.title_and_description_json.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h3>
              <div className="space-y-6">
                {job.title_and_description_json.map((item, index) => (
                  <div key={index}>
                    <h4 className="text-md font-semibold text-gray-800 mb-3">{item.title}</h4>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {Array.isArray(item.description) ? item.description.join('\n') : item.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEO Information */}
          {(job.seo_title || job.seo_description || job.seo_keywords) && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Information</h3>
              <div className="space-y-4">
                {job.seo_title && (
                  <div>
                    <span className="font-medium text-gray-700">SEO Title:</span>
                    <p className="mt-1 text-gray-900">{job.seo_title}</p>
                  </div>
                )}
                {job.seo_description && (
                  <div>
                    <span className="font-medium text-gray-700">SEO Description:</span>
                    <p className="mt-1 text-gray-900">{job.seo_description}</p>
                  </div>
                )}
                {job.seo_keywords && (
                  <div>
                    <span className="font-medium text-gray-700">SEO Keywords:</span>
                    <p className="mt-1 text-gray-900">{job.seo_keywords}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* OpenGraph Information */}
          {(job.og_title || job.og_description || job.og_image) && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">OpenGraph Information</h3>
              <div className="space-y-4">
                {job.og_title && (
                  <div>
                    <span className="font-medium text-gray-700">OG Title:</span>
                    <p className="mt-1 text-gray-900">{job.og_title}</p>
                  </div>
                )}
                {job.og_description && (
                  <div>
                    <span className="font-medium text-gray-700">OG Description:</span>
                    <p className="mt-1 text-gray-900">{job.og_description}</p>
                  </div>
                )}
                {job.og_image && (
                  <div>
                    <span className="font-medium text-gray-700">OG Image:</span>
                    <div className="mt-2">
                      <Image 
                        src={job.og_image} 
                        alt={job.og_image_alt || 'OpenGraph image'} 
                        width={job.og_image_width || 300}
                        height={job.og_image_height || 200}
                        className="max-w-xs rounded-lg border border-gray-200"
                      />
                      {job.og_image_alt && (
                        <p className="mt-1 text-sm text-gray-600">Alt: {job.og_image_alt}</p>
                      )}
                      {(job.og_image_width || job.og_image_height) && (
                        <p className="mt-1 text-sm text-gray-600">
                          Dimensions: {job.og_image_width || 'auto'} × {job.og_image_height || 'auto'}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {job.og_url && (
                  <div>
                    <span className="font-medium text-gray-700">OG URL:</span>
                    <p className="mt-1 text-gray-900">
                      <a href={job.og_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                        {job.og_url}
                      </a>
                    </p>
                  </div>
                )}
                {job.og_site_name && (
                  <div>
                    <span className="font-medium text-gray-700">OG Site Name:</span>
                    <p className="mt-1 text-gray-900">{job.og_site_name}</p>
                  </div>
                )}
                {job.og_locale && (
                  <div>
                    <span className="font-medium text-gray-700">OG Locale:</span>
                    <p className="mt-1 text-gray-900">{job.og_locale}</p>
                  </div>
                )}
                {job.og_type && (
                  <div>
                    <span className="font-medium text-gray-700">OG Type:</span>
                    <p className="mt-1 text-gray-900">{job.og_type}</p>
                  </div>
                )}
              </div>
            </div>
          )}


        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* System Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
            <div className="space-y-3">
              <div>
                <span className="font-medium text-gray-700">Job ID:</span>
                <p className="mt-1 text-gray-900 font-mono text-sm">{job._id}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Created:</span>
                <p className="mt-1 text-gray-900">
                  {new Date(job.createdAt).toLocaleDateString()} at {new Date(job.createdAt).toLocaleTimeString()}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Last Updated:</span>
                <p className="mt-1 text-gray-900">
                  {new Date(job.updatedAt).toLocaleDateString()} at {new Date(job.updatedAt).toLocaleTimeString()}
                </p>
              </div>
              {job.posted_by && (
                <div>
                  <span className="font-medium text-gray-700">Posted By:</span>
                  <p className="mt-1 text-gray-900">
                    {job.posted_by.name || job.posted_by.email || 'Unknown'}
                  </p>
                </div>
              )}
              {job.last_modified_by && (
                <div>
                  <span className="font-medium text-gray-700">Last Modified By:</span>
                  <p className="mt-1 text-gray-900">
                    {job.last_modified_by.name || job.last_modified_by.email || 'Unknown'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link 
                href={`/admin/job-management/edit-job?id=${job._id}`}
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Icon icon="fluent:edit-24-regular" className="w-4 h-4 mr-2" />
                Edit Job
              </Link>
              <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
                <Icon icon="fluent:delete-24-regular" className="w-4 h-4 mr-2" />
                Delete Job
              </button>
              <Link 
                href="/admin/job-management"
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Icon icon="fluent:arrow-left-24-regular" className="w-4 h-4 mr-2" />
                Back to Jobs
              </Link>
            </div>
          </div>

          {/* Job Statistics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Views</span>
                <span className="font-semibold text-gray-900">{job.views || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Status</span>
                {getStatusBadge(job.status)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Job Type</span>
                {getJobTypeBadge(job.job_type)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Employment</span>
                {getEmploymentTypeBadge(job.employment_type)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function JobDetails() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JobDetailsContent />
    </Suspense>
  );
}
