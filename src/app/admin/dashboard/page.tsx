'use client';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import BreadCrumbs from '@/components/admin/BreadCrumbs';

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  const stats = [
    {
      title: 'Total Users',
      value: '12,847',
      change: '+12%',
      changeType: 'positive',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      )
    },
    {
      title: 'Active Jobs',
      value: '1,234',
      change: '+8%',
      changeType: 'positive',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
        </svg>
      )
    },
    {
      title: 'Applications',
      value: '5,678',
      change: '+23%',
      changeType: 'positive',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: 'Companies',
      value: '456',
      change: '+5%',
      changeType: 'positive',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'application',
      message: 'John Doe applied for Software Engineer at TCS',
      time: '2 minutes ago',
      status: 'pending'
    },
    {
      id: 2,
      type: 'user',
      message: 'New user Sarah Wilson registered',
      time: '5 minutes ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'job',
      message: 'New job posted: Data Analyst at Infosys',
      time: '10 minutes ago',
      status: 'completed'
    },
    {
      id: 4,
      type: 'company',
      message: 'Company Wipro verified successfully',
      time: '1 hour ago',
      status: 'completed'
    },
    {
      id: 5,
      type: 'application',
      message: 'Application rejected for Frontend Developer',
      time: '2 hours ago',
      status: 'rejected'
    }
  ];

  const topJobs = [
    {
      title: 'Software Engineer',
      company: 'TCS',
      applications: 45,
      status: 'active'
    },
    {
      title: 'Data Analyst',
      company: 'Infosys',
      applications: 32,
      status: 'active'
    },
    {
      title: 'Frontend Developer',
      company: 'Wipro',
      applications: 28,
      status: 'active'
    },
    {
      title: 'Backend Developer',
      company: 'HCL',
      applications: 25,
      status: 'active'
    }
  ];

  return (
    <div className="space-y-2">
      {/* BreadCrumbs */}
      <BreadCrumbs 
        title="Dashboard" 
        breadcrumbs={[
          { label: "Dashboard", icon: "fluent:grid-24-regular" }
        ]} 
      />


      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">12,847</p>
             
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Icon icon="fluent:people-24-regular" className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Total Jobs Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Jobs</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">1,234</p>
             
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Icon icon="fluent:briefcase-24-regular" className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Total Earnings Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₹45,678</p>
             
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Icon icon="fluent:money-24-regular" className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Total Groups Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Groups</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">456</p>
             
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Icon icon="fluent:people-team-24-regular" className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Communication Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* WhatsApp Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:whatsapp" className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">WhatsApp</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Groups:</span>
                <span className="text-lg font-semibold text-green-600">156</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Members:</span>
                <span className="text-lg font-semibold text-green-600">8,247</span>
              </div>
            </div>
          </div>
        </div>

        {/* Telegram Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:telegram" className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Telegram</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Groups:</span>
                <span className="text-lg font-semibold text-blue-600">89</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Members:</span>
                <span className="text-lg font-semibold text-blue-600">5,123</span>
              </div>
            </div>
          </div>
        </div>

        {/* Email Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:email" className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Groups:</span>
                <span className="text-lg font-semibold text-red-600">234</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Members:</span>
                <span className="text-lg font-semibold text-red-600">12,456</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
