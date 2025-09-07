'use client';
import { useState } from 'react';
import { Icon } from '@iconify/react';

export default function AdminProfile() {
  const [profileData] = useState({
    name: 'Admin User',
    email: 'admin@fresherjobcampus.com',
    phone: '+91 9876543210',
    role: 'Administrator',
    department: 'IT',
    joinDate: '2024-01-15',
    bio: 'Experienced administrator managing the FresherJobCampus platform with expertise in user management and system operations.',
    location: 'Bangalore, India',
    avatar: '/photos/profile/default_profile.png'
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-6">
            {/* Avatar */}
            <div className="relative">
              <img
                src={profileData.avatar}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors">
                <Icon icon="mdi:camera" className="w-4 h-4" />
              </button>
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                {profileData.name}
              </h2>
              <p className="text-gray-600 mb-2">{profileData.role}</p>
              <p className="text-sm text-gray-500">{profileData.department}</p>
            </div>

            {/* Stats */}
            <div className="flex space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">1,234</div>
                <div className="text-sm text-gray-500">Jobs Posted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">5,678</div>
                <div className="text-sm text-gray-500">Users</div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
              </div>

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    readOnly
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 cursor-not-allowed"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <p className="text-gray-900 py-3">{profileData.email}</p>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <p className="text-gray-900 py-3">{profileData.phone}</p>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <p className="text-gray-900 py-3">{profileData.location}</p>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <p className="text-gray-900 py-3">{profileData.bio}</p>
                </div>

                {/* Read-only fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <p className="text-gray-900 py-3">{profileData.role}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
                    <p className="text-gray-900 py-3">{new Date(profileData.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h3>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Icon icon="mdi:lock" className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">Change Password</span>
                  </div>
                  <Icon icon="mdi:chevron-right" className="w-5 h-5 text-gray-400" />
                </button>
                
                <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Icon icon="mdi:two-factor-authentication" className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">Two-Factor Authentication</span>
                  </div>
                  <Icon icon="mdi:chevron-right" className="w-5 h-5 text-gray-400" />
                </button>
                
                <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Icon icon="mdi:devices" className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">Active Sessions</span>
                  </div>
                  <Icon icon="mdi:chevron-right" className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
