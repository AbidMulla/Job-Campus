'use client';
import { useState } from 'react';
import { Icon } from '@iconify/react';

export default function SentEmail() {
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const sentEmails = [
    {
      id: 1,
      subject: 'Job Alert - Tech Jobs',
      recipientCount: 892,
      sentDate: '2024-01-15 10:30:00',
      status: 'delivered',
      openRate: 71.2,
      clickRate: 23.8,
      template: 'Job Alert Template',
      sender: 'Admin User'
    },
    {
      id: 2,
      subject: 'Weekly Newsletter',
      recipientCount: 1250,
      sentDate: '2024-01-14 09:15:00',
      status: 'delivered',
      openRate: 68.5,
      clickRate: 19.3,
      template: 'Newsletter Template',
      sender: 'Admin User'
    },
    {
      id: 3,
      subject: 'New Features Update',
      recipientCount: 756,
      sentDate: '2024-01-13 14:45:00',
      status: 'delivered',
      openRate: 74.1,
      clickRate: 28.7,
      template: 'Newsletter Template',
      sender: 'Admin User'
    },
    {
      id: 4,
      subject: 'Welcome to Freshers!',
      recipientCount: 45,
      sentDate: '2024-01-12 16:20:00',
      status: 'delivered',
      openRate: 82.2,
      clickRate: 35.6,
      template: 'Welcome Template',
      sender: 'Admin User'
    },
    {
      id: 5,
      subject: 'Password Reset Instructions',
      recipientCount: 12,
      sentDate: '2024-01-11 11:10:00',
      status: 'delivered',
      openRate: 91.7,
      clickRate: 75.0,
      template: 'Password Reset Template',
      sender: 'System'
    },
    {
      id: 6,
      subject: 'Job Alert - Banking Jobs',
      recipientCount: 234,
      sentDate: '2024-01-10 08:30:00',
      status: 'pending',
      openRate: 0,
      clickRate: 0,
      template: 'Job Alert Template',
      sender: 'Admin User'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      delivered: { color: 'bg-green-100 text-green-800', label: 'Delivered' },
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      failed: { color: 'bg-red-100 text-red-800', label: 'Failed' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const filteredEmails = sentEmails.filter(email => {
    const matchesSearch = email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.template.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || email.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (emailId: number) => {
    setSelectedEmail(emailId);
  };

  const handleResend = (emailId: number) => {
    console.log('Resend email:', emailId);
  };

  const handleDelete = (emailId: number) => {
    console.log('Delete email:', emailId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Sent Email History</h3>
        <p className="text-gray-600">View and manage your sent email campaigns</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-64">
            <Icon icon="fluent:search-24-regular" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by subject or template..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-40 pl-3 pr-8 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="delivered">Delivered</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
            <Icon icon="fluent:chevron-down-24-regular" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Email List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recipients
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sent Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Open Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Click Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmails.map((email) => (
                <tr key={email.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{email.subject}</div>
                      <div className="text-sm text-gray-500">{email.template}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Icon icon="fluent:people-24-regular" className="w-4 h-4 text-gray-400 mr-2" />
                      {email.recipientCount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(email.sentDate).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(email.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <span className="text-purple-600 font-medium">{email.openRate}%</span>
                      <Icon icon="fluent:eye-24-regular" className="w-4 h-4 text-gray-400 ml-1" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <span className="text-orange-600 font-medium">{email.clickRate}%</span>
                      <Icon icon="fluent:cursor-click-24-regular" className="w-4 h-4 text-gray-400 ml-1" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(email.id)}
                        className="p-1 border border-gray-300 rounded-md text-blue-600 hover:text-blue-900 hover:bg-blue-50 hover:border-blue-400 transition-colors"
                        title="View Details"
                      >
                        <Icon icon="fluent:eye-24-regular" className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleResend(email.id)}
                        className="p-1 border border-gray-300 rounded-md text-green-600 hover:text-green-900 hover:bg-green-50 hover:border-green-400 transition-colors"
                        title="Resend"
                      >
                        <Icon icon="fluent:arrow-redo-24-regular" className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(email.id)}
                        className="p-1 border border-gray-300 rounded-md text-red-600 hover:text-red-900 hover:bg-red-50 hover:border-red-400 transition-colors"
                        title="Delete"
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

      {/* Email Details Modal */}
      {selectedEmail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Email Details</h3>
              <button
                onClick={() => setSelectedEmail(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Icon icon="fluent:dismiss-24-regular" className="w-6 h-6" />
              </button>
            </div>

            {(() => {
              const email = sentEmails.find(e => e.id === selectedEmail);
              if (!email) return null;

              return (
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Subject:</span>
                    <p className="text-gray-900">{email.subject}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Template:</span>
                    <p className="text-gray-900">{email.template}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Recipients:</span>
                    <p className="text-gray-900">{email.recipientCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Sent Date:</span>
                    <p className="text-gray-900">{new Date(email.sentDate).toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Status:</span>
                    <div className="mt-1">{getStatusBadge(email.status)}</div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Open Rate:</span>
                    <p className="text-gray-900">{email.openRate}%</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Click Rate:</span>
                    <p className="text-gray-900">{email.clickRate}%</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Sender:</span>
                    <p className="text-gray-900">{email.sender}</p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
