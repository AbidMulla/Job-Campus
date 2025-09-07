'use client';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import BreadCrumbs from '@/components/admin/BreadCrumbs';

export default function WhatsAppBlast() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const whatsappData = [
    {
      id: 1,
      name: 'Job Alert Template',
      description: 'For new job notifications',
      content: 'Hi {{name}}, we have a new job opportunity for you: {{jobTitle}} at {{company}}. Apply now!',
      category: 'Job Alerts',
      status: 'approved',
      lastUsed: '2024-01-15',
      recipients: 743,
      readRate: 86.7,
      replyRate: 34.5
    },
    {
      id: 2,
      name: 'Interview Reminder',
      description: 'Upcoming interview notifications',
      content: 'Hi {{name}}, this is a reminder about your interview for {{position}} at {{company}} on {{date}} at {{time}}.',
      category: 'Interview',
      status: 'approved',
      lastUsed: '2024-01-14',
      recipients: 156,
      readRate: 92.3,
      replyRate: 28.2
    },
    {
      id: 3,
      name: 'Welcome Message',
      description: 'New user onboarding',
      content: 'Welcome to Freshers, {{name}}! We\'re excited to help you find your dream job. Get started by completing your profile.',
      category: 'Onboarding',
      status: 'approved',
      lastUsed: '2024-01-13',
      recipients: 89,
      readRate: 78.7,
      replyRate: 45.1
    },
    {
      id: 4,
      name: 'Follow-up Template',
      description: 'Post-application follow-up',
      content: 'Hi {{name}}, thank you for applying to {{position}}. We\'ll review your application and get back to you soon.',
      category: 'Follow-up',
      status: 'pending',
      lastUsed: '2024-01-12',
      recipients: 234,
      readRate: 89.3,
      replyRate: 12.8
    },
    {
      id: 5,
      name: 'Event Invitation',
      description: 'Career events and webinars',
      content: 'Hi {{name}}, join us for our upcoming career webinar on {{topic}} on {{date}}. Register now!',
      category: 'Events',
      status: 'approved',
      lastUsed: '2024-01-11',
      recipients: 567,
      readRate: 84.1,
      replyRate: 22.4
    },
    {
      id: 6,
      name: 'Application Status',
      description: 'Application status updates',
      content: 'Hi {{name}}, your application for {{position}} has been {{status}}. We\'ll contact you with next steps.',
      category: 'Status Updates',
      status: 'approved',
      lastUsed: '2024-01-10',
      recipients: 45,
      readRate: 91.7,
      replyRate: 15.6
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      approved: { color: 'bg-green-100 text-green-800', label: 'Approved' },
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const filteredData = whatsappData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-2">
      {/* BreadCrumbs */}
      <BreadCrumbs 
        title="WhatsApp Blast" 
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard", icon: "fluent:grid-24-regular" },
          { label: "WhatsApp Blast", icon: "fluent:chat-24-regular" }
        ]} 
      />

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-64">
            <Icon icon="fluent:search-24-regular" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, description, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-500"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-40 pl-3 pr-8 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
            <Icon icon="fluent:chevron-down-24-regular" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-40 pl-3 pr-8 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="Job Alerts">Job Alerts</option>
              <option value="Interview">Interview</option>
              <option value="Onboarding">Onboarding</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Events">Events</option>
              <option value="Status Updates">Status Updates</option>
            </select>
            <Icon icon="fluent:chevron-down-24-regular" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>

          {/* Add New Button */}
          <button className="flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors">
            <Icon icon="fluent:add-24-regular" className="w-5 h-5 mr-2" />
            Add New
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recipients
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Read Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reply Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Used
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Icon icon="fluent:people-24-regular" className="w-4 h-4 text-gray-400 mr-2" />
                      {item.recipients.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <span className="text-blue-600 font-medium">{item.readRate}%</span>
                      <Icon icon="fluent:eye-24-regular" className="w-4 h-4 text-gray-400 ml-1" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <span className="text-purple-600 font-medium">{item.replyRate}%</span>
                      <Icon icon="fluent:chat-24-regular" className="w-4 h-4 text-gray-400 ml-1" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.lastUsed}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="p-1 border border-gray-300 rounded-md text-blue-600 hover:text-blue-900 hover:bg-blue-50 hover:border-blue-400 transition-colors">
                        <Icon icon="fluent:eye-24-regular" className="w-4 h-4" />
                      </button>
                      <button className="p-1 border border-gray-300 rounded-md text-green-600 hover:text-green-900 hover:bg-green-50 hover:border-green-400 transition-colors">
                        <Icon icon="fluent:edit-24-regular" className="w-4 h-4" />
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
