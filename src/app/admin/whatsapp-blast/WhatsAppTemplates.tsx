'use client';
import { useState } from 'react';
import { Icon } from '@iconify/react';

export default function WhatsAppTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const templates = [
    {
      id: 1,
      name: 'Job Alert Template',
      description: 'For new job notifications',
      content: 'Hi {{name}}, we have a new job opportunity for you: {{jobTitle}} at {{company}}. Apply now!',
      category: 'Job Alerts',
      lastUsed: '2024-01-15',
      status: 'approved'
    },
    {
      id: 2,
      name: 'Interview Reminder',
      description: 'Upcoming interview notifications',
      content: 'Hi {{name}}, this is a reminder about your interview for {{position}} at {{company}} on {{date}} at {{time}}.',
      category: 'Interview',
      lastUsed: '2024-01-14',
      status: 'approved'
    },
    {
      id: 3,
      name: 'Welcome Message',
      description: 'New user onboarding',
      content: 'Welcome to Freshers, {{name}}! We\'re excited to help you find your dream job. Get started by completing your profile.',
      category: 'Onboarding',
      lastUsed: '2024-01-13',
      status: 'approved'
    },
    {
      id: 4,
      name: 'Follow-up Template',
      description: 'Post-application follow-up',
      content: 'Hi {{name}}, thank you for applying to {{position}}. We\'ll review your application and get back to you soon.',
      category: 'Follow-up',
      lastUsed: '2024-01-12',
      status: 'pending'
    },
    {
      id: 5,
      name: 'Event Invitation',
      description: 'Career events and webinars',
      content: 'Hi {{name}}, join us for our upcoming career webinar on {{topic}} on {{date}}. Register now to secure your spot!',
      category: 'Events',
      lastUsed: '2024-01-11',
      status: 'approved'
    },
    {
      id: 6,
      name: 'Application Status',
      description: 'Application status updates',
      content: 'Hi {{name}}, your application for {{position}} has been {{status}}. We\'ll contact you with next steps.',
      category: 'Status Updates',
      lastUsed: '2024-01-10',
      status: 'approved'
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

  const handleUseTemplate = (templateId: number) => {
    setSelectedTemplate(templateId.toString());
  };

  const handleEditTemplate = (templateId: number) => {
    console.log('Edit template:', templateId);
  };

  const handleDeleteTemplate = (templateId: number) => {
    console.log('Delete template:', templateId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">WhatsApp Message Templates</h3>
          <p className="text-gray-600">Manage and organize your WhatsApp message templates</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          <Icon icon="fluent:add-24-regular" className="w-5 h-5 mr-2" />
          Create Template
        </button>
      </div>

      {/* WhatsApp Guidelines */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-medium text-yellow-800 mb-2">WhatsApp Template Guidelines</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Templates must be approved by WhatsApp before use</li>
          <li>• Messages must be under 4096 characters</li>
          <li>• Avoid spam-like content and promotional language</li>
          <li>• Include opt-out instructions when required</li>
          <li>• Use variables like for personalization</li>
        </ul>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`bg-white border-2 rounded-lg p-6 cursor-pointer transition-all ${
              selectedTemplate === template.id.toString()
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedTemplate(template.id.toString())}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-lg font-medium text-gray-900">{template.name}</h4>
                  {getStatusBadge(template.status)}
                </div>
                <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                  {template.category}
                </span>
              </div>
              <div className="flex space-x-1 ml-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditTemplate(template.id);
                  }}
                  className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                >
                  <Icon icon="fluent:edit-24-regular" className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTemplate(template.id);
                  }}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Icon icon="fluent:delete-24-regular" className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div>
                <span className="text-xs font-medium text-gray-500">Content:</span>
                <p className="text-sm text-gray-700 mt-1 overflow-hidden" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical'
                }}>{template.content}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Last used: {template.lastUsed}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleUseTemplate(template.id);
                }}
                className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Use Template
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Template Form */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Create New WhatsApp Template</h3>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Icon icon="fluent:dismiss-24-regular" className="w-6 h-6" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter template name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter template description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message Content</label>
                <textarea
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your message content. Use {{name}}, {{company}} etc. for variables."
                />
                <p className="text-xs text-gray-500 mt-1">Maximum 4096 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  <option value="">Select category</option>
                  <option value="Job Alerts">Job Alerts</option>
                  <option value="Interview">Interview</option>
                  <option value="Onboarding">Onboarding</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Events">Events</option>
                  <option value="Status Updates">Status Updates</option>
                </select>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Create Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
