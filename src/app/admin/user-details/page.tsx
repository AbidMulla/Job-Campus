'use client';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import BreadCrumbs from '@/components/admin/BreadCrumbs';

export default function UserDetails() {
  const [activeTab, setActiveTab] = useState('favorites');

  // Mock user data
  const user = {
    id: 1,
    name: 'tabiyan',
    email: 'tabiyan@gmail.com',
    role: 'user',
    status: 'active',
    joinDate: '2024-01-15',
    lastActive: '2024-01-20',
    avatar: 'TB',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    bio: 'Experienced software developer with passion for creating innovative solutions.',
    skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS']
  };

  // Mock data for tabs
  const userProjects = [
    { id: 1, name: 'E-commerce Platform', status: 'completed', progress: 100, dueDate: '2024-01-10' },
    { id: 2, name: 'Mobile App Development', status: 'in-progress', progress: 75, dueDate: '2024-02-15' },
    { id: 3, name: 'API Integration', status: 'pending', progress: 0, dueDate: '2024-03-01' }
  ];

  const userFavorites = [
    { id: 1, name: 'React Best Practices', type: 'course', addedDate: '2024-01-18' },
    { id: 2, name: 'Node.js Security', type: 'article', addedDate: '2024-01-16' },
    { id: 3, name: 'TypeScript Fundamentals', type: 'tutorial', addedDate: '2024-01-14' }
  ];

  const userViews = [
    { id: 1, page: 'Dashboard', timestamp: '2024-01-20 14:30', duration: '5m 23s' },
    { id: 2, page: 'Profile Settings', timestamp: '2024-01-20 12:15', duration: '2m 45s' },
    { id: 3, page: 'Course Catalog', timestamp: '2024-01-20 10:00', duration: '8m 12s' }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'completed': { color: 'bg-green-100 text-green-800', label: 'Completed' },
      'in-progress': { color: 'bg-blue-100 text-blue-800', label: 'In Progress' },
      'pending': { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getProgressBar = (progress: number) => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="space-y-2">
      {/* BreadCrumbs */}
      <BreadCrumbs 
        title="User Details" 
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard", icon: "fluent:grid-24-regular" },
          { label: "User Management", href: "/admin/user-management", icon: "fluent:people-24-regular" },
          { label: "User Details", icon: "fluent:person-24-regular" }
        ]}
        showBackButton={true}
      />

             {/* User Profile Header */}
       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
         <div className="grid grid-cols-3 gap-8">
           
           {/* Part 1: Avatar and Name */}
           <div className="text-center m-4">
             <div className="h-24 w-24 rounded-full overflow-hidden mb-3 mx-auto">
               <img 
                 src="/photos/profile/default_profile.png" 
                 alt={`${user.name}'s profile picture`}
                 className="w-full h-full object-cover"
               />
             </div>
             <hr />
             <h1 className="text-xl font-bold text-gray-900 lowercase">{user.name}</h1>
           </div>
 
           {/* Part 2: Personal Information */}
           <div className="border-l border-r border-gray-200 px-6">
             <h3 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h3>
             <div className="space-y-3">
               <div className="flex items-center space-x-3">
                 <Icon icon="fluent:mail-24-regular" className="w-5 h-5 text-gray-600" />
                 <span className="text-gray-700">{user.email}</span>
               </div>
               <div className="flex items-center space-x-3">
                 <Icon icon="fluent:phone-24-regular" className="w-5 h-5 text-gray-600" />
                 <span className="text-gray-700">{user.phone}</span>
               </div>
               <div className="flex items-center space-x-3">
                 <Icon icon="fluent:calendar-24-regular" className="w-5 h-5 text-gray-600" />
                 <span className="text-gray-700">Born {new Date(user.joinDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
               </div>
               <div className="flex items-center space-x-3">
                 <Icon icon="fluent:person-24-regular" className="w-5 h-5 text-gray-600" />
                 <span className="text-gray-700">Male</span>
               </div>
             </div>
           </div>
 
           {/* Part 3: Professional Information */}
           <div>
             <h3 className="text-lg font-bold text-gray-900 mb-4">Professional Information</h3>
             <div className="space-y-3">
               <div className="flex items-center space-x-3">
                 <Icon icon="fluent:document-24-regular" className="w-5 h-5 text-gray-600" />
                 <span className="text-gray-700">Qualification: BE</span>
               </div>
               <div className="flex items-center space-x-3">
                 <Icon icon="fluent:briefcase-24-regular" className="w-5 h-5 text-gray-600" />
                 <span className="text-gray-700">Profession: IT</span>
               </div>
               <div className="flex items-center space-x-3">
                 <Icon icon="fluent:location-24-regular" className="w-5 h-5 text-gray-600" />
                 <span className="text-gray-700">{user.location}</span>
               </div>
             </div>
           </div>
 
         </div>
       </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Last Active</p>
              <p className="text-lg font-bold text-gray-900 mt-1">2h ago</p>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Icon icon="fluent:clock-24-regular" className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Visited Jobs</p>
              <p className="text-lg font-bold text-gray-900 mt-1">45</p>
            </div>
            <div className="p-2 bg-green-50 rounded-lg">
              <Icon icon="fluent:briefcase-24-regular" className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Click Apply</p>
              <p className="text-lg font-bold text-gray-900 mt-1">23</p>
            </div>
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Icon icon="fluent:cursor-click-24-regular" className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>



        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Referral</p>
              <p className="text-lg font-bold text-gray-900 mt-1">8</p>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg">
              <Icon icon="fluent:people-team-24-regular" className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>

    
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('favorites')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'favorites'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Favorites
            </button>
            <button
              onClick={() => setActiveTab('visitedJobs')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'visitedJobs'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Visited Jobs
            </button>
            <button
              onClick={() => setActiveTab('referral')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'referral'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Referral
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Settings
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Favorites Tab */}
          {activeTab === 'favorites' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Favorites</h3>
              {userFavorites.map((favorite) => (
                <div key={favorite.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{favorite.name}</h4>
                      <p className="text-sm text-gray-600 capitalize">{favorite.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Added</p>
                      <p className="text-sm text-gray-900">{new Date(favorite.addedDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Visited Jobs Tab */}
          {activeTab === 'visitedJobs' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Visited Jobs</h3>
              {userProjects.map((job) => (
                <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-medium text-gray-900">{job.name}</h4>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Visited
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Company</span>
                      <span>Tech Corp</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Location</span>
                      <span>Remote</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Visited Date</span>
                      <span>{new Date(job.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Referral Tab */}
          {activeTab === 'referral' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Referrals</h3>
              {userViews.map((referral) => (
                <div key={referral.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">Referred User</h4>
                      <p className="text-sm text-gray-600">user{referral.id}@example.com</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Referred</p>
                      <p className="text-sm text-gray-900">{referral.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <h4 className="text-md font-medium text-gray-900 mb-3">Account Settings</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Email Notifications</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Enabled</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Profile Visibility</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Public</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <h4 className="text-md font-medium text-gray-900 mb-3">Privacy Settings</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Data Sharing</span>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Limited</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Search History</span>
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Private</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
