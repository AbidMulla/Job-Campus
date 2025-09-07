'use client';
import { useState } from 'react';
import { Icon } from '@iconify/react';

export default function SentWhatsApp() {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const sentMessages = [
    {
      id: 1,
      content: 'Hi {{name}}, we have a new job opportunity for you: Frontend Developer at Tech Corp. Apply now!',
      recipientCount: 743,
      sentDate: '2024-01-15 10:30:00',
      status: 'delivered',
      readRate: 86.7,
      replyRate: 34.5,
      template: 'Job Alert Template',
      sender: 'Admin User'
    },
    {
      id: 2,
      content: 'Hi {{name}}, this is a reminder about your interview for Software Engineer at Startup Inc on Jan 20th at 2:00 PM.',
      recipientCount: 156,
      sentDate: '2024-01-14 09:15:00',
      status: 'delivered',
      readRate: 92.3,
      replyRate: 28.2,
      template: 'Interview Reminder',
      sender: 'Admin User'
    },
    {
      id: 3,
      content: 'Welcome to Freshers, {{name}}! We\'re excited to help you find your dream job. Get started by completing your profile.',
      recipientCount: 89,
      sentDate: '2024-01-13 14:45:00',
      status: 'delivered',
      readRate: 78.7,
      replyRate: 45.1,
      template: 'Welcome Message',
      sender: 'System'
    },
    {
      id: 4,
      content: 'Hi {{name}}, thank you for applying to Product Manager. We\'ll review your application and get back to you soon.',
      recipientCount: 234,
      sentDate: '2024-01-12 16:20:00',
      status: 'delivered',
      readRate: 89.3,
      replyRate: 12.8,
      template: 'Follow-up Template',
      sender: 'Admin User'
    },
    {
      id: 5,
      content: 'Hi {{name}}, join us for our upcoming career webinar on "Tech Interview Tips" on Jan 25th. Register now!',
      recipientCount: 567,
      sentDate: '2024-01-11 11:10:00',
      status: 'delivered',
      readRate: 84.1,
      replyRate: 22.4,
      template: 'Event Invitation',
      sender: 'Admin User'
    },
    {
      id: 6,
      content: 'Hi {{name}}, your application for Data Scientist has been shortlisted. We\'ll contact you with next steps.',
      recipientCount: 45,
      sentDate: '2024-01-10 08:30:00',
      status: 'pending',
      readRate: 0,
      replyRate: 0,
      template: 'Application Status',
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

  const filteredMessages = sentMessages.filter(message => {
    const matchesSearch = message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.template.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || message.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (messageId: number) => {
    setSelectedMessage(messageId);
  };

  const handleResend = (messageId: number) => {
    console.log('Resend message:', messageId);
  };

  const handleDelete = (messageId: number) => {
    console.log('Delete message:', messageId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Sent WhatsApp Messages</h3>
        <p className="text-gray-600">View and manage your sent WhatsApp message campaigns</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-64">
            <Icon icon="fluent:search-24-regular" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by content or template..."
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
              <option value="delivered">Delivered</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
            <Icon icon="fluent:chevron-down-24-regular" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message Content
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
                  Read Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reply Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMessages.map((message) => (
                <tr key={message.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 overflow-hidden" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>{message.content}</div>
                      <div className="text-sm text-gray-500 mt-1">{message.template}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Icon icon="fluent:people-24-regular" className="w-4 h-4 text-gray-400 mr-2" />
                      {message.recipientCount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(message.sentDate).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(message.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <span className="text-blue-600 font-medium">{message.readRate}%</span>
                      <Icon icon="fluent:eye-24-regular" className="w-4 h-4 text-gray-400 ml-1" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <span className="text-purple-600 font-medium">{message.replyRate}%</span>
                      <Icon icon="fluent:chat-24-regular" className="w-4 h-4 text-gray-400 ml-1" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(message.id)}
                        className="p-1 border border-gray-300 rounded-md text-blue-600 hover:text-blue-900 hover:bg-blue-50 hover:border-blue-400 transition-colors"
                        title="View Details"
                      >
                        <Icon icon="fluent:eye-24-regular" className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleResend(message.id)}
                        className="p-1 border border-gray-300 rounded-md text-green-600 hover:text-green-900 hover:bg-green-50 hover:border-green-400 transition-colors"
                        title="Resend"
                      >
                        <Icon icon="fluent:arrow-redo-24-regular" className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(message.id)}
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

      {/* Message Details Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">WhatsApp Message Details</h3>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Icon icon="fluent:dismiss-24-regular" className="w-6 h-6" />
              </button>
            </div>

            {(() => {
              const message = sentMessages.find(m => m.id === selectedMessage);
              if (!message) return null;

              return (
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Message Content:</span>
                    <p className="text-gray-900 mt-1 whitespace-pre-wrap">{message.content}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Template:</span>
                    <p className="text-gray-900">{message.template}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Recipients:</span>
                    <p className="text-gray-900">{message.recipientCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Sent Date:</span>
                    <p className="text-gray-900">{new Date(message.sentDate).toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Status:</span>
                    <div className="mt-1">{getStatusBadge(message.status)}</div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Read Rate:</span>
                    <p className="text-gray-900">{message.readRate}%</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Reply Rate:</span>
                    <p className="text-gray-900">{message.replyRate}%</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Sender:</span>
                    <p className="text-gray-900">{message.sender}</p>
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
