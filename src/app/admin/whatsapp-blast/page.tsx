'use client';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import BreadCrumbs from '@/components/admin/BreadCrumbs';

export default function WhatsAppBlast() {
  const [whatsappData, setWhatsappData] = useState({
    message: '',
    recipientType: 'all', // all, active, inactive, specific
    recipientCount: 0,
    scheduledDate: '',
    isScheduled: false,
    includeMedia: false,
    mediaType: 'image' // image, document, video
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Mock recipient counts
  const recipientCounts = {
    all: 856,
    active: 743,
    inactive: 113,
    specific: 0
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setWhatsappData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      recipientCount: recipientCounts[value as keyof typeof recipientCounts] || 0
    }));
  };

  const handleSendWhatsApp = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('WhatsApp blast sent successfully!');
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
          title="WhatsApp Blast"
          breadcrumbs={[
            { label: 'Dashboard', href: '/admin/dashboard' },
            { label: 'WhatsApp Blast', href: '/admin/whatsapp-blast' }
          ]} 
        />

        {/* Description */}
        <div className="mb-8">
          <p className="text-gray-600">Send bulk WhatsApp messages to your users</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* WhatsApp Form */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Compose WhatsApp Message</h2>
              
              <div className="space-y-6">
                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={whatsappData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your WhatsApp message..."
                  />
                  <p className="mt-1 text-sm text-gray-500">Maximum 4096 characters</p>
                </div>

                {/* Recipients */}
                <div>
                  <label htmlFor="recipientType" className="block text-sm font-medium text-gray-700 mb-2">
                    Recipients
                  </label>
                  <select
                    id="recipientType"
                    name="recipientType"
                    value={whatsappData.recipientType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="all">All Users ({recipientCounts.all})</option>
                    <option value="active">Active Users ({recipientCounts.active})</option>
                    <option value="inactive">Inactive Users ({recipientCounts.inactive})</option>
                    <option value="specific">Specific Users</option>
                  </select>
                </div>

                {/* Media Options */}
                <div>
                  <div className="flex items-center mb-3">
                    <input
                      type="checkbox"
                      id="includeMedia"
                      name="includeMedia"
                      checked={whatsappData.includeMedia}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="includeMedia" className="ml-2 text-sm font-medium text-gray-700">
                      Include Media
                    </label>
                  </div>
                  
                  {whatsappData.includeMedia && (
                    <div className="ml-6 space-y-3">
                      <select
                        name="mediaType"
                        value={whatsappData.mediaType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="image">Image</option>
                        <option value="document">Document</option>
                        <option value="video">Video</option>
                      </select>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Icon icon="fluent:cloud-upload-24-regular" className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG, PDF, MP4 up to 10MB</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Schedule */}
                <div>
                  <div className="flex items-center mb-3">
                    <input
                      type="checkbox"
                      id="isScheduled"
                      name="isScheduled"
                      checked={whatsappData.isScheduled}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isScheduled" className="ml-2 text-sm font-medium text-gray-700">
                      Schedule Message
                    </label>
                  </div>
                  
                  {whatsappData.isScheduled && (
                    <input
                      type="datetime-local"
                      name="scheduledDate"
                      value={whatsappData.scheduledDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button
                    onClick={handleSendWhatsApp}
                    disabled={isLoading || !whatsappData.message}
                    className="flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? (
                      <>
                        <Icon icon="eos-icons:loading" className="w-5 h-5 mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Icon icon="fluent:send-24-regular" className="w-5 h-5 mr-2" />
                        Send WhatsApp Blast
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">WhatsApp Message Preview</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <Icon icon="fluent:chat-24-regular" className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-white rounded-lg p-3 shadow-sm">
                        <p className="text-gray-900 whitespace-pre-wrap">
                          {whatsappData.message || 'No message content'}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">WhatsApp Business</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">WhatsApp Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Recipients</span>
                  <span className="font-semibold text-green-600">{whatsappData.recipientCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Delivery Rate</span>
                  <span className="font-semibold text-green-600">99.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Read Rate</span>
                  <span className="font-semibold text-blue-600">86.7%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Reply Rate</span>
                  <span className="font-semibold text-purple-600">34.5%</span>
                </div>
              </div>
            </div>

            {/* Recent Campaigns */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Campaigns</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Job Alert - Remote Jobs</p>
                    <p className="text-sm text-gray-600">Sent 1 hour ago</p>
                  </div>
                  <span className="text-sm text-green-600 font-medium">743 sent</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Interview Reminder</p>
                    <p className="text-sm text-gray-600">Sent 4 hours ago</p>
                  </div>
                  <span className="text-sm text-green-600 font-medium">156 sent</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Welcome Message</p>
                    <p className="text-sm text-gray-600">Sent 1 day ago</p>
                  </div>
                  <span className="text-sm text-green-600 font-medium">89 sent</span>
                </div>
              </div>
            </div>

            {/* Message Templates */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Message Templates</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <p className="font-medium text-gray-900">Job Alert Template</p>
                  <p className="text-sm text-gray-600">New job notifications</p>
                </button>
                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <p className="font-medium text-gray-900">Interview Reminder</p>
                  <p className="text-sm text-gray-600">Upcoming interviews</p>
                </button>
                <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <p className="font-medium text-gray-900">Welcome Message</p>
                  <p className="text-sm text-gray-600">New user onboarding</p>
                </button>
              </div>
            </div>

            {/* WhatsApp Guidelines */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-800 mb-2">WhatsApp Guidelines</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Messages must be under 4096 characters</li>
                <li>• Avoid spam-like content</li>
                <li>• Include opt-out instructions</li>
                <li>• Respect business hours (9 AM - 6 PM)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
