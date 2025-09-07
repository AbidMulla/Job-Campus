'use client';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import BreadCrumbs from '@/components/admin/BreadCrumbs';

export default function EmailBlast() {
  const [emailData, setEmailData] = useState({
    subject: '',
    message: '',
    recipientType: 'all', // all, active, inactive, specific
    recipientCount: 0,
    scheduledDate: '',
    isScheduled: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Mock recipient counts
  const recipientCounts = {
    all: 1250,
    active: 892,
    inactive: 358,
    specific: 0
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmailData(prev => ({
      ...prev,
      [name]: value,
      recipientCount: recipientCounts[value as keyof typeof recipientCounts] || 0
    }));
  };

  const handleSendEmail = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Email blast sent successfully!');
    }, 2000);
  };

  const handlePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <BreadCrumbs 
          title="Email Blast"
          breadcrumbs={[
            { label: 'Dashboard', href: '/admin/dashboard' },
            { label: 'Email Blast', href: '/admin/email-blast' }
          ]} 
        />

        {/* Description */}
        <div className="mb-8">
          <p className="text-gray-600">Send bulk emails to your users</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Email Form */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Compose Email</h2>
              
              <div className="space-y-6">
                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={emailData.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter email subject..."
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={emailData.message}
                    onChange={handleInputChange}
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email message..."
                  />
                </div>

                {/* Recipients */}
                <div>
                  <label htmlFor="recipientType" className="block text-sm font-medium text-gray-700 mb-2">
                    Recipients
                  </label>
                  <select
                    id="recipientType"
                    name="recipientType"
                    value={emailData.recipientType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Users ({recipientCounts.all})</option>
                    <option value="active">Active Users ({recipientCounts.active})</option>
                    <option value="inactive">Inactive Users ({recipientCounts.inactive})</option>
                    <option value="specific">Specific Users</option>
                  </select>
                </div>

                {/* Schedule */}
                <div>
                  <div className="flex items-center mb-3">
                    <input
                      type="checkbox"
                      id="isScheduled"
                      name="isScheduled"
                      checked={emailData.isScheduled}
                      onChange={(e) => setEmailData(prev => ({ ...prev, isScheduled: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isScheduled" className="ml-2 text-sm font-medium text-gray-700">
                      Schedule Email
                    </label>
                  </div>
                  
                  {emailData.isScheduled && (
                    <input
                      type="datetime-local"
                      name="scheduledDate"
                      value={emailData.scheduledDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button
                    onClick={handleSendEmail}
                    disabled={isLoading || !emailData.subject || !emailData.message}
                    className="flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? (
                      <>
                        <Icon icon="eos-icons:loading" className="w-5 h-5 mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Icon icon="fluent:send-24-regular" className="w-5 h-5 mr-2" />
                        Send Email Blast
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={handlePreview}
                    className="flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Icon icon="fluent:eye-24-regular" className="w-5 h-5 mr-2" />
                    Preview
                  </button>
                </div>
              </div>
            </div>

            {/* Preview */}
            {showPreview && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Preview</h3>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="mb-4">
                    <strong>Subject:</strong> {emailData.subject || 'No subject'}
                  </div>
                  <div className="whitespace-pre-wrap">
                    {emailData.message || 'No message content'}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Recipients</span>
                  <span className="font-semibold text-blue-600">{emailData.recipientCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Delivery Rate</span>
                  <span className="font-semibold text-green-600">98.5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Open Rate</span>
                  <span className="font-semibold text-purple-600">71.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Click Rate</span>
                  <span className="font-semibold text-orange-600">23.8%</span>
                </div>
              </div>
            </div>

            {/* Recent Campaigns */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Campaigns</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Job Alert - Tech Jobs</p>
                    <p className="text-sm text-gray-600">Sent 2 hours ago</p>
                  </div>
                  <span className="text-sm text-green-600 font-medium">892 sent</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Weekly Newsletter</p>
                    <p className="text-sm text-gray-600">Sent 1 day ago</p>
                  </div>
                  <span className="text-sm text-green-600 font-medium">1,250 sent</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">New Features Update</p>
                    <p className="text-sm text-gray-600">Sent 3 days ago</p>
                  </div>
                  <span className="text-sm text-green-600 font-medium">756 sent</span>
                </div>
              </div>
            </div>

            {/* Templates */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Templates</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <p className="font-medium text-gray-900">Job Alert Template</p>
                  <p className="text-sm text-gray-600">For new job notifications</p>
                </button>
                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <p className="font-medium text-gray-900">Newsletter Template</p>
                  <p className="text-sm text-gray-600">Weekly updates</p>
                </button>
                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <p className="font-medium text-gray-900">Welcome Template</p>
                  <p className="text-sm text-gray-600">New user onboarding</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
