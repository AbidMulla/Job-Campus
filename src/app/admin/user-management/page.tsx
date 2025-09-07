'use client';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import BreadCrumbs from '@/components/admin/BreadCrumbs';

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock user data
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'user',
      status: 'active',
      visibleJobs: 12,
      referralLinks: 5,
      avatar: 'JD'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'admin',
      status: 'active',
      visibleJobs: 8,
      referralLinks: 3,
      avatar: 'JS'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      role: 'user',
      status: 'inactive',
      visibleJobs: 15,
      referralLinks: 7,
      avatar: 'MJ'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      role: 'moderator',
      status: 'active',
      visibleJobs: 6,
      referralLinks: 2,
      avatar: 'SW'
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@example.com',
      role: 'user',
      status: 'active',
      visibleJobs: 20,
      referralLinks: 9,
      avatar: 'DB'
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      admin: { color: 'bg-red-100 text-red-800', label: 'Admin' },
      moderator: { color: 'bg-blue-100 text-blue-800', label: 'Moderator' },
      user: { color: 'bg-gray-100 text-gray-800', label: 'User' }
    };
    
    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.user;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Active' },
      inactive: { color: 'bg-red-100 text-red-800', label: 'Inactive' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="space-y-2">
      {/* BreadCrumbs */}
      <BreadCrumbs 
        title="User Management" 
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard", icon: "fluent:grid-24-regular" },
          { label: "User Management", icon: "fluent:people-24-regular" }
        ]} 
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">11,234</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Icon icon="fluent:person-checkmark-24-regular" className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New This Month</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">456</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Icon icon="fluent:person-add-24-regular" className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Admins</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">23</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Icon icon="fluent:person-star-24-regular" className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative w-64">
            <Icon icon="fluent:search-24-regular" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
            />
          </div>
          
          {/* Role Filter */}
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
            <option value="user">User</option>
          </select>
          
          {/* Date Filter */}
          <select className="px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          
          {/* Records Per Page */}
          <select className="px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="10">10 per page</option>
            <option value="25">25 per page</option>
            <option value="50">50 per page</option>
            <option value="100">100 per page</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Users ({filteredUsers.length})</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visible Jobs</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referral Links</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50 cursor-pointer group">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    <Link 
                      href={`/admin/user-details?id=${user.id}`}
                      className="block w-full h-full"
                    >
                      {index + 1}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link 
                      href={`/admin/user-details?id=${user.id}`}
                      className="block w-full h-full"
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">{user.avatar}</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-blue-600 group-hover:text-blue-800">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link 
                      href={`/admin/user-details?id=${user.id}`}
                      className="block w-full h-full"
                    >
                      {getRoleBadge(user.role)}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link 
                      href={`/admin/user-details?id=${user.id}`}
                      className="block w-full h-full"
                    >
                      {getStatusBadge(user.status)}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <Link 
                      href={`/admin/user-details?id=${user.id}`}
                      className="block w-full h-full"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-600 font-medium">{user.visibleJobs}</span>
                        <Icon icon="fluent:briefcase-24-regular" className="w-4 h-4 text-gray-400" />
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <Link 
                      href={`/admin/user-details?id=${user.id}`}
                      className="block w-full h-full"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-600 font-medium">{user.referralLinks}</span>
                        <Icon icon="fluent:link-24-regular" className="w-4 h-4 text-gray-400" />
                      </div>
                    </Link>
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
      </div>
    </div>
  );
}
