'use client';
import { useState } from 'react';
import { Icon } from '@iconify/react';

export default function EmailTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const templates = [
    {
      id: 1,
      name: 'Job Alert Template',
      description: 'For new job notifications',
      subject: 'New Job Alert: {{jobTitle}}',
      content: 'We have a new job opportunity for you...',
      category: 'Job Alerts',
      lastUsed: '2024-01-15'
    },
    {
      id: 2,
      name: 'Newsletter Template',
      description: 'Weekly updates and news',
      subject: 'Weekly Newsletter - {{date}}',
      content: 'Here are this week\'s highlights...',
      category: 'Newsletter',
      lastUsed: '2024-01-14'
    },
    {
      id: 3,
      name: 'Welcome Template',
      description: 'New user onboarding',
      subject: 'Welcome to Freshers!',
      content: 'Welcome to our platform...',
      category: 'Onboarding',
      lastUsed: '2024-01-13'
    },
    {
      id: 4,
      name: 'Password Reset Template',
      description: 'Password reset instructions',
      subject: 'Reset Your Password',
      content: 'Click the link below to reset your password...',
      category: 'Security',
      lastUsed: '2024-01-12'
    }
  ];

  const handleUseTemplate = (templateId: number) => {
    setSelectedTemplate(templateId.toString());
  };

  const handleEditTemplate = (templateId: number) => {
    // Handle edit functionality
    console.log('Edit template:', templateId);
  };

  const handleDeleteTemplate = (templateId: number) => {
    // Handle delete functionality
    console.log('Delete template:', templateId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Templates</h3>
          <p className="text-gray-600">Manage and organize your email templates</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Icon icon="fluent:add-24-regular" className="w-5 h-5 mr-2" />
          Create Template
        </button>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`bg-white border-2 rounded-lg p-6 cursor-pointer transition-all ${
              selectedTemplate === template.id.toString()
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedTemplate(template.id.toString())}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="text-lg font-medium text-gray-900 mb-1">{template.name}</h4>
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
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
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
                <span className="text-xs font-medium text-gray-500">Subject:</span>
                <p className="text-sm text-gray-700 truncate">{template.subject}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-gray-500">Content:</span>
                <p className="text-sm text-gray-700 overflow-hidden" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
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
                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
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
              <h3 className="text-lg font-semibold text-gray-900">Create New Template</h3>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter template name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter template description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter email subject"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter email content"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Select category</option>
                  <option value="Job Alerts">Job Alerts</option>
                  <option value="Newsletter">Newsletter</option>
                  <option value="Onboarding">Onboarding</option>
                  <option value="Security">Security</option>
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
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
